import axios from "../../../axios";

export const handleGetAllPlansByMovie = async (movieId) => {
  try {
    const response = await axios.get(
      "/api/plan-screen-movie/get-all-plan-screen-id-by-movie-id/",
      {
        params: {
          movieId: movieId,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

export const handleGetPlanById = async (planScreenMovieId) => {
  try {
    const response = await axios.get(
      "/api/plan-screen-movie/get-plan-screen-movie-by-id/",
      {
        params: {
          planScreenMovieId: planScreenMovieId,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

export const handleGetPlanId = async (
  roomId,
  movieId,
  startTime,
  dateScreen
) => {
  try {
    const response = await axios.get(
      "/api/plan-screen-movie/get-all-plan-screen-id-for-create-ticket/",
      {
        params: {
          roomId: roomId,
          movieId: movieId,
          startTime: startTime,
          dateScreen: dateScreen,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};
