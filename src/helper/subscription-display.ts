import { PendingScheduleType } from "@/enum/enum";
import { SubscriptionStatus } from "@/enum/status";
import type { SubscriptionEntity } from "@/types/subscription";
import { formatHistoryDate } from "@/lib/subscription-history";

export function getSubscriptionStatusLabel(
  status: SubscriptionStatus | string | undefined,
  pendingScheduleType?: PendingScheduleType | null,
): string {
  if (pendingScheduleType === PendingScheduleType.CANCEL) {
    return "Cancellation scheduled";
  }
  if (pendingScheduleType === PendingScheduleType.UPDATE) {
    return "Plan change scheduled";
  }
  switch (status) {
    case SubscriptionStatus.ACTIVE:
      return "Active";
    case SubscriptionStatus.TRIAL:
      return "Trial";
    case SubscriptionStatus.CANCELED:
      return "Canceled";
    case SubscriptionStatus.EXPIRED:
      return "Expired";
    case SubscriptionStatus.PENDING:
      return "Pending";
    default:
      return status ? String(status) : "No plan";
  }
}

export function getBillingDateLabel(
  subscription: SubscriptionEntity | null | undefined,
  pendingScheduleType?: PendingScheduleType | null,
): string {
  if (pendingScheduleType === PendingScheduleType.CANCEL) {
    return "Access until";
  }
  if (
    subscription?.status === SubscriptionStatus.CANCELED ||
    subscription?.status === SubscriptionStatus.EXPIRED
  ) {
    return "Access until";
  }
  if (parseInt(subscription?.planId?.amount ?? "0", 10) === 0) {
    return "Billing";
  }
  return "Next billing";
}

export function formatSubscriptionBillingDate(
  subscription: SubscriptionEntity | null | undefined,
): string {
  return formatHistoryDate(subscription?.subscriptionExpiresAt);
}

export function formatSubscriptionPrice(
  subscription: SubscriptionEntity | null | undefined,
  durationLabel?: string,
): string {
  const plan = subscription?.planId;
  if (!plan) return "—";
  const amount = parseInt(plan.amount ?? "0", 10);
  if (amount === 0) {
    return durationLabel ? `Free · ${durationLabel}` : "Free";
  }
  const interval = durationLabel ?? plan.interval;
  return interval ? `$${plan.amount} · ${interval}` : `$${plan.amount}`;
}
