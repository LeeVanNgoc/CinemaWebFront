import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Footer from "./components/Common/Footer/Footer";
import Introduce from "./components/Screens/Introduce/Introduce";
import Header from "./components/Common/Header/Header";
import Home from "./components/Screens/Home/Home";
import News from "./components/Screens/News/News";
import Price from "./components/Screens/Price/Price";
import Promotion from "./components/Screens/Promotion/Promotion";
import Showtimes from "./components/Screens/Showtimes/Showtimes";
import BookTicket from "./components/Screens/BookTicket/BookTicket";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/news" element={<News />} />
          <Route path="/price" element={<Price />} />
          <Route path="/promotion" element={<Promotion />} />
          <Route path="/showtimes" element={<Showtimes />} />
          <Route path="/bookticket" element={<BookTicket />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
