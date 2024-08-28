import { useEffect, useState } from "react";
import { handleGetListTickets } from "../Tickets/config";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export default function BookedTickets() {
  const [tickets, setTickets] = useState(0);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        let res = await handleGetListTickets();
        console.log("res list tickets >>>", res);
        if (res && res.tickets) {
          const formattedData = res.tickets.length;
          setTickets(formattedData);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div
      className=" box-border translate-y-6 rounded-2xl p-2 text-white flex flex-row gap-3"
      style={{ background: "linear-gradient(to bottom, #262C36, #1B1E24)" }}
    >
      <ConfirmationNumberIcon sx={{ fontSize: "4rem", color: "orange" }} />
      <div className="flex flex-col text-sm">
        {tickets && <p className="font-bold text-2xl">{tickets}</p>}
        <span>Vé đã đặt</span>
      </div>
    </div>
  );
}
