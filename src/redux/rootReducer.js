import { combineReducers } from "redux";

import userCreateReducer from "../components/Common/SignUp/redux/userSlice";
import userReducer from "../components/Common/SignIn/redux/reducers/userReducer";
import userReducerAdmin from "../components/Screens/Admin/Users/redux/reducers/userReducerAdmin";
import ticketReducer from "../components/Screens/Admin/Tickets/redux/reducers/ticketReducer";
import theaterReducer from "../components/Screens/Admin/Theater/redux/reducers/theaterReducer";
import seatReducer from "../components/Screens/Admin/Seat/redux/reducers/seatReducer";
import bookingReducer from "../components/Screens/BookTicket/redux/reducers/bookingReducer";
import planReducer from "../components/Screens/Admin/PlanScreenMovie/redux/reducers/planReducer";
import priceReducer from "../components/Screens/Admin/Price/redux/reducers/priceReducer";
import roomReducer from "../components/Screens/Admin/Room/redux/reducers/roomReducer";
import trailerReducer from "../components/Screens/Admin/Trailer/redux/reducers/trailerReducer";
import postReducer from "../components/Screens/Admin/Post/redux/reducers/postReducer";
import movieReducer from "../components/Screens/Admin/Movie/redux/reducers/movieReducer";
import movieDetailActions from "../components/Screens/Home/redux/reducers/movieDetailReducers";
import renderReducer from "./renderReducer";
import headerReducer from "../components/Common/Header/redux/reducers/headerReducer";

const rootReducer = combineReducers({
  render: renderReducer,
  theaterHeader: headerReducer,
  userCreateReducer,
  user: userReducer,
  home: movieDetailActions,
  userBookTicket: bookingReducer,
  manageUsers: userReducerAdmin,
  manageTickets: ticketReducer,
  manageTheaters: theaterReducer,
  manageSeats: seatReducer,
  managePlans: planReducer,
  managePrices: priceReducer,
  manageMovies: movieReducer,
  manageRooms: roomReducer,
  manageTrailers: trailerReducer,
  managePosts: postReducer,
});

export default rootReducer;
