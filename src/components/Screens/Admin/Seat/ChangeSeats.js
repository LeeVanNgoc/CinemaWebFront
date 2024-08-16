import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleAddMultipleSeats, handleEditSeats } from "./config";
import { handleGetSeats } from "./redux/actions/seatActions";
import { handleUpdateNumberSeats } from "../Room/config";

function ChangeSeats(roomCode) {
  const dispatch = useDispatch();

  const seats = useSelector((state) => state.manageSeats.rows);
  const [selectedCell, setSelectedCell] = useState([]);
  const [type, setType] = useState("");
  const [VIP, setVIP] = useState([]);
  const [double, setDouble] = useState([]);
  const [rows, setRows] = useState([
    {
      id: "A",
      columns: [
        {
          cellId: "A1",
          roomId: roomCode.roomCode,
          type: "Regular",
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
          isAvailable: true,
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
              isAvailable: true,
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

    if (type === "VIP") {
      setVIP(selectedCell);
    } else if (type === "Double") {
      setDouble(selectedCell);
    }
  }, [selectedCell, type, seats]);

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
              type: "Regular",
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
            type: "Regular",
            row: newRowId,
            col: 1,
            isAvailable: true,
          },
        ],
      },
    ]);
  };

  const handleClickButton = (type) => {
    setSelectedCell([]);
    setType(type);
  };

  // thay đổi type trên giao diện
  const handleSetType = (cellId) => {
    setSelectedCell((prevSelectedCell) => {
      if (prevSelectedCell.includes(cellId)) {
        return prevSelectedCell.filter((id) => id !== cellId);
      } else {
        return [...prevSelectedCell, cellId];
      }
    });
  };

  // thay đổi type vào data
  const handleConfirmType = () => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        columns: row.columns.map((column) => {
          if (double.includes(column.cellId)) {
            return {
              ...column,
              type: "Double",
            };
          } else if (VIP.includes(column.cellId)) {
            return {
              ...column,
              type: "VIP",
            };
          }
          return column;
        }),
      }))
    );
    alert("Đặt kiểu ghế thành công!");
  };

  // set màu mỗi ghế
  const setColor = (cellId, cellType) => {
    if (
      (selectedCell.includes(cellId) && type === "VIP") ||
      (VIP && VIP.includes(cellId)) ||
      cellType === "VIP"
    ) {
      return "bg-orange-500";
    } else if (
      (selectedCell.includes(cellId) && type === "Double") ||
      (double && double.includes(cellId)) ||
      cellType === "Double"
    ) {
      return "bg-red-500";
    } else {
      return "bg-slate-600";
    }
  };

  const handleDeleteType = () => {
    setType("Regular");
    setDouble([]);
    setVIP([]);
    setSelectedCell([]);
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        columns: row.columns.map((column) => {
          return {
            ...column,
            type: "Regular",
          };
        }),
      }))
    );
  };

  const handleChangeSeats = (action, seats) => {
    if (action === "Add") {
      handleAddMultipleSeats(seats)
        .then(() => {
          handleUpdateNumberSeats(roomCode.roomCode);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      handleEditSeats(seats);
    }
  };
  console.log("rows: ", rows);

  return (
    <div className="mt-4 flex-col justify-center items-center">
      <div className="flex justify-end gap-5 mb-4">
        <button
          className="bg-orange-500 py-1 px-2 rounded-md"
          onClick={() => handleClickButton("VIP")}
        >
          Set VIP
        </button>
        <button
          className="bg-red-500 py-1 px-2 rounded-md"
          onClick={() => handleClickButton("Double")}
        >
          Set Double
        </button>
        {type !== "Regular" && (
          <button
            className="bg-green-400  py-1 px-2 rounded-md"
            onClick={() => handleConfirmType()}
          >
            Lưu {type}
          </button>
        )}
        <button
          className="bg-green-400  py-1 px-2 rounded-md"
          onClick={() => handleDeleteType()}
        >
          Xóa kiểu ghế
        </button>

        {seats && seats.length > 0 ? (
          <button
            className="bg-green-400  py-1 px-2 rounded-md"
            onClick={() => handleChangeSeats("Edit", rows)}
          >
            Cập nhật ghế
          </button>
        ) : (
          <button
            className="bg-green-400  py-1 px-2 rounded-md"
            onClick={() => handleChangeSeats("Add", rows)}
          >
            Tạo ghế
          </button>
        )}
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
                      className={`m-1 text-white rounded-md px-3 py-1 ${setColor(
                        column.cellId,
                        column.type
                      )} 
                      }`}
                      onClick={() => handleSetType(column.cellId)}
                    >
                      {column.cellId}
                    </span>
                  ))}
                </td>
                <td>
                  Số lượng:
                  <input
                    id={`input-${row.id}`}
                    type="number"
                    min="1"
                    onChange={(event) => setSeatsPerRow(event, row.id)}
                    className="text-black w-12 text-center"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right font-medium text-lg">
          Tổng số ghế: {seats.length}
        </div>
        <button
          onClick={addRow}
          className="rounded-2xl border-2 border-red-500 px-3 py-1"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ChangeSeats;
