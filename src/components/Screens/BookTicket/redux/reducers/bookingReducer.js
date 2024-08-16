import {
  GET_SELECTED_PLAN,
  SET_SELECTED_SEAT,
  SET_DATE,
  SET_TIME,
  SET_ROOM,
  SET_TOTAL_BILL,
  GET_PLAN_TIMES_AND_ROOM,
  NO_PLAN_TIMES_AND_ROOM,
  CLEAR_PLAN_TIMES_AND_ROOM,
  SET_BANK,
} from "../actions/bookingAction";

const initialState = {
  seat: [],
  pricePerSeat: [],
  planScreens: [],
  noPlanScreen: "",
  selectedPlan: "",
  date: new Date().toISOString().slice(0, 10),
  time: "",
  room: "",
  bank: "",
  totalBill: 0,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_SEAT:
      const seatIndex = state.seat.indexOf(action.payload.seat);
      if (seatIndex !== -1) {
        return {
          ...state,
          seat: state.seat.filter((s) => s !== action.payload.seat),
          pricePerSeat: state.pricePerSeat.filter(
            (_, index) => index !== seatIndex
          ),
        };
      } else {
        return {
          ...state,
          seat: [...state.seat, action.payload.seat],
          pricePerSeat: [...state.pricePerSeat, action.payload.pricePerSeat],
        };
      }

    case GET_SELECTED_PLAN:
      return {
        ...state,
        selectedPlan: action.payload.formatted,
      };

    case GET_PLAN_TIMES_AND_ROOM:
      return {
        ...state,
        planScreens: action.payload.formattedData,
      };

    case NO_PLAN_TIMES_AND_ROOM:
      return {
        ...state,
        noPlanScreen: action.payload.message,
      };

    case CLEAR_PLAN_TIMES_AND_ROOM:
      return {
        ...state,
        noPlanScreen: "",
        planScreens: [],
        seat: [],
        pricePerSeat: [],
        time: "",
        room: "",
      };

    case SET_DATE:
      return {
        ...state,
        date: action.payload.date,
      };
    case SET_TIME:
      return {
        ...state,
        time: action.payload.time,
      };
    case SET_ROOM:
      return {
        ...state,
        room: action.payload.room,
      };
    case SET_BANK:
      return {
        ...state,
        bank: action.payload.bank,
      };
    case SET_TOTAL_BILL:
      return {
        ...state,
        totalBill: action.payload.totalBill,
      };

    default:
      return state;
  }
};

export default bookingReducer;
