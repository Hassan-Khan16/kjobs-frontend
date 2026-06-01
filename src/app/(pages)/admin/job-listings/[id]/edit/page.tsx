import { notFound } from "next/navigation";
import AdminJobListingFormContainer from "@/components/admin-job-listing-management/AdminJobListingFormContainer";
import { getJobListingById } from "@/services/job-listing-service";

export const dynamic = "force-dynamic";

export default async function EditJobListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getJobListingById(id);
  if (!res.success) notFound();
  return <AdminJobListingFormContainer mode="edit" initial={res.data} />;
}
