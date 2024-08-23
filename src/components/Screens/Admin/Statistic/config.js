import axios from "../../../../axios";

export const handleScreeningCount = async (month, year) => {
  try {
    const response = await axios.get(
      "/api/plan-screen-movie/get-monthly-movie-stats",
      {
        params: {
          month: month,
          year: year,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error handling Screening Count:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

export const handleGetTotalRevenue = async (
  theaterCode,
  startDate,
  endDate
) => {
  try {
    const response = await axios.get(
      "/api/ticket/get-revenue-by-theater-and-date",
      {
        params: {
          theaterCode: theaterCode,
          startDate: startDate,
          endDate: endDate,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error handling:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

export const handleGetTotalRevenueAllTheater = async (startDate, endDate) => {
  try {
    const response = await axios.get("/api/ticket/get-revenue-by-date", {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    });
    return response;
  } catch (error) {
    console.error("Error handling:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

export const handleGetMovieRevenue = async (startDate, endDate) => {
  try {
    const response = await axios.get("/api/ticket/get-revenue-for-all-movie/", {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    });
    return response;
  } catch (error) {
    console.error("Error handling:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};
