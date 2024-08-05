import {
  SET_SELECTED_PRICE,
  CLEAR_SELECTED_PRICE,
} from "../actions/priceActions";

const initialState = {
  selectedPrice: [],
};

const priceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_PRICE:
      return {
        ...state,
        selectedPrice: action.payload,
      };
    case CLEAR_SELECTED_PRICE:
      return {
        ...state,
        selectedPrice: [],
      };
    default:
      return state;
  }
};

export default priceReducer;
