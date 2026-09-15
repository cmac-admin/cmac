"use client";

import { useEffect, useMemo, useState } from "react";
import {
  buildGoogleSheetQueryUrl,
  CMAC_EVENT_STAFFING_SHEET_NAME,
  CMAC_EVENT_STAFFING_WRITE_URL,
  CMAC_SITE_DATA_SHEET_ID,
} from "@/lib/site-data";
import { postToSheet } from "@/lib/sheet-writer";
import {
  defaultSellingForType,
  fetchOptionLists,
  FALLBACK_LISTS,
  type OptionLists,
} from "@/lib/lists";

type EventRecord = {
  eventId: string;
  date: string;
  name: string;
  school: string;
  location: string;
  time: string;
  type: string;
};

type StaffingRecord = {
  eventId: string;
  date: string;
  name: string;
  school: string;
  location: string;
  time: string;
  setupTime: string;
  lead: string;
  boardMember: string;
  volunteerTeam: string;
  checkInStaff: string;
  studentReps: string;
  cmacTable: string;
  formStatus: string;
  selling: string;
  notes: string;
};

const DISTRICT_EVENT_DATA_URL = "/cmac/snapshot-c2m0a2c3/events-data.json";

const STAFFING_DRAFT_KEY = "cmac-staffing-drafts";

const BLANK_RECORD: StaffingRecord = {
  eventId: "",
  date: "",
  name: "",
  school: "",
  location: "",
  time: "",
  setupTime: "",
  lead: "",
  boardMember: "",
  volunteerTeam: "",
  checkInStaff: "",
  studentReps: "",
  cmacTable: "",
  formStatus: "",
  selling: "",
  notes: "",
};

function readStaffingDrafts(): Record<string, StaffingRecord> {
  try {
    const raw = localStorage.getItem(STAFFING_DRAFT_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as Record<string, Partial<StaffingRecord>>;
    return Object.entries(parsed).reduce<Record<string, StaffingRecord>>((accumulator, [eventId, value]) => {
      if (!value || typeof value !== "object") {
        return accumulator;
      }

      const record: StaffingRecord = {
        eventId: String(value.eventId ?? eventId),
        date: String(value.date ?? ""),
        name: String(value.name ?? ""),
        school: String(value.school ?? ""),
        location: String(value.location ?? ""),
        time: String(value.time ?? ""),
        setupTime: String(value.setupTime ?? ""),
        lead: String(value.lead ?? ""),
        boardMember: String(value.boardMember ?? ""),
        volunteerTeam: String(value.volunteerTeam ?? ""),
        checkInStaff: String(value.checkInStaff ?? ""),
        studentReps: String(value.studentReps ?? ""),
        cmacTable: String(value.cmacTable ?? ""),
        formStatus: String(value.formStatus ?? ""),
        selling: String(value.selling ?? ""),
        notes: String(value.notes ?? ""),
      };

      if (record.eventId) {
        accumulator[record.eventId] = record;
      }

      return accumulator;
    }, {});
  } catch {
    return {};
  }
}

function writeStaffingDraft(record: StaffingRecord) {
  try {
    const current = readStaffingDrafts();
    current[record.eventId || makeEventId(record)] = record;
    localStorage.setItem(STAFFING_DRAFT_KEY, JSON.stringify(current));
  } catch {
    // Ignore full or disabled localStorage; the rest of the page still works.
  }
}

function clearStaffingDraft(eventId: string) {
  try {
    const current = readStaffingDrafts();
    delete current[eventId];
    localStorage.setItem(STAFFING_DRAFT_KEY, JSON.stringify(current));
  } catch {
    // Ignore full or disabled localStorage.
  }
}

const FALLBACK_EVENTS: EventRecord[] = [
  { eventId: "boyle-road-elementary-2026-12-09-boyle-winter-concert", date: "2026-12-09", name: "Boyle Winter Concert", school: "Boyle Road Elementary", location: "JFK Middle School", time: "6:30 PM", type: "Concert" },
  { eventId: "john-f.-kennedy-middle-school-2026-12-14-jfk-winter-concert,-group-1", date: "2026-12-14", name: "JFK Winter Concert, Group 1", school: "John F. Kennedy Middle School", location: "CHS Auditorium", time: "7:00 PM", type: "Concert" },
  { eventId: "comsewogue-high-school-2027-04-06-chs-spring-concert", date: "2027-04-06", name: "CHS Spring Concert", school: "Comsewogue High School", location: "CHS Auditorium", time: "7:00 PM", type: "Concert" },
  { eventId: "terryville-road-elementary-2027-05-06-terryville-drama-performance", date: "2027-05-06", name: "Terryville Drama Performance", school: "Terryville Road Elementary", location: "Terryville Road Elementary", time: "7:00 PM", type: "Drama" },
];

function normalizeText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function toLookupKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function stripGoogleJsonWrapper(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return raw;

  return trimmed.startsWith("/*O_o*/")
    ? trimmed.replace(/^\/\*O_o\*\/\s*google\.visualization\.Query\.setResponse\(/, "").replace(/\);?\s*$/, "")
    : trimmed;
}

function makeEventId(event: Partial<EventRecord>): string {
  const seed = [event.school, event.date, event.name]
    .filter((part): part is string => typeof part === "string" && part.trim().length > 0)
    .map((part) => part.trim())
    .join("-")
    .replace(/\s+/g, "-")
    .toLowerCase();

  return seed || `event-${Date.now()}`;
}

function matchStaffingRecord(event: EventRecord, staffingMap: Record<string, StaffingRecord>): StaffingRecord | null {
  const lookupKeys = [
    event.eventId,
    toLookupKey(`${event.name}|${event.date}`),
    toLookupKey(`${event.name}|${event.school}`),
    toLookupKey(`${event.school}|${event.date}`),
    toLookupKey(`${event.name}`),
  ];

  for (const key of lookupKeys) {
    const match = staffingMap[key];
    if (match) return match;
  }

  return null;
}

function toIsoDate(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  // Already ISO (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) return trimmed.slice(0, 10);

  // District feed writes human dates like "October 15, 2026"
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return "";

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(iso: string): string {
  if (!iso) return "Date TBD";
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getSchoolBadgeClass(school: string): string {
  const normalized = school.toLowerCase();
  if (normalized.includes("comsewogue high") || normalized.includes("chs")) return "school-badge school-badge--chs";
  if (normalized.includes("kennedy") || normalized.includes("jfk")) return "school-badge school-badge--jfk";
  if (normalized.includes("boyle")) return "school-badge school-badge--boyle";
  if (normalized.includes("terryville")) return "school-badge school-badge--terry";
  if (normalized.includes("clinton")) return "school-badge school-badge--clinton";
  if (normalized.includes("norwood")) return "school-badge school-badge--norwood";
  return "school-badge";
}

function parseDistrictEvents(raw: string): EventRecord[] {
  try {
    const parsed = JSON.parse(raw) as Array<{
      school?: string;
      events?: Array<{
        name?: string;
        date?: string;
        location?: string;
        time?: string;
      }>;
    }>;

    if (!Array.isArray(parsed)) return FALLBACK_EVENTS;

    const flattened: EventRecord[] = [];

    for (const schoolBucket of parsed) {
      if (!schoolBucket || !Array.isArray(schoolBucket.events)) continue;

      for (const event of schoolBucket.events) {
        const name = normalizeText(event?.name ?? "");
        const school = normalizeText(schoolBucket.school ?? "");
        const isoDate = toIsoDate(normalizeText(event?.date ?? ""));
        const location = normalizeText(event?.location ?? "");
        const time = normalizeText(event?.time ?? "");

        if (!name || !school || !isoDate) continue;

        const lowered = name.toLowerCase();
        flattened.push({
          eventId: makeEventId({ school, date: isoDate, name }),
          date: isoDate,
          name,
          school,
          location,
          time,
          type: lowered.includes("drama") || lowered.includes("musical")
            ? "Drama"
            : lowered.includes("art")
              ? "Art Show"
              : lowered.includes("concert")
                ? "Concert"
                : "Event",
        });
      }
    }

    return flattened.length > 0
      ? flattened.sort((a, b) => a.date.localeCompare(b.date) || a.name.localeCompare(b.name))
      : FALLBACK_EVENTS;
  } catch {
    return FALLBACK_EVENTS;
  }
}

function parseStaffingRows(raw: string): Record<string, StaffingRecord> {
  const payload = stripGoogleJsonWrapper(raw);

  try {
    const parsed = JSON.parse(payload) as {
      table?: {
        rows?: Array<{ c?: Array<{ v?: string | number | null } | null> | undefined }>;
      };
    };

    const rows = parsed.table?.rows ?? [];
    if (!rows.length) return {};

    const headers = (rows[0].c ?? []).map((cell) => normalizeText(cell?.v ?? "").toLowerCase());
    const getValue = (row: Array<{ v?: string | number | null } | null> | undefined, key: string) => {
      const index = headers.findIndex((header) =>
        header === key || header === key.replace(/_/g, "") || header === key.replace(/_/g, " ")
      );
      return index >= 0 ? normalizeText(row?.[index]?.v ?? "") : "";
    };

    const map: Record<string, StaffingRecord> = {};

    for (const row of rows.slice(1)) {
      const cells = row.c ?? [];
      const eventId = getValue(cells, "event_id") || getValue(cells, "eventid") || getValue(cells, "id") || "";
      const date = toIsoDate(getValue(cells, "date") || getValue(cells, "event_date") || "");
      const name = getValue(cells, "event_name") || getValue(cells, "name") || getValue(cells, "event") || getValue(cells, "title") || "";
      const school = getValue(cells, "school") || getValue(cells, "school_name") || "";
      const location = getValue(cells, "location") || getValue(cells, "venue") || "";
      const setupTime = getValue(cells, "setup_time") || getValue(cells, "setuptime") || getValue(cells, "setup") || "";
      const boardMember = getValue(cells, "board_member") || getValue(cells, "boardmember") || "";
      const volunteerTeam = getValue(cells, "volunteer_team") || getValue(cells, "volunteers") || "";
      const checkInStaff = getValue(cells, "check_in_staff") || getValue(cells, "checkinstaff") || "";
      const studentReps = getValue(cells, "student_reps") || getValue(cells, "studentreps") || "";
      const lead = getValue(cells, "lead") || getValue(cells, "event_lead") || "";
      const cmacTable = getValue(cells, "cmac_table") || getValue(cells, "cmactable") || getValue(cells, "table") || "";
      const formStatus = getValue(cells, "form_status") || getValue(cells, "formstatus") || getValue(cells, "form") || "";
      const selling = getValue(cells, "selling") || getValue(cells, "selling_items") || getValue(cells, "items") || "";
      const notes = getValue(cells, "notes") || getValue(cells, "comments") || "";

      if (!eventId && !date && !name && !school) continue;

      const record: StaffingRecord = {
        eventId: eventId || makeEventId({ school, date, name }),
        date,
        name,
        school,
        location,
        time: "",
        setupTime,
        lead,
        boardMember,
        volunteerTeam,
        checkInStaff,
        studentReps,
        cmacTable,
        formStatus,
        selling,
        notes,
      };

      const keys = [
        record.eventId,
        toLookupKey(`${record.name}|${record.date}`),
        toLookupKey(`${record.name}|${record.school}`),
        toLookupKey(`${record.school}|${record.date}`),
        toLookupKey(`${record.name}`),
      ];

      for (const key of keys) {
        if (key) map[key] = record;
      }
    }

    return map;
  } catch {
    return {};
  }
}

/**
 * Single-value dropdown fed by the CMAC_LISTS sheet. A value already saved in
 * the staffing sheet but missing from the options is kept at the top of the
 * list so editing an event never silently blanks someone's name.
 */
function SelectField({
  label,
  value,
  options,
  onChange,
  wide = false,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  wide?: boolean;
}) {
  const merged = value && !options.some((option) => option === value) ? [value, ...options] : options;

  return (
    <label className={`staffing-field${wide ? " staffing-field--wide" : ""}`}>
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">— Select —</option>
        {merged.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Multi-value picker stored as a comma-separated string for the sheet. */
function MultiSelectField({
  label,
  value,
  options,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  hint?: string;
}) {
  const selected = value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  const merged = [...options];
  for (const entry of selected) {
    if (!merged.some((option) => option.toLowerCase() === entry.toLowerCase())) {
      merged.push(entry);
    }
  }

  const toggle = (option: string) => {
    const exists = selected.some((entry) => entry.toLowerCase() === option.toLowerCase());
    const next = exists
      ? selected.filter((entry) => entry.toLowerCase() !== option.toLowerCase())
      : [...selected, option];
    onChange(next.join(", "));
  };

  return (
    <div className="staffing-field staffing-field--wide">
      <span className="staffing-field-label">{label}</span>
      {merged.length === 0 ? (
        <p className="muted-copy staffing-empty-list">
          No options yet — add them in the CMAC_LISTS tab of the spreadsheet.
        </p>
      ) : (
        <div className="chip-picker">
          {merged.map((option) => {
            const active = selected.some((entry) => entry.toLowerCase() === option.toLowerCase());
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                className={`chip-toggle${active ? " chip-toggle--on" : ""}`}
                onClick={() => toggle(option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
      {hint && <span className="staffing-field-hint">{hint}</span>}
    </div>
  );
}

export default function StaffingDashboardPage() {
  const [districtEvents, setDistrictEvents] = useState<EventRecord[]>(FALLBACK_EVENTS);
  const [staffingMap, setStaffingMap] = useState<Record<string, StaffingRecord>>({});
  const [statusMessage, setStatusMessage] = useState("Loading events and staffing...");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedId, setSelectedId] = useState<string>(FALLBACK_EVENTS[0]?.eventId ?? "");
  const [search, setSearch] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("all");
  const [upcomingOnly, setUpcomingOnly] = useState(true);
  const [eventCount, setEventCount] = useState(FALLBACK_EVENTS.length);
  const [lists, setLists] = useState<OptionLists>(FALLBACK_LISTS);

  useEffect(() => {
    let active = true;

    const loadEvents = async () => {
      try {
        const res = await fetch(DISTRICT_EVENT_DATA_URL, { cache: "no-store" });
        if (res.ok) {
          const payload = await res.text();
          const parsed = parseDistrictEvents(payload);
          if (active && parsed.length) {
            setDistrictEvents(parsed);
            setEventCount(parsed.length);
          }
        }
      } catch {
        // Fall back to the built-in list below.
      }
    };

    const loadStaffing = async () => {
      try {
        const sheetUrl = buildGoogleSheetQueryUrl(CMAC_EVENT_STAFFING_SHEET_NAME, CMAC_SITE_DATA_SHEET_ID);
        const res = await fetch(sheetUrl, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          const merged = readStaffingDrafts();
          if (active) {
            setStaffingMap(merged);
            setStatusMessage(
              merged && Object.keys(merged).length
                ? `Loaded ${Object.keys(merged).length} locally saved staffing updates.`
                : "Using the fallback event list and local staffing data"
            );
          }
          return;
        }

        const raw = await res.text();
        const parsed = parseStaffingRows(raw);
        const merged = { ...parsed, ...readStaffingDrafts() };
        if (active) {
          setStaffingMap(merged);
          const draftCount = Object.keys(readStaffingDrafts()).length;
          setStatusMessage(
            draftCount > 0
              ? `Loaded ${Object.keys(merged).length} staffing records (${draftCount} local draft update${draftCount === 1 ? "" : "s"} included).`
              : `Loaded ${Object.keys(parsed).length} staffing records from ${CMAC_EVENT_STAFFING_SHEET_NAME}.`
          );
        }
      } catch {
        if (active) {
          setStatusMessage("Could not reach the staffing sheet right now. You can still edit the current event list locally.");
        }
      }
    };

    void loadEvents();
    void loadStaffing();

    // Dropdown options are board-editable in the CMAC_LISTS tab; a failure here
    // just leaves the built-in fallback options in place.
    void (async () => {
      try {
        const loaded = await fetchOptionLists();
        if (active) setLists(loaded);
      } catch {
        // Keep FALLBACK_LISTS.
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const mergedRows = useMemo<StaffingRecord[]>(() => {
    return districtEvents.map((event) => {
      const match = matchStaffingRecord(event, staffingMap);
      const edited = staffingMap[event.eventId];
      const source = edited ?? match;
      return {
        eventId: event.eventId,
        date: event.date,
        name: event.name,
        school: event.school,
        location: event.location || source?.location || "",
        time: event.time,
        setupTime: source?.setupTime ?? "",
        lead: source?.lead ?? "",
        boardMember: source?.boardMember ?? "",
        volunteerTeam: source?.volunteerTeam ?? "",
        checkInStaff: source?.checkInStaff ?? "",
        studentReps: source?.studentReps ?? "",
        cmacTable: source?.cmacTable ?? "",
        formStatus: source?.formStatus ?? "",
        // Pre-fill what CMAC normally sells at this kind of show so the board
        // only has to adjust exceptions.
        selling: source?.selling ?? defaultSellingForType(event.type).join(", "),
        notes: source?.notes ?? "",
      };
    });
  }, [districtEvents, staffingMap]);

  const schools = useMemo(
    () => Array.from(new Set(districtEvents.map((event) => event.school))).sort(),
    [districtEvents]
  );

  const visibleRows = useMemo(() => {
    const todayIso = new Date().toISOString().slice(0, 10);
    const term = search.trim().toLowerCase();

    return mergedRows.filter((row) => {
      if (upcomingOnly && row.date < todayIso) return false;
      if (schoolFilter !== "all" && row.school !== schoolFilter) return false;
      if (term && !`${row.name} ${row.school} ${row.location}`.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [mergedRows, search, schoolFilter, upcomingOnly]);

  // Keep a valid selection whenever the filters change the visible list.
  useEffect(() => {
    if (visibleRows.length === 0) return;
    if (!visibleRows.some((row) => row.eventId === selectedId)) {
      setSelectedId(visibleRows[0].eventId);
    }
  }, [visibleRows, selectedId]);

  const selectedRecord = useMemo(
    () =>
      mergedRows.find((row) => row.eventId === selectedId) ??
      visibleRows[0] ??
      mergedRows[0] ?? { ...BLANK_RECORD, eventId: "new-event" },
    [mergedRows, visibleRows, selectedId]
  );

  const staffedCount = useMemo(
    () =>
      mergedRows.filter(
        (row) => row.boardMember || row.volunteerTeam || row.checkInStaff || row.studentReps
      ).length,
    [mergedRows]
  );

  const updateField = (field: keyof StaffingRecord, value: string) => {
    setStaffingMap((current) => {
      const currentRecord = current[selectedRecord.eventId] ?? { ...selectedRecord };
      const updatedRecord = { ...currentRecord, [field]: value };
      return { ...current, [selectedRecord.eventId]: updatedRecord };
    });
  };

  const handleSave = async () => {
    const payload = {
      eventId: selectedRecord.eventId,
      date: selectedRecord.date,
      name: selectedRecord.name,
      school: selectedRecord.school,
      location: selectedRecord.location,
      time: selectedRecord.time,
      setupTime: selectedRecord.setupTime,
      lead: selectedRecord.lead,
      boardMember: selectedRecord.boardMember,
      volunteerTeam: selectedRecord.volunteerTeam,
      checkInStaff: selectedRecord.checkInStaff,
      studentReps: selectedRecord.studentReps,
      cmacTable: selectedRecord.cmacTable,
      formStatus: selectedRecord.formStatus,
      selling: selectedRecord.selling,
      notes: selectedRecord.notes,
      updatedAt: new Date().toISOString(),
    };

    setIsSaving(true);
    setStatusMessage(`Saving staffing for ${payload.name || "this event"}...`);
    setStaffingMap((current) => ({ ...current, [selectedRecord.eventId]: payload }));

    try {
      if (!CMAC_EVENT_STAFFING_WRITE_URL) {
        writeStaffingDraft(payload);
        setStatusMessage("Saved locally in this browser only. Add NEXT_PUBLIC_CMAC_EVENT_STAFFING_WRITE_URL to write back to Google Sheets.");
        return;
      }

      await postToSheet(CMAC_EVENT_STAFFING_WRITE_URL, {
        target: "staffing",
        record: payload,
      });

      clearStaffingDraft(payload.eventId);
      setStatusMessage(`Saved staffing for ${payload.name} to ${CMAC_EVENT_STAFFING_SHEET_NAME}.`);
    } catch (error) {
      writeStaffingDraft(payload);
      setStatusMessage(
        `Could not reach the sheet (${error instanceof Error ? error.message : "unknown error"}). The draft was saved locally in this browser.`
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="subpage staffing-page">
      <section className="subpage-hero">
        <p className="subpage-kicker">CMAC Staffing</p>
        <h1>Event Staffing Dashboard</h1>
        <p>
          Every district event is listed here. Pick a show, assign the staffing, and save it to the
          <strong> {CMAC_EVENT_STAFFING_SHEET_NAME}</strong> tab.
        </p>
        <div className="snapshot-pill-row">
          <span className="snapshot-pill">{eventCount} events loaded</span>
          <span className="snapshot-pill">{staffedCount} staffed</span>
          <span className="snapshot-pill">{visibleRows.length} showing</span>
        </div>
      </section>

      <section className="content-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ flex: 1 }} />
          <a href="/cmac/snapshot-c2m0a2c3/" className="board-tool" style={{ textDecoration: "none", minWidth: "fit-content" }}>
            <span className="board-tool-icon" aria-hidden="true">←</span>
            <span className="board-tool-text">
              <strong>Back to Snapshot</strong>
              <em>Board dashboard</em>
            </span>
          </a>
        </div>

        <div className="staffing-layout">
          <aside className="staffing-list-panel">
            <h2>Events</h2>

            <div className="staffing-filters">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search events…"
                aria-label="Search events"
              />
              <select
                value={schoolFilter}
                onChange={(event) => setSchoolFilter(event.target.value)}
                aria-label="Filter by school"
              >
                <option value="all">All schools</option>
                {schools.map((school) => (
                  <option key={school} value={school}>
                    {school}
                  </option>
                ))}
              </select>
              <label className="staffing-toggle">
                <input
                  type="checkbox"
                  checked={upcomingOnly}
                  onChange={(event) => setUpcomingOnly(event.target.checked)}
                />
                <span>Upcoming only</span>
              </label>
            </div>

            <div className="staffing-list">
              {visibleRows.length === 0 && <p className="muted-copy">No events match those filters.</p>}
              {visibleRows.map((row) => {
                const isStaffed = Boolean(
                  row.boardMember || row.volunteerTeam || row.checkInStaff || row.studentReps
                );
                const schoolBadgeClass = getSchoolBadgeClass(row.school);
                return (
                  <button
                    key={row.eventId}
                    type="button"
                    className={`staffing-list-item${selectedRecord.eventId === row.eventId ? " staffing-list-item--active" : ""}`}
                    onClick={() => setSelectedId(row.eventId)}
                  >
                    <span className="staffing-date">
                      {formatDisplayDate(row.date)}
                      {row.time && row.time !== "TBD" ? ` · ${row.time}` : ""}
                    </span>
                    <strong>{row.name || "Untitled event"}</strong>
                    <span className={schoolBadgeClass}>{row.school || "School TBD"}</span>
                    {isStaffed && <span className="inventory-chip inventory-chip--ok">Staffed</span>}
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="staffing-form-panel">
            <div className="staffing-form-header">
              <p className="subpage-kicker">Event staffing</p>
              <h2>{selectedRecord.name || "Event"}</h2>
            </div>

            <div className="staffing-form-grid">
              <label className="staffing-field">
                <span>Event ID</span>
                <input value={selectedRecord.eventId} readOnly />
              </label>

              <label className="staffing-field">
                <span>Date</span>
                <input type="date" value={selectedRecord.date} onChange={(event) => updateField("date", event.target.value)} />
              </label>

              <label className="staffing-field staffing-field--wide">
                <span>Event Name</span>
                <input value={selectedRecord.name} onChange={(event) => updateField("name", event.target.value)} />
              </label>

              <label className="staffing-field">
                <span>School</span>
                <input value={selectedRecord.school} onChange={(event) => updateField("school", event.target.value)} />
              </label>

              <label className="staffing-field">
                <span>Set-Up Time</span>
                <input
                  type="time"
                  value={selectedRecord.setupTime}
                  onChange={(event) => updateField("setupTime", event.target.value)}
                />
              </label>

              <SelectField
                label="Location"
                value={selectedRecord.location}
                options={lists.location}
                onChange={(value) => updateField("location", value)}
              />

              <SelectField
                label="Lead"
                value={selectedRecord.lead}
                options={lists.lead}
                onChange={(value) => updateField("lead", value)}
              />

              <SelectField
                label="Board Member"
                value={selectedRecord.boardMember}
                options={lists.boardMember}
                onChange={(value) => updateField("boardMember", value)}
              />

              <SelectField
                label="CMAC Table"
                value={selectedRecord.cmacTable}
                options={lists.cmacTable}
                onChange={(value) => updateField("cmacTable", value)}
              />

              <SelectField
                label="Form Status"
                value={selectedRecord.formStatus}
                options={lists.formStatus}
                onChange={(value) => updateField("formStatus", value)}
              />

              <MultiSelectField
                label="Volunteer Team"
                value={selectedRecord.volunteerTeam}
                options={lists.volunteer}
                onChange={(value) => updateField("volunteerTeam", value)}
                hint="Tap each volunteer working this event."
              />

              <MultiSelectField
                label="Check-In Staff"
                value={selectedRecord.checkInStaff}
                options={lists.checkInStaff}
                onChange={(value) => updateField("checkInStaff", value)}
              />

              <MultiSelectField
                label="Student Reps"
                value={selectedRecord.studentReps}
                options={lists.studentRep}
                onChange={(value) => updateField("studentReps", value)}
              />

              <MultiSelectField
                label="Selling At This Event"
                value={selectedRecord.selling}
                options={lists.selling}
                onChange={(value) => updateField("selling", value)}
                hint="Pre-filled from what CMAC usually sells at this kind of show."
              />

              <label className="staffing-field staffing-field--wide">
                <span>Notes</span>
                <textarea value={selectedRecord.notes} onChange={(event) => updateField("notes", event.target.value)} />
              </label>
            </div>

            <div className="staffing-actions">
              <button type="button" className="apply-btn" onClick={() => void handleSave()} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Staffing Row"}
              </button>
            </div>
            <p className={`staffing-status${isSaving ? " staffing-status--saving" : ""}`} aria-live="polite">
              {statusMessage}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
