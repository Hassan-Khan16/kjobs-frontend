import { notFound } from "next/navigation";
import AdminJobListingDetailContainer from "@/components/admin-job-listing-management/AdminJobListingDetailContainer";
import { getJobListingById } from "@/services/job-listing-service";

export const dynamic = "force-dynamic";

export default async function JobListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getJobListingById(id);
  if (!res.success) notFound();
  return <AdminJobListingDetailContainer job={res.data} />;
}
