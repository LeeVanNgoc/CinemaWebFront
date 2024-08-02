import { SET_SELECTED_SEAT, CLEAR_SELECTED_SEAT } from "../actions/seatActions";

const initialState = {
  selectedSeat: [],
  loading: false,
  error: null,
};

const seatReducer = (state = initialState, action) => {
  switch (action.type) {
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
