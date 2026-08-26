import EmployerRegister from "@/components/register/EmployerRegister";
import { AuthLayout } from "../../layout";
import { appRoutes } from "@/utils/endpoint";

export default function EmployerRegisterPage() {
  return (
    <AuthLayout
      logoHref={appRoutes.home}
      backHref={appRoutes.employerLogin}
      backLabel="Back to sign in"
    >
      <EmployerRegister />
    </AuthLayout>
  );
}
