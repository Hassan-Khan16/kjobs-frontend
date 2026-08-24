import Login from "@/components/login/Login";
import { AuthLayout } from "../../(auth)/layout";
import { appRoutes } from "@/utils/endpoint";
import { userRole } from "@/enum/role";

export default function AdminLoginPage() {
  return (
    <AuthLayout logoHref={appRoutes.adminLogin}>
      <Login
        providerId="admin-credentials"
        allowedRole={userRole.ADMIN}
        successRedirect={appRoutes.adminDashboard}
        title="Welcome Back"
        subtitle="Sign in to the admin panel"
        hideForgotPassword
        variant="admin"
      />
    </AuthLayout>
  );
}
