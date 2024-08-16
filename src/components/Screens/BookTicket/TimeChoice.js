import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import SeatMap from "./SeatMap";
import Legend from "./Legend";
import { useDispatch, useSelector } from "react-redux";
import {
  clearStartTimeAndRoom,
  setTime,
  setRoom,
  setTotalBill,
  getPlanCodeForCreateTicket,
} from "./redux/actions/bookingAction";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import "./scss/TimeChoice.scss";

export default function TimeChoice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isVisibleTime, setIsVisibleTime] = useState(true);
  const [isVisibleSeat, setIsVisibleSeat] = useState(false);
  const [isVisibleRoom, setIsVisibleRoom] = useState(false);
  const [isWeekend, setIsWeekend] = useState(false);

  const [listRooms, setListRooms] = useState([]);

  const movie = useSelector((state) => state.manageMovies.selectedMovie);
  const releasedTime = useSelector((state) => state.userBookTicket.time);
  const releasedDate = useSelector((state) => state.userBookTicket.date);
  const room = useSelector((state) => state.userBookTicket.room);
  const planScreenMovie = useSelector(
    (state) => state.userBookTicket.planScreens
  );
  const noPlanMessage = useSelector(
    (state) => state.userBookTicket.noPlanScreen
  );
  const selectedSeatCode = useSelector((state) =>
    state.userBookTicket.seat.map((item) => item)
  );
  const prices = useSelector((state) => state.userBookTicket.pricePerSeat);

  const totalAmount = prices.reduce((sum, item) => {
    const itemSum = item.reduce((itemSum, bill) => itemSum + bill, 0);
    return sum + itemSum;
  }, 0);

  const setWeekend = (date) => {
    const dayOfWeek = new Date(date).getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setIsWeekend(true);
    } else {
      setIsWeekend(false);
    }
  };

  useEffect(() => {
    setWeekend(releasedDate);

    dispatch(setTotalBill(totalAmount));
  }, [dispatch, totalAmount]);

  const getRoom = (releasedTime) => {
    const matchedRooms = [];
    for (let i = 0; i < planScreenMovie.length; i++) {
      if (planScreenMovie[i].startTime === releasedTime) {
        matchedRooms.push(planScreenMovie[i].roomCode);
      }
    }
    console.log("matched rooms: ", matchedRooms);
    setListRooms(matchedRooms);
  };

  const goToFinalTicket = () => {
    navigate("/finalticket");
  };

  const goBack = () => {
    dispatch(clearStartTimeAndRoom());
    setIsVisibleRoom(false);
    setIsVisibleSeat(false);
    setIsVisibleTime(true);
    setListRooms([]);
  };

  const handleClickTime = (time) => {
    dispatch(clearStartTimeAndRoom());
    dispatch(setTime(time));
    getRoom(time);
    setIsVisibleTime(false);
    setIsVisibleRoom(true);
  };

  const handleClickRoom = (room) => {
    dispatch(setRoom(room));
    setIsVisibleRoom(false);
    setIsVisibleSeat(true);
    dispatch(
      getPlanCodeForCreateTicket(
        room,
        movie.movieCode,
        releasedTime,
        releasedDate
      )
    );
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
            planScreenMovie.map((plan, index) => {
              let previousTime = "";
              if (index > 0) {
                previousTime = planScreenMovie[index - 1].startTime;
              }
              return (
                (index === 0 || plan.startTime !== previousTime) && (
                  <Button
                    key={index}
                    variant="contained"
                    size="small"
                    sx={{ bgcolor: "grey.700", width: "60px" }}
                    onClick={() => handleClickTime(plan.startTime)}
                  >
                    {plan.startTime}
                  </Button>
                )
              );
            })}
          {noPlanMessage && noPlanMessage.length > 0 && (
            <div>{noPlanMessage}</div>
          )}
        </Box>
      )}
      {isVisibleRoom && (
        <div className="flex gap-2">
          {listRooms &&
            listRooms.map((room, index) => (
              <Button
                key={index}
                variant="contained"
                size="small"
                sx={{
                  bgcolor: "grey.700",
                  width: "fit-content",
                  textTransform: "none",
                }}
                onClick={() => handleClickRoom(room)}
              >
                Phòng {room}
              </Button>
            ))}
        </div>
      )}

      {isVisibleSeat && (
        <div>
          <div className="flex justify-between">
            <p>Giờ chiếu: {releasedTime}</p>
            <CountdownTimer
              initialTime={1000}
              onTimeUp={() => setIsVisibleSeat(false)}
            />
          </div>

          <img src={require("./assets/screen.png")} alt="yellow-screen" />
          <p>Phòng chiếu số {room}</p>
          <div className="seatmap-container">
            <SeatMap isWeekend={isWeekend} />
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
