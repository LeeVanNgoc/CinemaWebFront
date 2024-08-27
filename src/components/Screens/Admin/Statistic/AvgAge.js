import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { handleGetAvgAge, handleGetAvgAgeInTheater } from "./config";
import "./ScreeningCount.scss";

export default function AvgAge() {
  const [data, setData] = useState(null);

  let decoded = "";
  if (localStorage.token) {
    decoded = jwtDecode(localStorage.token);
  }

  // Tuổi trung bình 3 rạp
  const fetchAvgAge = async () => {
    const res = await handleGetAvgAge();
    console.log("avg data: ", res);
    if (res.averageAge) {
      setData(res.averageAge.averageAge);
    }
  };

  // Tuổi trung bình 1 rạp
  const fetchAvgAgeInTheater = async (theaterCode) => {
    const res = await handleGetAvgAgeInTheater(theaterCode);
    console.log("avg: ", res);
    if (res) {
      setData(res.averageAge.averageAge);
    }
  };

  useEffect(() => {
    if (decoded.theaterCode) {
      fetchAvgAgeInTheater(decoded.theaterCode);
    } else {
      fetchAvgAge();
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
        {data && <p className="font-bold text-2xl">{data}</p>}
        <p>Tuổi trung bình</p>
      </div>
    </div>
  );
}
