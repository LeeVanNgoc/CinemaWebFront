import { handleAddMultipleSeats, handleGetListSeats } from "../../config";

export const SET_SELECTED_SEAT = "SET_SELECTED_SEAT";
export const CLEAR_SELECTED_SEAT = "CLEAR_SELECTED_SEAT";
export const SET_SEATS = "SET_SEATS";
export const GET_SEATS = "GET_SEATS";

export const handleCreateSeats = (rows) => {
  return async (dispatch, getState) => {
    handleAddMultipleSeats(rows);
    dispatch({
      type: SET_SEATS,
      payload: rows,
    });
  };
};

export const handleGetSeats = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetListSeats();
      console.log("res list seats >>>", res);
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
        dispatch({
          type: GET_SEATS,
          payload: { formattedData },
        });
      }
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };
};

export const setSelectedSeat = (seat) => ({
  type: SET_SELECTED_SEAT,
  payload: seat,
});

export const clearSelectedSeat = () => ({
  type: CLEAR_SELECTED_SEAT,
});
