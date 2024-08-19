//import react
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Common/Header/Header";

// import redux store
import store from "./redux/store";
import { handleRefreshRedux } from "./components/Common/SignIn/redux/actions/userAction";
import { handleRefreshMovie } from "./components/Screens/Admin/Movie/redux/actions/movieActions";
import { setDate } from "./components/Screens/BookTicket/redux/actions/bookingAction";
import AppRoutes from "./routers/AppRoutes";
import Footer from "./components/Common/Footer/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDate(new Date().toISOString().slice(0, 10)));
    if (localStorage.getItem("email")) {
      dispatch(handleRefreshRedux());
    }
    if (sessionStorage.getItem("selectedMovie")) {
      dispatch(handleRefreshMovie());
    }
  }, [dispatch]);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <AppRoutes />
            <Footer />
          </div>
        </Router>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
