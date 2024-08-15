import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MovieGrid.css";

const API_KEY = "49a5508b99e54cbf67438655e1565e32";
const API_BASE_URL = "https://api.themoviedb.org/3";

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);  // Navigate to the movie detail page
  };

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="movie-card"
          onClick={() => handleMovieClick(movie.id)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
