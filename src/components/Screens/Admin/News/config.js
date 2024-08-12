import axios from "../../../../axios";

export const handleGetListNews = async () => {
  try {
    const response = await axios.get("/api/news/get-all-news");
    return response;
  } catch (error) {
    console.error("Error getting list of news:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

export const handleGetNewsById = async (postId) => {
  try {
    const response = await axios.get("/api/news/get-news-by-id", {
      params: { postId: postId },
    });
    return response;
  } catch (error) {
    console.error("Error getting news by id:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};
