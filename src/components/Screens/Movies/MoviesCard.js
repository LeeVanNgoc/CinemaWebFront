import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Grid,
} from "@mui/material";
import { setSelectedMovie } from "../Admin/Movie/redux/actions/movieActions";
import {
  clearMovies,
  fetchMoviesByDateAndTheater,
} from "../Home/redux/actions/movieDetailActions";
import { handleGetGenresForMovie } from "../Admin/Genre/config";

const MoviesCard = (query) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [genres, setGenres] = useState({});

  const theater = useSelector((state) => state.theaterHeader.theater);
  const movies = useSelector((state) => state.home.movieScreens);
  const errMess = useSelector((state) => state.home.errorMessage);
  const dateScreen = useSelector((state) => state.userBookTicket.date);

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(fetchMoviesByDateAndTheater(theater, dateScreen));
    };

    fetchMovies();
    dispatch(clearMovies());
  }, [theater, dateScreen]);

  useEffect(() => {
    const fetchGenresForAllMovies = async () => {
      for (const movie of movies) {
        if (movie.movieCode) {
          try {
            const res = await handleGetGenresForMovie(movie.movieCode);
            if (res && res.movieGenre) {
              setGenres((prevGenres) => ({
                ...prevGenres,
                [movie.movieCode]: res.movieGenre
                  .map((item) => item.name)
                  .join(", "),
              }));
            }
          } catch (error) {
            console.error("Error fetching genres:", error);
          }
        }
      }
    };

    if (movies && movies.length > 0) {
      fetchGenresForAllMovies();
    }
  }, []);

  const handleClick = (movie) => {
    dispatch(setSelectedMovie(movie));
    navigate("/bookticket");
  };

  return (
    <Grid container spacing={1}>
      {movies && movies.length > 0 ? (
        movies
          .filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.movieCode === movie.movieCode)
          )
          .filter((movie) => {
            if (query.query === "") {
              return movies;
            } else if (
              movie.title &&
              movie.title.toLowerCase().includes(query.query)
            ) {
              return movie;
            }
          })
          .map((movie, index) => (
            <Grid item xs={12} md={6} lg={6} key={index}>
              <Card
                sx={{
                  maxHeight: "fit-content",
                  height: "250px",
                  bgcolor: "grey.900",
                  color: "white",
                  margin: "10px",
                  display: "flex",
                  flexDirection: "row",
                  border: "1px solid gray",
                  cursor: "pointer",
                }}
                onClick={() => handleClick(movie)}
              >
                <CardMedia
                  component="img"
                  image={movie.image}
                  alt="Movie Poster"
                  sx={{ height: "100%", width: "auto", maxWidth: "200px" }}
                />
                <CardContent>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="caption" color="grey.500">
                      {genres[movie.movieCode] || "Đang tải..."} -{" "}
                      {movie.duration} phút
                    </Typography>
                    <Chip
                      label={movie.roomType}
                      size="small"
                      sx={{ bgcolor: "grey.700", color: "white" }}
                    />
                  </Grid>
                  <div className="flex flex-col h-full align-middle gap-3">
                    <Typography gutterBottom variant="h6" component="div">
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" color="white">
                      Xuất xứ: {movie.country}
                      <br />
                      Khởi chiếu: {movie.releaseDate.slice(0, 10)}
                    </Typography>
                    <Typography variant="body2" color="red">
                      P - PHIM ĐƯỢC PHÉP PHỔ BIẾN ĐẾN NGƯỜI XEM Ở MỌI ĐỘ TUỔI.
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
      ) : (
        <div className=" w-full box-border translate-x-0">{errMess}</div>
      )}
    </Grid>
  );
};

export default MoviesCard;
