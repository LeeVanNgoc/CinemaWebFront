import * as React from "react";
import ShowtimesCard from "./ShowtimesCard";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Brightness1SharpIcon from "@mui/icons-material/Brightness1Sharp";
import { Container, Grid } from "@mui/material";
import "./Showtimes.scss";

const Showtimes = () => {
  const current = new Date();
  const date1 = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const date2 = `${current.getDate() + 1}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const date3 = `${current.getDate() + 2}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <div className="showtimes-container">
      <div className="section-name">
        <Brightness1SharpIcon sx={{ color: "#dc1313f0", marginRight: "9px" }} />
        <span>Phim đang chiếu</span>
      </div>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button>{date1}</Button>
        <Button>{date2}</Button>
        <Button>{date3}</Button>
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
            <ShowtimesCard />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <ShowtimesCard />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Showtimes;
