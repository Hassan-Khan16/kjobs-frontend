import UserRegister from "@/components/register/UserRegister";
import { AuthLayout } from "../../layout";
import { appRoutes } from "@/utils/endpoint";

export default function UserRegisterPage() {
  return (
    <AuthLayout logoHref={appRoutes.home}>
      <UserRegister />
    </AuthLayout>
  );
}
