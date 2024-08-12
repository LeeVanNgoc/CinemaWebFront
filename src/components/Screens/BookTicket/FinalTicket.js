import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { clearSelectedSeatsAndTime } from "./redux/actions/bookingAction";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleCreateTicket, handleCreateBookedSeats } from "./config";
import { BankRadioButton } from "./BankRadioButton";

export default function FinalTicket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.account.id);
  const movie = useSelector((state) => state.manageMovies.selectedMovie);
  const planId = useSelector((state) => state.userBookTicket.selectedPlan);
  const date = useSelector((state) => state.userBookTicket.date);
  const time = useSelector((state) => state.userBookTicket.time);
  const bank = useSelector((state) => state.userBookTicket.bank);
  const seats = useSelector((state) =>
    state.userBookTicket.selectedSeats.seat.map((item) => item)
  );
  const totalBill = useSelector((state) => state.userBookTicket.totalBill);

  const goBack = () => {
    dispatch(clearSelectedSeatsAndTime());
    navigate("/bookticket");
  };

  const createBookedSeats = async (ticketId) => {
    const res = await handleCreateBookedSeats(ticketId);
    console.log("booked seats: ", res);
  };

  const bookTicket = async () => {
    try {
      const res = await handleCreateTicket(
        userId,
        planId,
        seats.join(", "),
        bank,
        totalBill
      );
      dispatch(clearSelectedSeatsAndTime());
      console.log("create ticket: ", res);
      localStorage.setItem("ticketId", res.newTickets.ticketId);
      await createBookedSeats(res.newTickets.ticketId);
    } catch (error) {
      console.error("Error booking ticket:", error);
    }
  };

  return (
    <div className="mt-24 mx-40">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="flex-col" style={{ width: "60%" }}>
          <Box sx={{ width: "100%" }}>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography color="text.secondary">
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
                      <Typography sx={{ mt: 1.5 }} color="text.secondary">
                        Ngày giờ chiếu
                      </Typography>
                      <Typography variant="body2">
                        {time} - {date}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography sx={{ mt: 1.5 }} color="text.secondary">
                        Ghế
                      </Typography>

                      {seats.join(", ")}
                    </Grid>

                    <Grid item xs={6}>
                      <Typography sx={{ mt: 1.5 }} color="text.secondary">
                        Định dạng
                      </Typography>
                      <Typography variant="body2">2D</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography sx={{ mt: 1.5 }} color="text.secondary">
                        Phòng chiếu
                      </Typography>
                      <Typography variant="body2">2D</Typography>
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
                  <Typography color="text.secondary">
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
                        <TableCell>Danh mục</TableCell>
                        <TableCell>Số lượng</TableCell>
                        <TableCell>Tổng tiền</TableCell>
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
                  <Typography color="text.secondary">
                    Phương thức thanh toán
                  </Typography>
                  <BankRadioButton />
                  <Typography sx={{ mt: 1.5 }} color="text.secondary">
                    Chi phí
                  </Typography>
                  <Typography variant="body2">
                    Thanh toán: {totalBill}đ
                  </Typography>
                  <Typography variant="body2">Phí: 0đ</Typography>
                  <Typography variant="body2">
                    Tổng cộng: {totalBill}đ
                  </Typography>
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
              onClick={goBack}
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
    </div>
  );
}
