import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import store from "./store";
import Footer from "./components/Common/Footer/Footer";
import About from "./components/Screens/About/About";
import Header from "./components/Common/Header/Header";
import Home from "./components/Screens/Home/Home";
import News from "./components/Screens/News/News";
import Price from "./components/Screens/Price/Price";
import Promotions from "./components/Screens/Promotions/Promotions";
import Movies from "./components/Screens/Movies/Movies";
import BookTicket from "./components/Screens/BookTicket/BookTicket";
import { Manage } from "./components/Screens/Admin/Manage/Manage";
import { handleRefreshRedux } from "./components/Common/SignIn/redux/actions/userAction";
import { handleRefreshMovie } from "./components/Screens/Admin/Movie/redux/actions/movieActions";
import FinalTicket from "./components/Screens/BookTicket/FinalTicket";
import UserAccount from "./components/Screens/Account/UserAccount";
import { setDate } from "./components/Screens/BookTicket/redux/actions/bookingAction";
import AddSeats from "./components/Screens/Admin/Seat/AddSeats";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDate(new Date().toISOString().slice(0, 10)));
    if (localStorage.getItem("email")) {
      dispatch(handleRefreshRedux());
    }
    if (localStorage.getItem("selectedMovie")) {
      dispatch(handleRefreshMovie());
    }
  }, [dispatch]);
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<UserAccount />} />
              <Route path="/about" element={<About />} />
              <Route path="/news" element={<News />} />
              <Route path="/price" element={<Price />} />
              <Route path="/promotions" element={<Promotions />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/bookticket" element={<BookTicket />} />
              <Route path="/manage" element={<Manage />} />
              <Route path="/finalticket" element={<FinalTicket />} />
              <Route path="/test" element={<AddSeats />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
