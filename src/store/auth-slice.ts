import type { StateCreator } from "zustand";
import type { AdminSessionUser } from "@/types/auth";

export type AuthSlice = {
  user: AdminSessionUser | null;
  accessToken: string | null;
  setAuth: (payload: {
    user: AdminSessionUser;
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
