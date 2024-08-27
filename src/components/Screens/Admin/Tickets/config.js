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

const handleCreateTicket = async (
  ticketCode,
  planScreenMovieCode,
  userCode,
  seats,
  bank,
  totalPrice
) => {
  try {
    const response = await axios.post("/api/ticket/create-ticket/", null, {
      params: {
        ticketCode: ticketCode,
        planScreenMovieCode: planScreenMovieCode,
        userCode: userCode,
        seats: seats,
        bank: bank,
        totalPrice: totalPrice,
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
  ticketCode,
  planScreenMovieCode,
  price,
  bank,
  totalPrice
) => {
  try {
    const response = await axios.put("/api/ticket/edit-ticket/", null, {
      params: {
        ticketCode: ticketCode,
        planScreenMovieCode: planScreenMovieCode,
        price: price,
        bank: bank,
        totalPrice: totalPrice,
      },
    });
    console.log(">>> edit ticket res: ", response);
    return response;
  } catch (error) {
    console.error("Error editing ticket:", error);
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

const handleDeleteTicket = async (ticketCode) => {
  try {
    const response = await axios.delete("/api/ticket/delete-ticket", {
      params: {
        ticketCode: ticketCode,
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting ticket:", error);
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
