import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './assets/tmdb.svg';
import { searchMovie, getMovieDetails } from './API';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 0) {
      const results = await searchMovie(e.target.value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = async (movieId) => {
    setLoading(true);
    const movieDetails = await getMovieDetails(movieId);
    setSelectedMovie(movieDetails);
    setLoading(false);
    setSuggestions([]);
    setSearchTerm(''); // Clear the input after selection
  };

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
          <a href="#"><img src={logo} alt="TMDB" className="w-32 opacity-90" /></a>
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchTerm}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-gray-800 bg-opacity-60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
            />
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-2 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                {suggestions.map((movie) => (
                  <li
                    key={movie.id}
                    onClick={() => handleSuggestionClick(movie.id)}
                    className="p-2 cursor-pointer hover:bg-gray-700"
                  >
                    {movie.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
          <p className="text-2xl">No movie selected. Please try searching for a movie.</p>
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
