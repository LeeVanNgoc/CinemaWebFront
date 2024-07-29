import { combineReducers } from "redux";

import userReducer from "./components/Common/SignIn/redux/reducers/userReducer";
import userReducerAdmin from "./components/Screens/Admin/Users/redux/reducers/userReducerAdmin";
import ticketReducer from "./components/Screens/Admin/Tickets/redux/reducers/ticketReducer";

const rootReducer = combineReducers({
  user: userReducer,
  manageUsers: userReducerAdmin,
  manageTickets: ticketReducer,
});

export default rootReducer;
