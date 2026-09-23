"use client";

import { useEffect, useState } from "react";
import {
  buildGoogleSheetQueryUrl,
  CMAC_METRICS_SHEET_NAME,
  CMAC_SITE_DATA_SHEET_ID,
} from "@/lib/site-data";
import { DEFAULT_STATS } from "@/lib/stats";

const SHEET_QUERY_URL = buildGoogleSheetQueryUrl(
  CMAC_METRICS_SHEET_NAME,
  CMAC_SITE_DATA_SHEET_ID
);

const formatAwardValue = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return trimmed;
  }

  return trimmed.endsWith("+") ? trimmed : `${trimmed}+`;
};

const formatMoreThan = (value: string) => {
  const trimmed = value.trim().replace(/^more than\s*/i, "");

  if (!trimmed) {
    return trimmed;
  }

  return trimmed.endsWith("+") ? trimmed : `${trimmed}+`;
};

const PAGE_FALLBACKS = {
  general: DEFAULT_STATS,
  scholarships: {
    ...DEFAULT_STATS,
    studentsTeachersSupported: "67",
    studentsTeachersAwarded: "$1,000.00+",
  },
  "teacher-grants": {
    ...DEFAULT_STATS,
    studentsTeachersSupported: "67",
    studentsTeachersAwarded: "$1,000.00+",
  },
} as const;

type StatsMode = keyof typeof PAGE_FALLBACKS;

const normalizeMetricKey = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .replace(/^_|_$/g, "");

function parseSheetData(raw: string, mode: StatsMode): typeof DEFAULT_STATS {
  const fallback = PAGE_FALLBACKS[mode];
  const trimmed = raw.trim();

  if (!trimmed) {
    return fallback;
  }

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

    const metricMap = new Map<string, string>();

    for (const row of parsed.table?.rows ?? []) {
      const cells = row.c ?? [];
      const metricName = String(cells[0]?.v ?? "").trim();
      const rawValue = cells[1]?.v;
      const displayValue = cells[2]?.v;

      if (!metricName) {
        continue;
      }

      const finalValue = displayValue != null ? String(displayValue).trim() : rawValue != null ? String(rawValue).trim() : "";
      if (finalValue) {
        metricMap.set(normalizeMetricKey(metricName), finalValue);
      }
    }

    const findMetricValue = (...candidates: string[]) => {
      for (const candidate of candidates) {
        const value = metricMap.get(candidate);
        if (value) {
          return value;
        }
      }

      for (const [key, value] of metricMap.entries()) {
        if (candidates.some((candidate) => key.includes(candidate) || candidate.includes(key))) {
          return value;
        }
      }

      return "";
    };

    const supported = findMetricValue(
      "studentteacherssupported",
      "studentsteacherssupported",
      "studentteacherssupport",
      "studentssupport",
      "studentssupported",
      "studentssupported"
    ) || fallback.studentsTeachersSupported;

    const awarded = formatAwardValue(
      findMetricValue(
        "studentteachersawarded",
        "studentsteachersawarded",
        "studentteachersaward",
        "studentsawarded",
        "studentsaward"
      ) || fallback.studentsTeachersAwarded
    );

    const totalAwarded =
      findMetricValue(
        "totalamountawarded",
        "totalaward",
        "amountawarded",
        "totalawarded",
        "awardedamount"
      ) || fallback.totalAwarded;

    return {
      ...fallback,
      studentsTeachersSupported: supported,
      studentsTeachersAwarded: awarded,
      totalAwarded,
    };
  } catch {
    return fallback;
  }
}

function useLiveStats(mode: StatsMode = "general") {
  const [stats, setStats] = useState(() => PAGE_FALLBACKS[mode]);

  useEffect(() => {
    let active = true;

    const loadStats = async () => {
      try {
        const response = await fetch(SHEET_QUERY_URL, {
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          return;
        }

        const raw = await response.text();
        const parsed = parseSheetData(raw, mode);

        if (active) {
          setStats(parsed);
        }
      } catch {
        // Keep the built-in fallback numbers for each page when the sheet is unavailable.
      }
    };

    let intervalId: number | undefined;
    const startPolling = () => {
      if (document.hidden || intervalId !== undefined) {
        return;
      }

      void loadStats();
      intervalId = window.setInterval(loadStats, 5 * 60 * 1000);
    };
    const stopPolling = () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        startPolling();
      }
    };

    startPolling();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      active = false;
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [mode]);

  return stats;
}

export function AboutImpactStats() {
  const stats = useLiveStats("general");
  const supportedValue = formatMoreThan(stats.studentsTeachersSupported);

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
        <p className="impact-stats__value">{supportedValue}</p>
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
  const supportedValue = formatMoreThan(stats.studentsTeachersSupported);

  return (
    <section className="impact-stats home-impact-stats" aria-label="CMAC impact at a glance">
      <div className="impact-stats__header">
        <p className="section-kicker">Our impact</p>
        <h2>Real support for students, teachers, and creative growth.</h2>
      </div>
      <div className="impact-stats__grid">
        <article>
          <p className="impact-stats__value">{supportedValue}</p>
          <p className="impact-stats__label">Students &amp; Teachers Supported</p>
        </article>
        <article>
          <p className="impact-stats__value">21</p>
          <p className="impact-stats__label">School Events Supported</p>
        </article>
        <article>
          <p className="impact-stats__value">{stats.totalAwarded}</p>
          <p className="impact-stats__label">Total Amount Awarded</p>
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
      secondLabel="Awarded"
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
  const supportedValue = formatMoreThan(stats.studentsTeachersSupported);

  return (
    <section className="scholarship-impact-bar" aria-label={ariaLabel}>
      <div className="scholarship-impact-bar__stat">
        <span className="scholarship-impact-bar__value">{supportedValue}</span>
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
