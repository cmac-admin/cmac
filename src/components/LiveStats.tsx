"use client";

import { useEffect, useState } from "react";
import { DEFAULT_STATS } from "@/lib/stats";

const SHEET_EXPORT_URL =
  "https://docs.google.com/spreadsheets/d/1yVY7Hv8X4PRwO0lGPTioiuUaIQr-18FUGhhpDd35hl8/export?format=csv&gid=0";

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

const PAGE_FALLBACKS = {
  general: DEFAULT_STATS,
  scholarships: {
    ...DEFAULT_STATS,
    studentsTeachersSupported: "67",
    studentsTeachersAwarded: "$1,111.11",
  },
  "teacher-grants": {
    ...DEFAULT_STATS,
    studentsTeachersSupported: "67",
    studentsTeachersAwarded: "$1,111.11",
  },
} as const;

type StatsMode = keyof typeof PAGE_FALLBACKS;

function parseSheetData(csv: string, mode: StatsMode): typeof DEFAULT_STATS {
  const rows = csv
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter(Boolean)
    .map(parseCsvLine);

  const fallback = PAGE_FALLBACKS[mode];

  if (rows.length < 2) {
    return fallback;
  }

  const [header, ...dataRows] = rows;
  const supportedIndex = header.findIndex((cell) =>
    cell.toLowerCase().includes("students") || cell.toLowerCase().includes("teachers")
  );
  const awardedIndex = header.findIndex((cell) =>
    cell.toLowerCase().includes("awarded")
  );

  if (supportedIndex === -1 || awardedIndex === -1) {
    return fallback;
  }

  const firstRow = dataRows[0] ?? [];
  const supported = firstRow[supportedIndex] ?? fallback.studentsTeachersSupported;
  const awarded = firstRow[awardedIndex] ?? fallback.studentsTeachersAwarded;

  return {
    ...fallback,
    studentsTeachersSupported: supported,
    studentsTeachersAwarded: awarded,
  };
}

function useLiveStats(mode: StatsMode = "general") {
  const [stats, setStats] = useState(() => PAGE_FALLBACKS[mode]);

  useEffect(() => {
    let active = true;

    const loadStats = async () => {
      try {
        const response = await fetch(SHEET_EXPORT_URL, {
          cache: "no-store",
          headers: {
            Accept: "text/csv",
          },
        });

        if (!response.ok) {
          return;
        }

        const csv = await response.text();
        const parsed = parseSheetData(csv, mode);

        if (active) {
          setStats(parsed);
        }
      } catch {
        // Keep the built-in fallback numbers for each page when the sheet is unavailable.
      }
    };

    loadStats();
    const intervalId = window.setInterval(loadStats, 5 * 60 * 1000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, [mode]);

  return stats;
}

export function AboutImpactStats() {
  const stats = useLiveStats("general");

  return (
    <section className="impact-stats impact-stats--compact" aria-label="CMAC impact highlights">
      <article>
        <p className="impact-stats__value">{stats.foundedYear}</p>
        <p className="impact-stats__label">Founded</p>
      </article>
      <article>
        <p className="impact-stats__value">{stats.schoolsCount}</p>
        <p className="impact-stats__label">District Event Support</p>
      </article>
      <article>
        <p className="impact-stats__value">{stats.studentsTeachersSupported}</p>
        <p className="impact-stats__label">Students &amp; Teachers Supported</p>
      </article>
      <article>
        <p className="impact-stats__value">{stats.studentsTeachersAwarded}</p>
        <p className="impact-stats__label">Awarded to Students &amp; Teachers</p>
      </article>
    </section>
  );
}

export function HomeImpactStats() {
  const stats = useLiveStats("general");

  return (
    <section className="impact-stats home-impact-stats" aria-label="CMAC impact at a glance">
      <div className="impact-stats__header">
        <p className="section-kicker">Our impact</p>
        <h2>Real support for students, teachers, and creative growth.</h2>
      </div>
      <div className="impact-stats__grid">
        <article>
          <p className="impact-stats__value">{stats.scholarshipsGranted}</p>
          <p className="impact-stats__label">Scholarships Funded</p>
        </article>
        <article>
          <p className="impact-stats__value">{stats.teacherGrants}</p>
          <p className="impact-stats__label">Teacher Grants Awarded</p>
        </article>
        <article>
          <p className="impact-stats__value">{stats.studentsTeachersSupported}</p>
          <p className="impact-stats__label">Students Supported</p>
        </article>
      </div>
    </section>
  );
}

export function ScholarshipImpactBar() {
  return <ImpactMetricsBar ariaLabel="Scholarship impact" mode="scholarships" />;
}

export function TeacherGrantImpactBar() {
  return (
    <ImpactMetricsBar
      ariaLabel="Teacher grant impact"
      secondLabel="$ Awarded"
      mode="teacher-grants"
    />
  );
}

function ImpactMetricsBar({
  ariaLabel,
  secondLabel = "Awarded to Students & Teachers",
  mode,
}: {
  ariaLabel: string;
  secondLabel?: string;
  mode: StatsMode;
}) {
  const stats = useLiveStats(mode);

  return (
    <section className="scholarship-impact-bar" aria-label={ariaLabel}>
      <div className="scholarship-impact-bar__stat">
        <span className="scholarship-impact-bar__value">{stats.studentsTeachersSupported}</span>
        <span className="scholarship-impact-bar__label">Students &amp; Teachers Supported</span>
      </div>
      <div className="scholarship-impact-bar__divider" aria-hidden="true" />
      <div className="scholarship-impact-bar__stat">
        <span className="scholarship-impact-bar__value">{stats.studentsTeachersAwarded}</span>
        <span className="scholarship-impact-bar__label">{secondLabel}</span>
      </div>
    </section>
  );
}
