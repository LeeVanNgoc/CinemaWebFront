import { SET_RENDER } from "./renderAction";

const initialState = {
  isRender: true,
};

const renderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RENDER:
      return {
        ...state,
        isRender: action.payload,
      };
    default:
      return state;
  }
};

export default renderReducer;
