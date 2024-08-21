import axios from "../../../axios";

export const getMovieByDate = async (date) => {
  try {
    const res = await axios.get(
      "/api/plan-screen-movie/get-movie-details-by-date",
      {
        params: { dateScreen: date },
      }
    );
    return res;
  } catch (error) {
    console.log(error.message);
  }
};
