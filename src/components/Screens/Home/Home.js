import React, { useEffect } from "react";
import { Container } from "@mui/material";
import CarouselComponent from "../../Common/Carousel/CarouselComponent";
import NewsCarousel from "../../Common/Carousel/NewsCarousel";
import Brightness1SharpIcon from "@mui/icons-material/Brightness1Sharp";
import MovieCard from "./MovieCard";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import { useDispatch } from "react-redux";
import {
  setSelectedMovie,
  clearSelectedMovie,
  getMovies,
} from "../Admin/Movie/redux/actions/movieActions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(getMovies());
    };

    fetchMovies();
  }, []);

  return (
    <>
      <CarouselComponent />

      <Container>
        <Grid container spacing={0.5}>
          <Grid xs container columnSpacing={3}>
            <Grid container xs={12} alignItems="flex-end">
              <Grid item xs={10.7}>
                <div className="section" style={{ paddingLeft: "20px" }}>
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
                    Xem tất cả</span>
                </div>
              </Grid>
            </Grid>
            <Grid item>
              <MovieCard />
            </Grid>
            <Grid item>
              <MovieCard />
            </Grid>
            <Grid item>
              <MovieCard />
            </Grid>
            <Grid item>
              <MovieCard />
            </Grid>
            <Grid item>
              <MovieCard />
            </Grid>
          </Grid>
          <Grid xs={2.5}>
            <Grid container alignItems="flex-end">
              <Grid item xs={8}>
                <div className="section">
                  <span>Tin tức</span>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className='link'>
                  <span
                    onClick={() => {
                      navigate("/news");
                    }}
                  >
                    Xem tất cả</span>
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
        <div className="section">
          <Brightness1SharpIcon
            sx={{ color: "#dc1313f0", marginRight: "9px" }}
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
