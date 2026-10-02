import { delay } from "@/helper/local-store";
import type { ContactPayload } from "@/types/public-job";

export async function submitContactMessage(
  payload: ContactPayload,
): Promise<{ success: boolean; message: string }> {
  await delay(500);
  if (!payload.name.trim() || !payload.email.trim() || !payload.message.trim()) {
    return { success: false, message: "Please complete the required fields." };
  }
  return {
    success: true,
    message: "Thanks for reaching out. We'll get back to you within 24 hours.",
  };
}
