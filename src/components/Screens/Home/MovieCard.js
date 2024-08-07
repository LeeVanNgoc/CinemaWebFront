import * as React from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMovie } from "../Admin/Movie/redux/actions/movieActions";
import { setPlanTime } from "../BookTicket/redux/actions/bookingAction";
import "./MovieCard.scss";

export default function MovieCard() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.manageMovies.movies.movies);
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("vi-VN");

  const handleClick = (movie) => {
    dispatch(setSelectedMovie(movie));
    dispatch(setPlanTime(movie.movieId));
    navigate("/bookticket");
  };

  return (
    <Grid container spacing={3}>
      {movies &&
        movies
          .filter((movie) => {
            const releaseDate = movie.releaseDate.split("T")[0];

            return releaseDate <= today; // Lọc phim có ngày phát hành nhỏ hơn ngày hiện tại
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
                      Hài, Hoạt hình, Phiêu lưu
                    </Typography>
                    <Typography variant="body2" color="grey">
                      {movie.releaseDate}
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
