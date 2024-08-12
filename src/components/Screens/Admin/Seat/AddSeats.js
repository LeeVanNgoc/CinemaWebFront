import { useEffect, useState } from "react";
import { handleAddMultipleSeats } from "./config";

function AddSeats() {
  const roomId = 1;
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
          roomId: roomId,
          type: "Regular",
          row: "A",
          col: 1,
          isAvailable: true,
        },
      ],
    },
  ]);

  useEffect(() => {
    if (type === "VIP") {
      setVIP(selectedCell);
    } else if (type === "Double") {
      setDouble(selectedCell);
    }
  }, [selectedCell, type]);

  const setSeatsPerRow = (event, rowId) => {
    const newCount = parseInt(event.target.value, 10);
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            columns: Array.from({ length: newCount }, (_, index) => ({
              cellId: `${row.id}${index + 1}`,
              roomId: roomId,
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
            roomId: roomId,
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

  const handleSetType = (cellId) => {
    setSelectedCell((prevSelectedCell) => {
      if (prevSelectedCell.includes(cellId)) {
        return prevSelectedCell.filter((id) => id !== cellId);
      } else {
        return [...prevSelectedCell, cellId];
      }
    });
  };

  const setColor = (cellId) => {
    if (
      (selectedCell.includes(cellId) && type === "VIP") ||
      (VIP && VIP.includes(cellId))
    ) {
      return "bg-orange-500";
    } else if (
      (selectedCell.includes(cellId) && type === "Double") ||
      (double && double.includes(cellId))
    ) {
      return "bg-red-500";
    } else {
      return "bg-slate-600";
    }
  };

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
    console.log("Confirm set type: ");
  };
  console.log("rows: ", rows);

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

  const handleCreateSeats = (seats) => {
    handleAddMultipleSeats(seats);
  };

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
        <button
          className="bg-green-400  py-1 px-2 rounded-md"
          onClick={() => handleCreateSeats(rows)}
        >
          Lưu dữ liệu
        </button>
      </div>

      <div>
        {VIP}
        <table>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td className="flex justify-center">
                  {row.columns.map((column) => (
                    <span
                      key={column.cellId}
                      className={`m-1 text-white rounded-md px-3 py-1 ${setColor(
                        column.cellId
                      )} 
                      }`}
                      onClick={() => handleSetType(column.cellId)}
                    >
                      {column.cellId}
                    </span>
                  ))}
                </td>
                <td>
                  Số cột:
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

export default AddSeats;
