import axios from "../../../../axios";

const handleGetListPosts = async () => {
  try {
    const response = await axios.get("/api/news/get-all-news");
    return response;
  } catch (error) {
    console.error("Error getting list of posts:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleGetPostByCode = async (postCode) => {
  try {
    const response = await axios.get("/api/news/get-news-by-code", null, {
      params: {
        postCode: postCode,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting post by id:", error);
    if (error.response) {
      return { error: error.response.data.message };
    } else if (error.request) {
      return { error: "No response from server" };
    } else {
      return { error: "Error setting up request" };
    }
  }
};

const handleCreatePost = async (title, content, image, link) => {
  try {
    const response = await axios.post("/api/news/create-new-news/", null, {
      params: {
        title: title,
        content: content,
        image: image,
        link: link,
      },
    });
    alert(response.message);
    return response;
  } catch (error) {
    console.error("Error creating post:", error);
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

const handleEditPost = async (postId, title, content, image, link) => {
  try {
    const response = await axios.put("/api/news/edit-news/", null, {
      params: {
        postId: postId,
        title: title,
        content: content,
        image: image,
        link: link,
      },
    });
    console.log(">>> edit post res: ", response);
    alert(response.message);
    return response;
  } catch (error) {
    console.error("Error editing post:", error);
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

const handleDeletePost = async (postCode) => {
  try {
    const response = await axios.delete("/api/news/delete-news", {
      params: {
        postCode: postCode,
      },
    });
    alert(response.message);
    return response;
  } catch (error) {
    console.error("Error deleting post:", error);
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
  handleGetListPosts,
  handleGetPostByCode,
  handleCreatePost,
  handleEditPost,
  handleDeletePost,
};
