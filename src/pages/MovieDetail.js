import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./MovieDetail.css";
import { FaStar } from "react-icons/fa";  // Import the star icon

const API_KEY = "49a5508b99e54cbf67438655e1565e32";
const API_BASE_URL = "https://api.themoviedb.org/3";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movieResponse = await axios.get(
          `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(movieResponse.data);

        const trailerResponse = await axios.get(
          `${API_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const trailers = trailerResponse.data.results;
        const youtubeTrailer = trailers.find(
          (trailer) => trailer.site === "YouTube" && trailer.type === "Trailer"
        );
        setTrailer(youtubeTrailer);
      } catch (error) {
        setError("Error fetching movie details or trailer");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);  // Movie rating is out of 10, convert it to 5-star system
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="star full" />);
      } else {
        stars.push(<FaStar key={i} className="star empty" />);
      }
    }
    return stars;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-detail">
      {movie && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-detail__poster"
          />
          <div className="movie-detail__info">
            <h1>{movie.title}</h1>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <p><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}</p>
            <p>
              <strong>Rating:</strong>
              <span className="movie-detail__rating">
                {renderStars(movie.vote_average)} {movie.vote_average}
              </span>
            </p>
          </div>
        </>
      )}

      {trailer && (
        <div className="movie-detail__trailer">
          <h2>Trailer</h2>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Movie Trailer"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
