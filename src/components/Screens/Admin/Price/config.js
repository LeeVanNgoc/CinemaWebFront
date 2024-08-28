import { toast } from "react-toastify";
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

const handleGetPriceByCode = async (priceCode) => {
  try {
    const response = await axios.get("/api/prices/get-price-by-code", null, {
      params: {
        priceCode: priceCode,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting price by code:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleCreatePrice = async (cost, roomType, seatType, timeFrame, isWeekend) => {
  try {
    const response = await axios.post("/api/prices/create-price/", null, {
      params: {
        cost: cost,
        roomType: roomType,
        seatType: seatType,
        timeFrame: timeFrame,
        isWeekend: isWeekend,
      },
    });
    toast.success(response.message);
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
  priceCode,
  cost,
  roomType,
  seatType,
  isWeekend
) => {
  try {
    const response = await axios.put("/api/prices/edit-price/", null, {
      params: {
        priceCode: priceCode,
        cost: cost,
        roomType: roomType,
        seatType: seatType,
        isWeekend: isWeekend,
      },
    });
    console.log(">>> edit price res: ", response);
    toast.success(response.message);
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

const handleDeletePrice = async (priceCode) => {
  try {
    const response = await axios.delete("/api/prices/delete-price", {
      params: {
        priceCode: priceCode,
      },
    });
    toast.success(response.message);
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
  handleGetPriceByCode,
  handleCreatePrice,
  handleEditPrice,
  handleDeletePrice,
};
