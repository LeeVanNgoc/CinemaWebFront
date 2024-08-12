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

export const handleCreateMovie = async (title, description, releaseDate, duration, country, genreId, image) => {
  try {
    const response = await axios.post("/api/movie/create-new-movie", null, {
      params: {
        title: title, 
        description: description,
        releaseDate: releaseDate, 
        duration: duration, 
        country: country,
        genreID: genreId,
        image: image
      }
    });
    alert(response.message);
    return response;
  } catch (error) {
    console.error("Error adding movie:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
}

export const handleDeleteMovie = async (movieId) => {
  try {
    const response = await axios.delete(`/api/movie/delete-movie`, {
      params: { movieId: movieId },
    });
    return response;
  } catch (error) {
    console.error("Error deleting movie:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
}

export const handleEditMovie = async (movieId, title, description, duration, country, genreId, releaseDate, image) => {
  try {
    const response = await axios.put(`/api/movie/edit-movie`, null, {
      params: {
        movieId: movieId,
        title: title,
        description: description,
        duration: duration,
        country: country,
        genreId: genreId,
        releaseDate: releaseDate,
        image: image,
      },
    });
    return response;
  } catch (error) {
    console.error("Error editing movie:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
}