import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./index.css";
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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("email")) {
      dispatch(handleRefreshRedux());
    }
  }, [dispatch]);
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/price" element={<Price />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/bookticket" element={<BookTicket />} />
            <Route path="/manage" element={<Manage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
