import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ModalScreenTrailer from "../Admin/Trailer/ModalScreenTrailer";

import {
  setSelectedTrailer,
  clearSelectedTrailer,
} from "../Admin/Trailer/redux/actions/trailerActions";
import { handleGetTrailerByMovieCode } from "./config";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function MovieDetail() {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.manageMovies.selectedMovie);
  const [trailerLink, setTrailerLink] = useState("");
  const [trailer, setTrailer] = useState("");

  const [openScreenTrailer, setOpenScreenTrailer] = useState(false);
  const handleOpenScreenTrailer = (trailer) => {
    dispatch(setSelectedTrailer(trailer));
    setOpenScreenTrailer(true);
  };

  const handleCloseScreenTrailer = () => {
    setOpenScreenTrailer(false);
    dispatch(clearSelectedTrailer());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchTrailer = await handleGetTrailerByMovieCode(movie.movieCode);
        const trailers = fetchTrailer.trailer;

        if (trailers && trailers.length > 0) {
          setTrailerLink(trailers[0].link);
          setTrailer(trailers[0]);
        } else {
          setTrailerLink("");
        }
      } catch (error) {
        console.error("Error fetching trailer: ", error);
      }
    };

    fetchData();
  }, [movie.movieCode]);

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        marginTop: "50px",
        maxWidth: "60%",
        height: "fit-content",
        flexGrow: 1,
        bgcolor: "transparent",
        boxShadow: "none",
        color: "white",
      }}
    >
      <Grid container spacing={4}>
        <Grid item>
          <Img
            alt="complex"
            src={movie.image}
            sx={{ borderRadius: "10px", height: "40vh" }}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <div styles={{ color: "white" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold", marginBottom: "15px" }}
                >
                  {movie.title}
                  <Chip
                    label="2D"
                    size="medium"
                    sx={{
                      marginLeft: "20px",
                      bgcolor: "transparent",
                      color: "white",
                      border: "1px solid white",
                      borderRadius: "10px",
                    }}
                  />
                </Typography>

                <Typography variant="body2" gutterBottom>
                  Hài, Hoạt hình, Phiêu lưu - {movie.country} - {movie.duration}{" "}
                  phút
                  <br />
                  Khởi chiếu: {movie.releaseDate}
                  <br />
                  <br />
                  {movie.description}
                </Typography>
              </div>

              <Typography variant="body2" color="red" sx={{ mb: 2 }}>
                <br />
                Khuyến cáo: P - PHIM ĐƯỢC PHÉP PHỔ BIẾN ĐẾN NGƯỜI XEM Ở MỌI ĐỘ
                TUỔI.
              </Typography>

              <div>
                <ModalScreenTrailer
                  isOpen={openScreenTrailer}
                  link={trailerLink}
                  movieCode={movie.movieCode}
                  handleOpen={() => handleOpenScreenTrailer(trailer)}
                  handleClose={handleCloseScreenTrailer}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
