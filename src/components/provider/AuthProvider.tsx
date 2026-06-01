"use client";

import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useStore } from "@/store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider refetchOnWindowFocus={false} refetchInterval={60}>
      <InnerAuthProvider>{children}</InnerAuthProvider>
    </SessionProvider>
  );
}

function InnerAuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setAuth = useStore((state) => state.setAuth);
  const clearAuth = useStore((state) => state.clearAuth);

  useEffect(() => {
    if (session?.user && session.accessToken) {
      setAuth({ user: session.user, accessToken: session.accessToken });
    } else {
      clearAuth();
    }
  }, [session?.user, session?.accessToken, setAuth, clearAuth]);

  return <>{children}</>;
}
