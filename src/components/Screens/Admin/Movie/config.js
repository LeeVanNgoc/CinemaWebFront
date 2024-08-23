import { toast } from "react-toastify";
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

export const handleGetMovieByCode = async (movieCode) => {
  try {
    const response = await axios.get("/api/movie/get-movie-by-code", {
      params: { movieCode: movieCode },
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

export const handleCreateMovie = async (
  title,
  description,
  releaseDate,
  duration,
  country,
  genreCode,
  image
) => {
  try {
    const response = await axios.post("/api/movie/create-new-movie", null, {
      params: {
        title: title,
        description: description,
        releaseDate: releaseDate,
        duration: duration,
        country: country,
        genreCode: genreCode,
        image: image,
      },
    });
    toast.success(response.message);
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
};

export const handleDeleteMovie = async (movieCode) => {
  try {
    const response = await axios.delete(`/api/movie/delete-movie`, {
      params: { movieCode: movieCode },
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
};

export const handleEditMovie = async (
  movieCode,
  title,
  description,
  duration,
  country,
  genreCode,
  releaseDate,
  image
) => {
  try {
    const response = await axios.put(`/api/movie/edit-movie`, null, {
      params: {
        movieCode: movieCode,
        title: title,
        description: description,
        duration: duration,
        country: country,
        genreCode: genreCode,
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
};

export const handleGetListMoviesTitleAndCode = async () => {
  try {
    const response = await axios.get(
      "/api/movie/get-list-movies-title-and-code"
    );
    console.log("List movies: ", response.movies);

    return response;
  } catch (error) {
    console.error("Error getting list of movies title and code:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};
