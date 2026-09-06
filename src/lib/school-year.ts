export function getSchoolYearInfo(referenceDate: Date = new Date()) {
  const schoolYearStart = new Date(referenceDate.getFullYear(), 7, 15);
  const startYear =
    referenceDate >= schoolYearStart
      ? referenceDate.getFullYear()
      : referenceDate.getFullYear() - 1;
  const endYear = startYear + 1;

  return {
    startYear,
    endYear,
    label: `${startYear}-${endYear}`,
  };
}
