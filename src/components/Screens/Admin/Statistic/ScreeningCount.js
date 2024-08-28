import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { handleScreeningCount } from "./config";
import "./ScreeningCount.scss";
import { jwtDecode } from "jwt-decode";
import { Select, FormControl, InputLabel } from "@mui/material";

export default function ScreeningCount() {
  const [data, setData] = useState([]);
  const [theaterCode, setTheaterCode] = useState("T001");

  let decoded = "";
  if (localStorage.token) {
    decoded = jwtDecode(localStorage.token);
  }

  const months = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const [month, setMonth] = useState("8");
  const [year, setYear] = useState(new Date().getFullYear() + "");

  const [tickPlacement] = useState("middle");
  const [tickLabelPlacement] = useState("middle");

  const valueFormatter = (value) => `${value} suất`;

  const fetchScreeningCount = async (month, year, theaterCode) => {
    const res = await handleScreeningCount(month, year, theaterCode);
    console.log("chart data: ", res);
    if (res && res.errCode === 0) {
      const formattedData = res.stats.map((item) => ({
        movieTitle: item.movieTitle,
        screeningCount: item.screeningCount,
      }));
      setData(formattedData);
    }
  };

  useEffect(() => {
    if (decoded.theaterCode) {
      fetchScreeningCount(parseInt(month), parseInt(year), decoded.theaterCode);
    } else {
      fetchScreeningCount(parseInt(month), parseInt(year), theaterCode);
    }
  }, [month, year, theaterCode]);

  const chartSetting = {
    yAxis: [
      {
        label: "Suất chiếu (lần)",
      },
    ],
    series: [
      {
        dataKey: "screeningCount",
        label: `Lịch chiếu tháng ${month}/${year}`,
        valueFormatter,
      },
    ],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
        fill: "#bfcfe7",
      },
    },
  };

  return (
    <div
      className="mx-3 rounded-2xl p-3 shadow-lg shadow-stone-950"
      style={{ background: "linear-gradient(to bottom, #262C36, #1B1E24)" }}
    >
      <Stack direction="row" spacing={1} className="flex justify-end">
        {!decoded.theaterCode && (
          <FormControl sx={{ marginRight: "8px" }}>
            <InputLabel id="theater-label">Chọn rạp</InputLabel>
            <Select
              labelId="theater-label"
              value={theaterCode}
              label="Chọn rạp"
              onChange={(event) => setTheaterCode(event.target.value)}
              sx={{ color: "#fff", height: "56px" }}
            >
              <MenuItem value="T001">Rạp Hà Nội</MenuItem>
              <MenuItem value="T002">Rạp Đà Nẵng</MenuItem>
              <MenuItem value="T003">Rạp TP Hồ Chí Minh</MenuItem>
            </Select>
          </FormControl>
        )}
        <TextField
          select
          sx={{ width: 80 }}
          label="Tháng"
          value={month}
          onChange={(event) => setMonth(event.target.value)}
        >
          {months.map((month, id) => (
            <MenuItem key={id} value={month}>
              {month}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          inputMode="text"
          sx={{ width: 80, color: "white" }}
          label="Năm"
          value={year}
          onChange={(event) => setYear(event.target.value)}
        />
      </Stack>
      <BarChart
        dataset={data}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "movieTitle",
            tickPlacement,
            tickLabelPlacement,
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
