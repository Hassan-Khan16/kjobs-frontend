import { notFound } from "next/navigation";
import AdminJobSeekerDetailContainer from "@/components/admin-job-seeker-management/AdminJobSeekerDetailContainer";
import { getJobSeeker } from "@/services/job-seeker-service";

export const dynamic = "force-dynamic";

export default async function JobSeekerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getJobSeeker(id);
  if (!res.success) notFound();
  return <AdminJobSeekerDetailContainer jobSeeker={res.data} />;
}
