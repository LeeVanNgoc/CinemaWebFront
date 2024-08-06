import { SET_SELECTED_PLAN, CLEAR_SELECTED_PLAN } from "../actions/planActions";

const initialState = {
  selectedPlan: [],
  loading: false,
  error: null,
};

const planReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_PLAN:
      return {
        ...state,
        selectedPlan: action.payload,
      };
    case CLEAR_SELECTED_PLAN:
      return {
        ...state,
        selectedPlan: [],
      };
    default:
      return state;
  }
};

export default planReducer;
