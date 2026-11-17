export type EventEntry = {
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

function eventIdentity(event: EventEntry): string {
  return [event.school, event.name]
    .map((value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ""))
    .join("|");
}

/**
 * District dates win; curated entries supply CMAC details and missing events.
 * Only unambiguous single occurrences can replace a different curated date.
 */
export function mergeWithCurated(live: EventEntry[], curated: EventEntry[]): EventEntry[] {
  const curatedByIdentity = new Map<string, EventEntry[]>();
  const liveCounts = new Map<string, number>();

  for (const event of curated) {
    const key = eventIdentity(event);
    const entries = curatedByIdentity.get(key) ?? [];
    entries.push(event);
    curatedByIdentity.set(key, entries);
  }
  for (const event of live) {
    const key = eventIdentity(event);
    liveCounts.set(key, (liveCounts.get(key) ?? 0) + 1);
  }

  const merged = live.map((event) => {
    const matches = curatedByIdentity.get(eventIdentity(event));
    const template = matches?.find((entry) => entry.isoDate === event.isoDate) ?? matches?.[0];
    if (!template) return { ...event };

    return {
      ...event,
      location: event.location && event.location !== "TBD" ? event.location : template.location,
      time: event.time && event.time !== "TBD" ? event.time : template.time,
      type: template.type || event.type,
      cmacTable: template.cmacTable,
      formStatus: event.formStatus !== "TBD" ? event.formStatus : template.formStatus,
      notes: template.notes || event.notes,
    };
  });
  const seen = new Set(merged.map((event) => `${eventIdentity(event)}|${event.isoDate}`));

  for (const event of curated) {
    const identity = eventIdentity(event);
    const key = `${identity}|${event.isoDate}`;
    const rescheduled = liveCounts.get(identity) === 1 && curatedByIdentity.get(identity)?.length === 1;
    if (!seen.has(key) && !rescheduled) {
      merged.push({ ...event });
      seen.add(key);
    }
  }

  return merged.sort((a, b) => a.isoDate.localeCompare(b.isoDate) || a.time.localeCompare(b.time));
}
