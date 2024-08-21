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

const handleGetTrailerByCode = async (trailerCode) => {
  try {
    const response = await axios.get("/api/trailer/get-trailer-by-code", null, {
      params: {
        trailerCode: trailerCode,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting trailer by Code:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleCreateTrailer = async (movieCode, link) => {
  try {
    const response = await axios.post("/api/trailer/create-trailer/", null, {
      params: {
        movieCode: movieCode,
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

const handleEditTrailer = async (trailerCode, movieCode, link) => {
  console.log("MovieCode : ", movieCode, link);

  try {
    const response = await axios.put("/api/trailer/edit-trailer/", null, {
      params: {
        trailerCode: trailerCode,
        movieCode: movieCode,
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

const handleGetTitleMovieByMovieCode = async (movieCode) => {
  try {
    const response = await axios.get("/api/movie/get-movie-by-code", {
      params: {
        movieCode: movieCode,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting title movie by movie Code:", error);
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
  handleGetTrailerByCode,
  handleCreateTrailer,
  handleEditTrailer,
  handleGetTitleMovieByMovieCode,
};
