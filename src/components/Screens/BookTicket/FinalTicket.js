import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { clearSelectedSeats } from "./redux/actions/bookingAction";
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

export default function FinalTicket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movie = useSelector((state) => state.manageMovies.selectedMovie);
  const date = useSelector((state) => state.userBookTicket.date);
  const time = useSelector((state) => state.userBookTicket.time);
  const seats = useSelector((state) => state.userBookTicket.selectedSeats);

  const goBack = () => {
    dispatch(clearSelectedSeats());
    navigate("/bookticket");
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
        <Box sx={{ width: "60%" }}>
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
                      {time.time} - {date.date}
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

        <Box sx={{ width: "38%" }}>
          <Card variant="outlined">
            <React.Fragment>
              <CardContent>
                <Typography color="text.secondary">
                  Phương thức thanh toán
                </Typography>

                <Typography sx={{ mt: 1.5 }} color="text.secondary">
                  Chi phí
                </Typography>
                <Typography variant="body2">Thanh toán</Typography>
                <Typography variant="body2">Phí</Typography>
                <Typography variant="body2">Tổng cộng</Typography>
              </CardContent>
            </React.Fragment>
          </Card>
        </Box>
      </div>
      <div>
        <Box sx={{ maxWidth: "60%", marginTop: 3 }}>
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
                      <TableCell>80.000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </React.Fragment>
          </Card>
        </Box>
      </div>
      <div className="flex gap-2">
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
          // onClick={() => bookTicket()}
        >
          Đặt vé
        </Button>
      </div>
    </div>
  );
}
