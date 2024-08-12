import axios from "../../../../axios";

const handleGetListMovies = async () => {
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

const handleGetMovieById = async (movieId) => {
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

const handleAddMovie = async (
  title,
  description,
  duration,
  country,
  releaseDate,
  image,
  genreId
) => {
  try {
    const response = await axios.post("/api/movie/create-new-movie/", null, {
      params: {
        title: title,
        description: description,
        duration: duration,
        country: country,
        releaseDate: releaseDate,
        image: image,
        genreId: genreId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error adding movie:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleEditMovie = async (
  movieId,
  title,
  description,
  duration,
  country,
  releaseDate,
  image,
  genreId
) => {
  try {
    const response = await axios.put("/api/movie/edit-movie/", null, {
      params: {
        movieId: movieId,
        title: title,
        description: description,
        duration: duration,
        country: country,
        releaseDate: releaseDate,
        image: image,
        genreId: genreId,
      },
    });
    console.log(">>> edit movie res: ", response);
    return response;
  } catch (error) {
    console.error("Error editing movie:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleDeleteMovie = async (movieId) => {
  try {
    const response = await axios.delete("/api/movie/delete-movie", {
      params: {
        id: movieId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting movie:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

export {
  handleGetListMovies,
  handleGetMovieById,
  handleAddMovie,
  handleEditMovie,
  handleDeleteMovie,
};
