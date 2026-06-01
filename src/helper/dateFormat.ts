import dayjs from "dayjs";


export function formatCalendarDay(isoDate: string): string {
  return dayjs(isoDate).format("YYYY-MM-DD");
}

export function formatLocaleCalendarDate(isoDate: string): string {
  const parsed = dayjs(isoDate);
  if (!parsed.isValid()) return "";
  return parsed.format("MM/DD/YYYY");
}

/** Inclusive span in whole days between parsed start and end (+1). */
export function mealPlanInclusiveDayCount(
  startIso: string,
  endIso: string,
): number {
  const start = dayjs(startIso);
  const end = dayjs(endIso);
  if (!start.isValid() || !end.isValid()) return 0;
  return Math.max(0, end.diff(start, "day") + 1);
}

export function formatActivityDay(dateTime: string): string {
  const date = dayjs(dateTime);
  if (date.isSame(dayjs(), "day")) return "Today";
  if (date.isSame(dayjs().add(1, "day"), "day")) return "Tomorrow";
  return date.format("ddd, MMM D");
}

export function formatActivityTime(dateTime: string): string {
  return dayjs(dateTime).format("h:mm A");
}

export function isActivityUpcoming(dateTime: string): boolean {
  return dayjs(dateTime).isAfter(dayjs());
}

export function athleteDisplayName(athlete: {
  user?: {
    firstName?: string;
    lastName?: string;
  } | null;
}): string {
  const u = athlete?.user;
  if (!u) return "Athlete";
  return [u.firstName, u.lastName].filter(Boolean).join(" ") || "Athlete";
}

export function formatLastCheckIn(date: Date) {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 60) return `${minutes} mins ago`;
  if (minutes < 24 * 60) return `${Math.floor(minutes / 60)} hours ago`;

  const days = Math.floor(minutes / (24 * 60));
  return `${days} days ago`;
}
