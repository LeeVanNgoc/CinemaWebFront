import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import SeatMap from "./SeatMap";
import Legend from "./Legend";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedSeatsAndTime,
  setTime,
  setRoom,
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

  const releasedTime = useSelector((state) => state.userBookTicket.time);
  const room = useSelector((state) => state.userBookTicket.room);
  const planScreenMovie = useSelector(
    (state) => state.userBookTicket.planScreens
  );
  const selectedSeatCode = useSelector((state) =>
    state.userBookTicket.seat.map((item) => item)
  );
  const prices = useSelector((state) => state.userBookTicket.pricePerSeat);
  const totalAmount = prices.reduce((sum, item) => {
    const itemSum = item.reduce((itemSum, bill) => itemSum + bill, 0);
    return sum + itemSum;
  }, 0);

  useEffect(() => {
    dispatch(setTotalBill(totalAmount));
  }, [dispatch, totalAmount]);

  const getRoom = (releasedTime) => {
    for (let i = 0; i < planScreenMovie.length; i++) {
      if (planScreenMovie[i].startTime === releasedTime) {
        dispatch(setRoom(planScreenMovie[i].roomId));
        break;
      }
    }
  };

  const goToFinalTicket = () => {
    navigate("/finalticket");
  };

  const goBack = () => {
    dispatch(clearSelectedSeatsAndTime());
    toggleVisibility();
  };

  const handleClickTime = (time) => {
    dispatch(clearSelectedSeatsAndTime());
    dispatch(setTime(time));
    getRoom(time);
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
          {planScreenMovie &&
            planScreenMovie.map((plan, index) => (
              <Button
                key={index}
                variant="contained"
                size="small"
                sx={{ bgcolor: "grey.700", width: "60px" }}
                onClick={() => handleClickTime(plan.startTime)}
              >
                {plan.startTime}
              </Button>
            ))}
        </Box>
      )}

      {isVisibleSeat && (
        <div>
          <div className="flex justify-between">
            <p>Giờ chiếu: {releasedTime}</p>
            <CountdownTimer initialTime={1000} onTimeUp={toggleVisibility} />
          </div>

          <img
            src="https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Fscreen.png&w=1920&q=75"
            alt="yellow-screen"
          />
          <p>Phòng chiếu số {room}</p>
          <div className="seatmap-container">
            <SeatMap />
          </div>
          <Legend />
          <div className="flex justify-between mt-6">
            <p>
              {`Ghế đã chọn: ${selectedSeatCode.join(", ")}`}
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
                onClick={() => goToFinalTicket()}
                disabled={selectedSeatCode.length === 0}
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
