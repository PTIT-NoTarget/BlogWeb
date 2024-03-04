import { create } from "zustand";

export const useBaseStore = create((set) => ({
  title : "Home",
  setTitle: (title) => set({title}),
}));
