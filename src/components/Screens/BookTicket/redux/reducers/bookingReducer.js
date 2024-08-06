import {
  SET_SELECTED_SEAT,
  CLEAR_SELECTED_SEATS,
  // SET_INFO_FOR_BOOKING,
  SET_MOVIE,
  SET_DATE,
  SET_TIME,
  SET_ROOM,
  SET_TOTAL_BILL,
} from "../actions/bookingAction";

const initialState = {
  selectedSeats: [],
  // bill: {},
  movieId: "",
  date: new Date().toLocaleDateString("vi-VN"),
  time: "",
  room: "",
  totalBill: 0,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_SEAT:
      if (state.selectedSeats.includes(action.payload)) {
        return {
          ...state,
          selectedSeats: state.selectedSeats.filter(
            (seat) => seat !== action.payload
          ),
        };
      } else {
        return {
          ...state,
          selectedSeats: [...state.selectedSeats, action.payload],
        };
      }
    case CLEAR_SELECTED_SEATS:
      return {
        ...state,
        selectedSeats: [],
      };
    // case SET_INFO_FOR_BOOKING:
    //   return {
    //     ...state,
    //     bill: action.payload,
    //   };

    case SET_MOVIE:
      return {
        ...state,
        movieId: action.payload,
      };
    case SET_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case SET_TIME:
      return {
        ...state,
        time: action.payload,
      };
    case SET_ROOM:
      return {
        ...state,
        room: action.payload,
      };
    case SET_TOTAL_BILL:
      return {
        ...state,
        totalBill: action.payload,
      };

    default:
      return state;
  }
};

export default bookingReducer;
