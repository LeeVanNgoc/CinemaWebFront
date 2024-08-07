import React, { useEffect } from "react";
import { Container } from "@mui/material";
import CarouselComponent from "../../Common/Carousel/CarouselComponent";
import Brightness1SharpIcon from "@mui/icons-material/Brightness1Sharp";
import MovieCard from "./MovieCard";
import { ToastContainer } from "react-toastify";
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
