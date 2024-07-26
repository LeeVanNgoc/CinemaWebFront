import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./components/Common/SignIn/redux/reducers/rootReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
