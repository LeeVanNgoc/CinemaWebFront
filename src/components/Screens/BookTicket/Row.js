import React from "react";
import Seat from "./Seat";
import "./scss/SeatMap.scss";
import { useSelector } from "react-redux";

const Row = ({ rowLetter, seats, onSeatClick, rowIndex }) => {
  const selectedSeats = useSelector(
    (state) => state.userBookTicket.selectedSeats
  );
  const setCoupleSeat = () => {
    if (rowIndex === `${localStorage.getItem("totalRow")}` - 1) {
      console.log(">>seat number: ", `${localStorage.getItem("totalRow")}` / 2);
      localStorage.setItem(
        "seatsPerRow",
        `${localStorage.getItem("totalRow")}` / 2
      ); // Ghế đôi
    }
  };

  return (
    <div className={"seat-row"}>
      {seats.map((seatNumber) => (
        <Seat
          key={seatNumber}
          seatNumber={seatNumber}
          seatID={`${rowLetter}${seatNumber}`}
          isSelected={selectedSeats.includes(`${rowLetter}${seatNumber}`)}
          isOccupied={false} // Thay thế bằng logic kiểm tra ghế đã được đặt
          onSeatClick={onSeatClick}
          rowIndex={rowIndex}
        />
      ))}
    </div>
  );
};

export default Row;
