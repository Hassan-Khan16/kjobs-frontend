import { notFound } from "next/navigation";
import AdminEmployerDetailContainer from "@/components/admin-employer-management/AdminEmployerDetailContainer";
import { getEmployerById } from "@/services/employer-service";

export const dynamic = "force-dynamic";

export default async function EmployerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getEmployerById(id);
  if (!res.success) notFound();
  return <AdminEmployerDetailContainer employer={res.data} />;
}
