import React, { useState } from "react";
import "./scss/SeatMap.scss";
import Row from "./Row";
import { useDispatch } from "react-redux";
import {
  setSelectedSeat,
  clearSelectedSeat,
  removeSeat,
} from "./redux/actions/bookingAction";

const SeatMap = () => {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelected = () => {
    setIsSelected(!isSelected);
  };

  const handleSeatClick = (seatNumber) => {
    dispatch(setSelectedSeat(seatNumber));
  };

  const renderRows = () => {
    const rowLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return Array.from({ length: `${localStorage.getItem("totalRow")}` }).map(
      (_, rowIndex) => {
        const rowLetter = rowLetters[rowIndex];
        const seats = Array.from({
          length: `${localStorage.getItem("seatsPerRow")}`,
        }).map((_, seatIndex) => seatIndex + 1);

        return (
          <Row
            key={rowIndex}
            rowLetter={rowLetter}
            seats={seats}
            // selectedSeats={selectedSeats}
            onSeatClick={handleSeatClick}
            rowIndex={rowIndex}
          />
        );
      }
    );
  };

  return <div>{renderRows()}</div>;
};

export default SeatMap;
