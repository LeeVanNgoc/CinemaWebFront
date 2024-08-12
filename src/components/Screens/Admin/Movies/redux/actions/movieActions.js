import { handleGetListMovies } from "../../config";

export const SET_SELECTED_MOVIE = "SET_SELECTED_MOVIE";
export const CLEAR_SELECTED_MOVIE = "CLEAR_SELECTED_MOVIE";
export const GET_MOVIES = "GET_MOVIES";
export const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";
export const MOVIE_REFRESH = "MOVIE_REFRESH";

export const setSelectedMovie = (movie) => {
  localStorage.setItem("selectedMovie", JSON.stringify(movie));
  return async (dispatch, getState) => {
    dispatch({ type: SET_SELECTED_MOVIE, payload: movie });
  };
};

export const clearSelectedMovie = () => ({
  type: CLEAR_SELECTED_MOVIE,
});

export const handleRefreshMovie = () => {
  return async (dispatch, getState) => {
    dispatch({ type: MOVIE_REFRESH });
  };
};

export const getMovies = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "GET_MOVIES" });
    try {
      let res = await handleGetListMovies();
      console.log("res list movies >>>", res);
      if (res && res.movies) {
        const formattedData = res.movies.map((item) => ({
          movieId: item.movieId,
          title: item.title,
          description: item.description,
          duration: item.duration,
          country: item.country,
          releaseDate: item.releaseDate,
          image: item.image,
          genreId: item.genreId,
        }));
        dispatch({
          type: "GET_MOVIES_SUCCESS",
          payload: { formattedData },
        });
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
};
