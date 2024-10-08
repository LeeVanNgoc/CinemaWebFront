import { toast } from "react-toastify";
import axios from "../../../axios";

// export const handleGetAllPlansByMovie = async (movieCode) => {
//   try {
//     const response = await axios.get(
//       "/api/plan-screen-movie/get-all-plan-screen-id-by-movie-id/",
//       {
//         params: {
//           movieCode: movieCode,
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
export const handleGetStartTimeAndRoom = async (
  dateScreen,
  movieCode,
  theaterCode
) => {
  try {
    const response = await axios.get("/api/plan-screen-movie/get-start-time/", {
      params: {
        dateScreen: dateScreen,
        movieCode: movieCode,
        theaterCode: theaterCode,
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
export const handleGetPlanCode = async (
  roomCode,
  movieCode,
  startTime,
  dateScreen,
  theaterCode
) => {
  try {
    const response = await axios.get(
      "/api/plan-screen-movie/get-all-plan-screen-code-for-create-ticket/",
      {
        params: {
          roomCode: roomCode,
          movieCode: movieCode,
          startTime: startTime,
          dateScreen: dateScreen,
          theaterCode: theaterCode,
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
export const handleGetCost = async (
  roomType,
  seatType,
  isWeekend,
  timeFrame
) => {
  try {
    const response = await axios.get("/api/prices/get-cost/", {
      params: {
        roomType: roomType,
        seatType: seatType,
        isWeekend: isWeekend,
        timeFrame: timeFrame,
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
  userCode,
  planScreenMovieCode,
  seats,
  bank,
  totalPrice
) => {
  try {
    const response = await axios.post("/api/ticket/create-ticket/", null, {
      params: {
        userCode: userCode,
        planScreenMovieCode: planScreenMovieCode,
        seats: seats,
        bank: bank,
        totalPrice: totalPrice,
      },
    });
    toast.success("Đặt vé thành công!");
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

export const handleGetRoomByCode = async (roomCode) => {
  try {
    const response = await axios.get("/api/room/get-room-by-code", {
      params: {
        roomCode: roomCode,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting room by ID:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

// Create Booked Seats
export const handleCreateBookedSeats = async (ticketCode) => {
  try {
    const response = await axios.post(
      "/api/bookedSeat/create-booked-seat/",
      null,
      {
        params: {
          ticketCode: ticketCode,
        },
      }
    );
    console.log(response);

    return response;
  } catch (error) {
    console.error("Error creating booked seats:", error);
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

// Trả về các ghế đã được đặt
export const handleGetBookedSeats = async (planScreenMovieCode) => {
  try {
    const response = await axios.get(
      "/api/bookedSeat/get-row-and-col-of-booked-seat/",
      {
        params: {
          planScreenMovieCode: planScreenMovieCode,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error getting booked seats:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

// Trả về các ghế trong 1 phòng
export const handleGetSeatsInRoom = async (roomCode) => {
  try {
    const response = await axios.get("/api/seats/get-seats-in-one-room/", {
      params: {
        roomCode: roomCode,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in fetching seats in a room:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

export const handleGetTrailerByMovieCode = async (movieCode) => {
  try {
    const response = await axios.get("/api/trailer/get-trailer-by-movie-code", {
      params: {
        movieCode: movieCode,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting trailer by movie Code:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

// Trả về hóa đơn vừa đặt
export const handleGetBill = async (ticketCode) => {
  try {
    const response = await axios.get("/api/ticket/get-ticket-details/", {
      params: {
        ticketCode: ticketCode,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting bill:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};
