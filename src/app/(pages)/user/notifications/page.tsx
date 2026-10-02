import { DashboardHeader } from "@/components/portal/DashboardHeader";
import { EmptyState } from "@/components/public/EmptyState";

export default function UserNotificationsPage() {
  return (
    <div>
      <DashboardHeader title="Notifications" description="Application updates will appear here." />
      <EmptyState title="You're all caught up" description="No new notifications right now." />
    </div>
  );
}
