import { redirect } from "next/navigation";
import { appRoutes } from "@/utils/endpoint";

export default function UserRegisterRedirect() {
  redirect(`${appRoutes.register}?role=job-seeker`);
}
