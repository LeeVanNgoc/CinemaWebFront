import { combineReducers } from "redux";

import userCreateReducer from "./components/Common/SignUp/redux/userSlice";
import userReducer from "./components/Common/SignIn/redux/reducers/userReducer";
import userReducerAdmin from "./components/Screens/Admin/Users/redux/reducers/userReducerAdmin";
import ticketReducer from "./components/Screens/Admin/Tickets/redux/reducers/ticketReducer";
import theaterReducer from "./components/Screens/Admin/Theater/redux/reducers/theaterReducer";
import seatReducer from "./components/Screens/Admin/Seat/redux/reducers/seatReducer";
import bookingReducer from "./components/Screens/BookTicket/redux/reducers/bookingReducer";
const rootReducer = combineReducers({
  userCreateReducer,
  user: userReducer,
  userBookTicket: bookingReducer,
  manageUsers: userReducerAdmin,
  manageTickets: ticketReducer,
  manageTheaters: theaterReducer,
  manageSeats: seatReducer,
});

export default rootReducer;
