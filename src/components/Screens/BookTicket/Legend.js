import "./scss/SeatMap.scss";
import ClearIcon from "@mui/icons-material/Clear";

const Legend = () => (
  <div className="legend-container">
    <div className="flex items-center mx-2">
      <div className="w-6 h-6 bg-slate-600 mr-2"></div> Ghế thường
    </div>
    <div className="flex items-center mx-2">
      <div className="w-6 h-6 bg-orange-500 mr-2"></div> Ghế VIP
    </div>
    <div className="flex items-center mx-2">
      <div className="w-6 h-6 bg-red-500 mr-2"></div> Ghế đôi
    </div>
    <div className="flex items-center mx-2">
      <div className="w-6 h-6 bg-blue-500 mr-2"></div> Ghế bạn chọn
    </div>
    <div className="flex items-center mx-2">
      <div className="w-6 h-6 bg-gray-300 opacity-50 mr-2">
        {" "}
        <span className="text-white text-xl font-bold">
          <ClearIcon />
        </span>
      </div>{" "}
      Đã đặt
    </div>
  </div>
);

export default Legend;
