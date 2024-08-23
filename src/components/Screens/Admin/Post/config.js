import { toast } from "react-toastify";
import axios from "../../../../axios";

const handleGetListPosts = async () => {
  try {
    const response = await axios.get("/api/posts/get-all-posts");
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
    const response = await axios.get("/api/posts/get-post-by-code", null, {
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
    const response = await axios.post("/api/posts/create-new-post/", null, {
      params: {
        title: title,
        content: content,
        image: image,
        link: link,
      },
    });
    toast.success(response.message);
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

const handleEditPost = async (postCode, title, content, image, link) => {
  try {
    const response = await axios.put("/api/posts/edit-post/", null, {
      params: {
        postCode: postCode,
        title: title,
        content: content,
        image: image,
        link: link,
      },
    });
    console.log(">>> edit post res: ", response);
    toast.success(response.message);
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
    const response = await axios.delete("/api/posts/delete-post", {
      params: {
        postCode: postCode,
      },
    });
    toast.success(response.message);
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
