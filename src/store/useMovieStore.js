import { create } from 'zustand';

const useMovieStore = create((set) => ({
  movie: JSON.parse(localStorage.getItem('lastMovie')) || null,
  setMovie: (newMovie) => {
    set({ movie: newMovie });
    localStorage.setItem('lastMovie', JSON.stringify(newMovie));
  },
}));

export default useMovieStore;
