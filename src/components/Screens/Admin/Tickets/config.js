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

const handleCreateTicket = async (ticketId, psmId, price, bank, stId) => {
  try {
    const response = await axios.post("/api/ticket/create-ticket/", null, {
      params: {
        ticketId: ticketId,
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

const handleEditTicket = async (ticketId, stId, psmId, price, bank) => {
  try {
    const response = await axios.put("/api/ticket/edit-ticket/", null, {
      params: {
        ticketId: ticketId,
        stId: stId,
        psmId: psmId,
        price: price,
        bank: bank,
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

const handleDeleteTicket = async (ticketId) => {
  try {
    const response = await axios.delete("/api/ticket/delete-ticket", {
      params: {
        ticketId: ticketId,
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
