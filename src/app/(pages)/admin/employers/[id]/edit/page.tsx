import { notFound } from "next/navigation";
import AdminEmployerFormContainer from "@/components/admin-employer-management/AdminEmployerFormContainer";
import { getEmployerById } from "@/services/employer-service";

export const dynamic = "force-dynamic";

export default async function EditEmployerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getEmployerById(id);
  if (!res.success) notFound();
  return <AdminEmployerFormContainer mode="edit" initial={res.data} />;
}
