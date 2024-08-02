import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { handleGetListSeats } from "./config";
import { useDispatch } from "react-redux";
import {
  setSelectedSeat,
  clearSelectedSeat,
} from "./redux/actions/seatActions";
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
import ModalAddSeat from "./ModalAddSeat";
import ModalEditSeat from "./ModalEditSeat";

export const Seats = () => {
  const dispatch = useDispatch();
  const [seats, setSeats] = useState([]);
  const [query, setQuery] = useState("");

  const [openAddSeat, setOpenAddSeat] = useState(false);
  const [openEditSeat, setOpenEditSeat] = useState(false);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("seatsDate");

  const handleOpenAddSeat = () => setOpenAddSeat(true);
  const handleCloseAddSeat = () => setOpenAddSeat(false);

  const handleOpenEditSeat = (seat) => {
    dispatch(setSelectedSeat(seat));
    setOpenEditSeat(true);
  };
  const handleCloseEditSeat = () => {
    setOpenEditSeat(false);
    dispatch(clearSelectedSeat());
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - seats.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredSeats = seats.filter((seat) => {
    if (query === "") {
      return seats;
    } else if (seat.isAvailable && seat.isAvailable.includes(query)) {
      return seat;
    }
    return null;
  });

  const displayedSeats =
    rowsPerPage > 0
      ? filteredSeats.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : filteredSeats;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        let res = await handleGetListSeats();
        console.log("res list seats >>>", res);
        if (res && res.seats) {
          const formattedData = res.seats.map((item) => ({
            seatId: item.seatId,
            type: item.type,
            roomId: item.roomId,
            row: item.row,
            col: item.col,
            isAvailable: item.isAvailable,
          }));
          setSeats(formattedData);
        }
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
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
        <ModalAddSeat
          isOpen={openAddSeat}
          handleOpen={handleOpenAddSeat}
          handleClose={handleCloseAddSeat}
        />
      </div>

      <TableContainer component={Paper} sx={{ maxHeight: "fit-content" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Mã Ghế</TableCell>
              <TableCell>Loại Ghế</TableCell>
              <TableCell>Mã Phòng</TableCell>
              <TableCell>Hàng</TableCell>
              <TableCell>Cột</TableCell>
              <TableCell>Trạng Thái</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(displayedSeats, getComparator(order, orderBy)).map(
              (seat, index) => (
                <TableRow key={index}>
                  <TableCell>{seat.seatId}</TableCell>
                  <TableCell>{seat.type}</TableCell>
                  <TableCell>{seat.roomId}</TableCell>
                  <TableCell>{seat.row}</TableCell>
                  <TableCell>{seat.col}</TableCell>
                  <TableCell>{seat.isAvailable}</TableCell>

                  <TableCell>
                    <ModalEditSeat
                      isOpen={openEditSeat}
                      handleOpen={() => handleOpenEditSeat(seat)}
                      handleClose={handleCloseEditSeat}
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
                count={seats.length}
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
