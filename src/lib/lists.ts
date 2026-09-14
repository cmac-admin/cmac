import { buildGoogleSheetQueryUrl, CMAC_SITE_DATA_SHEET_ID } from "./site-data";

/**
 * Board-editable dropdown options.
 *
 * These live in a CMAC_LISTS tab laid out so a non-technical board member can
 * extend any dropdown without touching code: row 1 holds the list names and
 * each column below it holds that list's options.
 *
 *   Lead        | Board_Member | Student_Rep | CMAC_Table | Form_Status | Selling
 *   Jane Smith  | Jane Smith   | Ava R.      | Yes        | Open        | Flowers
 *   John Doe    | John Doe     | Liam T.     | No         | Closed      | Snacks
 *                                            | TBD        | TBD         | Bottled Water
 *
 * Add a name to the bottom of a column and it appears in the dropdown on the
 * next page load. Blank cells are skipped, so columns can be different lengths.
 */

export const CMAC_LISTS_SHEET_NAME =
  process.env.NEXT_PUBLIC_CMAC_LISTS_SHEET_NAME ?? "CMAC_LISTS";

export type ListName =
  | "lead"
  | "boardMember"
  | "volunteer"
  | "checkInStaff"
  | "studentRep"
  | "cmacTable"
  | "formStatus"
  | "selling"
  | "category"
  | "location";

export type OptionLists = Record<ListName, string[]>;

/**
 * Used when the sheet is unreachable or a column is missing, so the dropdowns
 * always have something usable.
 */
export const FALLBACK_LISTS: OptionLists = {
  lead: [],
  boardMember: [],
  volunteer: [],
  checkInStaff: [],
  studentRep: [],
  cmacTable: ["Yes", "No", "TBD"],
  formStatus: ["Open", "Closed", "TBD"],
  selling: [
    "Flowers",
    "Snacks",
    "Bottled Water",
    "Candy Bars",
    "Kisses for the Cast",
    "Personalized Drama Ornaments",
  ],
  category: ["Concert", "Drama", "Musical", "Art Show", "Showcase", "Performing Arts"],
  location: [
    "CHS Auditorium",
    "JFK Middle School",
    "Boyle Road Elementary",
    "Terryville Road Elementary",
    "Clinton Avenue Elementary",
    "Norwood Avenue Elementary",
  ],
};

/** Header text in the sheet -> the list it feeds. */
const HEADER_ALIASES: Record<string, ListName> = {
  lead: "lead",
  leads: "lead",
  eventlead: "lead",
  boardmember: "boardMember",
  boardmembers: "boardMember",
  board: "boardMember",
  volunteer: "volunteer",
  volunteers: "volunteer",
  volunteerteam: "volunteer",
  checkin: "checkInStaff",
  checkinstaff: "checkInStaff",
  studentrep: "studentRep",
  studentreps: "studentRep",
  studentrepresentative: "studentRep",
  cmactable: "cmacTable",
  table: "cmacTable",
  formstatus: "formStatus",
  form: "formStatus",
  selling: "selling",
  sellingitems: "selling",
  items: "selling",
  category: "category",
  categories: "category",
  type: "category",
  location: "location",
  locations: "location",
};

function normalizeHeader(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

type GvizCell = { v?: unknown; f?: string } | null;
type GvizRow = { c?: GvizCell[] };
type GvizTable = {
  cols?: { label?: string; id?: string }[];
  rows?: GvizRow[];
};

function cellText(cell: GvizCell): string {
  if (!cell) return "";
  const value = cell.v;
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return String(value).trim();
}

/**
 * Parses the gviz JSONP envelope Google returns for a public sheet.
 */
export function parseOptionLists(raw: string): OptionLists {
  const lists: OptionLists = {
    lead: [],
    boardMember: [],
    volunteer: [],
    checkInStaff: [],
    studentRep: [],
    cmacTable: [],
    formStatus: [],
    selling: [],
    category: [],
    location: [],
  };

  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) return withFallbacks(lists);

  let table: GvizTable;
  try {
    table = (JSON.parse(raw.slice(start, end + 1)) as { table?: GvizTable }).table ?? {};
  } catch {
    return withFallbacks(lists);
  }

  const cols = table.cols ?? [];
  const rows = table.rows ?? [];

  // Google sometimes reports the header as column labels and sometimes leaves
  // the labels blank and puts the header in the first data row. Handle both.
  let headers = cols.map((col) => (col?.label ?? "").trim());
  let dataRows = rows;

  if (headers.every((header) => header === "") && rows.length > 0) {
    headers = (rows[0]?.c ?? []).map((cell) => cellText(cell));
    dataRows = rows.slice(1);
  }

  headers.forEach((header, columnIndex) => {
    const listName = HEADER_ALIASES[normalizeHeader(header)];
    if (!listName) return;

    const seen = new Set<string>();
    for (const row of dataRows) {
      const value = cellText((row.c ?? [])[columnIndex] ?? null);
      if (!value) continue;
      const key = value.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      lists[listName].push(value);
    }
  });

  return withFallbacks(lists);
}

/** Any list the sheet didn't supply falls back to the built-in options. */
function withFallbacks(lists: OptionLists): OptionLists {
  (Object.keys(lists) as ListName[]).forEach((name) => {
    if (lists[name].length === 0) {
      lists[name] = [...FALLBACK_LISTS[name]];
    }
  });
  return lists;
}

export async function fetchOptionLists(): Promise<OptionLists> {
  const url = buildGoogleSheetQueryUrl(CMAC_LISTS_SHEET_NAME, CMAC_SITE_DATA_SHEET_ID);
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`CMAC_LISTS returned ${response.status}`);
  }

  return parseOptionLists(await response.text());
}

// ---------------------------------------------------------------------------
// What CMAC sells at which kind of show
// ---------------------------------------------------------------------------

/**
 * Defaults taken from how CMAC has historically run each event type. A board
 * member can override any single event from the staffing page; this only
 * supplies the starting selection.
 */
const SELLING_BY_CATEGORY: Record<string, string[]> = {
  concert: ["Flowers", "Snacks", "Bottled Water"],
  drama: ["Kisses for the Cast", "Flowers", "Personalized Drama Ornaments"],
  musical: ["Kisses for the Cast", "Flowers", "Personalized Drama Ornaments"],
  "performing arts": ["Kisses for the Cast", "Flowers", "Personalized Drama Ornaments"],
  "art show": [],
  showcase: [],
};

export function defaultSellingForType(type: string): string[] {
  const normalized = type.toLowerCase().trim();

  if (SELLING_BY_CATEGORY[normalized]) {
    return [...SELLING_BY_CATEGORY[normalized]];
  }

  if (normalized.includes("drama") || normalized.includes("musical")) {
    return [...SELLING_BY_CATEGORY.drama];
  }
  if (normalized.includes("performing")) {
    return [...SELLING_BY_CATEGORY["performing arts"]];
  }
  if (normalized.includes("art") || normalized.includes("showcase")) {
    return [];
  }
  if (normalized.includes("concert") || normalized.includes("recital") || normalized.includes("pops")) {
    return [...SELLING_BY_CATEGORY.concert];
  }

  return [];
}
