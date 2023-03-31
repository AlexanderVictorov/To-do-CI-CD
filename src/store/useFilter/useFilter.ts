import { create } from 'zustand';

export interface IFilter {
  filter: string;
  setFilter: (filter: string) => void;
}

export const useFilter = create<IFilter>((set) => ({
  filter: 'all',
  setFilter: (filter) => set({ filter }),
}));