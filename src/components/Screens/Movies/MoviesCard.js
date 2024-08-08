import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMovie } from "../Admin/Movie/redux/actions/movieActions";
import { getPlanTime } from "../BookTicket/redux/actions/bookingAction";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Grid,
  // Box,
} from "@mui/material";

const MoviesCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.manageMovies.movies.movies);
  const dateScreen = useSelector((state) => state.userBookTicket.date);

  const handleClick = (movie) => {
    dispatch(setSelectedMovie(movie));
    dispatch(getPlanTime(dateScreen, movie.movieId));
    navigate("/bookticket");
  };

  return (
    <Grid container spacing={1}>
      {movies &&
        movies.map((movie, index) => (
          <Grid item xs={12} md={6} lg={6} key={index}>
            <Card
              sx={{
                maxHeight: "fit-content",
                height: "300px",
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
                  sx={{ marginBottom: 2 }}
                >
                  <Typography variant="caption" color="grey.500">
                    Hài, Hoạt hình, Phiêu lưu - {movie.duration} phút
                  </Typography>
                  <Chip
                    label="2D"
                    size="small"
                    sx={{ bgcolor: "grey.700", color: "white" }}
                  />
                </Grid>
                <Typography gutterBottom variant="h6" component="div">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="white">
                  Xuất xứ: {movie.country}
                </Typography>
                <Typography variant="body2" color="white">
                  Khởi chiếu: {movie.releaseDate.split("T")[0]}
                </Typography>
                <Typography variant="body2" color="red">
                  P - PHIM ĐƯỢC PHÉP PHỔ BIẾN ĐẾN NGƯỜI XEM Ở MỌI ĐỘ TUỔI.
                </Typography>

                {/* <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    mt: 2,
                    gap: 1,
                    justifyContent: "center",
                  }}
                >
                  {planTimes &&
                    planTimes.map((time, index) => (
                      <Button
                        key={index}
                        variant="contained"
                        size="small"
                        sx={{ bgcolor: "grey.700", width: "60px" }}
                      >
                        {time}
                      </Button>
                    ))}
                </Box> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default MoviesCard;
