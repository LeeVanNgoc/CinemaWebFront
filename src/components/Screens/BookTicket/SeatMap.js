import React from "react";
import "./scss/SeatMap.scss";
import Row from "./Row";

const SeatMap = () => {
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
            rowIndex={rowIndex}
          />
        );
      }
    );
  };

  return <div>{renderRows()}</div>;
};

export default SeatMap;
