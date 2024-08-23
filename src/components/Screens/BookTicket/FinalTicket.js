// import react
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// import material-ui
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

// import project component
import Signin from "../../Common/SignIn/Signin";
import { clearStartTimeAndRoom } from "./redux/actions/bookingAction";
import { handleCreateTicket, handleCreateBookedSeats } from "./config";
import { BankRadioButton } from "./BankRadioButton";

export default function FinalTicket() {
  let decoded = "";
  if (localStorage.token) {
    decoded = jwtDecode(localStorage.token);
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.account);
  const movie = useSelector((state) => state.manageMovies.selectedMovie);
  const planCode = useSelector((state) => state.userBookTicket.selectedPlan[0]);
  const date = useSelector((state) => state.userBookTicket.date);
  const time = useSelector((state) => state.userBookTicket.time);
  const room = useSelector((state) => state.userBookTicket.room);
  const bank = useSelector((state) => state.userBookTicket.bank);
  const seats = useSelector((state) =>
    state.userBookTicket.seat.map((item) => item)
  );
  const totalBill = useSelector((state) => state.userBookTicket.totalBill);

  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSignInOpen = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false);

  const handleSignUpOpen = () => setSignUpOpen(true);

  const switchToSignUp = () => {
    handleSignInClose();
    handleSignUpOpen();
  };

  const goBack = () => {
    dispatch(clearStartTimeAndRoom());
    navigate("/bookticket");
  };

  const createBookedSeats = async (ticketCode) => {
    const res = await handleCreateBookedSeats(ticketCode);
    console.log("booked seats: ", res);
  };

  const bookTicket = async () => {
    if (user.auth !== true) {
      handleSignInOpen();
    } else {
      try {
        const res = await handleCreateTicket(
          decoded.userCode,
          planCode,
          seats.join(", "),
          bank,
          totalBill
        );
        dispatch(clearStartTimeAndRoom());
        console.log("create ticket: ", res);
        localStorage.setItem("ticketCode", res.newTickets.ticketCode);
        await createBookedSeats(res.newTickets.ticketCode);

        if (res && res.errCode === 0) {
          setOpen(true);
        }
        navigate("/myticket");
      } catch (error) {
        console.error("Error booking ticket:", error);
      }
    }
  };

  return (
    <div className="mt-24 mx-40">
      <div className="flex flex-row justify-between">
        <div className="flex-col" style={{ width: "60%" }}>
          <Box sx={{ width: "100%" }}>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography
                    color="text.primary"
                    sx={{ fontWeight: 800, fontFamily: "Segoe UI" }}
                  >
                    Thông tin phim <br /> <br /> Phim
                  </Typography>
                  <Typography variant="h6" component="div">
                    {movie.title}
                  </Typography>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          mt: 1.5,
                          fontWeight: 800,
                          fontFamily: "Segoe UI",
                        }}
                        color="text.primary"
                      >
                        Ngày giờ chiếu
                      </Typography>
                      <Typography>
                        {time} - {date}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          mt: 1.5,
                          fontWeight: 800,
                          fontFamily: "Segoe UI",
                        }}
                        color="text.primary"
                      >
                        Ghế
                      </Typography>

                      {seats.join(", ")}
                    </Grid>

                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          mt: 1.5,
                          fontWeight: 800,
                          fontFamily: "Segoe UI",
                        }}
                        color="text.primary"
                      >
                        Định dạng
                      </Typography>
                      <Typography>2D</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          mt: 1.5,
                          fontWeight: 800,
                          fontFamily: "Segoe UI",
                        }}
                        color="text.primary"
                      >
                        Phòng chiếu
                      </Typography>
                      <Typography>{room}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </React.Fragment>
            </Card>
          </Box>
          <Box sx={{ maxWidth: "100%", marginTop: 3 }}>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography
                    color="text.primary"
                    sx={{ fontWeight: 800, fontFamily: "Segoe UI" }}
                  >
                    Thông tin thanh toán
                  </Typography>
                  <Table
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      borderRadius: "20px",
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ textAlign: "center" }}>
                          Danh mục
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          Số lượng
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          Tổng tiền
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Ghế ({seats.join(", ")})</TableCell>
                        <TableCell>{seats.length}</TableCell>
                        <TableCell>{totalBill}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </React.Fragment>
            </Card>
          </Box>
        </div>

        <div className="flex-col" style={{ width: "38%" }}>
          <Box sx={{ width: "100%" }}>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography
                    color="text.primary"
                    sx={{ fontWeight: 800, fontFamily: "Segoe UI" }}
                  >
                    Phương thức thanh toán
                  </Typography>
                  <BankRadioButton />
                  <Typography
                    sx={{ mt: 1.5, fontWeight: 800, fontFamily: "Segoe UI" }}
                    color="text.primary"
                  >
                    Chi phí
                  </Typography>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td>Thanh toán:</td>
                        <td>{totalBill}đ</td>
                      </tr>
                      <tr>
                        <td>Phí:</td>
                        <td>0đ</td>
                      </tr>
                      <tr>
                        <td>Tổng cộng:</td>
                        <td>{totalBill}đ</td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </React.Fragment>
            </Card>
          </Box>
          <div className="flex gap-2 mt-4 justify-end">
            <Button
              variant="contained"
              sx={{
                borderRadius: 6,
                backgroundColor: "grey",
                height: "40px",
              }}
              onClick={() => goBack()}
            >
              Trở về
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: 6,
                backgroundColor: "red",
                height: "40px",
              }}
              onClick={() => bookTicket()}
            >
              Đặt vé
            </Button>
          </div>
        </div>
      </div>

      <Signin
        isOpen={isSignInOpen}
        handleClose={handleSignInClose}
        switchToSignUp={switchToSignUp}
      />
    </div>
  );
}
