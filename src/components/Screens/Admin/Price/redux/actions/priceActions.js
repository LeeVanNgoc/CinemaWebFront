export const SET_SELECTED_PRICE = "SET_SELECTED_PRICE";
export const CLEAR_SELECTED_PRICE = "CLEAR_SELECTED_PRICE";

export const setSelectedPrice = (price) => ({
  type: SET_SELECTED_PRICE,
  payload: price,
});

export const clearSelectedPrice = () => ({
  type: CLEAR_SELECTED_PRICE,
});
