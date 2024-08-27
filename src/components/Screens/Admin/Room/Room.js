import React, { useEffect, useState, useSelector } from "react";

import { TablePagination } from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { handleGetAllRooms } from "./config";
import { useDispatch } from "react-redux";
import {
  setSelectedRoom,
  clearSelectedRoom,
} from "./redux/actions/roomActions";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  FormControl,
} from "@mui/material";
import { StyledInput, HelperText } from "./style";
import ModalAddRoom from "./ModalAddRoom";
import ModalEditRoom from "./ModalEditRoom";
import ModalScreenSeat from "./ModalScreenSeats";
import { setRender } from "../../../../redux/renderAction";

export const Rooms = () => {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);
  const [query, setQuery] = useState("");
  const isRender = useSelector((state) => state.render.isRender);

  const [openAddSeat, setOpenAddRoom] = useState(false);
  const [openEditRoom, setOpenEditRoom] = useState(false);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const handleOpenAddRoom = () => setOpenAddRoom(true);
  const handleCloseAddRoom = () => setOpenAddRoom(false);

  const handleOpenEditRoom = (seat) => {
    dispatch(setSelectedRoom(seat));
    setOpenEditRoom(true);
  };
  const handleCloseEditRoom = () => {
    setOpenEditRoom(false);
    dispatch(clearSelectedRoom());
  };

  const [openScreenSeat, setOpenScreenSeat] = useState(false);
  const [selectedRoomCode, setSelectedRoomCode] = useState(null);

  const handleOpenScreenSeat = (roomCode) => {
    if (roomCode !== null) {
      console.log("Check roomCode form handle open screen seat : ", roomCode);
      if (selectedRoomCode !== roomCode) {
        setSelectedRoomCode(roomCode);
      }
      setOpenScreenSeat(true);
    }
  };

  const handleCloseScreenSeat = () => {
    setOpenScreenSeat(false);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rooms.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRooms = rooms.filter((room) => {
    if (query === "") {
      return rooms;
    } else if (room.isAvailable && room.isAvailable.includes(query)) {
      return room;
    }
    return null;
  });

  const displayedRooms =
    rowsPerPage > 0
      ? filteredRooms.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : filteredRooms;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        let res = await handleGetAllRooms();
        console.log("res list rooms >>>", res);
        if (res && res.roomData) {
          const formattedData = res.roomData.map((item) => ({
            roomCode: item.roomCode,
            theaterCode: item.theaterCode,
            type: item.type,
            totalSeats: item.totalSeats,
            isAvailable: item.isAvailable,
          }));
          setRooms(formattedData);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    if (rooms.length === 0) {
      fetchRooms();
    }

    if (isRender) {
      fetchRooms();
      setTimeout(() => {
        dispatch(setRender(false));
      }, 0);
    }
  }, [isRender]);

  return (
    <div>
      <div className="search-add-container">
        <span>
          <FormControl defaultValue="">
            <StyledInput
              placeholder="Tìm kiếm..."
              onChange={(event) => setQuery(event.target.value)}
            />
            <HelperText />
          </FormControl>
        </span>
        <ModalAddRoom
          isOpen={openAddSeat}
          handleOpen={handleOpenAddRoom}
          handleClose={handleCloseAddRoom}
        />
      </div>

      <TableContainer component={Paper} sx={{ maxHeight: "fit-content" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Mã Phòng</TableCell>
              <TableCell>Mã Rạp Chiếu</TableCell>
              <TableCell>Loại Phòng</TableCell>
              <TableCell>Số Ghế</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(displayedRooms, getComparator(order, orderBy)).map(
              (room, index) => (
                <TableRow key={index}>
                  <TableCell>{room.roomCode}</TableCell>
                  <TableCell>{room.theaterCode}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>{room.totalSeats}</TableCell>
                  <TableCell>{room.isAvailable ? 1 : 0}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <ModalEditRoom
                        isOpen={openEditRoom}
                        handleOpen={() => handleOpenEditRoom(room)}
                        handleClose={handleCloseEditRoom}
                      />
                      <Button
                        sx={{
                          border: "1px solid",
                          borderRadius: "20px",
                          padding: "8px 16px",
                          color: "white",
                          fontWeight: "bold",
                          height: "38px",
                          textTransform: "uppercase",
                          background: "#de2121",
                          "&:hover": {
                            background: "#de9999",
                            transform: "scale(1.05)",
                            // borderColor: "#c81010",
                          },
                        }}
                        onClick={() => handleOpenScreenSeat(room.roomCode)}
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            )}
            {openScreenSeat && (
              <ModalScreenSeat
                isOpen={openScreenSeat}
                roomCode={selectedRoomCode}
                handleClose={handleCloseScreenSeat}
              />
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 34 * emptyRows }}>
                <TableCell colSpan={8} aria-hidden />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <tr>
              <TablePagination
                rowsPerPageOptions={[10, 20, 50, { label: "All", value: -1 }]}
                colSpan={8}
                count={rooms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    "aria-label": "rows per page",
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                    slots: {
                      firstPageIcon: FirstPageRoundedIcon,
                      lastPageIcon: LastPageRoundedIcon,
                      nextPageIcon: ChevronRightRoundedIcon,
                      backPageIcon: ChevronLeftRoundedIcon,
                    },
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  justifyContent: "flex-end",
                  display: "flex",
                  gap: "10px",
                }}
              />
            </tr>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
