import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { handleGetMovieRevenue } from "./config";
import "./ScreeningCount.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MovieRevenue() {
  const [data, setData] = useState([]);

  const [startDate, setStartDate] = useState("2024-08-01");
  const [endDate, setEndDate] = useState("2024-08-31");

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

  return (
    <div
      className="ml-30 rounded-2xl p-3 shadow-lg shadow-stone-950"
      style={{ background: "linear-gradient(to bottom, #262C36, #1B1E24)" }}
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

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="movieTitle" />
          <YAxis
            type="number"
            domain={[0, "dataMax"]}
            tickFormatter={(value) => value.toString().slice(0, -3)}
            label={{
              value: "(Nghìn đồng)",
              offset: -28,
              angle: 0,
              position: "insideTop",
              dx: 20,
            }}
          />
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="totalRevenue"
            name="Doanh thu phim"
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
