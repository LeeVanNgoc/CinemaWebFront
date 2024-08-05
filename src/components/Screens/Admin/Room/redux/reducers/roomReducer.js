import { SET_SELECTED_ROOM, CLEAR_SELECTED_ROOM } from "../actions/roomActions";

const initialState = {
  selectedRoom: [],
  loading: false,
  error: null,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_ROOM:
      return {
        ...state,
        selectedRoom: action.payload,
      };
    case CLEAR_SELECTED_ROOM:
      return {
        ...state,
        selectedRoom: [],
      };  
    default:
      return state;
  }
};

export default roomReducer;
