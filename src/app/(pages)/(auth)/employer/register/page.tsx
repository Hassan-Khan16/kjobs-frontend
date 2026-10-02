import { redirect } from "next/navigation";
import { appRoutes } from "@/utils/endpoint";

export default function EmployerRegisterRedirect() {
  redirect(`${appRoutes.register}?role=employer`);
}
