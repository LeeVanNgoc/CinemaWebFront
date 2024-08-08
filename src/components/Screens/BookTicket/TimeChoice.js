import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import SeatMap from "./SeatMap";
import Legend from "./Legend";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedSeats,
  setTime,
  getPlanIdForCreateTicket,
  setTotalBill,
} from "./redux/actions/bookingAction";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import "./scss/TimeChoice.scss";

export default function TimeChoice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isVisibleTime, setIsVisibleTime] = useState(true);
  const [isVisibleSeat, setIsVisibleSeat] = useState(false);
  localStorage.setItem("totalRow", 9);
  localStorage.setItem("seatsPerRow", 14);

  const selectedMovie = useSelector(
    (state) => state.manageMovies.selectedMovie
  );

  const seletedDate = useSelector((state) => state.userBookTicket.date);
  const selectedTime = useSelector((state) => state.userBookTicket.time);

  const times = useSelector((state) => state.userBookTicket.planTimes);

  const selectedSeats = useSelector((state) =>
    state.userBookTicket.selectedSeats.seat.map((item) => item)
  );
  const prices = useSelector(
    (state) => state.userBookTicket.selectedSeats.pricePerSeat
  );
  const totalAmount = prices.reduce((sum, item) => {
    const itemSum = item.reduce((itemSum, bill) => itemSum + bill, 0);
    return sum + itemSum;
  }, 0);

  useEffect(() => {
    dispatch(setTotalBill(totalAmount));
  }, [dispatch, totalAmount]);

  const releasedTime = useSelector((state) => state.userBookTicket.time);

  const goToFinalTicket = (roomId, movieId, startTime, dateScreen) => {
    dispatch(getPlanIdForCreateTicket(roomId, movieId, startTime, dateScreen));
    navigate("/finalticket");
  };

  const goBack = () => {
    dispatch(clearSelectedSeats());
    toggleVisibility();
  };

  const handlesetTime = (time) => {
    dispatch(clearSelectedSeats());
    dispatch(setTime(time));
    toggleVisibility();
  };

  const toggleVisibility = () => {
    setIsVisibleTime(!isVisibleTime);
    setIsVisibleSeat(!isVisibleSeat);
    // dispatch(clearSelectedSeats());
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
          {times &&
            times.map((time, index) => (
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
          <div className="flex justify-between">
            <p>Giờ chiếu: {releasedTime.time}</p>
            <CountdownTimer initialTime={10} onTimeUp={toggleVisibility} />
          </div>

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
              {`Ghế đã chọn: ${selectedSeats.join(", ")}`}
              <br />
              {`Tổng tiền: ${totalAmount}`}
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
                onClick={() =>
                  goToFinalTicket(
                    3, // roomId
                    selectedMovie.movieId,
                    selectedTime,
                    seletedDate
                  )
                }
                disabled={selectedSeats.length === 0}
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
