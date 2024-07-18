import React from "react";
import { Container, Grid } from "@mui/material";
import CarouselComponent from "../../Common/Carousel/CarouselComponent";
import Brightness1SharpIcon from "@mui/icons-material/Brightness1Sharp";
import MovieCard from "./MovieCard";
import "./Home.scss";

const Home = () => {
  return (
    <>
      <CarouselComponent />
      <Container>
        <div className="section">
          <Brightness1SharpIcon
            sx={{ color: "#dc1313f0", marginRight: "9px" }}
          />
          <span>Phim đang chiếu</span>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <MovieCard />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MovieCard />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MovieCard />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MovieCard />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MovieCard />
          </Grid>
        </Grid>

        <div className="section">
          <Brightness1SharpIcon
            sx={{ color: "#dc1313f0", marginRight: "9px" }}
          />
          <span>Phim sắp chiếu</span>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <MovieCard />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
