import type { ActiveSubscriptionItem } from "@/types/admin-subscription";
import type { SubscriptionEntity } from "@/types/subscription";

export function toActiveSubscriptionItem(
  subscription: SubscriptionEntity | null | undefined,
): ActiveSubscriptionItem | null {
  if (!subscription) return null;
  return {
    id: subscription.id,
    status: subscription.status,
    subscriptionStartedAt: subscription.subscriptionStartedAt ?? null,
    subscriptionExpiresAt: subscription.subscriptionExpiresAt ?? null,
    planId: subscription.planId
      ? {
          id: subscription.planId.id,
          name: subscription.planId.name,
        }
      : null,
  };
}
