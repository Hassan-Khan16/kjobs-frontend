import { PublicRegisterForm } from "@/components/auth/PublicRegisterForm";
import type { AccountRole } from "@/components/auth/AuthRoleSelector";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const initialRole: AccountRole = role === "employer" ? "employer" : "job-seeker";
  return <PublicRegisterForm initialRole={initialRole} />;
}
