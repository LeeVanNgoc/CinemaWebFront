import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { handleGetListTickets } from "./config";
import { useDispatch } from "react-redux";
import {
  setSelectedTicket,
  clearSelectedTicket,
} from "./redux/actions/ticketActions";
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
import ModalAddTicket from "./ModalAddTicket";
import ModalEditTicket from "./ModalEditTicket";
import ModalDeleteTicket from "./ModalDeleteTicket";

export const Tickets = () => {
  const dispatch = useDispatch();
  const [tickets, setTickets] = useState([]);
  const [query, setQuery] = useState("");

  const [openAddTicket, setOpenAddTicket] = useState(false);
  const [openEditTicket, setOpenEditTicket] = useState(false);
  const [openDeleteTicket, setOpenDeleteTicket] = useState(false);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("ticketsDate");

  const handleOpenAddTicket = () => setOpenAddTicket(true);
  const handleCloseAddTicket = () => setOpenAddTicket(false);

  const handleOpenEditTicket = (ticket) => {
    dispatch(setSelectedTicket(ticket));
    setOpenEditTicket(true);
  };
  const handleCloseEditTicket = () => {
    setOpenEditTicket(false);
    dispatch(clearSelectedTicket());
  };

  const handleOpenDeleteTicket = (ticket) => {
    dispatch(setSelectedTicket(ticket));
    setOpenDeleteTicket(true);
  };
  const handleCloseDeleteTicket = () => {
    setOpenDeleteTicket(false);
    dispatch(clearSelectedTicket());
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tickets.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (query === "") {
      return tickets;
    } else if (
      (ticket.bank && ticket.bank.includes(query)) ||
      (ticket.ticketId && ticket.userId.trim === query)
    ) {
      return ticket;
    }
    return null;
  });

  const displayedTickets =
    rowsPerPage > 0
      ? filteredTickets.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : filteredTickets;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        let res = await handleGetListTickets();
        console.log("res list tickets >>>", res);
        if (res && res.tickets) {
          const formattedData = res.tickets.map((item) => ({
            ticketCode: item.ticketCode,
            userCode: item.userCode,
            planScreenMovieCode: item.planScreenMovieCode,
            seats: item.seats,
            totalPrice: item.totalPrice,
            bank: item.bank,
            ticketsDate: item.ticketsDate,
          }));
          setTickets(formattedData);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
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
        {/* <ModalAddTicket
          isOpen={openAddTicket}
          handleOpen={handleOpenAddTicket}
          handleClose={handleCloseAddTicket}
        /> */}
      </div>

      <TableContainer component={Paper} sx={{ maxHeight: "fit-content" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Mã Vé</TableCell>
              <TableCell>Mã Người Dùng</TableCell>
              <TableCell>Mã Giờ Chiếu</TableCell>
              <TableCell>Ghế</TableCell>
              <TableCell>Tổng thanh toán</TableCell>
              <TableCell>Ngân hàng</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "ticketSDate"}
                  direction={orderBy === "ticketsDate" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "ticketsDate")}
                >
                  Ngày Đặt Vé
                </TableSortLabel>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(displayedTickets, getComparator(order, orderBy)).map(
              (ticket, index) => (
                <TableRow key={index}>
                  <TableCell>{ticket.ticketCode}</TableCell>
                  <TableCell>{ticket.userCode}</TableCell>
                  <TableCell>{ticket.planScreenMovieCode}</TableCell>
                  <TableCell>{ticket.seats}</TableCell>
                  <TableCell>{ticket.totalPrice}</TableCell>
                  <TableCell>{ticket.bank}</TableCell>
                  <TableCell>{ticket.ticketsDate}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      {/* <ModalEditTicket
                        isOpen={openEditTicket}
                        handleOpen={() => handleOpenEditTicket(ticket)}
                        handleClose={handleCloseEditTicket}
                      /> */}
                      <ModalDeleteTicket
                        isOpen={openDeleteTicket}
                        handleOpen={() => handleOpenDeleteTicket(ticket)}
                        handleClose={handleCloseDeleteTicket}
                      />
                    </div>
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
                count={tickets.length}
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
