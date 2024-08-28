//import react
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/Common/ScrollToTop/ScrollToTop";
import "react-toastify/dist/ReactToastify.css";

// import component
import AppRoutes from "./routers/AppRoutes";
import Footer from "./components/Common/Footer/Footer";

// import redux store
import store from "./redux/store";
import { handleRefreshRedux } from "./components/Common/SignIn/redux/actions/userAction";
import { handleRefreshMovie } from "./components/Screens/Admin/Movie/redux/actions/movieActions";
import { setDate } from "./components/Screens/BookTicket/redux/actions/bookingAction";
import { refreshTheater } from "./components/Common/Header/redux/actions/headerActions";

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
    if (localStorage.getItem("theater")) {
      dispatch(refreshTheater());
    }
  }, [dispatch]);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <div className="App">
            <ScrollToTop />
            <AppRoutes />
            <Footer />
            <ToastContainer />
          </div>
        </Router>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
