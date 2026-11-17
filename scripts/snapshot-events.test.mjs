import assert from "node:assert/strict";
import test from "node:test";
import { mergeWithCurated } from "../src/lib/snapshot-events.ts";

const concert = {
  isoDate: "2026-12-15",
  time: "6:30 PM",
  name: "Terryville Winter Concert",
  school: "Terryville Road Elementary",
  schoolShort: "Terryville",
  location: "CHS Auditorium",
  type: "Concert",
  cmacTable: "Yes",
  formStatus: "Open",
  notes: "Staff the table",
};

test("rescheduled concerts use district dates without retaining stale curated rows", () => {
  const chs = { ...concert, name: "CHS Winter & Chamber Concert", school: "Comsewogue High School", isoDate: "2026-12-16", time: "7:00 PM" };
  const live = [
    { ...concert, isoDate: "2026-12-16", location: "TBD", cmacTable: "TBD", formStatus: "TBD", notes: "" },
    { ...chs, isoDate: "2026-12-15", location: "New auditorium", formStatus: "Closed" },
  ];

  const result = mergeWithCurated(live, [concert, chs]);
  assert.equal(result.length, 2);
  assert.deepEqual(result.map(({ name, isoDate }) => ({ name, isoDate })), [
    { name: chs.name, isoDate: "2026-12-15" },
    { name: concert.name, isoDate: "2026-12-16" },
  ]);
  assert.equal(result[0].location, "New auditorium");
  assert.equal(result[0].formStatus, "Closed");
  assert.equal(result[1].location, concert.location);
  assert.equal(result[1].cmacTable, "Yes");
  assert.equal(result[1].formStatus, "Open");
  assert.equal(result[1].notes, concert.notes);
});

test("partial district feeds retain distinct curated nights and their own notes", () => {
  const first = { ...concert, name: "Drama Production", notes: "Night 1" };
  const second = { ...first, isoDate: "2026-12-16", notes: "Night 2" };
  const result = mergeWithCurated([{ ...second, notes: "" }], [first, second]);
  assert.deepEqual(result, [first, second]);
});

test("multiple district occurrences are retained instead of assumed to be a reschedule", () => {
  const result = mergeWithCurated([
    { ...concert, isoDate: "2026-12-16" },
    { ...concert, isoDate: "2026-12-17" },
  ], [concert]);
  assert.deepEqual(result.map((event) => event.isoDate), ["2026-12-15", "2026-12-16", "2026-12-17"]);
});

test("curated-only events and same-title events at another school remain independent", () => {
  const otherSchool = { ...concert, school: "Boyle Road Elementary", isoDate: "2026-12-16", cmacTable: "TBD" };
  assert.deepEqual(mergeWithCurated([otherSchool], [concert]), [concert, otherSchool]);
  assert.deepEqual(mergeWithCurated([], [concert]), [concert]);
});
