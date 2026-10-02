import { JobDetailsPage } from "@/components/jobs/JobDetailsPage";

export default async function JobDetailsRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <JobDetailsPage jobId={id} />;
}
