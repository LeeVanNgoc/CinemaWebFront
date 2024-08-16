import {
  SET_SELECTED_SEAT,
  CLEAR_SELECTED_SEAT,
  GET_SEATS,
  CLEAR_SEATS,
} from "../actions/seatActions";

const initialState = {
  rows: [],
  seatNumber: 0,
  selectedSeat: [],
  loading: false,
  error: null,
};

const seatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEATS:
      return {
        ...state,
        rows: action.payload.formattedData,
        seatNumber: action.payload.formattedData.length,
      };
    case CLEAR_SEATS:
      return {
        ...state,
        rows: [],
      };
    case SET_SELECTED_SEAT:
      return {
        ...state,
        selectedSeat: action.payload,
      };
    case CLEAR_SELECTED_SEAT:
      return {
        ...state,
        selectedSeat: [],
      };
    default:
      return state;
  }
};

export default seatReducer;
