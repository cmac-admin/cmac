export type OrderSchool = {
  name: string;
  longTitle?: boolean;
  flowersUrl: string | null;
  ornamentsUrl: string | null;
};

export type FormLinkName =
  | "membership"
  | "senior-scholarship"
  | "summer-scholarship"
  | "teacher-grant"
  | "scholarship-grant-feedback"
  | "order-form";

export type FormLinkMap = Partial<Record<FormLinkName, string>>;

export const CMAC_SITE_DATA_SHEET_ID =
  process.env.NEXT_PUBLIC_CMAC_SITE_DATA_SHEET_ID ??
  "1GPw8ETp8-lrBQHoaGg5MshrCM2di96fxJzbnSnJHMiU";

export const CMAC_ORDER_SHEET_GID =
  process.env.NEXT_PUBLIC_CMAC_ORDER_SHEET_GID ?? "0";

export const CMAC_METRICS_SHEET_GID =
  process.env.NEXT_PUBLIC_CMAC_METRICS_SHEET_GID ?? "0";

export const CMAC_METRICS_SHEET_NAME =
  process.env.NEXT_PUBLIC_CMAC_METRICS_SHEET_NAME ?? "METRICS";

export const CMAC_EVENT_STAFFING_SHEET_NAME =
  process.env.NEXT_PUBLIC_CMAC_EVENT_STAFFING_SHEET_NAME ?? "CMAC_EVENT_STAFFING";

export const CMAC_EVENT_STAFFING_WRITE_URL =
  process.env.NEXT_PUBLIC_CMAC_EVENT_STAFFING_WRITE_URL ?? "";

export const CMAC_INVENTORY_SHEET_ID =
  process.env.NEXT_PUBLIC_CMAC_INVENTORY_SHEET_ID ?? "1taIg--51jB1fJ2a5S072F-0HWGpq3RHexVUE94yDCGo";

export const CMAC_INVENTORY_SHEET_NAME =
  process.env.NEXT_PUBLIC_CMAC_INVENTORY_SHEET_NAME ?? "CMAC_INVENTORY";

export const CMAC_INVENTORY_LOG_SHEET_NAME =
  process.env.NEXT_PUBLIC_CMAC_INVENTORY_LOG_SHEET_NAME ?? "CMAC_INVENTORY_LOG";

export const CMAC_INVENTORY_WRITE_URL =
  process.env.NEXT_PUBLIC_CMAC_INVENTORY_WRITE_URL ?? "";

export const CMAC_FORMS_SHEET_NAME =
  process.env.NEXT_PUBLIC_CMAC_FORMS_SHEET_NAME ?? "FORMS/LINKS";

export const DEFAULT_FORM_LINKS: FormLinkMap = {
  membership:
    "https://docs.google.com/forms/d/e/1FAIpQLSdwOWX-vnQRQ9KnEE8TAK9Z1022D5BVWH9BhKW6QJByvlAsVQ/viewform",
  "senior-scholarship":
    "https://docs.google.com/forms/d/e/1FAIpQLScLSr4Da2R51xg59lu_j57lMg5Xd8On3rHcEowwMgNAB9V1ng/viewform",
  "summer-scholarship":
    "https://docs.google.com/forms/d/e/1FAIpQLScir77ruuBlPuoi-X3sfDQvLOyjKDciKPPWahdHYigpSOvm_Q/viewform",
  "teacher-grant":
    "https://docs.google.com/document/d/1NEmmvCaJiTQ7hQDIYkMWc2D85RBUprq-Iq7pR4WUqkM/edit?tab=t.0",
  "scholarship-grant-feedback":
    "https://docs.google.com/forms/d/1_BzbL5t77ZvvjKDEjAaNElxbBsbH1u6Qqn5yEtM_PdY/edit",
  "order-form":
    "https://docs.google.com/forms/d/e/1FAIpQLScrd01PmvNBLsV4ZRqhlKSNRGCgykUOClM61xDVlFGhrXjKiA/viewform?embedded=true",
};

export const DEFAULT_ORDER_SCHOOLS: OrderSchool[] = [
  {
    name: "Boyle Road Elementary",
    flowersUrl:
      "https://docs.google.com/forms/d/1xqKn5CFlQZgz9zYslwFGNXFPtLAi2al5AMg7HhOhdGU",
    ornamentsUrl:
      "https://docs.google.com/forms/d/1S6hiq3XedpE0MTFhJ-_kJ7e9OarZ-OXNpdme_x7Hjh0",
  },
  {
    name: "Terryville Road Elementary",
    flowersUrl:
      "https://docs.google.com/forms/d/13hbjvcSC3SRRVlUGRtyJj-0SrrOM8hPZaoZ6ON5_IY0",
    ornamentsUrl:
      "https://docs.google.com/forms/d/1IeQC2bPE2to2BX9rShk9YN-3-YrhQ_hsRe9Uq8Hqtbo",
  },
  {
    name: "JFK Middle School",
    longTitle: true,
    flowersUrl:
      "https://docs.google.com/forms/d/1l1wG1x3L_vtdf3DDRrFdcLWVhRiVYNiBPiLio11opok",
    ornamentsUrl:
      "https://docs.google.com/forms/d/1q78yuUMlMcCBqat6y_q6dfCsAPvwnwd50y4lrIvLbTQ",
  },
  {
    name: "Comsewogue High School",
    flowersUrl:
      "https://docs.google.com/forms/d/1V_mBSL7HOEZ9Wd3Tc1v-fluX3dK2SxzyA9s1myKlAv8",
    ornamentsUrl:
      "https://docs.google.com/forms/d/1v2sQh0siQoEAAZSXmK7agR52GLR8I0CysX4GJcTtg0g",
  },
];

export function buildGoogleSheetCsvUrl(
  sheetId: string = CMAC_SITE_DATA_SHEET_ID,
  gid: string = CMAC_ORDER_SHEET_GID
) {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${encodeURIComponent(gid)}`;
}

export function buildGoogleSheetQueryUrl(
  sheetName: string = CMAC_FORMS_SHEET_NAME,
  sheetId: string = CMAC_SITE_DATA_SHEET_ID
) {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
}

export function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values.map((value) => value.replace(/^"|"$/g, ""));
}

const normalizeHeader = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

const coerceBoolean = (value: string | null | undefined) => {
  if (!value) {
    return false;
  }

  return ["1", "true", "yes", "y", "on"].includes(value.trim().toLowerCase());
};

const findCell = (row: string[], headers: string[], aliases: string[]) => {
  const index = headers.findIndex((header) => aliases.includes(header));
  if (index === -1) {
    return "";
  }

  return row[index] ?? "";
};

export function parseOrderSchoolsCsv(csv: string): OrderSchool[] {
  const rows = csv
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter(Boolean)
    .map(parseCsvLine);

  if (rows.length < 2) {
    return DEFAULT_ORDER_SCHOOLS;
  }

  const headers = rows[0].map(normalizeHeader);
  const parsedSchools = rows.slice(1).flatMap((row) => {
    const name =
      findCell(row, headers, ["name", "school_name", "school", "school_name_text"]) ||
      findCell(row, headers, ["title", "label"]);

    if (!name) {
      return [];
    }

    const flowersUrl =
      findCell(row, headers, [
        "flowers_url",
        "concert_flowers_url",
        "flower_form_url",
        "flowers_form_url",
        "flower_url",
      ]);

    const ornamentsUrl =
      findCell(row, headers, [
        "ornaments_url",
        "drama_ornaments_url",
        "ornament_form_url",
        "ornaments_form_url",
        "ornament_url",
      ]);

    const longTitleCell = findCell(row, headers, [
      "long_title",
      "use_long_title",
      "title_wrap",
      "long",
    ]);

    return [
      {
        name,
        longTitle: coerceBoolean(longTitleCell),
        flowersUrl: flowersUrl || null,
        ornamentsUrl: ornamentsUrl || null,
      },
    ];
  });

  return parsedSchools.length > 0 ? parsedSchools : DEFAULT_ORDER_SCHOOLS;
}

export async function fetchOrderSchools(): Promise<OrderSchool[]> {
  try {
    const response = await fetch(buildGoogleSheetCsvUrl(CMAC_SITE_DATA_SHEET_ID, CMAC_ORDER_SHEET_GID), {
      cache: "no-store",
      headers: {
        Accept: "text/csv",
      },
    });

    if (!response.ok) {
      return DEFAULT_ORDER_SCHOOLS;
    }

    const csv = await response.text();
    return parseOrderSchoolsCsv(csv);
  } catch {
    return DEFAULT_ORDER_SCHOOLS;
  }
}

const normalizeFormKey = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function parseFormLinks(raw: string): FormLinkMap {
  const trimmed = raw.trim();
  const payload = trimmed.startsWith("/*O_o*/")
    ? trimmed.replace(/^\/\*O_o\*\/\s*google\.visualization\.Query\.setResponse\(/, "").replace(/\);?\s*$/, "")
    : trimmed;

  try {
    const parsed = JSON.parse(payload) as {
      table?: {
        rows?: Array<{
          c?: Array<{ v?: string | number | null } | null>;
        }>;
      };
    };

    const result: FormLinkMap = {};

    for (const row of parsed.table?.rows ?? []) {
      const cells = row.c ?? [];
      const name = String(cells[0]?.v ?? "").trim();
      const url = String(cells[2]?.v ?? "").trim();

      if (!name || !url) {
        continue;
      }

      const normalized = normalizeFormKey(name);
      if (normalized) {
        result[normalized as FormLinkName] = url;
      }
    }

    return result;
  } catch {
    return {};
  }
}

const formAliases: Record<FormLinkName, string[]> = {
  membership: ["membership", "cmac-membership-form", "join-cmac", "become-a-member"],
  "senior-scholarship": [
    "senior-scholarship",
    "cmac-senior-scholarship-app",
    "cmac-senior-scholarship",
  ],
  "summer-scholarship": [
    "summer-scholarship",
    "cmac-3-11-scholarship-app",
    "cmac-3-11-scholarship",
    "summer-music-and-arts-study-scholarship",
  ],
  "teacher-grant": ["teacher-grant", "teacher-grant-application"],
  "scholarship-grant-feedback": [
    "scholarship-grant-feedback",
    "scholarship-feedback",
    "grant-feedback",
    "cmac-scholarship-grant-feedback",
  ],
  "order-form": ["order-form", "cmac-order-form"],
};

export async function fetchFormLinks(): Promise<FormLinkMap> {
  try {
    const response = await fetch(buildGoogleSheetQueryUrl(CMAC_FORMS_SHEET_NAME, CMAC_SITE_DATA_SHEET_ID), {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return DEFAULT_FORM_LINKS;
    }

    const raw = await response.text();
    const parsed = parseFormLinks(raw);

    return {
      ...DEFAULT_FORM_LINKS,
      ...parsed,
    };
  } catch {
    return DEFAULT_FORM_LINKS;
  }
}

export async function resolveFormLink(
  key: FormLinkName | string,
  fallback = DEFAULT_FORM_LINKS
): Promise<string> {
  const links = await fetchFormLinks();
  const target = normalizeFormKey(key);

  if (target in links) {
    return links[target as FormLinkName] ?? fallback[target as FormLinkName] ?? "";
  }

  for (const [name, aliases] of Object.entries(formAliases)) {
    const normalizedName = normalizeFormKey(name);
    if (normalizedName === target) {
      return links[name as FormLinkName] ?? fallback[name as FormLinkName] ?? "";
    }

    if (aliases.includes(target)) {
      return links[name as FormLinkName] ?? fallback[name as FormLinkName] ?? "";
    }
  }

  return fallback[target as FormLinkName] ?? "";
}
