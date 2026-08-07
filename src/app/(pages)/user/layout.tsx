import { PortalHeader } from "@/components/portal-header/PortalHeader";
import { appRoutes } from "@/utils/endpoint";

export default function UserPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex flex-col bg-secondary">
      <PortalHeader homeHref={appRoutes.userDashboard} />
      <main className="flex-1 p-4 lg:p-6">{children}</main>
    </div>
  );
}
