import { create } from "zustand";
import { createAuthSlice, type AuthSlice } from "./auth-slice";

export type StoreState = AuthSlice;

export const useStore = create<StoreState>()((...args) => ({
  ...createAuthSlice(...args),
}));
