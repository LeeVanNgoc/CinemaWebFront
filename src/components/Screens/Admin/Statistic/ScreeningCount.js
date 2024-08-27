import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { handleScreeningCount } from "./config";
import "./ScreeningCount.scss";

export default function ScreeningCount() {
  const [data, setData] = useState([]);
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

  const fetchScreeningCount = async (month, year) => {
    const res = await handleScreeningCount(month, year);
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
    fetchScreeningCount(parseInt(month), parseInt(year));
  }, [month, year]);

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
