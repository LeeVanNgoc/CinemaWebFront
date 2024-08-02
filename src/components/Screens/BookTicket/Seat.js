import React from "react";
import "./scss/SeatMap.scss";

const Seat = ({
  seatNumber,
  seatID,
  isSelected,
  isOccupied,
  onSeatClick,
  rowIndex,
}) => {
  const handleClick = () => {
    if (!isOccupied) {
      onSeatClick(seatID);
    }
  };

  const getRowColor = () => {
    if (rowIndex === `${localStorage.getItem("totalRow")}` - 1) {
      return "bg-red-500"; // Ghế đôi
    } else if (
      rowIndex >= 3 &&
      rowIndex <= `${localStorage.getItem("totalRow")}` - 3 &&
      seatNumber >= 3 &&
      seatNumber <= 12
    ) {
      return "bg-orange-500"; // Ghế VIP
    }
    return "bg-gray-600"; // Ghế thường
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer w-11 p-1 rounded 
        ${isOccupied ? " bg-gray-800 cursor-not-allowed" : ""}
        ${isSelected ? " bg-blue-500" : ""}
      ${!isSelected && !isOccupied ? `${getRowColor()}` : ""}`}
    >
      {seatID}
    </div>
  );
};

export default Seat;
