/**
 * CMAC website write-back endpoint (Google Apps Script)
 * =====================================================
 *
 * Lets the static CMAC site save inventory and event-staffing rows into
 * Google Sheets. The site is a static export, so it cannot talk to the Sheets
 * API directly — this web app is the bridge.
 *
 * ---------------------------------------------------------------------------
 * SETUP (about 5 minutes, do this once)
 * ---------------------------------------------------------------------------
 * 1. Open https://script.google.com and click "New project".
 * 2. Delete the sample code, paste this entire file in, and name the project
 *    something like "CMAC Sheet Writer".
 * 3. Click "Deploy" > "New deployment".
 * 4. Click the gear next to "Select type" and choose "Web app".
 * 5. Set:
 *       Description:      CMAC sheet writer
 *       Execute as:       Me (your account)
 *       Who has access:   Anyone
 *    "Anyone" is required — the website calls this without a Google login.
 *    Only this script can touch the sheets, and it only appends/updates the
 *    specific columns below, so it is not a general-purpose door into them.
 * 6. Click "Deploy", then "Authorize access" and approve the permissions.
 *    Google will warn that the app is unverified: click "Advanced" >
 *    "Go to CMAC Sheet Writer (unsafe)". That warning is expected for your
 *    own private scripts.
 * 7. Copy the "Web app URL". It looks like:
 *       https://script.google.com/macros/s/AKfycb..../exec
 * 8. Put that URL in the site's .env.local file:
 *       NEXT_PUBLIC_CMAC_INVENTORY_WRITE_URL=https://script.google.com/macros/s/..../exec
 *       NEXT_PUBLIC_CMAC_EVENT_STAFFING_WRITE_URL=https://script.google.com/macros/s/..../exec
 *    (The same URL handles both — the site says which one it wants.)
 * 9. Restart `npm run dev`, or rebuild and redeploy the site.
 *
 * IMPORTANT: every time you edit this script you must run
 * "Deploy" > "Manage deployments" > pencil icon > Version: "New version" > Deploy,
 * otherwise the live URL keeps running the old code.
 *
 * ---------------------------------------------------------------------------
 * Test it without the website
 * ---------------------------------------------------------------------------
 * Paste the web app URL into a browser tab. A healthy deployment replies with
 * {"ok":true,"service":"cmac-sheet-writer",...}. If you get a Google sign-in
 * page instead, "Who has access" was not set to "Anyone".
 */

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

var INVENTORY_SHEET_ID = '1taIg--51jB1fJ2a5S072F-0HWGpq3RHexVUE94yDCGo';
var INVENTORY_SHEET_NAME = 'CMAC_INVENTORY';
var INVENTORY_LOG_SHEET_NAME = 'CMAC_INVENTORY_LOG';

var STAFFING_SHEET_ID = '1GPw8ETp8-lrBQHoaGg5MshrCM2di96fxJzbnSnJHMiU';
var STAFFING_SHEET_NAME = 'CMAC_EVENT_STAFFING';

// Columns as they exist in the inventory sheet today.
var INVENTORY_HEADERS = [
  'item_id',
  'Item_name',
  'Item_description',
  'Item_qty',
  'Item_Price',
  'Item_Notes'
];

// The live board workbook uses a more compact ledger header set.
// Keep the aliases wide so the app still works if the board later renames a
// column or uses a slightly different column title in the same tab.
var INVENTORY_LOG_HEADERS = [
  'date',
  'item',
  'IN',
  'OUT',
  'TOTAL',
  'NOTES',
  'events',
  'school'
];

var STAFFING_HEADERS = [
  'event_id',
  'date',
  'event_name',
  'school',
  'location',
  'setup_time',
  'lead',
  'board_member',
  'volunteer_team',
  'check_in_staff',
  'student_reps',
  'cmac_table',
  'form_status',
  'selling',
  'notes',
  'updated_at'
];

// ---------------------------------------------------------------------------
// Entry points
// ---------------------------------------------------------------------------

function doGet() {
  return jsonResponse({
    ok: true,
    service: 'cmac-sheet-writer',
    message: 'Deployment is live. POST inventory or staffing records here.',
    time: new Date().toISOString()
  });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'No request body was received.' });
    }

    var payload = JSON.parse(e.postData.contents);
    var target = String(payload.target || payload.sheetName || '').toLowerCase();

    if (target.indexOf('inventory') !== -1) {
      return jsonResponse(saveInventory(payload.record || {}));
    }

    if (target.indexOf('staffing') !== -1) {
      return jsonResponse(saveStaffing(payload.record || {}));
    }

    return jsonResponse({
      ok: false,
      error: 'Unknown target "' + target + '". Expected an inventory or staffing request.'
    });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

// ---------------------------------------------------------------------------
// Inventory
// ---------------------------------------------------------------------------

/**
 * Adds purchased stock to the inventory sheet.
 *
 * If the item already exists its quantity is increased, so a board member
 * returning from Sam's Club just logs what they bought. Unknown items are
 * appended as a new row with a generated item_id.
 */
function saveInventory(record) {
  var name = trimmed(record.name || record.item || record.Item_name);
  if (!name) {
    return { ok: false, error: 'Item name is required.' };
  }

  var quantity = Number(record.quantity != null ? record.quantity : record.Item_qty);
  if (!isFinite(quantity) || quantity === 0) {
    return { ok: false, error: 'A non-zero quantity is required.' };
  }

  var sheet = getSheet(INVENTORY_SHEET_ID, INVENTORY_SHEET_NAME, INVENTORY_HEADERS);
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);

  try {
    var headers = readHeaders(sheet, INVENTORY_HEADERS);
    var idCol = columnIndex(headers, ['item_id', 'itemid', 'id']);
    var nameCol = columnIndex(headers, ['item_name', 'itemname', 'item', 'name', 'product']);
    var descCol = columnIndex(headers, ['item_description', 'itemdescription', 'description', 'desc']);
    var qtyCol = columnIndex(headers, ['item_qty', 'itemqty', 'qty', 'quantity']);
    var priceCol = columnIndex(headers, ['item_price', 'itemprice', 'price', 'cost']);
    var notesCol = columnIndex(headers, ['item_notes', 'itemnotes', 'notes', 'note']);

    if (nameCol === -1 || qtyCol === -1) {
      return { ok: false, error: 'The inventory sheet needs Item_name and Item_qty columns.' };
    }

    var lastRow = sheet.getLastRow();
    var matchedRow = -1;
    var previousQty = 0;

    if (lastRow > 1) {
      var values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
      for (var i = 0; i < values.length; i++) {
        var existingName = trimmed(values[i][nameCol]);
        if (existingName && existingName.toLowerCase() === name.toLowerCase()) {
          matchedRow = i + 2;
          previousQty = Number(values[i][qtyCol]) || 0;
          break;
        }
      }
    }

    var description = trimmed(record.description || record.Item_description);
    var notes = trimmed(record.notes || record.Item_Notes);
    var price = record.price != null && record.price !== '' ? Number(record.price) : null;
    var transactionDate = trimmed(record.date || new Date().toISOString().slice(0, 10));
    var school = trimmed(record.school || record.location || '');
    var eventName = trimmed(record.event || record.event_name || '');

    if (matchedRow > 0) {
      // A negative quantity is a removal (stock used or sold at an event).
      // Clamp at zero so a mis-typed removal can never drive stock negative.
      var newQty = previousQty + quantity;
      if (newQty < 0) {
        newQty = 0;
      }
      sheet.getRange(matchedRow, qtyCol + 1).setValue(newQty);

      if (description && descCol !== -1) {
        sheet.getRange(matchedRow, descCol + 1).setValue(description);
      }
      if (price !== null && isFinite(price) && priceCol !== -1) {
        sheet.getRange(matchedRow, priceCol + 1).setValue(price);
      }
      if (notes && notesCol !== -1) {
        sheet.getRange(matchedRow, notesCol + 1).setValue(notes);
      }

      logInventoryTransaction({
        date: transactionDate,
        item: name,
        school: school,
        eventName: eventName,
        notes: notes || description,
        quantityIn: quantity > 0 ? quantity : 0,
        quantityOut: quantity < 0 ? Math.abs(quantity) : 0,
        quantityTotal: newQty
      });

      return {
        ok: true,
        action: 'updated',
        item: name,
        added: quantity,
        previousQuantity: previousQty,
        quantity: newQty,
        row: matchedRow
      };
    }

    var row = [];
    for (var c = 0; c < headers.length; c++) {
      row.push('');
    }

    // Removing stock for an item that was never tracked is always a mistake,
    // so refuse it rather than creating a row with a nonsense quantity.
    if (quantity < 0) {
      return {
        ok: false,
        error: '"' + name + '" is not in the inventory sheet yet, so there is nothing to remove.'
      };
    }

    if (idCol !== -1) row[idCol] = makeItemId(name);
    row[nameCol] = name;
    if (descCol !== -1) row[descCol] = description;
    row[qtyCol] = quantity;
    if (priceCol !== -1 && price !== null && isFinite(price)) row[priceCol] = price;
    if (notesCol !== -1) row[notesCol] = notes;

    sheet.appendRow(row);

    logInventoryTransaction({
      date: transactionDate,
      item: name,
      school: school,
      eventName: eventName,
      notes: notes || description,
      quantityIn: quantity,
      quantityOut: 0,
      quantityTotal: quantity
    });

    return {
      ok: true,
      action: 'created',
      item: name,
      added: quantity,
      quantity: quantity,
      row: sheet.getLastRow()
    };
  } finally {
    lock.releaseLock();
  }
}

function logInventoryTransaction(details) {
  var logSheet = getSheet(INVENTORY_SHEET_ID, INVENTORY_LOG_SHEET_NAME, INVENTORY_LOG_HEADERS);
  var headers = readHeaders(logSheet, INVENTORY_LOG_HEADERS);
  var map = {
    date: columnIndex(headers, ['date', 'transaction_date']),
    item_name: columnIndex(headers, ['item_name', 'itemname', 'item', 'name']),
    school: columnIndex(headers, ['school', 'school_name']),
    event_name: columnIndex(headers, ['event_name', 'event', 'events', 'event_name_text', 'eventtitle']),
    notes: columnIndex(headers, ['notes', 'note', 'comments', 'notes_text']),
    quantity_in: columnIndex(headers, ['quantity_in', 'qty_in', 'in_qty', 'in', 'IN']),
    quantity_out: columnIndex(headers, ['quantity_out', 'qty_out', 'out_qty', 'out', 'OUT']),
    quantity_total: columnIndex(headers, ['quantity_total', 'qty_total', 'total', 'TOTAL']),
    updated_at: columnIndex(headers, ['updated_at', 'last_updated', 'updated'])
  };

  var row = [];
  for (var i = 0; i < headers.length; i++) {
    row.push('');
  }

  var values = {
    date: trimmed(details.date || new Date().toISOString().slice(0, 10)),
    item_name: trimmed(details.item || ''),
    school: trimmed(details.school || ''),
    event_name: trimmed(details.eventName || ''),
    notes: trimmed(details.notes || ''),
    quantity_in: Number(details.quantityIn || 0),
    quantity_out: Number(details.quantityOut || 0),
    quantity_total: Number(details.quantityTotal || 0),
    updated_at: new Date().toISOString()
  };

  Object.keys(map).forEach(function (key) {
    var col = map[key];
    if (col !== -1) {
      row[col] = values[key];
    }
  });

  logSheet.appendRow(row);
}

// ---------------------------------------------------------------------------
// Event staffing
// ---------------------------------------------------------------------------

/**
 * Upserts one staffing assignment, keyed on event_id so re-saving the same
 * event edits its row instead of creating duplicates.
 */
function saveStaffing(record) {
  var eventId = trimmed(record.eventId || record.event_id);
  var eventName = trimmed(record.name || record.event_name);

  if (!eventId && !eventName) {
    return { ok: false, error: 'An event id or event name is required.' };
  }

  var sheet = getSheet(STAFFING_SHEET_ID, STAFFING_SHEET_NAME, STAFFING_HEADERS);
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);

  try {
    var headers = readHeaders(sheet, STAFFING_HEADERS);

    var map = {
      event_id: columnIndex(headers, ['event_id', 'eventid', 'id']),
      date: columnIndex(headers, ['date', 'event_date']),
      event_name: columnIndex(headers, ['event_name', 'name', 'event', 'title']),
      school: columnIndex(headers, ['school', 'school_name']),
      location: columnIndex(headers, ['location', 'venue']),
      setup_time: columnIndex(headers, ['setup_time', 'setuptime', 'setup']),
      lead: columnIndex(headers, ['lead', 'event_lead', 'point_person']),
      board_member: columnIndex(headers, ['board_member', 'boardmember', 'board']),
      volunteer_team: columnIndex(headers, ['volunteer_team', 'volunteers', 'volunteer']),
      check_in_staff: columnIndex(headers, ['check_in_staff', 'checkinstaff', 'check_in']),
      student_reps: columnIndex(headers, ['student_reps', 'studentreps', 'students']),
      cmac_table: columnIndex(headers, ['cmac_table', 'cmactable', 'table']),
      form_status: columnIndex(headers, ['form_status', 'formstatus', 'form']),
      selling: columnIndex(headers, ['selling', 'items_sold', 'sells']),
      notes: columnIndex(headers, ['notes', 'comments']),
      updated_at: columnIndex(headers, ['updated_at', 'updated', 'last_updated'])
    };

    var values = {
      event_id: eventId,
      date: trimmed(record.date),
      event_name: eventName,
      school: trimmed(record.school),
      location: trimmed(record.location),
      setup_time: trimmed(record.setupTime || record.setup_time),
      lead: trimmed(record.lead),
      board_member: trimmed(record.boardMember || record.board_member),
      volunteer_team: trimmed(record.volunteerTeam || record.volunteer_team),
      check_in_staff: trimmed(record.checkInStaff || record.check_in_staff),
      student_reps: trimmed(record.studentReps || record.student_reps),
      cmac_table: trimmed(record.cmacTable || record.cmac_table),
      form_status: trimmed(record.formStatus || record.form_status),
      selling: trimmed(record.selling),
      notes: trimmed(record.notes),
      updated_at: new Date().toISOString()
    };

    var lastRow = sheet.getLastRow();
    var matchedRow = -1;

    if (lastRow > 1) {
      var existing = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
      for (var i = 0; i < existing.length; i++) {
        var rowId = map.event_id !== -1 ? trimmed(existing[i][map.event_id]) : '';
        var rowName = map.event_name !== -1 ? trimmed(existing[i][map.event_name]) : '';
        var rowDate = map.date !== -1 ? trimmed(existing[i][map.date]) : '';

        var idMatch = eventId && rowId && rowId === eventId;
        var nameDateMatch =
          !eventId &&
          eventName &&
          rowName.toLowerCase() === eventName.toLowerCase() &&
          rowDate === values.date;

        if (idMatch || nameDateMatch) {
          matchedRow = i + 2;
          break;
        }
      }
    }

    var row = [];
    for (var c = 0; c < headers.length; c++) {
      row.push('');
    }

    Object.keys(map).forEach(function (key) {
      var col = map[key];
      if (col !== -1) {
        row[col] = values[key];
      }
    });

    if (matchedRow > 0) {
      // Preserve any extra columns the board added to the sheet by hand.
      var current = sheet.getRange(matchedRow, 1, 1, headers.length).getValues()[0];
      for (var k = 0; k < headers.length; k++) {
        if (row[k] === '' && current[k] !== '') {
          row[k] = current[k];
        }
      }

      sheet.getRange(matchedRow, 1, 1, headers.length).setValues([row]);
      return { ok: true, action: 'updated', event: eventName || eventId, row: matchedRow };
    }

    sheet.appendRow(row);
    return { ok: true, action: 'created', event: eventName || eventId, row: sheet.getLastRow() };
  } finally {
    lock.releaseLock();
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSheet(spreadsheetId, preferredName, defaultHeaders) {
  var book = SpreadsheetApp.openById(spreadsheetId);
  var sheet = book.getSheetByName(preferredName);

  // Tolerate a renamed tab rather than failing the save outright.
  if (!sheet) {
    sheet = book.getSheets()[0];
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(defaultHeaders);
  }

  return sheet;
}

function readHeaders(sheet, fallbackHeaders) {
  var width = Math.max(sheet.getLastColumn(), fallbackHeaders.length);
  var headers = sheet.getRange(1, 1, 1, width).getValues()[0];
  var hasHeader = false;

  for (var i = 0; i < headers.length; i++) {
    if (trimmed(headers[i])) {
      hasHeader = true;
      break;
    }
  }

  if (!hasHeader) {
    sheet.getRange(1, 1, 1, fallbackHeaders.length).setValues([fallbackHeaders]);
    return fallbackHeaders.slice();
  }

  return headers;
}

function columnIndex(headers, aliases) {
  var normalizedAliases = aliases.map(normalizeKey);

  for (var i = 0; i < headers.length; i++) {
    if (normalizedAliases.indexOf(normalizeKey(headers[i])) !== -1) {
      return i;
    }
  }

  return -1;
}

function normalizeKey(value) {
  return String(value == null ? '' : value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function trimmed(value) {
  return String(value == null ? '' : value).trim();
}

function makeItemId(name) {
  var slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 24);

  return slug + '-' + String(Date.now()).slice(-6);
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
