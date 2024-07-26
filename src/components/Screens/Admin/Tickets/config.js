import axios from "../../../../axios";

const handleGetListTickets = async () => {
  try {
    const response = await axios.get("/api/ticket/get-list-tickets");
    return response;
  } catch (error) {
    console.error("Error getting list of tickets:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleCreateTicket = async (userId, psmId, price, bank, stId) => {
  try {
    const response = await axios.post("/api/ticket/create-ticket/", null, {
      params: {
        userId: userId,
        psmId: psmId,
        price: price,
        bank: bank,
        stId: stId,
      },
    });
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

const handleEditTicket = async (
  userId,
  firstName,
  lastName,
  userName,
  phonenumber,
  birthYear
) => {
  try {
    const response = await axios.put("/api/user/edit-user/", null, {
      params: {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        phonenumber: phonenumber,
        birthYear: birthYear,
      },
    });
    console.log(">>> edit user res: ", response);
    return response;
  } catch (error) {
    console.error("Error editing user:", error);
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

const handleDeleteTicket = async (userId) => {
  try {
    const response = await axios.delete("/api/user/delete-user", {
      params: {
        id: userId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting user:", error);
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
  handleGetListTickets,
  handleCreateTicket,
  handleEditTicket,
  handleDeleteTicket,
};
