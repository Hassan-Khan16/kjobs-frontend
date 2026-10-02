import { Suspense } from "react";
import { PublicLoginForm } from "@/components/auth/PublicLoginForm";
import { LoadingState } from "@/components/public/LoadingState";
import type { AccountRole } from "@/components/auth/AuthRoleSelector";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const initialRole: AccountRole = role === "employer" ? "employer" : "job-seeker";

  return (
    <Suspense fallback={<LoadingState className="pt-32" />}>
      <PublicLoginForm initialRole={initialRole} />
    </Suspense>
  );
}
