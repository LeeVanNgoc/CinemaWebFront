import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../Movie/redux/actions/movieActions";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";

export default function TotalMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.manageMovies.movies.movies);

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(getMovies());
    };

    fetchMovies();
  }, []);

  return (
    <div
      className=" box-border translate-y-6 rounded-2xl p-2 text-white flex flex-row gap-3"
      style={{ background: "linear-gradient(to bottom, #262C36, #1B1E24)" }}
    >
      <MovieFilterIcon sx={{ fontSize: "4rem", color: "yellow" }} />
      <div className="flex flex-col text-sm">
        {movies && <p className="font-bold text-2xl">{movies.length}</p>}
        <span>Phim đang chiếu</span>
      </div>
    </div>
  );
}
