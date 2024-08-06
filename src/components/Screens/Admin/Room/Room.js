import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { handleGetListRoom } from "./config";
import { useDispatch } from "react-redux";
import {
  setSelectedRoom,
  clearSelectedRoom,
} from "./redux/actions/roomActions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TableFooter,
  FormControl,
} from "@mui/material";
import { StyledInput, HelperText } from "./style";
import ModalAddRoom from "./ModalAddRoom";
import ModalEditRoom from "./ModalEditRoom";

export const Rooms = () => {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);
  const [query, setQuery] = useState("");

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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
        let res = await handleGetListRoom();
        console.log("res list rooms >>>", res);
        if (res && res.rooms) {
          const formattedData = res.rooms.map((item) => ({
            roomId: item.roomId,
            theaterId: item.theaterId,
            type: item.type,
            numberSeats: item.numberSeats,
            isAvailable: item.isAvailable.toString(),
          }));
          setRooms(formattedData);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

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
                  <TableCell>{room.roomId}</TableCell>
                  <TableCell>{room.theaterId}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>{room.numberSeats}</TableCell>
                  <TableCell>{room.isAvailable?1:0}</TableCell>
                  <TableCell>
                    <ModalEditRoom
                      isOpen={openEditRoom}
                      handleOpen={() => handleOpenEditRoom(room)}
                      handleClose={handleCloseEditRoom}
                    />
                  </TableCell>
                </TableRow>
              )
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
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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
