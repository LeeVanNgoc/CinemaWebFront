import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./scss/TicketDetailed.scss";

export default function TicketDetailed() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/bookticket");
  };

  return (
    <div className="flex justify-center">
      <div className="my-20 flex flex-col justify-center h-screen w-1/2 bg-neutral-800 border rounded-md border-slate-500">
        <div className="text-xl font-bold text-white mb-6 text-center">
          Bạn đã đặt vé thành công!
        </div>
        <Button onClick={() => goBack()}>Trở về</Button>
        <Button>Xem vé đã đặt</Button>
      </div>
    </div>
  );
}
