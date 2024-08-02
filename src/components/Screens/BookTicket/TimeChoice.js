import React, { useState } from "react";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import SeatMap from "./SeatMap";
import Legend from "./Legend";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedSeats, setTime } from "./redux/actions/bookingAction";
import { useNavigate } from "react-router-dom";
import "./scss/TimeChoice.scss";

export default function TimeChoice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isVisibleTime, setIsVisibleTime] = useState(true);
  const [isVisibleSeat, setIsVisibleSeat] = useState(false);
  localStorage.setItem("totalRow", 9);
  localStorage.setItem("seatsPerRow", 14);

  const selectedSeats = useSelector(
    (state) => state.userBookTicket.selectedSeats
  );

  const bookTicket = () => {
    navigate("/finalticket");
  };

  const goBack = () => {
    dispatch(clearSelectedSeats());
    toggleVisibility();
  };

  const handlesetTime = (time) => {
    dispatch(setTime(time));
    toggleVisibility();
  };

  const toggleVisibility = () => {
    setIsVisibleTime(!isVisibleTime);
    setIsVisibleSeat(!isVisibleSeat);
  };

  return (
    <div>
      {isVisibleTime && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            mt: 2,
            gap: 1,
            justifyContent: "center",
          }}
        >
          {["15:00", "18:20", "19:30", "20:00"].map((time, index) => (
            <Button
              key={index}
              variant="contained"
              size="small"
              sx={{ bgcolor: "grey.700", width: "60px" }}
              onClick={() => handlesetTime(time)}
            >
              {time}
            </Button>
          ))}
        </Box>
      )}

      {isVisibleSeat && (
        <div>
          <p>Giờ chiếu: </p>
          <img
            src="https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Fscreen.png&w=1920&q=75"
            alt="yellow-screen"
          />
          <p>Phòng chiếu số</p>
          <div className="seatmap-container">
            <SeatMap
              rows={`${localStorage.getItem("totalRow")}`}
              seatsPerRow={`${localStorage.getItem("seatsPerRow")}`}
            />
          </div>
          <Legend />
          <div className="flex justify-between mt-6">
            <p>
              {`Ghế đã chọn: ${selectedSeats}`}
              <br />
              Tổng tiền
            </p>
            <div className="flex gap-2">
              <Button
                variant="contained"
                sx={{
                  borderRadius: 6,
                  backgroundColor: "grey",
                  height: "40px",
                }}
                onClick={goBack}
              >
                Trở về
              </Button>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 6,
                  backgroundColor: "red",
                  height: "40px",
                }}
                onClick={() => bookTicket()}
              >
                Đặt vé
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
