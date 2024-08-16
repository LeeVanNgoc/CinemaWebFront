import axios from "../../../axios";

export const getMovieByTitle = async (title) => {
  try {
    const res = await axios.get("/api/movie/get-movie-by-title", {
      params: { title: title },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};
