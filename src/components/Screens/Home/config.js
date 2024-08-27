import axios from "../../../axios";

export const getMovieByDateAndTheater = async (theaterCode, date) => {
  try {
    const res = await axios.get(
      "/api/plan-screen-movie/get-screening-schedule",
      {
        params: { theaterCode: theaterCode, dateScreen: date },
      }
    );
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

// fetch movies for Home
export const getMovieByTheater = async (theaterCode) => {
  try {
    const res = await axios.get(
      "/api/movie-theaters/get-all-movie-from-theater",
      {
        params: { theaterCode: theaterCode },
      }
    );
    return res;
  } catch (error) {
    console.log(error.message);
  }
};
