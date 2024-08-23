import axios from "../../../../axios";

const handleGetGenresForMovie = async (movieCode) => {
    try {
      const response = await axios.get("/api/movie-genres/get-all-genres-for-movie", {
        params: {
          movieCode: movieCode,
        },
      });
      return response;
    } catch (error) {
      console.error("Error getting genres for movie:", error);
      if (error.response) {
        return { error: error.response.data.message };
      } else if (error.request) {
        return { error: "No response from server" };
      } else {
        return { error: "Error setting up request" };
      }
    }
  };

const handleCreateMovieGenre = async (movieCode, genreCode) => {
    try {
      const response = await axios.post("/api/movie-genres/create-new-movie-genre", null, {
        params: {
          movieCode: movieCode,
          genreCode: genreCode,
        },
      });
      return response;
    } catch (error) {
      console.error("Error creating movie genre:", error);
      if (error.response) {
        return { error: error.response.data.message };
      } else if (error.request) {
        return { error: "No response from server" };
      } else {
        return { error: "Error setting up request" };
      }
    }
  };
  
const handleDeleteMovieGenre = async (movieCode, genreCode) => {
    try {
      const response = await axios.delete("/api/movie-genres/delete-movie-genre", null, {
        params: {
          movieCode: movieCode,
          genreCode: genreCode,
        },
      });
      return response;
    } catch (error) {
      console.error("Error deleting movie genre:", error);
      if (error.response) {
        return { error: error.response.data.message };
      } else if (error.request) {
        return { error: "No response from server" };
      } else {
        return { error: "Error setting up request" };
      }
    }
  };

const handleGetAllMovieGenres = async () => {
    try {
      const response = await axios.get("/api/movie-genres/get-all-movie-genres");
      return response;
    } catch (error) {
      console.error("Error getting all movie genres:", error);
      if (error.response) {
        return { error: error.response.data.message };
      } else if (error.request) {
        return { error: "No response from server" };
      } else {
        return { error: "Error setting up request" };
      }
    }
  };

const handleGetAllGenres = async () => {
  try {
    const response = await axios.get("/api/genre/get-all-genres");
    return response;
  } catch (error) {
    console.error("Error getting all genres:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

export {
    handleGetGenresForMovie,
    handleCreateMovieGenre,
    handleDeleteMovieGenre,
    handleGetAllMovieGenres,
    handleGetAllGenres,
};
