import { notFound } from "next/navigation";
import AdminUserDetailContainer from "@/components/admin-user-management/AdminUserDetailContainer";
import { getUserById } from "@/services/user-service";

export const dynamic = "force-dynamic";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getUserById(id);
  if (!res.success) notFound();
  return <AdminUserDetailContainer user={res.data} />;
}
