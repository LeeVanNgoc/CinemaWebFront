import axios from "../../../../axios";

const handleGetListTrailers = async () => {
  try {
    const response = await axios.get("/api/trailer/get-all-trailers");
    return response;
  } catch (error) {
    console.error("Error getting list of trailers:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleGetTrailerById = async (trailerId) => {
  try {
    const response = await axios.get("/api/trailer/get-trailer-by-id", null, {
      params: {
        trailerId: trailerId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting trailer by ID:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleCreateTrailer = async (movieId, link) => {
  try {
    const response = await axios.post("/api/trailer/create-trailer/", null, {
      params: {
        movieId: movieId,
        link: link,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating trailer:", error);
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

const handleEditTrailer = async (trailerId, movieId, link) => {
  try {
    const response = await axios.put("/api/trailer/edit-trailer/", null, {
      params: {
        trailerId: trailerId,
        movieId: movieId,
        link: link,
      },
    });
    console.log(">>> edit trailer res: ", response);
    return response;
  } catch (error) {
    console.error("Error editing trailer:", error);
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

const handleGetTitleMovieByMovieId = async (movieId) => {
  try {
    const response = await axios.get("/api/movie/get-movie-by-id", {
      params: {
        movieId: movieId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting title movie by movie ID:", error);
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
  handleGetListTrailers,
  handleGetTrailerById,
  handleCreateTrailer,
  handleEditTrailer,
  handleGetTitleMovieByMovieId,
};
