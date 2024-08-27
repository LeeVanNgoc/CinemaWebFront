import React, { useEffect, useState } from "react";
import {
  handleGetBookedSeats,
  handleGetSeatsInRoom,
  handleGetRoomByCode,
} from "./config";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { setSelectedSeat } from "./redux/actions/bookingAction";
import "./scss/SeatMap.scss";

const SeatMap = (isWeekend) => {
  const dispatch = useDispatch();

  const [seats, setSeats] = useState([]);
  const [timeFrame, setTimeFrame] = useState("");
  const selectedSeats = useSelector((state) => state.userBookTicket.seat);
  const roomCode = useSelector((state) => state.userBookTicket.room);
  const planCode = useSelector((state) => state.userBookTicket.selectedPlan[0]);
  const startTime = useSelector((state) => state.userBookTicket.time);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [roomType, setRoomType] = useState("");

  const handleTimeFrame = () => {
    const hour = parseInt(startTime.slice(0, 2));
    if (hour >= 10 && hour < 12) {
      setTimeFrame("10-12");
    } else if (hour >= 12 && hour < 17) {
      setTimeFrame("12-17");
    } else if (hour >= 17 && hour < 23) {
      setTimeFrame("17-23");
    }
  };

  const fetchSeats = async () => {
    try {
      let res = await handleGetSeatsInRoom(roomCode);
      console.log("res seats in a room >>>", res);
      if (res && res.seats) {
        const formattedData = res.seats.map((item) => ({
          seatId: item.seatId,
          seatCode: item.seatCode,
          type: item.type,
          roomCode: item.roomCode,
          row: item.row,
          col: item.col,
          isAvailable: item.isAvailable,
        }));
        setSeats(formattedData);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchBooked = async () => {
    try {
      const res = await handleGetBookedSeats(planCode);
      console.log("fetch booked seats: ", res);
      if (res && res.errCode === 0) {
        setBookedSeats(res.rowAndCol);
      } else {
        console.log("ERROR: ", res.message);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const getRoomTypeByCode = async () => {
    try {
      const res = await handleGetRoomByCode(roomCode);
      if (res && res.errCode === 0) {
        setRoomType(res.room.type);
      } else {
        console.log("ERROR: ", res.message);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    handleTimeFrame();
    getRoomTypeByCode();
    fetchBooked();
    fetchSeats();
  }, [roomCode, planCode]);

  const handleClickSeat = (seatCode, seatType) => {
    if (!bookedSeats.includes(seatCode)) {
      dispatch(
        setSelectedSeat(
          seatCode,
          roomType,
          seatType,
          isWeekend.isWeekend,
          timeFrame
        )
      );
    }
  };

  return (
    <div className="flex justify-center">
      <table>
        <tbody>
          {seats.reduce((rows, seat, index) => {
            if (index === 0 || seat.row !== seats[index - 1].row) {
              rows.push(
                <tr key={`row-${seat.row}`}>
                  <td>{seat.row}</td>
                  <td className="flex justify-center">
                    {seats
                      .filter((s) => s.row === seat.row)
                      .map((s) => (
                        <span
                          key={`seat-${s.seatCode}`}
                          className={`m-1 text-white rounded-md px-3 py-1 ${
                            bookedSeats.includes(`${s.row}${s.col}`) &&
                            s.type === "Sweetbox"
                              ? "bg-gray-500 w-20"
                              : bookedSeats.includes(`${s.row}${s.col}`)
                              ? "bg-gray-500"
                              : !s.isAvailable
                              ? "bg-slate-400"
                              : selectedSeats.includes(`${s.row}${s.col}`) &&
                                s.type === "Sweetbox"
                              ? "bg-blue-500 w-20"
                              : selectedSeats.includes(`${s.row}${s.col}`)
                              ? "bg-blue-500"
                              : s.type === "VIP"
                              ? "bg-orange-500"
                              : s.type === "Sweetbox"
                              ? "bg-red-500 w-20"
                              : "bg-slate-600"
                          } ${
                            bookedSeats.includes(`${s.row}${s.col}`)
                              ? "cursor-not-allowed"
                              : !s.isAvailable
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          onClick={() =>
                            handleClickSeat(`${s.row}${s.col}`, s.type)
                          }
                        >
                          {bookedSeats.includes(`${s.row}${s.col}`) ||
                          !s.isAvailable ? (
                            <ClearIcon />
                          ) : (
                            `${s.row}${s.col}`
                          )}
                        </span>
                      ))}
                  </td>
                </tr>
              );
            }
            return rows;
          }, [])}
        </tbody>
      </table>
    </div>
  );
};

export default SeatMap;
