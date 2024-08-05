import {
  SET_SELECTED_TICKET,
  CLEAR_SELECTED_TICKET,
} from "../actions/ticketActions";

const initialState = {
  selectedTicket: [],
  loading: false,
  error: null,
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_TICKET:
      return {
        ...state,
        selectedTicket: action.payload,
      };
    case CLEAR_SELECTED_TICKET:
      return {
        ...state,
        selectedTicket: [],
      };
    default:
      return state;
  }
};

export default ticketReducer;
