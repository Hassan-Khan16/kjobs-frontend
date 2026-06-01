import dayjs from "dayjs";

const HOURS_BEFORE_ACTIVITY_LOG_WINDOW = 24;

export function isLogDisabledForActivity(activityGameTime: string): boolean {
  const logWindowStart = dayjs(activityGameTime).subtract(
    HOURS_BEFORE_ACTIVITY_LOG_WINDOW,
    "hour",
  );
  return dayjs().isBefore(logWindowStart);
}
