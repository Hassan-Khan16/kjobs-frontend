import { Suspense } from "react";
import { JobsListingPage } from "@/components/jobs/JobsListingPage";
import { LoadingState } from "@/components/public/LoadingState";

export default function JobsPage() {
  return (
    <Suspense fallback={<LoadingState className="pt-32" />}>
      <JobsListingPage />
    </Suspense>
  );
}
