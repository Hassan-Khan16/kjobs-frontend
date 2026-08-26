import Login from "@/components/login/Login";
import { AuthLayout } from "../../layout";
import { appRoutes } from "@/utils/endpoint";
import { userRole } from "@/enum/role";

export default function UserLoginPage() {
  return (
    <AuthLayout logoHref={appRoutes.home} backHref={appRoutes.home} backLabel="Back to home">
      <Login
        providerId="user-credentials"
        allowedRole={userRole.USER}
        successRedirect={appRoutes.userDashboard}
        registerHref={appRoutes.userRegister}
        registerLabel="Register"
        title="Welcome Back"
        subtitle="Sign in to find your next role"
        hideForgotPassword
        variant="admin"
      />
    </AuthLayout>
  );
}