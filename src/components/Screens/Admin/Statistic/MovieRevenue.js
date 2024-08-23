import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { handleGetMovieRevenue } from "./config";
import "./ScreeningCount.scss";
import { width } from "@mui/system";

export default function MovieRevenue() {
  const [data, setData] = useState([]);

  const [startDate, setStartDate] = useState("2024-08-01");
  const [endDate, setEndDate] = useState("2024-08-31");

  const [tickPlacement] = useState("middle");
  const [tickLabelPlacement] = useState("middle");

  const valueFormatter = (value) => `${value}đ`;

  const fetchMovieRevenue = async (startDate, endDate) => {
    const res = await handleGetMovieRevenue(startDate, endDate);
    console.log("movie revenie data: ", res);
    if (res && res.errCode === 0) {
      const formattedData = res.revenueData.map((item) => ({
        movieTitle: item.movieTitle,
        totalRevenue: item.totalRevenue,
      }));
      setData(formattedData);
    }
  };

  useEffect(() => {
    fetchMovieRevenue(startDate, endDate);
  }, [startDate, endDate]);

  const chartSetting = {
    yAxis: [
      {
        label: "Doanh thu (đ)",
      },
    ],
    series: [
      {
        dataKey: "totalRevenue",
        label: `Doanh thu từ ${startDate} đến ${endDate}`,
        valueFormatter,
      },
    ],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px) translateY(-10px) rotate(-270deg)",
        transformOrigin: "top left",
        fill: "#bfcfe7",
      },
    },
  };

  return (
    <div
      className="ml-30 rounded-md p-3 shadow-lg shadow-stone-950"
      style={{ backgroundColor: "#3D3B40" }}
    >
      <Stack direction="row" spacing={1} className="flex justify-end">
        <TextField
          inputMode="text"
          sx={{ width: 110, color: "white" }}
          label="Ngày bắt đầu"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
        <TextField
          inputMode="text"
          sx={{ width: 110, color: "white" }}
          label="Ngày kết thúc"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
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
