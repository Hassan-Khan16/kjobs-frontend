import { notFound } from "next/navigation";
import AdminUserFormContainer from "@/components/admin-user-management/AdminUserFormContainer";
import { getUserById } from "@/services/user-service";

export const dynamic = "force-dynamic";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getUserById(id);
  if (!res.success) notFound();
  return <AdminUserFormContainer mode="edit" initial={res.data} />;
}
