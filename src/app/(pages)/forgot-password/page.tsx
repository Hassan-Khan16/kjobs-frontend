import AuthLayout from "../(auth)/layout";
import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="max-w-md w-full mt-24 p-8 bg-background rounded-[20px] border border-gray-105">
        <AdminPageHeader
          title="Forgot Password"
          subtitle="Password reset will be available when the API is implemented."
        />
        <Link
          href="/admin/login"
          className="mt-6 inline-block text-sm text-dark-blue underline"
        >
          Back to login
        </Link>
      </div>
    </AuthLayout>
  );
}
