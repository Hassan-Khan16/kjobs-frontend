import type { StateCreator } from "zustand";
import type { SessionUser } from "@/types/auth";

export type AuthSlice = {
  user: SessionUser | null;
  accessToken: string | null;
  setAuth: (payload: {
    user: SessionUser;
    accessToken: string;
  }) => void;
  clearAuth: () => void;
};

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  accessToken: null,
  setAuth: ({ user, accessToken }) => set({ user, accessToken }),
  clearAuth: () => set({ user: null, accessToken: null }),
});
