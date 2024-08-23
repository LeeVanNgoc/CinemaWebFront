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

  const fetchAllRevenue = async () => {
    const res = await handleGetTotalRevenueAllTheater(
      "2024-08-01",
      "2024-08-31"
    );
    console.log("revenue data: ", res);
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
    <div className="text-white box-border translate-y-6">
      {data && <p className="font-bold text-2xl">{data}đ</p>}
      <p>Tổng doanh thu rạp {decoded.city}</p>
    </div>
  );
}
