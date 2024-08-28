import { getMovieByDateAndTheater, getMovieByTheater } from "../../config";

export const FETCH_MOVIES_BY_DATE_AND_THEATER =
  "FETCH_MOVIES_BY_DATE_AND_THEATER";
export const FETCH_MOVIES_BY_THEATER = "FETCH_MOVIES_BY_THEATER";
export const FETCH_MOVIES_ERROR = "FETCH_MOVIES_ERROR";
export const CLEAR_MOVIES = "CLEAR_MOVIES";

export const fetchMoviesByDateAndTheater = (theaterCode, date) => {
  return async (dispatch, getState) => {
    try {
      const res = await getMovieByDateAndTheater(theaterCode, date);
      console.log("movie by date: ", res);
      if (res && res.errCode === 0) {
        const formattedData = res.schedule.filter(Boolean).map((element) => ({
          planScreenMovieCode: element.screenings.planScreenMovieCode,
          roomCode: element.screenings[0].roomCode,
          roomType: element.screenings[0].roomType,
          movieCode: element.movieCode,
          title: element.movieTitle,
          description: element.movieDescription,
          duration: element.movieDuration,
          country: element.movieCountry,
          releaseDate: element.movieReleaseDate,
          image: element.movieImage,
          startTime: element.screenings[0].startTime,
          endTime: element.screenings[0].endTime,
        }));
        dispatch({
          type: FETCH_MOVIES_BY_DATE_AND_THEATER,
          payload: { formattedData },
        });
      } else {
        dispatch({
          type: FETCH_MOVIES_ERROR,
          payload: "Không có suất chiếu!",
        });
      }
    } catch (error) {
      console.error("Error fetching movies by date:", error);
    }
  };
};

// fetch movies for Home
export const fetchMoviesByTheater = (theaterCode) => {
  return async (dispatch, getState) => {
    try {
      const res = await getMovieByTheater(theaterCode);
      console.log("movie by theater: ", res);
      if (res && res.errCode === 0) {
        const formattedData = res.allMovieTheaters
          .filter(Boolean)
          .map((element) => ({
            movieCode: element.movieCode,
            title: element.title,
            description: element.description,
            duration: element.duration,
            country: element.country,
            releaseDate: element.releaseDate,
            image: element.image,
          }));
        dispatch({
          type: FETCH_MOVIES_BY_THEATER,
          payload: { formattedData },
        });
      }
    } catch (error) {
      console.error("Error fetching movies by theater:", error);
    }
  };
};

export const clearMovies = () => ({
  type: CLEAR_MOVIES,
});
