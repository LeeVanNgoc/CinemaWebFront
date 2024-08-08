import axios from "../../../axios";

// export const handleGetAllPlansByMovie = async (movieId) => {
//   try {
//     const response = await axios.get(
//       "/api/plan-screen-movie/get-all-plan-screen-id-by-movie-id/",
//       {
//         params: {
//           movieId: movieId,
//         },
//       }
//     );
//     return response;
//   } catch (error) {
//     if (error.response) {
//       return { error: error.response.data.message };
//     } else if (error.request) {
//       return { error: "No response from server" };
//     } else {
//       return { error: "Error setting up request" };
//     }
//   }
// };

// Trả về list các giờ chiếu từ mã phim và ngày chiếu
export const handleGetStartTime = async (dateScreen, movieId) => {
  try {
    const response = await axios.get("/api/plan-screen-movie/get-start-time/", {
      params: {
        dateScreen: dateScreen,
        movieId: movieId,
      },
    });
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

// Trả về mã lịch chiếu dựa trên phim, phòng, ngày giờ chiếu
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

// Trả về giá của từng ghế được chọn
export const handleGetCost = async (roomType, seatType, isWeekend) => {
  try {
    console.log("Check get cost", roomType, seatType, isWeekend);

    const response = await axios.get("/api/prices/get-cost/", {
      params: {
        roomType: roomType,
        seatType: seatType,
        isWeekend: isWeekend,
      },
    });
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

// Đặt vé
export const handleCreateTicket = async (
  userId,
  planScreenMovieId,
  seats,
  bank,
  totalPrice
) => {
  try {
    const response = await axios.post("/api/ticket/create-ticket/", null, {
      params: {
        userId: userId,
        planScreenMovieId: planScreenMovieId,
        seats: seats,
        bank: bank,
        totalPrice: totalPrice,
      },
    });
    alert(response.message);
    return response;
  } catch (error) {
    console.error("Error creating ticket:", error);
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
