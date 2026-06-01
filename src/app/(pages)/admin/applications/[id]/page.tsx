import { notFound } from "next/navigation";
import AdminApplicationDetailContainer from "@/components/admin-application-management/AdminApplicationDetailContainer";
import { getApplicationById } from "@/services/application-service";

export const dynamic = "force-dynamic";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getApplicationById(id);
  if (!res.success) notFound();
  return <AdminApplicationDetailContainer application={res.data} />;
}
