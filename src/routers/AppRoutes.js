// import { BrowserRouter as Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
// import component
import About from "../components/Screens/About/About";
import Home from "../components/Screens/Home/Home";
import News from "../components/Screens/News/News";
import Price from "../components/Screens/Price/Price";
import Movies from "../components/Screens/Movies/Movies";
import BookTicket from "../components/Screens/BookTicket/BookTicket";
import { Manage } from "../components/Screens/Admin/Manage/Manage";
import FinalTicket from "../components/Screens/BookTicket/FinalTicket";
import UserAccount from "../components/Screens/Account/UserAccount";
import Bill from "../components/Screens/BookTicket/Bill";
import ForgotPassword from "../components/Common/SignIn/ForgotPassword/ForgotPassword";
import AdminView from "../components/Screens/Admin/Dashboard/AdminView";
import TicketHistory from "../components/Screens/Account/TicketHistory";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* user */}
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/history" element={<TicketHistory />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/bookticket" element={<BookTicket />} />
        <Route path="/finalticket" element={<FinalTicket />} />
        <Route path="/myticket" element={<Bill />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/price" element={<Price />} />
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
              <AdminView />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
