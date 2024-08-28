import axios from "../../../axios";

export const handleGetHistory = async (userCode) => {
  try {
    const res = await axios.get("/api/ticket/get-all-ticket-for-all-user", {
      params: { userCode: userCode },
    });
    console.log("history: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
