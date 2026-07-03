import { create } from "zustand";

type FilterKeys = 'search' | 'region';

type FilterCountriesStore = {
  search: string;
  region: string;
  addFilter: (name:FilterKeys, val:string) => void;
  removeRegion: () => void;
};

export const useFilterCountriesStore = create<FilterCountriesStore>((set) => ({
  search: "",
  region: "",
  addFilter: (name, val) =>
    set((prev) => ({ ...prev, [name]: val } as FilterCountriesStore)),
  removeRegion: () => set({ region: "" }),
}));