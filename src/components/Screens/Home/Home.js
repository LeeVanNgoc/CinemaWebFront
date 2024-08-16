import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import material-ui
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Container, Grid } from "@mui/material";
import Brightness1SharpIcon from "@mui/icons-material/Brightness1Sharp";
// import project component
import CarouselComponent from "../../Common/Carousel/CarouselComponent";
import NewsCarousel from "../../Common/Carousel/NewsCarousel";
import MovieCard from "./MovieCard";
import { getMovies } from "../Admin/Movie/redux/actions/movieActions";
import { useDispatch, useSelector } from "react-redux";
import "./Home.scss";
import { getMovieByTitle } from "./config";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.manageMovies.movies.movies);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(getMovies());
    };

    fetchMovies();
  }, [dispatch]);

  return (
    <>
      <CarouselComponent />
      <div className="box-border translate-x-1/3 sticky top-0">
        {movies && movies.length > 0 && (
          <div>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={movies.map((movie) => ({
                label: movie.title,
              }))}
              onChange={(event, newValue) => {
                setQuery(newValue);
              }}
              sx={{ width: 300, backgroundColor: "white" }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
            <Button>Tìm kiếm</Button>
          </div>
        )}
      </div>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs>
            <Grid container alignItems="flex-end">
              <Grid item xs={11}>
                <div className="section">
                  <Brightness1SharpIcon
                    sx={{ color: "#dc1313f0", marginRight: "7px" }}
                  />
                  <span>Phim đang chiếu</span>
                </div>
              </Grid>
              <Grid item xs>
                <div className="link">
                  <span
                    onClick={() => {
                      navigate("/movies");
                    }}
                  >
                    Xem tất cả
                  </span>
                </div>
              </Grid>
            </Grid>
            <Grid item>
              <MovieCard query={query.label} />
            </Grid>
          </Grid>
          <Grid item xs={2.5}>
            <Grid container alignItems="flex-end">
              <Grid item xs>
                <div className="section">
                  <span>Tin tức</span>
                </div>
              </Grid>
              <Grid item xs={4.1}>
                <div className="link">
                  <span
                    onClick={() => {
                      navigate("/news");
                    }}
                  >
                    Xem tất cả
                  </span>
                </div>
              </Grid>
            </Grid>
            <Grid item>
              <NewsCarousel />
            </Grid>
          </Grid>
        </Grid>

        <div className="section">
          <Brightness1SharpIcon
            sx={{ color: "#dc1313f0", marginRight: "7px" }}
          />
          <span>Phim sắp chiếu</span>
        </div>
        <MovieCard />
      </Container>
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
};

export default Home;
