import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  handleGetTotalRevenue,
  handleGetTotalRevenueAllTheater,
} from "./config";
import "./ScreeningCount.scss";

export default function TotalRenvenue() {
  const [data, setData] = useState(null);

  let decoded = "";
  if (localStorage.token) {
    decoded = jwtDecode(localStorage.token);
  }

  // Tổng doanh thu 1 rạp
  const fetchRevenue = async () => {
    const res = await handleGetTotalRevenue(
      decoded.theaterCode,
      "2024-08-01",
      "2024-08-31"
    );
    console.log("revenue data: ", res);
    if (res) {
      setData(res.totalRevenue);
    }
  };

  // Tổng doanh thu 3 rạp
  const fetchAllRevenue = async () => {
    const res = await handleGetTotalRevenueAllTheater(
      "2024-08-01",
      "2024-08-31"
    );
    console.log("revenue all: ", res);
    if (res) {
      setData(res.totalRevenue);
    }
  };

  useEffect(() => {
    if (decoded.theaterCode) {
      fetchRevenue();
    } else {
      fetchAllRevenue();
    }
    console.log(data);
  }, []);

  return (
    <div
      className=" box-border translate-y-6 rounded-2xl p-6 text-white flex flex-row gap-3"
      style={{ background: "linear-gradient(to bottom, #262C36, #1B1E24)" }}
    >
      <img src={require("../Dashboard/assets/revenue.png")} className="w-16" />
      <div className="flex flex-col">
        {data && <p className="font-bold text-2xl">{data}đ</p>}
        <p>Tổng doanh thu rạp {decoded.city}</p>
      </div>
    </div>
  );
}
