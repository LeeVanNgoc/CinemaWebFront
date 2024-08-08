import React from "react";
import Seat from "./Seat";
import "./scss/SeatMap.scss";
import { useSelector } from "react-redux";

const Row = ({ rowLetter, seats, rowIndex }) => {
  const selectedSeats = useSelector(
    (state) => state.userBookTicket.selectedSeats.seat
  );

  return (
    <div className={"seat-row"}>
      {seats.map((seatNumber) => (
        <Seat
          key={seatNumber}
          seatNumber={seatNumber}
          seatID={`${rowLetter}${seatNumber}`}
          isSelected={selectedSeats.includes(`${rowLetter}${seatNumber}`)}
          rowIndex={rowIndex}
        />
      ))}
    </div>
  );
};

export default Row;
