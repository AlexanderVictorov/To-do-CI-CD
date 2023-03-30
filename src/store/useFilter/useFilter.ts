import { create } from 'zustand';

interface IFilter {
  filter: string;
  setFilter: (filter: string) => void;
}

export const useFilter = create<IFilter>((set, get) => ({
  filter: 'all',
  setFilter: (filter) => set({ filter }),
}));