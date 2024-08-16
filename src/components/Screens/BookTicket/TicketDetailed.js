import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TicketDetailed() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/bookticket");
  };

  return (
    <div className="my-24 flex justify-center">
      <Button onClick={() => goBack()}>Trở về</Button>
      <Button>Xem vé đã đặt</Button>
    </div>
  );
}
