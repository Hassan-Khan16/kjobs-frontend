import { AuthLayout } from "../(auth)/layout";
import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import { appRoutes } from "@/utils/endpoint";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      backHref={appRoutes.adminLogin}
      backLabel="Back to sign in"
    >
      <div className="max-w-md w-full mt-24 p-8 bg-background rounded-[20px] border border-gray-105">
        <AdminPageHeader
          title="Forgot Password"
          subtitle="Password reset will be available when the API is implemented."
        />
      </div>
    </AuthLayout>
  );
}
