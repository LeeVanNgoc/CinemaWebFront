import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// import material-ui
import { Container, Grid, FormControl } from "@mui/material";
import Brightness1SharpIcon from "@mui/icons-material/Brightness1Sharp";

// import project component
import CarouselComponent from "../../Common/Carousel/CarouselComponent";
import NewsCarousel from "../../Common/Carousel/NewsCarousel";
import MovieCard from "./MovieCard";
import { getMovies } from "../Admin/Movie/redux/actions/movieActions";
import { useDispatch, useSelector } from "react-redux";
import { StyledInput } from "./style";
import "./Home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(getMovies());
    };

    fetchMovies();
  }, [dispatch]);

  return (
    <>
      <CarouselComponent />

      <Container>
        <Grid container spacing={3}>
          <Grid item xs>
            <Grid container alignItems="flex-end">
              <Grid item xs={11}>
                <div className="section sticky">
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
              <MovieCard />
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
