import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSeat } from "./redux/actions/bookingAction";

import "./scss/SeatMap.scss";
import { handleGetBookedSeats } from "./config";

const Seat = ({ seatNumber, seatID, isSelected, rowIndex }) => {
  const dispatch = useDispatch();

  const planId = useSelector((state) => state.userBookTicket.selectedPlan);

  const [isOccupied, setIsOccupied] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);

  // useEffect(async () => {
  //   try {
  //     const res = await handleGetBookedSeats(planId);
  //     console.log("fetch booked seats: ", res);
  //     if (res && res.errCode === 0) {
  //       setBookedSeats(res.rowAndCol);
  //     } else {
  //       console.log("ERROR: ", res.message);
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi gọi API:", error);
  //   }
  // }, []);

  const handleClick = () => {
    if (!isOccupied) {
      const costType = getType();
      dispatch(
        setSelectedSeat(
          seatID,
          costType.roomType,
          costType.seatType,
          costType.isWeekend
        )
      );
    }
  };

  const getType = () => {
    if (rowIndex === parseInt(localStorage.getItem("totalRow")) - 1) {
      return { roomType: "2D", seatType: "SweetBox", isWeekend: false };
    } else if (
      rowIndex >= 3 &&
      rowIndex <= parseInt(localStorage.getItem("totalRow")) - 3 &&
      seatNumber >= 3 &&
      seatNumber <= 12
    ) {
      return { roomType: "2D", seatType: "VIP", isWeekend: false };
    } else {
      return { roomType: "2D", seatType: "Standard", isWeekend: false };
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
        ${isOccupied ? " bg-gray-800 cursor-no-drop" : ""}
        ${isSelected ? " bg-blue-500" : ""}
      ${!isSelected && !isOccupied ? `${getRowColor()}` : ""}`}
    >
      {isOccupied ? <ClearIcon /> : seatID}
    </div>
  );
};

export default Seat;
