import axios from "../../../../axios";

const handleGetListMovies = async () => {
  try {
    const response = await axios.get("/api/movies/get-all-movies");
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

const handleAddMovie = async (
  title,
  description,
  genreID,
  duration,
  country,
  cast,
  sTimeid,
) => {
  try {
    const response = await axios.post("/api/movies/create-new-movie/", null, {
      params: {
        title: title,
        description:description,
        genreID:genreID,
        duration:duration,
        country: country,
        cast: cast,
        sTimeid: sTimeid,
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
  title,
  description,
  genreID,
  duration,
  country,
  cast,
  sTimeid,
) => {
  try {
    const response = await axios.put("/api/movies/edit-movie/", null, {
      params: {
        title: title,
        description:description,
        genreID:genreID,
        duration:duration,
        country: country,
        cast: cast,
        sTimeid: sTimeid,
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

const handleDeleteMovie = async (userId) => {
  try {
    const response = await axios.delete("/api/movies/delete-movie", {
      params: {
        id: userId,
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
  handleAddMovie,
  handleEditMovie,
  handleDeleteMovie,
};
