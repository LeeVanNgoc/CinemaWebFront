import { combineReducers } from "redux";

import userCreateReducer from "./components/Common/SignUp/redux/userSlice";
import userReducer from "./components/Common/SignIn/redux/reducers/userReducer";
import userReducerAdmin from "./components/Screens/Admin/Users/redux/reducers/userReducerAdmin";
import ticketReducer from "./components/Screens/Admin/Tickets/redux/reducers/ticketReducer";
import theaterReducer from "./components/Screens/Admin/Theater/redux/reducers/theaterReducer";
import seatReducer from "./components/Screens/Admin/Seat/redux/reducers/seatReducer";
import bookingReducer from "./components/Screens/BookTicket/redux/reducers/bookingReducer";
import planReducer from "./components/Screens/Admin/PlanScreenMovie/redux/reducers/planReducer";
import priceReducer from "./components/Screens/Admin/Price/redux/reducers/priceReducer";
import roomReducer from "./components/Screens/Admin/Room/redux/reducers/roomReducer";
import trailerReducer from "./components/Screens/Admin/Trailer/redux/reducers/trailerReducer";
import movieReducerAdmin from "./components/Screens/Admin/Movies/redux/reducers/movieReducerAdmin";

const rootReducer = combineReducers({
  userCreateReducer,
  user: userReducer,
  userBookTicket: bookingReducer,
  manageUsers: userReducerAdmin,
  manageTickets: ticketReducer,
  manageTheaters: theaterReducer,
  manageSeats: seatReducer,
  managePlans: planReducer,
  managePrices: priceReducer,
  manageMovies: movieReducerAdmin,
  manageRooms: roomReducer,
  manageTrailers: trailerReducer,
});

export default rootReducer;
