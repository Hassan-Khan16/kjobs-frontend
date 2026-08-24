import { SubscriptionStatus } from "@/enum/status";
import { SubscriptionEntity } from "@/types/subscription";

export const isFeatureActive = (
  subscription: SubscriptionEntity | null,
  featureName: string,
) => {
  if (!subscription || !subscription?.planId) return false;
  return (
    [SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIAL].includes(subscription?.status as SubscriptionStatus) &&
    subscription?.planId?.planFeatures?.some(
      (pf) => pf.feature.name === featureName && pf.isActive,
    )
  );
};
