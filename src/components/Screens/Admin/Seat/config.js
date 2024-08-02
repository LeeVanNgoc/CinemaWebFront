import axios from "../../../../axios";

const handleGetListSeats = async () => {
  try {
    const response = await axios.get("/api/seats/get-seats");
    return response;
  } catch (error) {
    console.error("Error getting list of seats:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleGetSeatById = async (seatId) => {
  try {
    const response = await axios.get("/api/seat/get-seat-by-id", null, {
      params: {
        seatId: seatId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting seat by ID:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleCreateSeat = async (type, roomId, row, col, isAvailable) => {
  try {
    const response = await axios.post("/api/seat/create-seat/", null, {
      params: {
        type: type,
        roomId: roomId,
        row: row,
        col: col,
        isAvailable: isAvailable,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating seat:", error);
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

const handleEditSeat = async (seatId, type, roomId, row, col, isAvailable) => {
  try {
    const response = await axios.put("/api/seat/edit-seat/", null, {
      params: {
        seatId: seatId,
        type: type,
        roomId: roomId,
        row: row,
        col: col,
        isAvailable: isAvailable,
      },
    });
    console.log(">>> edit seat res: ", response);
    return response;
  } catch (error) {
    console.error("Error editing seat:", error);
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
  handleGetListSeats,
  handleGetSeatById,
  handleCreateSeat,
  handleEditSeat,
};
