import { redirect } from "next/navigation";
import { appRoutes } from "@/utils/endpoint";

export default function UserLoginRedirect() {
  redirect(`${appRoutes.login}?role=job-seeker`);
}
