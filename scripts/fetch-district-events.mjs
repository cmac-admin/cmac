/**
 * Prebuild script: fetches the Comsewogue district iCal feed and writes
 * src/app/snapshot-c2m0a2c3/events-data.json with CMAC-relevant events.
 *
 * Run automatically via "prebuild" in package.json before every `npm run build`.
 * Preserves any manual formStatus ("Open"/"Closed") overrides from the existing file.
 */

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ICS_URL =
  "https://www.comsewogue.k12.ny.us/sndreq/generateCalendarICS.php?calendar_id=135057";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(
  __dirname,
  "..",
  "public",
  "snapshot-c2m0a2c3",
  "events-data.json",
);

const SCHOOL_ORDER = [
  "Boyle Road Elementary",
  "Terryville Road Elementary",
  "John F. Kennedy Middle School",
  "Comsewogue High School",
  "Clinton Avenue Elementary",
  "Norwood Avenue Elementary",
  "District-wide",
];

/**
 * CMAC only staffs music, drama and art events, so the district feed is
 * filtered down to those before anything is written.
 *
 * Word boundaries matter here: a bare "art" substring would drag in
 * "Start with Hello Week", "Quarter Ends" and similar unrelated events.
 */
const ARTS_KEYWORDS = [
  /\bconcerts?\b/,
  /\barts?\b/,          // covers "Art Show", "Fine Art", "Performing Arts"
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

function isArtsEvent(summary) {
  const text = summary.toLowerCase();
  return ARTS_KEYWORDS.some((pattern) => pattern.test(text));
}

function getSchool(summary) {
  const text = summary.toLowerCase();

  if (/\bboyle\b/.test(text)) return "Boyle Road Elementary";
  if (/\bterryville\b/.test(text)) return "Terryville Road Elementary";
  if (/\b(jfk|john f?\.? kennedy|kennedy)\b/.test(text)) return "John F. Kennedy Middle School";
  if (/\bchs\b|\bcomsewogue high\b|\bnyscame\b|\ball-?county\b|\bhigh school\b/.test(text)) return "Comsewogue High School";
  if (/\bclinton\b/.test(text)) return "Clinton Avenue Elementary";
  if (/\bnorwood\b/.test(text)) return "Norwood Avenue Elementary";
  if (/\belementary\b/.test(text)) return "District-wide";
  if (/\bschool\b/.test(text)) return "District-wide";

  return null;
}

function parseICSDate(dtstart) {
  const match = dtstart.match(/^(?:.*:)?(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(?:\d{2})?Z?)?$/);
  if (!match) return { date: "TBD", time: "TBD", sortKey: "9999" };

  const [, year, month, day, hour, minute] = match;
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const date = `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  const sortKey = `${year}${month}${day}${hour ?? "00"}${minute ?? "00"}`;

  let time = "TBD";
  if (hour && minute) {
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    time = `${h12}:${minute} ${ampm}`;
  }

  return { date, time, sortKey };
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
          Accept: "text/calendar, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      },
    );

    req.on("error", reject);
    req.end();
  });
}

async function main() {
  console.log("📅 Fetching Comsewogue district calendar…");

  let icsContent;
  try {
    icsContent = await fetchText(ICS_URL);
  } catch (err) {
    console.warn(
      `⚠️  Could not fetch district calendar (${err.message}). Using existing events-data.json.`,
    );
    return;
  }

  const events = [];
  const blocks = icsContent.split("BEGIN:VEVENT");

  for (const block of blocks.slice(1)) {
    const summaryMatch = block.match(/SUMMARY:(.+)/);
    const dtstartMatch = block.match(/DTSTART[^:]*:(\S+)/);
    const locationMatch = block.match(/LOCATION:(.+)/);

    if (!summaryMatch || !dtstartMatch) continue;

    const summary = summaryMatch[1].trim().replace(/\\,/g, ",");
    if (!isArtsEvent(summary)) continue;

    const school = getSchool(summary);
    if (!school) continue;

    const { date, time, sortKey } = parseICSDate(dtstartMatch[1].trim());
    const location = locationMatch ? locationMatch[1].trim() : "";

    events.push({ school, name: summary, date, time, location, formStatus: "Open", sortKey });
  }

  // Read existing file to preserve manual formStatus overrides
  const existingStatus = new Map();
  try {
    const existing = JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf8"));
    for (const s of existing) {
      for (const ev of s.events) {
        existingStatus.set(`${s.school}|${ev.name}|${ev.date}`, ev.formStatus);
      }
    }
  } catch {
    // no existing file — all default to Open
  }

  // Group by school and apply preserved formStatus
  const grouped = SCHOOL_ORDER.map((schoolName) => ({
    school: schoolName,
    events: events
      .filter((e) => e.school === schoolName)
      .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
      .map(({ name, date, time, location, formStatus }) => ({
        name,
        date,
        time,
        location,
        formStatus: existingStatus.get(`${schoolName}|${name}|${date}`) ?? formStatus,
      })),
  }));

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(grouped, null, 2));
  console.log(`✅ Wrote ${events.length} music/drama/art events across ${SCHOOL_ORDER.length} schools.`);
}

main().catch((err) => {
  console.error("❌ fetch-district-events failed:", err.message);
  // Don't exit(1) — let the build continue with existing data
});
