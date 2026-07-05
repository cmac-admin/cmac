"use client";

import { useEffect, useMemo, useState } from "react";

type EventPlan = {
  name: string;
  date: string;
  time: string;
  location: string;
  formStatus: "Open" | "Closed";
};

type SchoolPlan = {
  school: string;
  events: EventPlan[];
};

type OrderRow = {
  school: string;
  item: string;
  quantity: number;
};

const ORDER_FEED_URL = "PASTE_GOOGLE_APPS_SCRIPT_URL_HERE";

const schoolPlans: SchoolPlan[] = [
  {
    school: "Boyle Road Elementary",
    events: [
      {
        name: "Boyle Elementary Winter Concert",
        date: "December 9, 2026",
        time: "6:30 PM",
        location: "JFK Middle",
        formStatus: "Open",
      },
      {
        name: "Boyle Elementary Spring Concert",
        date: "May 19, 2027",
        time: "6:30 PM",
        location: "JFK Middle",
        formStatus: "Open",
      },
    ],
  },
  {
    school: "Terryville Road Elementary",
    events: [
      {
        name: "Terryville Winter Concert",
        date: "December 15, 2026",
        time: "7:00 PM",
        location: "CHS",
        formStatus: "Open",
      },
      {
        name: "Terryville Drama Production",
        date: "May 6, 2027",
        time: "7:00 PM",
        location: "Terryville",
        formStatus: "Open",
      },
      {
        name: "Terryville Drama Production",
        date: "May 7, 2027",
        time: "7:00 PM",
        location: "Terryville",
        formStatus: "Open",
      },
      {
        name: "Terryville Spring Concert",
        date: "TBD",
        time: "7:00 PM",
        location: "CHS",
        formStatus: "Closed",
      },
    ],
  },
  {
    school: "John F. Kennedy Middle School",
    events: [
      {
        name: "JFK Winter Concert Group 1",
        date: "December 14, 2026",
        time: "7:00 PM",
        location: "CHS",
        formStatus: "Open",
      },
      {
        name: "JFK Winter Concert Group 2",
        date: "December 17, 2026",
        time: "7:00 PM",
        location: "CHS",
        formStatus: "Open",
      },
      {
        name: "JFK Drama Production",
        date: "March 4, 2027",
        time: "6:00 PM",
        location: "JFK",
        formStatus: "Open",
      },
      {
        name: "JFK Drama Production",
        date: "March 5, 2027",
        time: "7:00 PM",
        location: "JFK",
        formStatus: "Open",
      },
      {
        name: "JFK Drama Production",
        date: "March 6, 2027",
        time: "7:00 PM",
        location: "JFK",
        formStatus: "Open",
      },
      {
        name: "JFK Drama Production",
        date: "March 7, 2027",
        time: "7:00 PM",
        location: "JFK",
        formStatus: "Open",
      },
      {
        name: "JFK Spring Concert Group 1",
        date: "May 24, 2027",
        time: "7:00 PM",
        location: "CHS",
        formStatus: "Open",
      },
      {
        name: "JFK Spring Concert Group 2",
        date: "May 26, 2027",
        time: "7:00 PM",
        location: "CHS",
        formStatus: "Open",
      },
    ],
  },
  {
    school: "Comsewogue High School",
    events: [
      {
        name: "CHS Winter & Chamber Concert",
        date: "December 16, 2026",
        time: "7:00 PM",
        location: "CHS",
        formStatus: "Open",
      },
      {
        name: "CHS Drama Production",
        date: "February 26, 2027",
        time: "7:00 PM",
        location: "CHS",
        formStatus: "Open",
      },
      {
        name: "CHS Drama Production",
        date: "February 27, 2027",
        time: "7:00 PM",
        location: "CHS",
        formStatus: "Open",
      },
      {
        name: "CHS Art Show",
        date: "May 18-21, 2027",
        time: "TBD",
        location: "CHS",
        formStatus: "Open",
      },
      {
        name: "CHS Spring Concert",
        date: "TBD",
        time: "7:00 PM",
        location: "CHS",
        formStatus: "Closed",
      },
    ],
  },
];

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function numberValue(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 1;
  }
  return 1;
}

function pick(row: Record<string, unknown>, keys: string[]): unknown {
  for (const key of keys) {
    if (key in row) {
      return row[key];
    }
  }
  return "";
}

function normalizeOrder(row: Record<string, unknown>): OrderRow | null {
  const school = text(
    pick(row, ["school", "School", "schoolName", "School Name", "campus"]),
  );
  const item = text(
    pick(row, ["item", "Item", "product", "Product", "orderType"]),
  );
  const quantity = Math.max(
    1,
    numberValue(pick(row, ["quantity", "Quantity", "qty", "Qty"])),
  );

  if (!school || !item) {
    return null;
  }

  return { school, item, quantity };
}

export default function SnapshotPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [feedState, setFeedState] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );

  const feedConfigured = ORDER_FEED_URL.startsWith("https://");

  useEffect(() => {
    if (!feedConfigured) {
      return;
    }

    let active = true;
    setFeedState("loading");

    const load = async () => {
      try {
        const response = await fetch(ORDER_FEED_URL, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load order feed");
        }
        const raw = await response.json();
        const rows = Array.isArray(raw)
          ? raw
          : Array.isArray((raw as { orders?: unknown[] }).orders)
            ? (raw as { orders: unknown[] }).orders
            : [];
        const normalized = rows
          .map((entry) =>
            normalizeOrder((entry ?? {}) as Record<string, unknown>),
          )
          .filter((entry): entry is OrderRow => entry !== null);

        if (active) {
          setOrders(normalized);
          setFeedState("ready");
        }
      } catch {
        if (active) {
          setFeedState("error");
        }
      }
    };

    load();
    const interval = window.setInterval(load, 30000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [feedConfigured]);

  const schoolStats = useMemo(() => {
    return schoolPlans.map((plan) => {
      const bySchool = orders.filter((row) => row.school === plan.school);
      const itemCounts = bySchool.reduce<Record<string, number>>((acc, row) => {
        acc[row.item] = (acc[row.item] ?? 0) + row.quantity;
        return acc;
      }, {});

      return {
        school: plan.school,
        events: plan.events,
        totalOrders: bySchool.length,
        totalItems: bySchool.reduce((sum, row) => sum + row.quantity, 0),
        itemCounts,
      };
    });
  }, [orders]);

  const totalOrders = orders.length;
  const totalItems = orders.reduce((sum, row) => sum + row.quantity, 0);

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <p className="subpage-kicker">Private Board Page</p>
        <h1>Board Snapshot</h1>
        <p>
          School-by-school schedule and order summary. You can update event names
          and dates in this page file for each new calendar year.
        </p>
      </section>

      <section className="content-card">
        <h2>Live Feed Status</h2>
        <p className="muted-copy">
          {feedConfigured
            ? "Connected to order feed. Data refreshes every 30 seconds."
            : "Order feed URL not set yet. Replace ORDER_FEED_URL in this page to enable live updates."}
        </p>
        <div className="snapshot-pill-row">
          <span className="snapshot-pill">Status: {feedState.toUpperCase()}</span>
          <span className="snapshot-pill">Total Orders: {totalOrders}</span>
          <span className="snapshot-pill">Total Items: {totalItems}</span>
        </div>
        <p className="muted-copy snapshot-note">
          Closing a form is not a problem: this dashboard keeps existing totals
          and simply stops receiving new responses for that event.
        </p>
      </section>

      <section className="snapshot-grid">
        {schoolStats.map((school) => (
          <article key={school.school} className="content-card snapshot-school">
            <h2>{school.school}</h2>

            <p className="section-label">Event Calendar</p>
            <div className="snapshot-events">
              {school.events.map((event, index) => (
                <div
                  key={`${school.school}-${event.name}-${event.date}-${index}`}
                  className="snapshot-event-row"
                >
                  <p>
                    <strong>{event.name}</strong>
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                    <span>{event.location}</span>
                  </p>
                  <span
                    className={
                      event.formStatus === "Open"
                        ? "snapshot-status snapshot-status--open"
                        : "snapshot-status snapshot-status--closed"
                    }
                  >
                    {event.formStatus}
                  </span>
                </div>
              ))}
            </div>

            <p className="section-label">Order Summary</p>
            <div className="snapshot-summary">
              <p>
                Orders: <strong>{school.totalOrders}</strong>
              </p>
              <p>
                Items: <strong>{school.totalItems}</strong>
              </p>
            </div>

            {Object.keys(school.itemCounts).length > 0 ? (
              <ul className="snapshot-item-list">
                {Object.entries(school.itemCounts).map(([item, count]) => (
                  <li key={item}>
                    <span>{item}</span>
                    <strong>{count}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted-copy">No submitted orders for this school yet.</p>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
