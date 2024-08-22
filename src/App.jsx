import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './assets/tmdb.svg';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieId, setMovieId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setLoading(true);
      axios
        .get(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=cfe422613b250f702980a3bbf9e90716`)
        .then((response) => {
          if (response.data.results.length > 0) {
            const foundMovie = response.data.results[0];
            setMovieId(foundMovie.id);
          } else {
            setMovieId(null);
            setSelectedMovie(null);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setMovieId(null);
          setSelectedMovie(null);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (movieId) {
      axios
        .get(`https://api.themoviedb.org/3/movie/${movieId}?&api_key=cfe422613b250f702980a3bbf9e90716`)
        .then((response) => {
          setSelectedMovie(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setSelectedMovie(null);
          setLoading(false);
        });
    }
  }, [movieId]);

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${selectedMovie ? `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}` : ''})`,
        fontFamily: 'Lato, sans-serif',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

      <div className="relative w-full h-full flex flex-col items-center justify-center px-6 text-white font-lato space-y-8">
        <div className="flex items-center justify-between w-full max-w-4xl">
          <img src={logo} alt="TMDB" className="w-32 opacity-90" />
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full max-w-xs p-3 rounded-lg bg-gray-800 bg-opacity-60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
          />
        </div>

        {loading ? (
          <p className="text-2xl animate-pulse">Loading...</p>
        ) : selectedMovie ? (
          <div className="w-full max-w-4xl flex flex-col md:flex-row bg-black bg-opacity-70 rounded-lg shadow-2xl overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="w-full md:w-1/2 object-cover transform transition-transform duration-500 hover:scale-110"
            />
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h1 className="text-5xl font-bold leading-tight">{selectedMovie.title}</h1>
                <p className="text-green-500 font-semibold mt-2">{selectedMovie.tagline}</p>
              </div>
              <p className="text-gray-300">{selectedMovie.overview}</p>
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-green-500">Genres: </span>
                {selectedMovie.genres?.map((genre) => genre.name).join(', ') || 'N/A'}
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-green-500">Production: </span>
                {selectedMovie.production_companies?.map((company) => company.name).join(', ') || 'N/A'}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                <div>
                  <p>Original Release:</p>
                  <p className="text-white">{selectedMovie.release_date}</p>
                </div>
                <div className="text-right">
                  <p>Running Time:</p>
                  <p className="text-white">{selectedMovie.runtime} mins</p>
                </div>
                <div>
                  <p>Box Office:</p>
                  <p className="text-white">${selectedMovie.revenue.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p>Vote Average:</p>
                  <p className="text-white">{selectedMovie.vote_average}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-2xl">No movie found. Please try a different search term.</p>
        )}

        <footer className="absolute bottom-0 left-0 w-full py-4 text-center text-sm bg-black bg-opacity-60">
          <p>
            Created by{' '}
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:underline">
              Hưng Võ
            </a>
          </p>
          <div className="mt-2 space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:underline">
              View Code
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:underline">
              Google Play Store
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:underline">
              Apple App Store
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
