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
  lead?: string;
  selling?: string[];
  notes?: string;
};

type OrderRow = {
  school: string;
  item: string;
  quantity: number;
};

const ORDER_FEED_URL = "PASTE_GOOGLE_APPS_SCRIPT_URL_HERE";

const ALL_EVENTS: EventEntry[] = [
  { isoDate: "2025-06-25", time: "TBD",      name: "Last Day of School",                          school: "Comsewogue High School",           schoolShort: "CHS",       location: "All Schools",                  type: "District",        cmacTable: "No",  formStatus: "TBD",  lead: "",          selling: [],                                                                                   notes: "Test past event" },
  { isoDate: "2026-11-13", time: "7:00 PM",  name: "NYSCAME All-County Concert",                  school: "Comsewogue High School",           schoolShort: "CHS",       location: "CHS Auditorium",               type: "Concert",         cmacTable: "No",  formStatus: "TBD",  lead: "",          selling: [],                                                                                   notes: "All-county event" },
  { isoDate: "2026-11-24", time: "TBD",      name: "JFK Fall Fine Art Showcase",                  school: "John F. Kennedy Middle School",    schoolShort: "JFK",       location: "JFK Middle School",            type: "Art Show",        cmacTable: "TBD", formStatus: "TBD",  lead: "",          selling: [],                                                                                   notes: "Confirm time" },
  { isoDate: "2026-12-09", time: "6:30 PM",  name: "Boyle Winter Concert",                        school: "Boyle Road Elementary",            schoolShort: "Boyle",     location: "JFK Middle School",            type: "Concert",         cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Flowers", "Snacks", "Bottled Water"] },
  { isoDate: "2026-12-14", time: "7:00 PM",  name: "JFK Winter Concert, Group 1",                 school: "John F. Kennedy Middle School",    schoolShort: "JFK",       location: "CHS Auditorium",               type: "Concert",         cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Flowers", "Snacks", "Bottled Water"] },
  { isoDate: "2026-12-15", time: "6:30 PM",  name: "Terryville Winter Concert",                   school: "Terryville Road Elementary",       schoolShort: "Terryville", location: "CHS Auditorium",              type: "Concert",         cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Flowers", "Snacks", "Bottled Water"] },
  { isoDate: "2026-12-16", time: "7:00 PM",  name: "CHS Winter & Chamber Concert",                school: "Comsewogue High School",           schoolShort: "CHS",       location: "CHS Auditorium",               type: "Concert",         cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Flowers", "Snacks", "Bottled Water"] },
  { isoDate: "2026-12-17", time: "7:00 PM",  name: "JFK Winter Concert, Group 2",                 school: "John F. Kennedy Middle School",    schoolShort: "JFK",       location: "CHS Auditorium",               type: "Concert",         cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Flowers", "Snacks", "Bottled Water"] },
  { isoDate: "2027-02-26", time: "7:00 PM",  name: "CHS Musical: TBA",                            school: "Comsewogue High School",           schoolShort: "CHS",       location: "CHS Auditorium",               type: "Musical",         cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Kisses for the Cast", "Flowers", "Personalized Drama Ornaments"],                   notes: "Night 1" },
  { isoDate: "2027-02-27", time: "7:00 PM",  name: "CHS Musical: TBA",                            school: "Comsewogue High School",           schoolShort: "CHS",       location: "CHS Auditorium",               type: "Musical",         cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Kisses for the Cast", "Flowers", "Personalized Drama Ornaments"],                   notes: "Night 2" },
  { isoDate: "2027-03-03", time: "4:30 PM",  name: "JFK Drama – Senior Citizen's Dinner & Show",  school: "John F. Kennedy Middle School",    schoolShort: "JFK",       location: "JFK Middle School",            type: "Drama",           cmacTable: "No",  formStatus: "TBD",  lead: "",          selling: [],                                                                                   notes: "Dinner show" },
  { isoDate: "2027-03-04", time: "6:00 PM",  name: "JFK Drama Production",                        school: "John F. Kennedy Middle School",    schoolShort: "JFK",       location: "JFK Middle School",            type: "Drama",           cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Kisses for the Cast", "Flowers", "Personalized Drama Ornaments"],                   notes: "Night 1" },
  { isoDate: "2027-03-05", time: "6:30 PM",  name: "Clinton Talent Show",                         school: "Clinton Avenue Elementary",        schoolShort: "Clinton",   location: "Clinton Avenue Elementary",    type: "Performing Arts", cmacTable: "TBD", formStatus: "TBD",  lead: "",          selling: [],                                                                                   notes: "Confirm location" },
  { isoDate: "2027-03-05", time: "7:00 PM",  name: "JFK Drama Production",                        school: "John F. Kennedy Middle School",    schoolShort: "JFK",       location: "JFK Middle School",            type: "Drama",           cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Kisses for the Cast", "Flowers", "Personalized Drama Ornaments"],                   notes: "Night 2" },
  { isoDate: "2027-03-06", time: "7:00 PM",  name: "JFK Drama Production",                        school: "John F. Kennedy Middle School",    schoolShort: "JFK",       location: "JFK Middle School",            type: "Drama",           cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Kisses for the Cast", "Flowers", "Personalized Drama Ornaments"],                   notes: "Night 3" },
  { isoDate: "2027-03-17", time: "6:00 PM",  name: "Terryville Art Show & Evening Book Fair",     school: "Terryville Road Elementary",       schoolShort: "Terryville", location: "Terryville Road Elementary",  type: "Art Show",        cmacTable: "TBD", formStatus: "TBD",  lead: "",          selling: [] },
  { isoDate: "2027-03-18", time: "6:30 PM",  name: "Boyle Drama Production",                      school: "Boyle Road Elementary",            schoolShort: "Boyle",     location: "Boyle Road Elementary",        type: "Drama",           cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Kisses for the Cast", "Flowers", "Personalized Drama Ornaments"],                   notes: "Night 1" },
  { isoDate: "2027-03-19", time: "6:30 PM",  name: "Boyle Drama Production",                      school: "Boyle Road Elementary",            schoolShort: "Boyle",     location: "Boyle Road Elementary",        type: "Drama",           cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Kisses for the Cast", "Flowers", "Personalized Drama Ornaments"],                   notes: "Night 2" },
  { isoDate: "2027-04-06", time: "7:00 PM",  name: "CHS Spring Concert",                          school: "Comsewogue High School",           schoolShort: "CHS",       location: "CHS Auditorium",               type: "Concert",         cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Flowers", "Snacks", "Bottled Water"] },
  { isoDate: "2027-04-07", time: "6:00 PM",  name: "Norwood Art Show & Evening Book Fair",        school: "Norwood Avenue Elementary",        schoolShort: "Norwood",   location: "Norwood Avenue Elementary",    type: "Art Show",        cmacTable: "TBD", formStatus: "TBD",  lead: "",          selling: [] },
  { isoDate: "2027-04-09", time: "7:00 PM",  name: "Boyle PTA Talent Show",                       school: "Boyle Road Elementary",            schoolShort: "Boyle",     location: "Boyle Road Elementary",        type: "Performing Arts", cmacTable: "TBD", formStatus: "TBD",  lead: "",          selling: [],                                                                                   notes: "Confirm CMAC presence" },
  { isoDate: "2027-04-13", time: "5:00 PM",  name: "JFK Interactive Spring Art Show",             school: "John F. Kennedy Middle School",    schoolShort: "JFK",       location: "JFK Middle School",            type: "Art Show",        cmacTable: "TBD", formStatus: "TBD",  lead: "",          selling: [] },
  { isoDate: "2027-04-28", time: "5:30 PM",  name: "Boyle Art Show & Book Fair",                  school: "Boyle Road Elementary",            schoolShort: "Boyle",     location: "Boyle Road Elementary",        type: "Art Show",        cmacTable: "TBD", formStatus: "TBD",  lead: "",          selling: [],                                                                                   notes: "Part of PTA Basket Auction & Bingo Night" },
  { isoDate: "2027-04-29", time: "6:00 PM",  name: "CHS Performing Arts Show",                   school: "Comsewogue High School",           schoolShort: "CHS",       location: "CHS Auditorium",               type: "Performing Arts", cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Kisses for the Cast", "Flowers", "Personalized Drama Ornaments"],                   notes: "Night 1" },
  { isoDate: "2027-04-30", time: "6:00 PM",  name: "Norwood Talent Show",                         school: "Norwood Avenue Elementary",        schoolShort: "Norwood",   location: "Norwood Avenue Elementary",    type: "Performing Arts", cmacTable: "TBD", formStatus: "TBD",  lead: "",          selling: [],                                                                                   notes: "Confirm CMAC presence" },
  { isoDate: "2027-05-06", time: "7:00 PM",  name: "Terryville Drama Performance",                school: "Terryville Road Elementary",       schoolShort: "Terryville", location: "Terryville Road Elementary",  type: "Drama",           cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Kisses for the Cast", "Flowers", "Personalized Drama Ornaments"],                   notes: "Night 1" },
  { isoDate: "2027-05-07", time: "7:00 PM",  name: "Terryville Drama Performance",                school: "Terryville Road Elementary",       schoolShort: "Terryville", location: "Terryville Road Elementary",  type: "Drama",           cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Kisses for the Cast", "Flowers", "Personalized Drama Ornaments"],                   notes: "Night 2" },
  { isoDate: "2027-05-13", time: "6:00 PM",  name: "Clinton Art Show",                            school: "Clinton Avenue Elementary",        schoolShort: "Clinton",   location: "Clinton Avenue Elementary",    type: "Art Show",        cmacTable: "TBD", formStatus: "TBD",  lead: "",          selling: [],                                                                                   notes: "Confirm CMAC presence" },
  { isoDate: "2027-05-14", time: "5:00 PM",  name: "Clinton Spring Fling",                        school: "Clinton Avenue Elementary",        schoolShort: "Clinton",   location: "Clinton Avenue Elementary",    type: "Performing Arts", cmacTable: "TBD", formStatus: "TBD",  lead: "",          selling: [],                                                                                   notes: "Confirm CMAC presence" },
  { isoDate: "2027-05-18", time: "All Day",  name: "CHS Art Show",                                school: "Comsewogue High School",           schoolShort: "CHS",       location: "CHS",                          type: "Art Show",        cmacTable: "TBD", formStatus: "TBD",  lead: "",          selling: [],                                                                                   notes: "Multi-day — confirm dates" },
  { isoDate: "2027-05-18", time: "6:00 PM",  name: "Terryville 4th Grade Spring Concert",         school: "Terryville Road Elementary",       schoolShort: "Terryville", location: "CHS Auditorium",              type: "Concert",         cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Flowers", "Snacks", "Bottled Water"] },
  { isoDate: "2027-05-18", time: "7:30 PM",  name: "Terryville 5th Grade Spring Concert",         school: "Terryville Road Elementary",       schoolShort: "Terryville", location: "CHS Auditorium",              type: "Concert",         cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Flowers", "Snacks", "Bottled Water"] },
  { isoDate: "2027-05-19", time: "6:30 PM",  name: "Boyle Spring Concert",                        school: "Boyle Road Elementary",            schoolShort: "Boyle",     location: "JFK Middle School",            type: "Concert",         cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Flowers", "Snacks", "Bottled Water"] },
  { isoDate: "2027-05-20", time: "7:00 PM",  name: "CHS Performing Arts Show",                   school: "Comsewogue High School",           schoolShort: "CHS",       location: "CHS Auditorium",               type: "Performing Arts", cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Kisses for the Cast", "Flowers", "Personalized Drama Ornaments"],                   notes: "Night 2" },
  { isoDate: "2027-05-24", time: "7:00 PM",  name: "JFK Spring Concert, Group 1",                 school: "John F. Kennedy Middle School",    schoolShort: "JFK",       location: "CHS Auditorium",               type: "Concert",         cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Flowers", "Snacks", "Bottled Water"] },
  { isoDate: "2027-05-26", time: "7:00 PM",  name: "JFK Spring Concert, Group 2",                 school: "John F. Kennedy Middle School",    schoolShort: "JFK",       location: "CHS Auditorium",               type: "Concert",         cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Flowers", "Snacks", "Bottled Water"] },
  { isoDate: "2027-06-03", time: "TBD",      name: "Norwood 2nd Grade Ukulele Concert",            school: "Norwood Avenue Elementary",        schoolShort: "Norwood",   location: "Norwood Avenue Elementary",    type: "Concert",         cmacTable: "TBD", formStatus: "TBD",  lead: "",          selling: [],                                                                                   notes: "Confirm time — Night 1" },
  { isoDate: "2027-06-03", time: "6:30 PM",  name: "JFK Ensembles Concert",                       school: "John F. Kennedy Middle School",    schoolShort: "JFK",       location: "JFK Middle School",            type: "Concert",         cmacTable: "TBD", formStatus: "TBD",  lead: "",          selling: [] },
  { isoDate: "2027-06-04", time: "TBD",      name: "Norwood 2nd Grade Ukulele Concert",            school: "Norwood Avenue Elementary",        schoolShort: "Norwood",   location: "Norwood Avenue Elementary",    type: "Concert",         cmacTable: "TBD", formStatus: "TBD",  lead: "",          selling: [],                                                                                   notes: "Confirm time — Night 2" },
  { isoDate: "2027-06-08", time: "7:00 PM",  name: "CHS Pops & Chamber Concert",                  school: "Comsewogue High School",           schoolShort: "CHS",       location: "CHS Auditorium",               type: "Concert",         cmacTable: "Yes", formStatus: "Open", lead: "",          selling: ["Flowers", "Snacks", "Bottled Water"] },
];

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

function EventMonthBlock({ month, events, today, past = false, onShowItems }: {
  month: string;
  events: EventEntry[];
  today: Date;
  past?: boolean;
  onShowItems: (ev: EventEntry) => void;
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
              <th>School</th>
              <th>Location</th>
              <th>Lead</th>
              <th>CMAC Table</th>
              <th>Selling</th>
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
                    <span className={`school-badge ${SCHOOL_COLORS[ev.schoolShort] ?? ""}`}>
                      {ev.schoolShort}
                    </span>
                  </td>
                  <td className="cal-location">{ev.location}</td>
                  <td className="cal-lead">{ev.lead || <span className="muted-copy" style={{fontSize:"0.8rem"}}>TBD</span>}</td>
                  <td>
                    <span className={
                      ev.cmacTable === "Yes" ? "snapshot-status snapshot-status--open" :
                      ev.cmacTable === "No"  ? "snapshot-status snapshot-status--closed" :
                      "snapshot-status snapshot-status--tbd"
                    }>{ev.cmacTable}</span>
                  </td>
                  <td>
                    {ev.selling && ev.selling.length > 0 ? (
                      <button className="cal-items-btn" onClick={() => onShowItems(ev)}>
                        View Items ({ev.selling.length})
                      </button>
                    ) : (
                      <span className="muted-copy" style={{fontSize:"0.8rem"}}>—</span>
                    )}
                  </td>
                  <td>
                    <span className={
                      ev.formStatus === "Open"   ? "snapshot-status snapshot-status--open" :
                      ev.formStatus === "Closed" ? "snapshot-status snapshot-status--closed" :
                      "snapshot-status snapshot-status--tbd"
                    }>{ev.formStatus}</span>
                  </td>
                  <td className="cal-notes">{ev.notes ?? ""}</td>
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
  const [orders, setOrders]       = useState<OrderRow[]>([]);
  const [feedState, setFeedState] = useState<"idle"|"loading"|"ready"|"error">("idle");
  const [modalEvent, setModalEvent] = useState<EventEntry | null>(null);
  const feedConfigured = ORDER_FEED_URL.startsWith("https://");

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

  // Split into upcoming and past, each grouped by month
  const { upcomingGrouped, pastGrouped } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcoming = new Map<string, EventEntry[]>();
    const past     = new Map<string, EventEntry[]>();
    for (const ev of ALL_EVENTS) {
      const { monthKey } = formatDate(ev.isoDate);
      const isPast = new Date(ev.isoDate) < today;
      const map = isPast ? past : upcoming;
      if (!map.has(monthKey)) map.set(monthKey, []);
      map.get(monthKey)!.push(ev);
    }
    return { upcomingGrouped: upcoming, pastGrouped: past };
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextEvent = ALL_EVENTS.find(e => new Date(e.isoDate) >= today);

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">Board Dashboard · 2026–2027 School Year</p>
        <h1>Event Calendar Snapshot</h1>
        <p>
          All district arts performances and events CMAC supports, in chronological order.
          Update <code>formStatus</code> in the page file to Open or Closed as forms go live.
        </p>
      </section>

      {/* Summary bar */}
      <section className="content-card snapshot-summary-bar">
        <div className="snapshot-pill-row">
          <span className="snapshot-pill">📅 {ALL_EVENTS.length} Total Events</span>
          {nextEvent && (
            <span className="snapshot-pill">
              ▶ Next: {formatDate(nextEvent.isoDate).label} — {nextEvent.name}
            </span>
          )}
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

      {/* Chronological event table */}
      <section className="content-card">
        <h2>Full Event Calendar</h2>
        <p className="muted-copy" style={{ marginBottom: "1.5rem" }}>
          All 6 schools · sorted by date · {ALL_EVENTS.filter(e => e.cmacTable === "Yes").length} events with CMAC table
        </p>

        {/* Upcoming events */}
        {upcomingGrouped.size === 0 ? (
          <p className="muted-copy">All events for this school year have passed.</p>
        ) : (
          Array.from(upcomingGrouped.entries()).map(([month, events]) => (
            <EventMonthBlock key={month} month={month} events={events} today={today} onShowItems={setModalEvent} />
          ))
        )}

        {/* Past events — collapsed at the bottom */}
        {pastGrouped.size > 0 && (
          <details className="cal-past-section">
            <summary className="cal-past-summary">
              Past Events ({Array.from(pastGrouped.values()).flat().length})
            </summary>
            {Array.from(pastGrouped.entries()).map(([month, events]) => (
              <EventMonthBlock key={month} month={month} events={events} today={today} past onShowItems={setModalEvent} />
            ))}
          </details>
        )}
      </section>

      {/* Items modal */}
      {modalEvent && (
        <div className="cal-modal-backdrop" onClick={() => setModalEvent(null)}>
          <div className="cal-modal" onClick={e => e.stopPropagation()}>
            <button className="cal-modal-close" onClick={() => setModalEvent(null)} aria-label="Close">✕</button>
            <p className="subpage-kicker" style={{marginBottom:"0.25rem"}}>{modalEvent.school}</p>
            <h2 style={{margin:"0 0 0.25rem"}}>{modalEvent.name}</h2>
            <p className="muted-copy" style={{marginTop:0}}>{formatDate(modalEvent.isoDate).label} · {modalEvent.time} · {modalEvent.location}</p>
            <hr style={{margin:"1rem 0", borderColor:"rgba(0,0,0,0.1)"}} />
            <h3 style={{margin:"0 0 0.75rem", fontSize:"1rem"}}>Items We&rsquo;re Selling</h3>
            {modalEvent.selling && modalEvent.selling.length > 0 ? (
              <ul className="cal-modal-items">
                {modalEvent.selling.map(item => <li key={item}>{item}</li>)}
              </ul>
            ) : (
              <p className="muted-copy">No items listed yet for this event.</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
