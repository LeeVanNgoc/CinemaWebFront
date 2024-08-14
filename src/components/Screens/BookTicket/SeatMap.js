import React, { useEffect, useState } from "react";
import { handleGetBookedSeats, handleGetSeatsInRoom } from "./config";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { setSelectedSeat } from "./redux/actions/bookingAction";
import "./scss/SeatMap.scss";

const SeatMap = () => {
  const dispatch = useDispatch();

  const [seats, setSeats] = useState([]);
  const roomId = useSelector((state) => state.userBookTicket.room);
  const planId = useSelector((state) => state.userBookTicket.selectedPlan);
  const [bookedSeats, setBookedSeats] = useState([]);

  const fetchSeats = async () => {
    try {
      let res = await handleGetSeatsInRoom(roomId);
      console.log("res seats in a room >>>", res);
      if (res && res.seats) {
        const formattedData = res.seats.map((item) => ({
          seatId: item.seatId,
          seatCode: item.seatCode,
          type: item.type,
          roomId: item.roomId,
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
      const res = await handleGetBookedSeats(planId);
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

  useEffect(() => {
    fetchBooked();
    fetchSeats();
  }, [roomId, planId]);

  const handleClickSeat = (seatCode, seatType) => {
    if (!bookedSeats.includes(seatCode)) {
      dispatch(setSelectedSeat(seatCode, "2D", seatType, false));
    }
  };

  // const getOccucpied = (seatCode) => {
  //   if (bookedSeats.includes(seatCode)) {
  //     return "cursor-no-drop";
  //   }
  // };

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
                            s.type === "VIP"
                              ? "bg-orange-500"
                              : s.type === "Double"
                              ? "bg-red-500"
                              : "bg-slate-600"
                          } ${
                            bookedSeats.includes(`${s.row}${s.col}`)
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          onClick={() =>
                            handleClickSeat(
                              `${s.row}${s.col}`,

                              s.type
                            )
                          }
                        >
                          {bookedSeats.includes(`${s.row}${s.col}`) ? (
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
  ); // const renderRows = () => {
  //   const rowLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  //   return Array.from({ length: `${localStorage.getItem("totalRow")}` }).map(
  //     (_, rowIndex) => {
  //       const rowLetter = rowLetters[rowIndex];
  //       const seats = Array.from({
  //         length: `${localStorage.getItem("seatsPerRow")}`,
  //       }).map((_, seatIndex) => seatIndex + 1);

  //       return (
  //         <Row
  //           key={rowIndex}
  //           rowLetter={rowLetter}
  //           seats={seats}
  //           rowIndex={rowIndex}
  //         />
  //       );
  //     }
  //   );
  // };

  // return <div>{renderRows()}</div>;
};

export default SeatMap;
