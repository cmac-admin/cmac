"use client";

import { useEffect, useState } from "react";

const SUPPORTER_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1kOWEIfOs1UGSl2KSnEeuvA5Y26w8l46scoWMzFvSKu4/export?format=csv&gid=0";

const DEFAULT_SUPPORTERS = [
  "THE ANDERSEN FAMILY",
  "THE KOSAK FAMILY",
  "THE PERRONE FAMILY",
  "THE DVORSKY FAMILY",
  "THE JAKLITSCH FAMILY",
  "THE PROVENZALE FAMILY",
  "C. ANDERSEN",
  "M. SMITH",
  "L. JONES",
  "THE ANDERSEN FAMILY",
  "THE KOSAK FAMILY",
  "THE PERRONE FAMILY",
  "THE DVORSKY FAMILY",
  "THE JAKLITSCH FAMILY",
  "THE PROVENZALE FAMILY",
  "C. ANDERSEN",
  "M. SMITH",
  "L. JONES",
];

function parseCsvLine(line: string): string[] {
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

function getDisplayValue(value: string | undefined): string {
  return (value ?? "").trim();
}

function parseSupportersCsv(csv: string): string[] {
  const rows = csv
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter(Boolean)
    .map(parseCsvLine);

  if (rows.length < 2) {
    return DEFAULT_SUPPORTERS;
  }

  const [header, ...bodyRows] = rows;
  const headerMap = header.map((cell) => cell.toLowerCase().replace(/[^a-z0-9]/g, ""));

  const nameIndex = headerMap.findIndex((cell) => cell.includes("name"));
  const doNotDisplayIndex = headerMap.findIndex((cell) =>
    cell.includes("donotdisplay") || cell.includes("donotdisplayflag") || cell.includes("display")
  );

  const names = bodyRows
    .map((row) => {
      if (nameIndex === -1) {
        return getDisplayValue(row[0]);
      }

      const name = getDisplayValue(row[nameIndex]);
      const doNotDisplayValue =
        doNotDisplayIndex >= 0 ? getDisplayValue(row[doNotDisplayIndex]).toLowerCase() : "";

      if (!name) {
        return "";
      }

      if (
        doNotDisplayValue === "yes" ||
        doNotDisplayValue === "y" ||
        doNotDisplayValue === "true" ||
        doNotDisplayValue === "1" ||
        doNotDisplayValue === "do not display"
      ) {
        return "";
      }

      return name;
    })
    .filter(Boolean);

  return names.length > 0 ? names : DEFAULT_SUPPORTERS;
}

export function FamilySupporterTicker() {
  const [supporters, setSupporters] = useState<string[]>(DEFAULT_SUPPORTERS);

  useEffect(() => {
    let active = true;

    const loadSupporters = async () => {
      try {
        const response = await fetch(SUPPORTER_SHEET_URL, {
          cache: "no-store",
          headers: {
            Accept: "text/csv",
          },
        });

        if (!response.ok) {
          return;
        }

        const csv = await response.text();
        const parsed = parseSupportersCsv(csv);

        if (active) {
          setSupporters(parsed);
        }
      } catch {
        // Fall back to the curated list if the sheet is private or unavailable.
      }
    };

    loadSupporters();
    const intervalId = window.setInterval(loadSupporters, 5 * 60 * 1000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const repeatedSupporters = [...supporters, ...supporters];

  return (
    <div className="family-supporter-ticker" aria-label="Individual/Family Supporters list">
      <div className="family-supporter-ticker__track">
        {repeatedSupporters.map((name, index) => (
          <span key={`${name}-${index}`} className="family-supporter-ticker__item">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
