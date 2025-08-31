// Utility to get current date and week number (week 1 starts on 01/09/2025)
export function getCurrentWeekInfo(referenceDateStr = '2025-08-31') {
  const today = new Date();
  const referenceDate = new Date(referenceDateStr);
  // Zero out time for both dates
  today.setHours(0, 0, 0, 0);
  referenceDate.setHours(0, 0, 0, 0);

  // Calculate difference in days
  const diffDays = Math.floor((today.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24));
  // Week 1 starts at referenceDate, so add 1 to week number
  const weekNumber = diffDays >= 0 ? Math.floor(diffDays / 7) + 1 : 0;

  return {
    date: today,
    week: weekNumber,
  };
}
