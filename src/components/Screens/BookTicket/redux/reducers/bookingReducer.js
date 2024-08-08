import {
  GET_SELECTED_PLAN,
  SET_SELECTED_SEAT,
  CLEAR_SELECTED_SEATS,
  SET_DATE,
  SET_TIME,
  SET_ROOM,
  SET_TOTAL_BILL,
  GET_PLAN_TIMES,
} from "../actions/bookingAction";

const initialState = {
  selectedSeats: { seat: [], pricePerSeat: [] },
  planTimes: [],
  selectedPlan: "",
  date: new Date().toISOString().slice(0, 10),
  time: "",
  room: "",
  totalBill: 0,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_SEAT:
      const seatIndex = state.selectedSeats.seat.indexOf(action.payload.seat);
      if (seatIndex !== -1) {
        return {
          ...state,
          selectedSeats: {
            seat: state.selectedSeats.seat.filter(
              (s) => s !== action.payload.seat
            ),
            pricePerSeat: state.selectedSeats.pricePerSeat.filter(
              (_, index) => index !== seatIndex
            ),
          },
        };
      } else {
        return {
          ...state,
          selectedSeats: {
            seat: [...state.selectedSeats.seat, action.payload.seat],
            pricePerSeat: [
              ...state.selectedSeats.pricePerSeat,
              action.payload.pricePerSeat,
            ],
          },
        };
      }
    case CLEAR_SELECTED_SEATS:
      return {
        ...state,
        selectedSeats: {
          seat: [],
          pricePerSeat: [],
        },
      };

    case GET_SELECTED_PLAN:
      return {
        ...state,
        selectedPlan: action.payload.formattedData,
      };

    case GET_PLAN_TIMES:
      return {
        ...state,
        planTimes: action.payload.formattedData,
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
        room: action.payload,
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
