"use client";

import { useEffect, useMemo, useState } from "react";

type EventEntry = {
  isoDate: string;
  time: string;
  name: string;
  school: string;
  schoolShort: string;
  location: string;
  type: string;
  cmacTable: "Yes" | "No" | "TBD";
  formStatus: "Open" | "Closed" | "TBD";
  notes?: string;
};

type OrderRow = {
  school: string;
  item: string;
  quantity: number;
};

const ORDER_FEED_URL = "PASTE_GOOGLE_APPS_SCRIPT_URL_HERE";
const DISTRICT_CALENDAR_URL = "https://www.comsewogue.k12.ny.us/sndreq/generateCalendarICS.php?calendar_id=135057";
const EVENT_DATA_PATH = "/cmac/snapshot-c2m0a2c3/events-data.json";

const FALLBACK_EVENTS: EventEntry[] = [
  { isoDate: "2025-06-25", time: "TBD", name: "Last Day of School", school: "Comsewogue High School", schoolShort: "CHS", location: "All Schools", type: "District", cmacTable: "No", formStatus: "TBD", notes: "Test past event" },
  { isoDate: "2026-11-13", time: "7:00 PM", name: "NYSCAME All-County Concert", school: "Comsewogue High School", schoolShort: "CHS", location: "CHS Auditorium", type: "Concert", cmacTable: "No", formStatus: "TBD", notes: "All-county event" },
  { isoDate: "2026-11-24", time: "TBD", name: "JFK Fall Fine Art Showcase", school: "John F. Kennedy Middle School", schoolShort: "JFK", location: "JFK Middle School", type: "Art Show", cmacTable: "TBD", formStatus: "TBD", notes: "Confirm time" },
  { isoDate: "2026-12-09", time: "6:30 PM", name: "Boyle Winter Concert", school: "Boyle Road Elementary", schoolShort: "Boyle", location: "JFK Middle School", type: "Concert", cmacTable: "Yes", formStatus: "Open" },
  { isoDate: "2026-12-14", time: "7:00 PM", name: "JFK Winter Concert, Group 1", school: "John F. Kennedy Middle School", schoolShort: "JFK", location: "CHS Auditorium", type: "Concert", cmacTable: "Yes", formStatus: "Open" },
  { isoDate: "2026-12-15", time: "6:30 PM", name: "Terryville Winter Concert", school: "Terryville Road Elementary", schoolShort: "Terryville", location: "CHS Auditorium", type: "Concert", cmacTable: "Yes", formStatus: "Open" },
  { isoDate: "2026-12-16", time: "7:00 PM", name: "CHS Winter & Chamber Concert", school: "Comsewogue High School", schoolShort: "CHS", location: "CHS Auditorium", type: "Concert", cmacTable: "Yes", formStatus: "Open" },
  { isoDate: "2026-12-17", time: "7:00 PM", name: "JFK Winter Concert, Group 2", school: "John F. Kennedy Middle School", schoolShort: "JFK", location: "CHS Auditorium", type: "Concert", cmacTable: "Yes", formStatus: "Open" },
  { isoDate: "2027-02-26", time: "7:00 PM", name: "CHS Musical: TBA", school: "Comsewogue High School", schoolShort: "CHS", location: "CHS Auditorium", type: "Musical", cmacTable: "Yes", formStatus: "Open", notes: "Night 1" },
  { isoDate: "2027-02-27", time: "7:00 PM", name: "CHS Musical: TBA", school: "Comsewogue High School", schoolShort: "CHS", location: "CHS Auditorium", type: "Musical", cmacTable: "Yes", formStatus: "Open", notes: "Night 2" },
  { isoDate: "2027-03-03", time: "4:30 PM", name: "JFK Drama – Senior Citizen's Dinner & Show", school: "John F. Kennedy Middle School", schoolShort: "JFK", location: "JFK Middle School", type: "Drama", cmacTable: "No", formStatus: "TBD", notes: "Dinner show" },
  { isoDate: "2027-03-04", time: "6:00 PM", name: "JFK Drama Production", school: "John F. Kennedy Middle School", schoolShort: "JFK", location: "JFK Middle School", type: "Drama", cmacTable: "Yes", formStatus: "Open", notes: "Night 1" },
  { isoDate: "2027-03-05", time: "6:30 PM", name: "Clinton Talent Show", school: "Clinton Avenue Elementary", schoolShort: "Clinton", location: "Clinton Avenue Elementary", type: "Performing Arts", cmacTable: "TBD", formStatus: "TBD", notes: "Confirm location" },
  { isoDate: "2027-03-05", time: "7:00 PM", name: "JFK Drama Production", school: "John F. Kennedy Middle School", schoolShort: "JFK", location: "JFK Middle School", type: "Drama", cmacTable: "Yes", formStatus: "Open", notes: "Night 2" },
  { isoDate: "2027-03-06", time: "7:00 PM", name: "JFK Drama Production", school: "John F. Kennedy Middle School", schoolShort: "JFK", location: "JFK Middle School", type: "Drama", cmacTable: "Yes", formStatus: "Open", notes: "Night 3" },
  { isoDate: "2027-03-17", time: "6:00 PM", name: "Terryville Art Show & Evening Book Fair", school: "Terryville Road Elementary", schoolShort: "Terryville", location: "Terryville Road Elementary", type: "Art Show", cmacTable: "TBD", formStatus: "TBD" },
  { isoDate: "2027-03-18", time: "6:30 PM", name: "Boyle Drama Production", school: "Boyle Road Elementary", schoolShort: "Boyle", location: "Boyle Road Elementary", type: "Drama", cmacTable: "Yes", formStatus: "Open", notes: "Night 1" },
  { isoDate: "2027-03-19", time: "6:30 PM", name: "Boyle Drama Production", school: "Boyle Road Elementary", schoolShort: "Boyle", location: "Boyle Road Elementary", type: "Drama", cmacTable: "Yes", formStatus: "Open", notes: "Night 2" },
  { isoDate: "2027-04-06", time: "7:00 PM", name: "CHS Spring Concert", school: "Comsewogue High School", schoolShort: "CHS", location: "CHS Auditorium", type: "Concert", cmacTable: "Yes", formStatus: "Open" },
  { isoDate: "2027-04-07", time: "6:00 PM", name: "Norwood Art Show & Evening Book Fair", school: "Norwood Avenue Elementary", schoolShort: "Norwood", location: "Norwood Avenue Elementary", type: "Art Show", cmacTable: "TBD", formStatus: "TBD" },
  { isoDate: "2027-04-09", time: "7:00 PM", name: "Boyle PTA Talent Show", school: "Boyle Road Elementary", schoolShort: "Boyle", location: "Boyle Road Elementary", type: "Performing Arts", cmacTable: "TBD", formStatus: "TBD", notes: "Confirm CMAC presence" },
  { isoDate: "2027-04-13", time: "5:00 PM", name: "JFK Interactive Spring Art Show", school: "John F. Kennedy Middle School", schoolShort: "JFK", location: "JFK Middle School", type: "Art Show", cmacTable: "TBD", formStatus: "TBD" },
  { isoDate: "2027-04-28", time: "5:30 PM", name: "Boyle Art Show & Book Fair", school: "Boyle Road Elementary", schoolShort: "Boyle", location: "Boyle Road Elementary", type: "Art Show", cmacTable: "TBD", formStatus: "TBD", notes: "Part of PTA Basket Auction & Bingo Night" },
  { isoDate: "2027-04-29", time: "6:00 PM", name: "CHS Performing Arts Show", school: "Comsewogue High School", schoolShort: "CHS", location: "CHS Auditorium", type: "Performing Arts", cmacTable: "Yes", formStatus: "Open", notes: "Night 1" },
  { isoDate: "2027-04-30", time: "6:00 PM", name: "Norwood Talent Show", school: "Norwood Avenue Elementary", schoolShort: "Norwood", location: "Norwood Avenue Elementary", type: "Performing Arts", cmacTable: "TBD", formStatus: "TBD", notes: "Confirm CMAC presence" },
  { isoDate: "2027-05-06", time: "7:00 PM", name: "Terryville Drama Performance", school: "Terryville Road Elementary", schoolShort: "Terryville", location: "Terryville Road Elementary", type: "Drama", cmacTable: "Yes", formStatus: "Open", notes: "Night 1" },
  { isoDate: "2027-05-07", time: "7:00 PM", name: "Terryville Drama Performance", school: "Terryville Road Elementary", schoolShort: "Terryville", location: "Terryville Road Elementary", type: "Drama", cmacTable: "Yes", formStatus: "Open", notes: "Night 2" },
  { isoDate: "2027-05-13", time: "6:00 PM", name: "Clinton Art Show", school: "Clinton Avenue Elementary", schoolShort: "Clinton", location: "Clinton Avenue Elementary", type: "Art Show", cmacTable: "TBD", formStatus: "TBD", notes: "Confirm CMAC presence" },
  { isoDate: "2027-05-14", time: "5:00 PM", name: "Clinton Spring Fling", school: "Clinton Avenue Elementary", schoolShort: "Clinton", location: "Clinton Avenue Elementary", type: "Performing Arts", cmacTable: "TBD", formStatus: "TBD", notes: "Confirm CMAC presence" },
  { isoDate: "2027-05-18", time: "All Day", name: "CHS Art Show", school: "Comsewogue High School", schoolShort: "CHS", location: "CHS", type: "Art Show", cmacTable: "TBD", formStatus: "TBD", notes: "Multi-day — confirm dates" },
  { isoDate: "2027-05-18", time: "6:00 PM", name: "Terryville 4th Grade Spring Concert", school: "Terryville Road Elementary", schoolShort: "Terryville", location: "CHS Auditorium", type: "Concert", cmacTable: "Yes", formStatus: "Open" },
  { isoDate: "2027-05-18", time: "7:30 PM", name: "Terryville 5th Grade Spring Concert", school: "Terryville Road Elementary", schoolShort: "Terryville", location: "CHS Auditorium", type: "Concert", cmacTable: "Yes", formStatus: "Open" },
  { isoDate: "2027-05-19", time: "6:30 PM", name: "Boyle Spring Concert", school: "Boyle Road Elementary", schoolShort: "Boyle", location: "JFK Middle School", type: "Concert", cmacTable: "Yes", formStatus: "Open" },
  { isoDate: "2027-05-20", time: "7:00 PM", name: "CHS Performing Arts Show", school: "Comsewogue High School", schoolShort: "CHS", location: "CHS Auditorium", type: "Performing Arts", cmacTable: "Yes", formStatus: "Open", notes: "Night 2" },
  { isoDate: "2027-05-24", time: "7:00 PM", name: "JFK Spring Concert, Group 1", school: "John F. Kennedy Middle School", schoolShort: "JFK", location: "CHS Auditorium", type: "Concert", cmacTable: "Yes", formStatus: "Open" },
  { isoDate: "2027-05-26", time: "7:00 PM", name: "JFK Spring Concert, Group 2", school: "John F. Kennedy Middle School", schoolShort: "JFK", location: "CHS Auditorium", type: "Concert", cmacTable: "Yes", formStatus: "Open" },
  { isoDate: "2027-06-03", time: "TBD", name: "Norwood 2nd Grade Ukulele Concert", school: "Norwood Avenue Elementary", schoolShort: "Norwood", location: "Norwood Avenue Elementary", type: "Concert", cmacTable: "TBD", formStatus: "TBD", notes: "Confirm time — Night 1" },
  { isoDate: "2027-06-03", time: "6:30 PM", name: "JFK Ensembles Concert", school: "John F. Kennedy Middle School", schoolShort: "JFK", location: "JFK Middle School", type: "Concert", cmacTable: "TBD", formStatus: "TBD" },
  { isoDate: "2027-06-04", time: "TBD", name: "Norwood 2nd Grade Ukulele Concert", school: "Norwood Avenue Elementary", schoolShort: "Norwood", location: "Norwood Avenue Elementary", type: "Concert", cmacTable: "TBD", formStatus: "TBD", notes: "Confirm time — Night 2" },
  { isoDate: "2027-06-08", time: "7:00 PM", name: "CHS Pops & Chamber Concert", school: "Comsewogue High School", schoolShort: "CHS", location: "CHS Auditorium", type: "Concert", cmacTable: "Yes", formStatus: "Open" },
];

function toSchoolShort(school: string): string {
  if (school.includes("Boyle")) return "Boyle";
  if (school.includes("Terryville")) return "Terryville";
  if (school.includes("Kennedy")) return "JFK";
  if (school.includes("Comsewogue High")) return "CHS";
  if (school.includes("Clinton")) return "Clinton";
  if (school.includes("Norwood")) return "Norwood";
  return school.slice(0, 3).toUpperCase();
}

function eventTypeFromTitle(title: string): string {
  const value = title.toLowerCase();
  if (value.includes("drama") || value.includes("musical")) return "Drama";
  if (value.includes("art")) return "Art Show";
  if (value.includes("concert") || value.includes("pops") || value.includes("recital")) return "Concert";
  if (value.includes("show") || value.includes("showcase")) return "Performing Arts";
  return "Event";
}

function parseIcsDate(value: string): { isoDate: string; time: string } {
  const match = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(?:\d{2})?Z?)?$/);
  if (!match) return { isoDate: "", time: "TBD" };
  const [, year, month, day, hour, minute] = match;
  const isoDate = `${year}-${month}-${day}`;
  if (!hour || !minute) return { isoDate, time: "TBD" };
  const h = Number(hour);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return { isoDate, time: `${hour12}:${minute} ${suffix}` };
}

function normalizeLookupToken(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

/**
 * The district calendar only supplies name/date/time/location. Everything CMAC
 * curates — whether we run a table and the notes — lives
 * in FALLBACK_EVENTS. Without this merge
 * a district refresh silently wipes all of that back to "TBD".
 */
const CURATED_BY_NAME_DATE = new Map<string, EventEntry>();
const CURATED_BY_NAME = new Map<string, EventEntry>();

for (const curated of FALLBACK_EVENTS) {
  CURATED_BY_NAME_DATE.set(
    normalizeLookupToken(`${curated.name}|${curated.isoDate}`),
    curated,
  );
  const nameKey = normalizeLookupToken(curated.name);
  // Repeated titles (multi-night runs) keep the first entry as the template.
  if (!CURATED_BY_NAME.has(nameKey)) {
    CURATED_BY_NAME.set(nameKey, curated);
  }
}

function findCurated(name: string, isoDate: string): EventEntry | null {
  return (
    CURATED_BY_NAME_DATE.get(normalizeLookupToken(`${name}|${isoDate}`)) ??
    CURATED_BY_NAME.get(normalizeLookupToken(name)) ??
    null
  );
}

/** District values win for date/time/location; curated values win for CMAC fields. */
function mergeCurated(live: EventEntry): EventEntry {
  const curated = findCurated(live.name, live.isoDate);
  if (!curated) {
    return {
      ...live,

    };
  }

  return {
    ...live,
    location: live.location && live.location !== "TBD" ? live.location : curated.location,
    time: live.time && live.time !== "TBD" ? live.time : curated.time,
    type: curated.type || live.type,
    cmacTable: curated.cmacTable,
    formStatus: live.formStatus !== "TBD" ? live.formStatus : curated.formStatus,
    notes: curated.notes || live.notes,
  };
}

/**
 * Merges the district feed with the curated list, keeping curated-only events
 * (for example anything the district publishes under a title CMAC renamed).
 */
function mergeWithCurated(live: EventEntry[]): EventEntry[] {
  const merged = live.map(mergeCurated);
  const seen = new Set(merged.map((ev) => normalizeLookupToken(`${ev.name}|${ev.isoDate}`)));

  for (const curated of FALLBACK_EVENTS) {
    const key = normalizeLookupToken(`${curated.name}|${curated.isoDate}`);
    if (!seen.has(key)) {
      merged.push({
        ...curated,
      });
      seen.add(key);
    }
  }

  return merged.sort((a, b) => a.isoDate.localeCompare(b.isoDate) || a.time.localeCompare(b.time));
}

function normalizeStoredEvents(data: unknown): EventEntry[] {
  if (!Array.isArray(data)) return [];
  const entries: EventEntry[] = [];

  for (const schoolBucket of data) {
    if (!schoolBucket || typeof schoolBucket !== "object") continue;
    const school = text((schoolBucket as Record<string, unknown>).school);
    const events = Array.isArray((schoolBucket as Record<string, unknown>).events)
      ? ((schoolBucket as Record<string, unknown>).events as unknown[])
      : [];

    for (const event of events) {
      if (!event || typeof event !== "object") continue;
      const row = event as Record<string, unknown>;
      const name = text(row.name);
      const dateText = text(row.date);
      const location = text(row.location);
      const isoDate = dateText ? (() => {
        const parsed = new Date(dateText);
        return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
      })() : "";

      if (!name || !isoDate || !school) continue;

      entries.push({
        isoDate,
        time: text(row.time) || "TBD",
        name,
        school,
        schoolShort: toSchoolShort(school),
        location: location || "TBD",
        type: eventTypeFromTitle(name),
        cmacTable: text(row.cmacTable) === "No" ? "No" : text(row.cmacTable) === "Yes" ? "Yes" : "TBD",
        formStatus: text(row.formStatus) === "Open" ? "Open" : text(row.formStatus) === "Closed" ? "Closed" : "TBD",
        notes: typeof row.notes === "string" ? row.notes : "",
      });
    }
  }

  return entries.sort((a, b) => a.isoDate.localeCompare(b.isoDate));
}

/**
 * CMAC only staffs music, drama and art events. Word boundaries keep a bare
 * "art" from matching "Start with Hello Week" or "Quarter Ends".
 * Mirrors ARTS_KEYWORDS in scripts/fetch-district-events.mjs.
 */
const ARTS_KEYWORDS = [
  /\bconcerts?\b/,
  /\barts?\b/,
  /\bshowcase\b/,
  /\bmusicals?\b/,
  /\bdramas?\b/,
  /\bperforming arts\b/,
  /\btalent show\b/,
  /\brecitals?\b/,
  /\bchorus\b/,
  /\bband\b/,
  /\borchestra\b/,
];

function isArtsEvent(title: string): boolean {
  const value = title.toLowerCase();
  return ARTS_KEYWORDS.some((pattern) => pattern.test(value));
}

function parseIcsEvents(ics: string): EventEntry[] {
  const entries: EventEntry[] = [];
  const blocks = ics.split("BEGIN:VEVENT");

  for (const block of blocks.slice(1)) {
    const titleMatch = block.match(/SUMMARY:(.+)/);
    const dateMatch = block.match(/DTSTART(?:;[A-Z0-9=:-]+)?:([A-Z0-9]+(?:T[0-9]+[0-9]+)?)\r?\n?/i);
    const locationMatch = block.match(/LOCATION:(.+)/);
    if (!titleMatch || !dateMatch) continue;

    const title = titleMatch[1].replace(/\\,/g, ",").trim();
    if (!isArtsEvent(title)) continue;

    const value = dateMatch[1].trim();
    const { isoDate, time } = parseIcsDate(value);
    const school = (() => {
      const text = title.toLowerCase();
      if (/\bboyle\b/.test(text)) return "Boyle Road Elementary";
      if (/\bterryville\b/.test(text)) return "Terryville Road Elementary";
      if (/\b(jfk|john f?\.? kennedy|kennedy)\b/.test(text)) return "John F. Kennedy Middle School";
      if (/\bchs\b|\bcomsewogue high\b|\bnyscame\b|\ball-?county\b|\bhigh school\b/.test(text)) return "Comsewogue High School";
      if (/\bclinton\b/.test(text)) return "Clinton Avenue Elementary";
      if (/\bnorwood\b/.test(text)) return "Norwood Avenue Elementary";
      if (/\belementary\b/.test(text) || /\bschool\b/.test(text)) return "District-wide";
      return "";
    })();

    if (!school) continue;

    entries.push({
      isoDate,
      time,
      name: title,
      school,
      schoolShort: toSchoolShort(school),
      location: locationMatch ? locationMatch[1].trim() : "TBD",
      type: eventTypeFromTitle(title),
      cmacTable: "TBD",
      formStatus: "TBD",
      notes: "",
    });
  }

  return entries.sort((a, b) => a.isoDate.localeCompare(b.isoDate));
}

const SCHOOL_COLORS: Record<string, string> = {
  CHS:       "school-badge--chs",
  JFK:       "school-badge--jfk",
  Boyle:     "school-badge--boyle",
  Terryville:"school-badge--terry",
  Clinton:   "school-badge--clinton",
  Norwood:   "school-badge--norwood",
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return {
    label: `${DAYS[dt.getDay()]} ${MONTHS[m - 1]} ${d}`,
    monthKey: `${MONTHS[m - 1]} ${y}`,
  };
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}
function numberValue(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") { const p = Number(value); return Number.isFinite(p) ? p : 1; }
  return 1;
}
function pick(row: Record<string, unknown>, keys: string[]): unknown {
  for (const key of keys) { if (key in row) return row[key]; }
  return "";
}
function normalizeOrder(row: Record<string, unknown>): OrderRow | null {
  const school   = text(pick(row, ["school","School","schoolName","School Name","campus"]));
  const item     = text(pick(row, ["item","Item","product","Product","orderType"]));
  const quantity = Math.max(1, numberValue(pick(row, ["quantity","Quantity","qty","Qty"])));
  if (!school || !item) return null;
  return { school, item, quantity };
}

function eventCategory(type: string): "ARTS" | "DRAMA" | "MUSIC" {
  const normalized = type.toLowerCase();
  if (normalized.includes("drama") || normalized.includes("musical")) {
    return "DRAMA";
  }
  if (normalized.includes("art")) {
    return "ARTS";
  }
  return "MUSIC";
}

function EventMonthBlock({ month, events, today, past = false }: {
  month: string;
  events: EventEntry[];
  today: Date;
  past?: boolean;
}) {
  return (
    <div className={`cal-month-block${past ? " cal-month-block--past" : ""}`}>
      <h3 className="cal-month-heading">{month}</h3>
      <div className="cal-table-wrap">
        <table className="cal-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Event</th>
              <th>Category</th>
              <th>School</th>
              <th>Location</th>
              <th>CMAC Table</th>
              <th>Form</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev, i) => {
              const { label } = formatDate(ev.isoDate);
              const isPast = new Date(ev.isoDate) < today;
              return (
                <tr key={i} className={isPast ? "cal-row cal-row--past" : "cal-row"}>
                  <td className="cal-date">{label}</td>
                  <td className="cal-time">{ev.time}</td>
                  <td className="cal-name"><strong>{ev.name}</strong></td>
                  <td>
                    <span
                      className={`category-badge category-badge--${eventCategory(ev.type).toLowerCase()}`}
                    >
                      {eventCategory(ev.type)}
                    </span>
                  </td>
                  <td>
                    <span className={`school-badge ${SCHOOL_COLORS[ev.schoolShort] ?? ""}`}>
                      {ev.schoolShort}
                    </span>
                  </td>
                  <td className="cal-location">{ev.location}</td>
                  <td>
                    <span className={
                      ev.cmacTable === "Yes" ? "snapshot-status snapshot-status--open" :
                      ev.cmacTable === "No"  ? "snapshot-status snapshot-status--closed" :
                      "snapshot-status snapshot-status--tbd"
                    }>{ev.cmacTable}</span>
                  </td>
                  <td>
                    <span className={
                      ev.formStatus === "Open"   ? "snapshot-status snapshot-status--open" :
                      ev.formStatus === "Closed" ? "snapshot-status snapshot-status--closed" :
                      "snapshot-status snapshot-status--tbd"
                    }>{ev.formStatus}</span>
                  </td>
                  <td className="cal-notes">{ev.notes || ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SnapshotPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [events, setEvents] = useState<EventEntry[]>(FALLBACK_EVENTS);
  const [feedState, setFeedState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [eventSource, setEventSource] = useState<"district-live" | "site-json" | "fallback">("fallback");
  const feedConfigured = ORDER_FEED_URL.startsWith("https://");

  useEffect(() => {
    let active = true;

    const loadDistrictEvents = async () => {
      try {
        const districtRes = await fetch(DISTRICT_CALENDAR_URL, { cache: "no-store" });
        if (districtRes.ok) {
          const ics = await districtRes.text();
          const parsed = parseIcsEvents(ics);
          if (parsed.length && active) {
            setEvents(mergeWithCurated(parsed));
            setEventSource("district-live");
            return;
          }
        }
      } catch {
        // Fall back to the generated snapshot JSON below.
      }

      try {
        const jsonRes = await fetch(EVENT_DATA_PATH, { cache: "no-store" });
        if (jsonRes.ok) {
          const json = await jsonRes.json();
          const parsed = normalizeStoredEvents(json);
          if (parsed.length && active) {
            setEvents(mergeWithCurated(parsed));
            setEventSource("site-json");
            return;
          }
        }
      } catch {
        // Fall back to the static dataset.
      }

      if (active) {
        setEvents(FALLBACK_EVENTS);
        setEventSource("fallback");
      }
    };

    loadDistrictEvents();
    const interval = window.setInterval(loadDistrictEvents, 300000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!feedConfigured) return;
    let active = true;
    setFeedState("loading");
    const load = async () => {
      try {
        const res = await fetch(ORDER_FEED_URL, { cache: "no-store" });
        if (!res.ok) throw new Error("bad response");
        const raw = await res.json();
        const rows = Array.isArray(raw) ? raw : Array.isArray((raw as {orders?:unknown[]}).orders) ? (raw as {orders:unknown[]}).orders : [];
        const normalized = rows.map(e => normalizeOrder((e ?? {}) as Record<string,unknown>)).filter((e): e is OrderRow => e !== null);
        if (active) { setOrders(normalized); setFeedState("ready"); }
      } catch { if (active) setFeedState("error"); }
    };
    load();
    const interval = window.setInterval(load, 30000);
    return () => { active = false; window.clearInterval(interval); };
  }, [feedConfigured]);

  const totalOrders = orders.length;
  const totalItems  = orders.reduce((s, r) => s + r.quantity, 0);

  const { upcomingGrouped, pastGrouped } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcoming = new Map<string, EventEntry[]>();
    const past = new Map<string, EventEntry[]>();
    for (const ev of events) {
      const { monthKey } = formatDate(ev.isoDate);
      const isPast = new Date(ev.isoDate) < today;
      const map = isPast ? past : upcoming;
      if (!map.has(monthKey)) map.set(monthKey, []);
      map.get(monthKey)!.push(ev);
    }
    return { upcomingGrouped: upcoming, pastGrouped: past };
  }, [events]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextEvent = events.find(e => new Date(e.isoDate) >= today);

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">Board Dashboard · 2026–2027 School Year</p>
        <h1>Event Calendar Snapshot</h1>
        <p>
          All district arts performances and events CMAC supports, in chronological order.
          This snapshot refreshes from the district calendar and falls back to the stored snapshot if needed.
        </p>
      </section>

      <section className="content-card draft-page-panel">
        <div className="draft-page-panel__header">
          <p className="subpage-kicker">Website in progress</p>
          <h2>Pages under construction</h2>
        </div>
        <p className="muted-copy">
          These pages are intentionally kept off the live navigation while they are still in draft form.
        </p>
        <div className="draft-page-list" aria-label="Internal draft pages">
          {[
            { href: "/cmac/impact-coming-soon", label: "Impact Coming Soon", description: "Placeholder for the future impact page" },
            { href: "/cmac/order-here", label: "Order Here", description: "School event order portal" },
            { href: "/cmac/order-form", label: "Order Form", description: "Checkout and form embed" },
            { href: "/cmac/our-impact", label: "Our Impact", description: "Internal impact archive" },
            { href: "/cmac/QR_WhatIsCMAC", label: "QR / What Is CMAC", description: "QR-linked informational page" },
            { href: "/cmac/snapshot-c2m0a2c3", label: "Snapshot Dashboard", description: "Main board snapshot landing page" },
          ].map((page) => (
            <a key={page.href} className="draft-page-item" href={page.href} target="_blank" rel="noopener noreferrer">
              <span className="draft-page-item__label">{page.label}</span>
              <span className="draft-page-item__meta">{page.description}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="content-card snapshot-summary-bar">
        <div className="snapshot-pill-row">
          <span className="snapshot-pill">📅 {events.length} Total Events</span>
          {nextEvent && (
            <span className="snapshot-pill">
              ▶ Next: {formatDate(nextEvent.isoDate).label} — {nextEvent.name}
            </span>
          )}
          <span className="snapshot-pill">Data: {eventSource === "district-live" ? "District feed" : eventSource === "site-json" ? "Stored snapshot" : "Fallback"}</span>
          {feedConfigured ? (
            <>
              <span className="snapshot-pill">Feed: {feedState.toUpperCase()}</span>
              <span className="snapshot-pill">Orders: {totalOrders}</span>
              <span className="snapshot-pill">Items: {totalItems}</span>
            </>
          ) : (
            <span className="snapshot-pill snapshot-pill--warn">⚠ Order feed not connected</span>
          )}
        </div>
      </section>

      <section className="content-card">
        <h2>Full Event Calendar</h2>
        <p className="muted-copy" style={{ marginBottom: "1.5rem" }}>
          All 6 schools · sorted by date · {events.filter(e => e.cmacTable === "Yes").length} events with CMAC table
        </p>

        {/* Upcoming events */}
        {upcomingGrouped.size === 0 ? (
          <p className="muted-copy">All events for this school year have passed.</p>
        ) : (
          Array.from(upcomingGrouped.entries()).map(([month, events]) => (
          <EventMonthBlock key={month} month={month} events={events} today={today} />
          ))
        )}

        {/* Past events — collapsed at the bottom */}
        {pastGrouped.size > 0 && (
          <details className="cal-past-section">
            <summary className="cal-past-summary">
              Past Events ({Array.from(pastGrouped.values()).flat().length})
            </summary>
            {Array.from(pastGrouped.entries()).map(([month, events]) => (
              <EventMonthBlock key={month} month={month} events={events} today={today} past />
            ))}
          </details>
        )}
      </section>

    </main>
  );
}
