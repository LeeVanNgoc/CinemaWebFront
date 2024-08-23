import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getMovies,
  setSelectedMovie,
} from "../Admin/Movie/redux/actions/movieActions";
import { handleGetGenresForMovie } from "../Admin/Genre/config";
import "./MovieCard.scss";

export default function MovieCard(status) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.manageMovies.movies.movies);
  const [genres, setGenres] = useState({});

  const handleClick = (movie) => {
    dispatch(setSelectedMovie(movie));
    navigate("/bookticket");
  };

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(getMovies());
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchGenresForAllMovies = async () => {
      for (const movie of movies) {
        if (movie.movieCode) {
          try {
            const res = await handleGetGenresForMovie(movie.movieCode);
            if (res && res.movieGenre && res.movieGenre.length > 0) {
              setGenres((prevGenres) => ({
                ...prevGenres,
                [movie.movieCode]: res.movieGenre.map((item) => item.name).join(", "),
              }));
            }
          } catch (error) {
            console.error("Error fetching genres:", error);
          }
        }
      }
    };

    if (movies.length > 0) {
      fetchGenresForAllMovies();
    }
  }, [movies]);

  return (
    <Grid container spacing={3}>
      {movies &&
        movies
          .filter((movie) => {
            if (status.status === "showing") {
              // Lọc ra những phim có ngày phát hành trong vòng 2 tháng trở lại so với ngày hiện tại
              const releaseDate = new Date(movie.releaseDate.split("T")[0]);
              const daysDifference =
                (new Date() - releaseDate) / (1000 * 60 * 60 * 24);
              return releaseDate <= new Date() && daysDifference <= 60
                ? movie
                : null;
            } else if (status.status === "upcoming") {
              return new Date(movie.releaseDate.split("T")[0]) > new Date()
                ? movie
                : null;
            }
          })
          .map((movie, index) => (
            <Grid item xs={9.5} sm={6} md={4} lg={3} key={index}>
              <Card
                className="image-card"
                sx={{
                  width: "100%", // Đảm bảo card chiếm hết chiều rộng của grid item
                  backgroundColor: "transparent",
                  color: "white",
                }}
                onClick={() => handleClick(movie)}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={movie.image}
                    alt={movie.title}
                    sx={{ borderRadius: "20px", height: "400px" }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="grey">
                      {genres[movie.movieCode]  || "Đang tải..."}
                    </Typography>
                    <Typography variant="body2" color="grey">
                      {movie.releaseDate.split("T")[0]}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {movie.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
    </Grid>
  );
}
