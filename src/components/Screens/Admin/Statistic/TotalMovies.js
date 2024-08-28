import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../Movie/redux/actions/movieActions";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { jwtDecode } from "jwt-decode";
import { fetchMoviesByTheater } from "../../Home/redux/actions/movieDetailActions";

export default function TotalMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.manageMovies.movies.movies);
  const moviesInTheater = useSelector((state) => state.home.moviesInTheater);

  let decoded = "";
  if (localStorage.token) {
    decoded = jwtDecode(localStorage.token);
  }
  const fetchMovies = async () => {
    dispatch(getMovies());
  };
  const fetchMoviesInTheater = async (theaterCode) => {
    dispatch(fetchMoviesByTheater(theaterCode));
  };

  useEffect(() => {
    if (decoded.theaterCode) {
      fetchMoviesInTheater(decoded.theaterCode);
    } else {
      fetchMovies();
    }
  }, []);

  return (
    <div
      className=" box-border translate-y-6 rounded-2xl p-2 text-white flex flex-row gap-3"
      style={{ background: "linear-gradient(to bottom, #262C36, #1B1E24)" }}
    >
      <MovieFilterIcon sx={{ fontSize: "4rem", color: "yellow" }} />
      <div className="flex flex-col text-sm">
        {!decoded.theaterCode && movies ? (
          <p className="font-bold text-2xl">{movies.length}</p>
        ) : moviesInTheater ? (
          <p className="font-bold text-2xl">{moviesInTheater.length}</p>
        ) : null}
        <span>Phim đang chiếu</span>
      </div>
    </div>
  );
}
