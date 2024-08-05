export const SET_SELECTED_TICKET = "SET_SELECTED_TICKET";
export const CLEAR_SELECTED_TICKET = "CLEAR_SELECTED_TICKET";

export const setSelectedTicket = (ticket) => ({
  type: SET_SELECTED_TICKET,
  payload: ticket,
});

export const clearSelectedTicket = () => ({
  type: CLEAR_SELECTED_TICKET,
});
