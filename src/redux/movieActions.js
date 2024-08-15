// src/redux/movieActions.js
import axios from "axios";

const API_KEY = "49a5508b99e54cbf67438655e1565e32";
const API_BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = (category) => async (dispatch) => {
  try {
    let endpoint;
    switch (category) {
      case "action":
        endpoint = "/discover/movie?with_genres=28";
        break;
      case "adventure":
        endpoint = "/discover/movie?with_genres=12";
        break;
      case "comedy":
        endpoint = "/discover/movie?with_genres=35";
        break;
        case "Drama":
        endpoint = "/discover/movie?with_genres=18";
        break;
        
        case "Animation":
            endpoint = "/discover/movie?with_genres=16";
            break;
        case "Musical":
            endpoint = "/discover/movie?with_genres=10402";
            break;
        case "Historical":
            endpoint = "/discover/movie?with_genres=36";
            break;
        case "Family":
            endpoint = "/discover/movie?with_genres=10751";
            break;
      case "popular":
      default:
        endpoint = "/movie/popular";
    }

    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    dispatch({
      type: "SET_MOVIES",
      payload: { category, movies: response.data.results },
    });
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
  }
};

export const searchMovies = (query) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        query: query,
        page: 1,
      },
    });
    dispatch({ type: "SET_SEARCH_RESULTS", payload: response.data.results });
  } catch (error) {
    console.error(`Error searching movies:`, error);
  }
};