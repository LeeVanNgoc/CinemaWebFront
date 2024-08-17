import { getMovieByDate } from "../../config";

export const FETCH_MOVIES_BY_DATE = "FETCH_MOVIES_BY_DATE";

export const fetchMoviesByDate = (date) => {
  return async (dispatch, getState) => {
    try {
      const res = await getMovieByDate(date);
      console.log("movie by date: ", res);
      if (res && res.errCode === 0) {
        const formattedData = res.movies.map((element) => ({
          movieCode: element.movie.movieCode,
          title: element.movie.title,
          description: element.movie.description,
          duration: element.movie.duration,
          country: element.movie.country,
          //   releaseDate: item.releaseDate,
          image: element.movie.image,
          genreName: element.movie.genreName,
        }));
        dispatch({
          type: FETCH_MOVIES_BY_DATE,
          payload: { formattedData },
        });
      }
    } catch (error) {
      console.error("Error fetching movies by date:", error);
    }
  };
};
