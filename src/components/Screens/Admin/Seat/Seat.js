import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleGetSeats } from "./redux/actions/seatActions";
import ModalAddSeat from "./ModalAddSeat";

export const Seats = (roomId) => {
  const dispatch = useDispatch();

  const seats = useSelector((state) => state.manageSeats.rows);

  const [openAddSeats, setOpenAddSeats] = useState(false);

  const handleOpenAddSeats = () => setOpenAddSeats(true);
  const handleCloseAddSeats = () => setOpenAddSeats(false);

  useEffect(() => {
    dispatch(handleGetSeats(roomId.roomId));
  }, [dispatch]);

  return (
    <div className="align-middle">
      <div className="flex justify-end">
        <ModalAddSeat
          isOpen={openAddSeats}
          handleOpen={handleOpenAddSeats}
          handleClose={handleCloseAddSeats}
        />
      </div>
      <h1 className="text-center font-bold text-2xl mb-4">
        Phòng {roomId.roomId}
      </h1>
      <div className="flex justify-center">
        <table>
          <tbody>
            {seats.reduce((rows, seat, index) => {
              if (index === 0 || seat.row !== seats[index - 1].row) {
                rows.push(
                  <tr key={`row-${seat.row}`}>
                    <td>{seat.row}</td>
                    <td className="flex justify-center">
                      {seats
                        .filter((s) => s.row === seat.row)
                        .map((s) => (
                          <span
                            key={`seat-${s.seatCode}`}
                            className={`m-1 text-white rounded-md px-3 py-1 ${
                              s.type === "VIP"
                                ? "bg-orange-500"
                                : s.type === "Double"
                                ? "bg-red-500"
                                : "bg-slate-600"
                            }`}
                          >
                            {s.row}
                            {s.col}
                          </span>
                        ))}
                    </td>
                  </tr>
                );
              }
              return rows;
            }, [])}
          </tbody>
        </table>
      </div>
    </div>
  );
};
