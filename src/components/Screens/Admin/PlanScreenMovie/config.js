import axios from "../../../../axios";

const handleGetListPlans = async () => {
  try {
    const response = await axios.get(
      "/api/plan-screen-movie/get-all-plan-screen-movies"
    );
    return response;
  } catch (error) {
    console.error("Error getting list of plans:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleGetListPlansInformation = async () => {
  try {
    const response = await axios.get(
      "/api/plan-screen-movie/get-list-plan-information"
    );
    return response;
  } catch (error) {
    console.error("Error getting list of plans information:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};
const handleCreatePlan = async (roomId, movieId, dateScreen, startTime) => {
  try {
    const response = await axios.post(
      "/api/plan-screen-movie/create-plan-screen-with-movie/",
      null,
      {
        params: {
          roomId: roomId,
          movieId: movieId,
          schedule: { dateScreen: dateScreen, startTime: startTime },
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating plan:", error);
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

const handleEditPlan = async (
  planScreenMovieId,
  roomId,
  movieId,
  dateScreen,
  startTime
) => {
  try {
    const response = await axios.put(
      "/api/plan-screen-movie/edit-plan-screen-movie/",
      null,
      {
        params: {
          planScreenMovieId: planScreenMovieId,
          roomId: roomId,
          movieId: movieId,
          schedule: {
            dateScreen: dateScreen,
            startTime: startTime,
          },
        },
      }
    );

    console.log(">>> edit plan res: ", response);
    return response;
  } catch (error) {
    console.error("Error editing plan:", error);
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

const handleDeletePlan = async (planScreenMovieId) => {
  try {
    const response = await axios.delete(
      "/api/plan-screen-movie/delete-plan-screen-movie",
      {
        params: {
          planScreenMovieId: planScreenMovieId,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error deleting plan:", error);
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
  handleGetListPlans,
  handleCreatePlan,
  handleEditPlan,
  handleDeletePlan,
  handleGetTitleMovieByMovieCode,
  handleGetListPlansInformation,
};
