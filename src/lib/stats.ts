export type Stats = {
  foundedYear: string;
  schoolsCount: string;
  scholarshipsGranted: string;
  totalAwarded: string;
  studentsTeachersSupported: string;
  studentsTeachersAwarded: string;
  teacherGrants: string;
};

/**
 * CMAC impact statistics — fallback values used while the live sheet loads.
 * The About and Scholarships pages read the Google Sheet directly for live updates.
 */
export const DEFAULT_STATS: Stats = {
  foundedYear: "2023",
  schoolsCount: "Grades 3-12",
  scholarshipsGranted: "50",
  totalAwarded: "$1,000.00+",
  studentsTeachersSupported: "50",
  studentsTeachersAwarded: "$1,000.00+",
  teacherGrants: "2",
};

export const STATS: Stats = DEFAULT_STATS;
