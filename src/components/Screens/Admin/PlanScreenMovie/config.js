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
const handleCreatePlan = async (
  roomCode,
  movieCode,
  dateScreen,
  startTime,
  endTime
) => {
  try {
    const response = await axios.post(
      "/api/plan-screen-movie/create-plan-screen-movie",
      null,
      {
        params: {
          roomCode: roomCode,
          movieCode: movieCode,
          dateScreen: dateScreen,
          startTime: startTime,
          endTime: endTime,
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
  planScreenMovieCode,
  roomCode,
  movieCode,
  dateScreen,
  startTime,
  endTime
) => {
  console.log(
    "Plan Screen Movie Code : ",
    planScreenMovieCode,
    roomCode,
    movieCode,
    dateScreen,
    startTime,
    endTime
  );

  try {
    const response = await axios.put(
      "/api/plan-screen-movie/edit-plan-screen-movie/",
      null,
      {
        params: {
          planScreenMovieCode: planScreenMovieCode,
          roomCode: roomCode,
          movieCode: movieCode,
          dateScreen: dateScreen,
          startTime: startTime,
          endTime: endTime,
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

const handleDeletePlan = async (planScreenMovieCode) => {
  try {
    const response = await axios.delete(
      "/api/plan-screen-movie/delete-plan-screen-movie",
      {
        params: {
          planScreenMovieCode: planScreenMovieCode,
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
