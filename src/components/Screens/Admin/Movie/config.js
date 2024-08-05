import axios from "../../../../axios";

export const handleGetListMovies = async () => {
  try {
    const response = await axios.get("/api/movie/get-all-movies");
    return response;
  } catch (error) {
    console.error("Error getting list of movies:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

export const handleGetMovieById = async (movieId) => {
  try {
    const response = await axios.get("/api/movie/get-movie-by-id", {
      params: { movieId: movieId },
    });
    return response;
  } catch (error) {
    console.error("Error getting movie by id:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};
