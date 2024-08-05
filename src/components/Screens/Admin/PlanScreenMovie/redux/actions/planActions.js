export const SET_SELECTED_PLAN = "SET_SELECTED_PLAN";
export const CLEAR_SELECTED_PLAN = "CLEAR_SELECTED_PLAN";

export const setSelectedPlan = (plan) => ({
  type: SET_SELECTED_PLAN,
  payload: plan,
});

export const clearSelectedPlan = () => ({
  type: CLEAR_SELECTED_PLAN,
});
