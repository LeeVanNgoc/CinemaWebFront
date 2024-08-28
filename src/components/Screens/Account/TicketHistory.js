import React, { useState, useEffect } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Grid from "@mui/material/Grid";
import Typography from "@mui/joy/Typography";
import { handleGetHistory } from "./config";
import { jwtDecode } from "jwt-decode";
import Header from "../../Common/Header/Header";

export default function TicketHistory() {
  const [history, setHistory] = useState([]);

  let decoded = "";
  if (localStorage.token) {
    decoded = jwtDecode(localStorage.token);
  }
  const userCode = decoded.userCode;
  const getHistory = async () => {
    let res = await handleGetHistory(userCode);
    if (res && res.errCode === 0 && res.tickets.errCode === 0) {
      const formattedData = res.tickets.ticketData
        .map((item) => ({
          ticketCode: item.ticketCode,
          userName: item.userName,
          seats: item.seats,
          bank: item.bank,
          totalPrice: item.totalPrice,
          planMovieCode: item.planMovieCode,
          roomCode: item.room,
          movieTitle: item.movieTitle,
          startTime: item.startTime,
          dateScreen: item.dateScreen,
        }))
        .reverse();
      setHistory(formattedData);
    }
  };

  useEffect(() => {
    getHistory();
  }, [userCode]);
  return (
    <div className="flex justify-center">
      <Header />
      <div className="flex flex-col mt-24">
        {history &&
          history.map((item, index) => (
            <Card
              key={index}
              orientation="horizontal"
              variant="outlined"
              sx={{ width: 600, marginBottom: "10px" }}
            >
              <CardContent>
                <Typography
                  textColor="success.plainColor"
                  sx={{ fontWeight: "md" }}
                >
                  {item.ticketCode} - Suất chiếu: {item.planMovieCode}
                </Typography>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={4}>
                    <Typography
                      sx={{
                        mt: 1.5,
                        fontWeight: 800,
                        fontFamily: "Segoe UI",
                      }}
                      color="text.primary"
                    >
                      Khách hàng
                    </Typography>
                    <Typography>
                      {userCode} - {item.userName}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      sx={{
                        mt: 1.5,
                        fontWeight: 800,
                        fontFamily: "Segoe UI",
                      }}
                      color="text.primary"
                    >
                      Phim
                    </Typography>
                    <Typography>{item.movieTitle}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      sx={{
                        mt: 1.5,
                        fontWeight: 800,
                        fontFamily: "Segoe UI",
                      }}
                      color="text.primary"
                    >
                      Phòng
                    </Typography>

                    {item.roomCode}
                  </Grid>
                  <Grid item xs={4}>
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

                    {item.seats}
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      sx={{
                        mt: 1.5,
                        fontWeight: 800,
                        fontFamily: "Segoe UI",
                      }}
                      color="text.primary"
                    >
                      Giờ chiếu
                    </Typography>
                    <Typography>
                      {item.startTime} - {item.dateScreen}
                    </Typography>
                  </Grid>{" "}
                  <Grid item xs={4}>
                    <Typography
                      sx={{
                        mt: 1.5,
                        fontWeight: 800,
                        fontFamily: "Segoe UI",
                      }}
                      color="text.primary"
                    >
                      Thanh toán
                    </Typography>
                    {item.totalPrice}đ - {item.bank}
                  </Grid>
                </Grid>
              </CardContent>
              <CardOverflow
                variant="soft"
                color="primary"
                sx={{
                  px: 0.2,
                  writingMode: "vertical-rl",
                  justifyContent: "center",
                  fontSize: "xs",
                  fontWeight: "xl",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  borderLeft: "1px solid",
                  borderColor: "divider",
                }}
              >
                Ticket - KSE Cinema
              </CardOverflow>
            </Card>
          ))}
      </div>
    </div>
  );
}
