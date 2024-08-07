import axios from "../../../../axios";

const handleGetListPrices = async () => {
  try {
    const response = await axios.get("/api/prices/get-all-prices");
    return response;
  } catch (error) {
    console.error("Error getting list of prices:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleGetPriceById = async (priceId) => {
  try {
    const response = await axios.get("/api/prices/get-price-by-id", null, {
      params: {
        priceId: priceId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting price by id:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleCreatePrice = async (cost, roomType, seatType, isWeekend) => {
  try {
    const response = await axios.post("/api/prices/create-price/", null, {
      params: {
        cost: cost,
        roomType: roomType,
        seatType: seatType,
        isWeekend: isWeekend,
      },
    });
    alert(response.message);
    return response;
  } catch (error) {
    console.error("Error creating price:", error);
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

const handleEditPrice = async (
  priceId,
  cost,
  roomType,
  seatType,
  isWeekend
) => {
  try {
    const response = await axios.put("/api/prices/edit-price/", null, {
      params: {
        priceId: priceId,
        cost: cost,
        roomType: roomType,
        seatType: seatType,
        isWeekend: isWeekend,
      },
    });
    console.log(">>> edit price res: ", response);
    alert(response.message);
    return response;
  } catch (error) {
    console.error("Error editing price:", error);
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

const handleDeletePrice = async (priceId) => {
  try {
    const response = await axios.delete("/api/prices/delete-price", {
      params: {
        priceId: priceId,
      },
    });
    alert(response.message);
    return response;
  } catch (error) {
    console.error("Error deleting price:", error);
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
  handleGetListPrices,
  handleGetPriceById,
  handleCreatePrice,
  handleEditPrice,
  handleDeletePrice,
};
