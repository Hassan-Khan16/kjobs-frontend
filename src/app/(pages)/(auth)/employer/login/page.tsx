import Login from "@/components/login/Login";
import { AuthLayout } from "../../layout";
import { appRoutes } from "@/utils/endpoint";
import { userRole } from "@/enum/role";

export default function EmployerLoginPage() {
  return (
    <AuthLayout logoHref={appRoutes.home}>
      <Login
        providerId="employer-credentials"
        allowedRole={userRole.EMPLOYER}
        successRedirect={appRoutes.employerDashboard}
        registerHref={appRoutes.employerRegister}
        registerLabel="Register your company"
        title="Employer Sign In"
        subtitle="Manage jobs and applications"
        hideForgotPassword
        variant="admin"
      />
    </AuthLayout>
  );
}