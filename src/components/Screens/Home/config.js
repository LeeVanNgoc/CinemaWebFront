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

export const getMovieByDate = async (date) => {
  try {
    const res = await axios.get(
      "/api/plan-screen-movie/get-movie-details-by-date",
      {
        params: { dateScreen: date },
      }
    );
    console.log("movie details", res);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};
