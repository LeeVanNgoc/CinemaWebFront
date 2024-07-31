import { combineReducers } from "redux";

import userReducer from "./userReducer";
import userCreateReducer from "../../../SignUp/redux/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  userCreateReducer,
});

export default rootReducer;
