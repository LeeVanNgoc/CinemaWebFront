import {
  GET_SELECTED_PLAN,
  SET_SELECTED_SEAT,
  CLEAR_SELECTED_SEATS,
  SET_DATE,
  SET_TIME,
  SET_ROOM,
  SET_TOTAL_BILL,
  SET_PLAN_TIME,
} from "../actions/bookingAction";

const initialState = {
  selectedSeats: [],
  planMovie: [],
  selectedPlan: "",
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

    case GET_SELECTED_PLAN:
      return {
        ...state,
        selectedPlan: action.payload,
      };

    case SET_PLAN_TIME:
      return {
        ...state,
        planMovie: action.payload,
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
