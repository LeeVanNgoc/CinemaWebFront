export const SET_SELECTED_SEAT = "SET_SELECTED_SEAT";
export const CLEAR_SELECTED_SEATS = "CLEAR_SELECTED_SEATS";
// export const SET_INFO_FOR_BOOKING = "SET_INFO_FOR_BOOKING";
export const SET_MOVIE = "SET_MOVIE";
export const SET_DATE = "SET_DATE";
export const SET_TIME = "SET_TIME";
export const SET_ROOM = "SET_ROOM";
export const SET_TOTAL_BILL = "SET_TOTAL_BILL";

export const setSelectedSeat = (seat) => ({
  type: SET_SELECTED_SEAT,
  payload: seat,
});

export const clearSelectedSeats = () => ({
  type: CLEAR_SELECTED_SEATS,
});

// export const setInfoForBooking = (
//   userId,
//   movieId,
//   date,
//   time,
//   seatId,
//   room,
//   totalBill
// ) => ({
//   type: SET_INFO_FOR_BOOKING,
//   payload: { userId, movieId, date, time, seatId, room, totalBill },
// });

export const setMovie = (movieId) => ({
  type: SET_MOVIE,
  payload: { movieId },
});

export const setDate = (date) => ({
  type: SET_DATE,
  payload: { date },
});

export const setTime = (time) => ({
  type: SET_TIME,
  payload: { time },
});

export const setRoom = (room) => ({
  type: SET_ROOM,
  payload: { room },
});

export const setTotalBill = (totalBill) => ({
  type: SET_TOTAL_BILL,
  payload: { totalBill },
});
