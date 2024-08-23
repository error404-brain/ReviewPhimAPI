// store/useSearchStore.js
import { create } from 'zustand';

const useSearchStore = create((set) => ({
  searchTerm: '',
  suggestions: [],
  loading: false,

  setSearchTerm: (term) => set({ searchTerm: term }),
  setSuggestions: (suggestions) => set({ suggestions }),
  setLoading: (loading) => set({ loading }),
}));

export default useSearchStore;
