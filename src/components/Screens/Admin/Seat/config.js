import { toast } from "react-toastify";
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

const handleGetSeatByCode = async (seatCode) => {
  try {
    const response = await axios.get("/api/seats/get-seat-by-code", {
      params: {
        seatCode: seatCode,
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

const handleGetSeatsInOneRoom = async (roomCode) => {
  try {
    const response = await axios.get("/api/seats/get-seats-in-one-room", {
      params: {
        roomCode: roomCode,
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

const handleCreateSeat = async (type, roomCode, row, col, isAvailable) => {
  try {
    const response = await axios.post("/api/seats/create-seat/", null, {
      params: {
        type: type,
        roomCode: roomCode,
        row: row,
        col: col,
        isAvailable: isAvailable,
      },
    });
    toast.success("Tạo ghế thành công!");
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

const handleAddMultipleSeats = async (data) => {
  try {
    const response = await axios.post("/api/seats/create-multiple-seat", {
      rows: data,
    });
    toast.success("Tạo ghế thành công!");
    console.log("Create seats: ", response);
    return response;
  } catch (error) {
    console.error("Error creating seats:", error);
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

const handleEditSeats = async (data) => {
  try {
    const response = await axios.put("/api/seats/edit-multiple-seat", {
      rows: data,
    });
    toast.success("Cập nhật ghế thành công!");
    console.log(">>> edit seats res: ", response);
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

const handleDeleteAllSeatsInRoom = async (roomCode) => {
  try {
    const response = await axios.delete(
      "/api/seats/delete-seat-in-room",

      { params: { roomCode: roomCode } }
    );
    toast.success("Xóa ghế thành công!");
    console.log(">>> delete seats res: ", response);
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
  handleGetSeatByCode,
  handleCreateSeat,
  handleAddMultipleSeats,
  handleEditSeats,
  handleGetSeatsInOneRoom,
  handleDeleteAllSeatsInRoom,
};
