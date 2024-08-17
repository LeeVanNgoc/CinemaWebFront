import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMovie } from "../Admin/Movie/redux/actions/movieActions";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Grid,
} from "@mui/material";

const MoviesCard = (query) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.home.movies);
  // const movies = useSelector((state) => state.manageMovies.movies.movies);

  const handleClick = (movie) => {
    dispatch(setSelectedMovie(movie));
    navigate("/bookticket");
  };

  return (
    <Grid container spacing={1}>
      {movies &&
        movies
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
                  height: "280px",
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
                      {movie.genreName} - {movie.duration} phút
                    </Typography>
                    <Chip
                      label="2D"
                      size="small"
                      sx={{ bgcolor: "grey.700", color: "white" }}
                    />
                  </Grid>
                  <div className="box-border translate-y-0">
                    <Typography gutterBottom variant="h6" component="div">
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" color="white">
                      Xuất xứ: {movie.country}
                    </Typography>
                    <Typography variant="body2" color="white">
                      Khởi chiếu: {/* {movie.releaseDate.split("T")[0]} */}
                    </Typography>
                    <Typography variant="body2" color="red">
                      P - PHIM ĐƯỢC PHÉP PHỔ BIẾN ĐẾN NGƯỜI XEM Ở MỌI ĐỘ TUỔI.
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
    </Grid>
  );
};

export default MoviesCard;
