import * as React from "react";
import ShowtimesCard from "./ShowtimesCard";
import Brightness1SharpIcon from "@mui/icons-material/Brightness1Sharp";
import "./Showtimes.scss";

const Showtimes = () => {
  return (
    <div className="showtimes-container">
      <div className="section-name">
        <Brightness1SharpIcon sx={{ color: "#dc1313f0", marginRight: "9px" }} />
        <span>Phim đang chiếu</span>
      </div>

      <ShowtimesCard />
    </div>
  );
};

export default Showtimes;
