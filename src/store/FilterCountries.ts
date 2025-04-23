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
  addFilter: (name:string, val:string) => set({[name]: val}),
  removeRegion: () => set({region : ""})
}))