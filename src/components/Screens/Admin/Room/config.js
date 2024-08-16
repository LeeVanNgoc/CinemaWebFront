import axios from "../../../../axios";

const handleGetListRoom = async () => {
  try {
    const response = await axios.get("/api/room/get-all-rooms");
    return response;
  } catch (error) {
    console.error("Error getting list of rooms:", error);

    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleGetRoomCode = async (roomCode) => {
  try {
    const response = await axios.get("/api/room/get-room-by-code", null, {
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

const handleCreateRoom = async (
  theaterCode,
  type,
  numberSeats,
  isAvailable
) => {
  try {
    const response = await axios.post("/api/room/create-new-room/", null, {
      params: {
        theaterCode: theaterCode,
        type: type,
        numberSeats: numberSeats,
        isAvailable: isAvailable,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating room:", error);

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

const handleEditRoom = async (
  roomCode,
  theaterCode,
  type,
  numberSeats,
  isAvailable
) => {
  try {
    const response = await axios.put("/api/room/edit-room/", null, {
      params: {
        roomCode: roomCode,
        theaterCode: theaterCode,
        type: type,
        numberSeats: numberSeats,
        isAvailable: isAvailable,
      },
    });
    console.log(">>> edit room res: ", response);
    return response;
  } catch (error) {
    console.error("Error editing room:", error);

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

const handleUpdateNumberSeats = async (roomCode) => {
  try {
    const response = await axios.get("api/room/update-number-seat-in-room", {
      params: {
        roomCode: roomCode,
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating number seats:", error);
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
  handleGetListRoom,
  handleGetRoomCode,
  handleCreateRoom,
  handleEditRoom,
  handleUpdateNumberSeats,
};
