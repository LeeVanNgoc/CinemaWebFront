import * as React from "react";
import MoviesCard from "./MoviesCard";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Brightness1SharpIcon from "@mui/icons-material/Brightness1Sharp";
import { Container, Grid } from "@mui/material";
import "./Movies.scss";

const Movies = () => {
  const today = new Date();
  const getNextDay = (current) => {
    const nextDay = new Date(current);
    nextDay.setDate(current.getDate() + 1);
    return nextDay;
  };

  const tomorrow = getNextDay(today);
  const nextTomorrow = getNextDay(tomorrow);

  return (
    <div className="movies-container">
      <div className="section-name">
        <Brightness1SharpIcon sx={{ color: "#dc1313f0", marginRight: "9px" }} />
        <span>Phim đang chiếu</span>
      </div>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button>{today.toLocaleDateString("vi-VN")}</Button>
        <Button>{tomorrow.toLocaleDateString("vi-VN")}</Button>
        <Button>{nextTomorrow.toLocaleDateString("vi-VN")}</Button>
      </ButtonGroup>
      <div style={{ color: "#d65712", marginTop: "10px" }}>
        Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và
        Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
      </div>

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={6}>
            <MoviesCard />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MoviesCard />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Movies;
