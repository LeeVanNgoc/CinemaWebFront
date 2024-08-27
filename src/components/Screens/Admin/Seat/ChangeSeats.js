import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleGetSeats } from "./redux/actions/seatActions";
import { toast } from "react-toastify";
import {
  handleAddMultipleSeats,
  handleDeleteAllSeatsInRoom,
  handleEditSeats,
} from "./config";

function ChangeSeats(roomCode) {
  const dispatch = useDispatch();

  const seats = useSelector((state) => state.manageSeats.rows);
  const [selectedCell, setSelectedCell] = useState([]);
  const [available, setAvailable] = useState(true);
  const [totalSeats, setTotalSeats] = useState(0);
  const [rows, setRows] = useState([
    {
      id: "A",
      columns: [
        {
          cellId: "A1",
          roomId: roomCode.roomCode,
          type: "Standard",
          row: "A",
          col: 1,
          isAvailable: true,
        },
      ],
    },
  ]);

  const transformSeatsToRows = (seats) => {
    return seats.reduce((acc, seat) => {
      const existingRow = acc.find((r) => r.id === seat.row);
      if (existingRow) {
        existingRow.columns.push({
          cellId: `${seat.row}${seat.col}`,
          roomCode: seat.roomCode,
          type: seat.type,
          row: seat.row,
          col: seat.col,
          isAvailable: seat.isAvailable,
        });
      } else {
        acc.push({
          id: seat.row,
          columns: [
            {
              cellId: `${seat.row}${seat.col}`,
              roomCode: seat.roomCode,
              type: seat.type,
              row: seat.row,
              col: seat.col,
              isAvailable: seat.isAvailable,
            },
          ],
        });
      }
      return acc;
    }, []);
  };

  useEffect(() => {
    dispatch(handleGetSeats(roomCode.roomCode));
  }, [dispatch, roomCode]);

  useEffect(() => {
    if (seats && seats.length > 0) {
      const transformedRows = transformSeatsToRows(seats);
      setRows(transformedRows);
    }
  }, [seats]);

  // Thay đổi số lượng ghế mỗi hàng
  const setSeatsPerRow = (event, rowId) => {
    const newCount = parseInt(event.target.value, 10);

    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            columns: Array.from({ length: newCount }, (_, index) => ({
              cellId: `${row.id}${index + 1}`,
              roomCode: roomCode.roomCode,
              type: "Standard",
              row: row.id,
              col: index + 1,
              isAvailable: true,
            })),
          };
        }
        return row;
      })
    );
  };

  // Thêm hàng ghế
  const addRow = () => {
    const newRowId = String.fromCharCode(rows.length + 65);
    setRows((prevRows) => [
      ...prevRows,
      {
        id: newRowId,
        columns: [
          {
            cellId: `${newRowId}1`,
            roomCode: roomCode.roomCode,
            type: "Standard",
            row: newRowId,
            col: 1,
            isAvailable: true,
          },
        ],
      },
    ]);
  };

  // chọn ghế
  const handleSelectCell = (cellId) => {
    setSelectedCell((prevSelectedCell) => {
      if (prevSelectedCell.includes(cellId)) {
        return prevSelectedCell.filter((id) => id !== cellId);
      } else {
        return [...prevSelectedCell, cellId];
      }
    });
  };

  // thay đổi loại ghế
  const handleSetType = (type) => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        columns: row.columns.map((column) => {
          if (selectedCell.includes(column.cellId) && type === "Sweetbox") {
            return {
              ...column,
              type: "Sweetbox",
            };
          } else if (selectedCell.includes(column.cellId) && type === "VIP") {
            return {
              ...column,
              type: "VIP",
            };
          } else if (
            selectedCell.includes(column.cellId) &&
            type === "Standard"
          ) {
            return {
              ...column,
              type: "Standard",
            };
          }
          return column;
        }),
      }))
    );
    setSelectedCell([]);
    toast.success("Đặt kiểu ghế thành công!");
  };

  // thay đổi trạng thái ghế
  const handleSetUnavailable = () => {
    setAvailable(!available);

    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        columns: row.columns.map((column) => {
          if (selectedCell.includes(column.cellId)) {
            return {
              ...column,
              isAvailable: !column.isAvailable,
            };
          }
          return column;
        }),
      }))
    );
    setSelectedCell([]);
    toast.success("Đặt kiểu ghế thành công!");
  };

  // set màu mỗi ghế
  const setColor = (cellId, cellType, cellAvailable) => {
    if (selectedCell.includes(cellId)) {
      return "bg-blue-500";
    } else if (!cellAvailable) {
      return "bg-slate-400";
    } else if (cellType === "VIP") {
      return "bg-orange-500";
    } else if (cellType === "Sweetbox") {
      return "bg-red-500 w-20";
    } else {
      return "bg-slate-600";
    }
  };

  const handleResetAll = () => {
    setSelectedCell([]);
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        columns: row.columns.map((column) => {
          return {
            ...column,
            type: "Standard",
            isAvailable: true,
          };
        }),
      }))
    );
  };

  const handleChangeSeats = (action, seats) => {
    if (action === "Add") {
      handleAddMultipleSeats(seats);
    } else {
      handleEditSeats(seats);
    }
  };

  // Tính tổng số ghế
  useEffect(() => {
    let calculatedTotalSeats = 0;
    rows.forEach((row) => {
      calculatedTotalSeats += row.columns.filter(
        (column) => column.isAvailable
      ).length;
    });
    setTotalSeats(calculatedTotalSeats);
    console.log("rows: ", rows);
  }, [rows]);

  return (
    <div className="mt-4 flex-col justify-center items-center">
      <div className="flex justify-end gap-5 mb-4">
        <button
          className="bg-orange-500 py-1 px-2 rounded-md"
          onClick={() => handleSetType("VIP")}
        >
          Ghế VIP
        </button>
        <button
          className="bg-red-500 py-1 px-2 rounded-md"
          onClick={() => handleSetType("Sweetbox")}
        >
          Ghế đôi
        </button>
        <button
          className="bg-slate-600 py-1 px-2 rounded-md text-white"
          onClick={() => handleSetType("Standard")}
        >
          Ghế thường
        </button>
        <button
          className="bg-slate-400 py-1 px-2 rounded-md"
          onClick={() => handleSetUnavailable()}
        >
          Hỏng
        </button>
        <button
          className="bg-green-400 py-1 px-2 rounded-md"
          onClick={() => handleResetAll()}
        >
          Đặt lại
        </button>
      </div>
      {selectedCell}

      <div>
        <img
          src={require("../../BookTicket/assets/screen.png")}
          alt="Screen"
          className="w-3/5 box-border translate-x-1/4 mb-4"
        />
        <table className="flex justify-center">
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${index}-${row.id}`}>
                <td>{row.id}</td>
                <td className="flex justify-center">
                  {row.columns.map((column) => (
                    <span
                      key={column.cellId}
                      className={`m-1 text-white text-center rounded-md px-3 py-1 cursor-pointer ${setColor(
                        column.cellId,
                        column.type,
                        column.isAvailable
                      )} 
                      }`}
                      onClick={() => handleSelectCell(column.cellId)}
                    >
                      {column.cellId}
                    </span>
                  ))}
                </td>
                {!seats ||
                  (seats.length === 0 && (
                    <td>
                      Số lượng:
                      <input
                        id={`input-${row.id}`}
                        type="number"
                        min="1"
                        onChange={(event) => setSeatsPerRow(event, row.id)}
                        className="text-black w-12 text-center rounded-sm border border-slate-600 ml-4"
                      />
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right font-medium text-lg">
          Tổng số ghế: {totalSeats}
        </div>
        <div className="flex justify-end gap-5 mb-4">
          {!seats ||
            (seats.length === 0 && (
              <button
                onClick={addRow}
                className="rounded-2xl border-2 border-red-500 px-3 py-1"
              >
                +
              </button>
            ))}
          {seats && seats.length > 0 ? (
            <div className="flex flex-row gap-5">
              <button
                className="bg-green-400  py-1 px-2 rounded-md"
                onClick={() => handleChangeSeats("Edit", rows)}
              >
                Cập nhật
              </button>
              <button
                className="bg-green-400  py-1 px-2 rounded-md"
                onClick={() => handleDeleteAllSeatsInRoom(roomCode.roomCode)}
              >
                Xóa tất cả
              </button>
            </div>
          ) : (
            <button
              className="bg-green-400  py-1 px-2 rounded-md"
              onClick={() => handleChangeSeats("Add", rows)}
            >
              Tạo ghế
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChangeSeats;
