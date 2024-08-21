// import { BrowserRouter as Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
// import component
import About from "../components/Screens/About/About";
import Home from "../components/Screens/Home/Home";
import News from "../components/Screens/News/News";
import Price from "../components/Screens/Price/Price";
import Promotions from "../components/Screens/Promotions/Promotions";
import Movies from "../components/Screens/Movies/Movies";
import BookTicket from "../components/Screens/BookTicket/BookTicket";
import { Manage } from "../components/Screens/Admin/Manage/Manage";
import FinalTicket from "../components/Screens/BookTicket/FinalTicket";
import UserAccount from "../components/Screens/Account/UserAccount";
import TicketDetailed from "../components/Screens/BookTicket/TicketDetailed";
import Dashboard from "../components/Screens/Admin/Dashboard/Dashboard";
import ForgotPassword from "../components/Common/SignIn/ForgotPassword/ForgotPassword";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* user */}
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/bookticket" element={<BookTicket />} />
        <Route path="/finalticket" element={<FinalTicket />} />
        <Route path="/myticket" element={<TicketDetailed />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/price" element={<Price />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/login-by-otp" element={<ForgotPassword />} />

        {/* admin */}
        <Route
          path="/manage"
          element={
            <PrivateRoute>
              <Manage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
