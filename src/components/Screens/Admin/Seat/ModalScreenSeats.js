import React, { useState } from "react";
import { Button, Box, Grid } from "@mui/material/";

import { useSelector } from "react-redux";

export default function SeatMap({ isOpen, handleOpen, handleClose, seats }) {
  const rows = [...new Set(seats.map((seat) => seat.rows))];

  return (
    <div>
      <Grid container spacing={2}>
        {rows.map((row) => (
          <Grid item xs={12} key={row}>
            <Grid container spacing={1} justifyContent="center">
              {seats
                .filter((seat) => seat.row === row)
                .map((seat) => (
                  <Grid item key={seat.number}>
                    <Button
                      variant="contained"
                      sx={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#4caf50", // Màu ghế
                        "&:hover": {
                          backgroundColor: "#388e3c", // Màu khi hover
                        },
                      }}
                    >
                      {seat.row}
                      {seat.number}
                    </Button>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
