import axios from "../../../../axios";

const handleGetListTheaters = async () => {
  try {
    const response = await axios.get("/api/theater/get-theater");
    return response;
  } catch (error) {
    console.error("Error getting list of theaters:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleGetTheaterById = async (theaterId) => {
  try {
    const response = await axios.get("/api/theater/get-theaters-by-id", null, {
      params: {
        theaterId: theaterId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting theater by ID:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleGetTheaterByCity = async (city) => {
  try {
    const response = await axios.get(
      "/api/theater/get-theaters-by-city",
      null,
      {
        params: {
          city: city,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error getting theater by city:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleCreateTheater = async (name, address, city) => {
  try {
    const response = await axios.post("/api/theater/create-theater/", null, {
      params: {
        name: name,
        address: address,
        city: city,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating theater:", error);
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

const handleEditTheater = async (theaterId, name, address, city) => {
  try {
    const response = await axios.put("/api/theater/edit-theater/", null, {
      params: {
        theaterId: theaterId,
        name: name,
        address: address,
        city: city,
      },
    });
    console.log(">>> edit theater res: ", response);
    return response;
  } catch (error) {
    console.error("Error editing theater:", error);
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

const handleDeleteTheater = async (theaterId) => {
  try {
    const response = await axios.delete("/api/theater/delete-theater", {
      params: {
        theaterId: theaterId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting theater:", error);
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
  handleGetListTheaters,
  handleGetTheaterById,
  handleGetTheaterByCity,
  handleCreateTheater,
  handleEditTheater,
  handleDeleteTheater,
};
