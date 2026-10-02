import { redirect } from "next/navigation";
import { appRoutes } from "@/utils/endpoint";

export default function EmployerLoginRedirect() {
  redirect(`${appRoutes.login}?role=employer`);
}
