import { notFound } from "next/navigation";
import AdminJobSeekerFormContainer from "@/components/admin-job-seeker-management/AdminJobSeekerFormContainer";
import { getJobSeeker } from "@/services/job-seeker-service";

export const dynamic = "force-dynamic";

export default async function EditJobSeekerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getJobSeeker(id);
  if (!res.success) notFound();
  return <AdminJobSeekerFormContainer mode="edit" initial={res.data} />;
}
