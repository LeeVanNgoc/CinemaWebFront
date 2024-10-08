import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./scss/TicketDetailed.scss";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { handleGetBill } from "./config";
import React, { useEffect, useState } from "react";
import Header from "../../Common/Header/Header";

export default function Bill() {
  const navigate = useNavigate();

  const [bill, setBill] = useState([]);
  const goBack = () => {
    navigate("/bookticket");
  };

  const getBill = async () => {
    const res = await handleGetBill(localStorage.getItem("ticketCode"));
    console.log("bill: ", res);
    if (res && res.errCode === 0) {
      const formattedData = res.ticket;
      setBill(formattedData);
    }
  };
  useEffect(() => {
    getBill();
  }, []);

  return (
    <div className="flex justify-center">
      <Header />
      <div className="my-20 flex flex-col justify-center h-screen w-1/2 bg-neutral-800 border rounded-md border-slate-500">
        {bill && (
          <Box sx={{ width: "100%" }}>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography
                    color="text.primary"
                    sx={{ fontWeight: 800, fontFamily: "Segoe UI" }}
                  >
                    Hóa đơn <br /> <br /> Mã vé
                  </Typography>
                  <Typography variant="h6" component="div">
                    {bill.ticketCode}
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
                        Mã khách hàng
                      </Typography>
                      <Typography>{bill.userCode}</Typography>
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

                      {bill.seats}
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
                        Tổng tiền
                      </Typography>
                      {bill.totalPrice}
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
                        Mã suất chiếu
                      </Typography>
                      <Typography>{bill.planScreenMovieCode}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </React.Fragment>
            </Card>
          </Box>
        )}{" "}
        <Button
          variant="contained"
          sx={{
            borderRadius: 6,
            backgroundColor: "grey",
            height: "40px",
            marginTop: "30px",
          }}
          onClick={() => goBack()}
        >
          Trở về
        </Button>
      </div>
    </div>
  );
}
