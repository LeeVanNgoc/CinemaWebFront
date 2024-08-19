import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MoviesCard from "./MoviesCard";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Brightness1SharpIcon from "@mui/icons-material/Brightness1Sharp";
import { Container, FormControl } from "@mui/material";
import { StyledInput } from "./style";
import "./Movies.scss";
import { setDate } from "../BookTicket/redux/actions/bookingAction";

const Movies = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const today = new Date();
  const getNextDay = (current) => {
    const nextDay = new Date(current);
    nextDay.setDate(current.getDate() + 1);
    return nextDay;
  };

  const tomorrow = getNextDay(today);
  const nextTomorrow = getNextDay(tomorrow);

  useEffect(() => {
    dispatch(setDate(today.toISOString().slice(0, 10)));
  }, []);

  return (
    <div className="movies-container">
      <div className="section-name flex flex-row justify-around">
        <span>
          <Brightness1SharpIcon
            sx={{ color: "#dc1313f0", marginRight: "9px" }}
          />
          Phim đang chiếu
        </span>
        <span>
          <FormControl defaultValue="">
            <StyledInput
              placeholder="Tìm kiếm..."
              onChange={(event) => setQuery(event.target.value)}
            />
          </FormControl>
        </span>
      </div>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button
          // className="button1"
          onClick={() => dispatch(setDate(today.toISOString().slice(0, 10)))}
        >
          {today.toLocaleDateString("vi-VN")}
        </Button>
        <Button
          onClick={() => dispatch(setDate(tomorrow.toISOString().slice(0, 10)))}
        >
          {tomorrow.toLocaleDateString("vi-VN")}
        </Button>
        <Button
          onClick={() =>
            dispatch(setDate(nextTomorrow.toISOString().slice(0, 10)))
          }
        >
          {nextTomorrow.toLocaleDateString("vi-VN")}
        </Button>
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
        <MoviesCard query={query} />
      </Container>
    </div>
  );
};

export default Movies;
