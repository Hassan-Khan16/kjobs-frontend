"use client";

import { useSession } from "next-auth/react";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function EmployerDashboardPage() {
  const { data: session } = useSession();
  const name = session?.user?.name ?? "there";

  return (
    <div className="max-w-2xl mx-auto rounded-[10px] border border-gray-105 bg-background p-8">
      <Heading variant="h4" className="text-foreground">
        Welcome, {name}
      </Heading>
      <Text variant="p4" className="mt-2 text-muted-foreground">
        Your employer dashboard is ready. Job listings and application
        management will be available here in a future update.
      </Text>
    </div>
  );
}
