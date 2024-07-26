import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { handleGetListTickets } from "./config";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
} from "@mui/material";
import ModalAddTicket from "./ModalAddTicket";
import ModalEditTicket from "./ModalEditTicket";
import ModalDeleteTicket from "./ModalDeleteTicket";

export const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  const [openAddTicket, setOpenAddTicket] = useState(false);
  const [openEditTicket, setOpenEditTicket] = useState(false);
  const [openDeleteTicket, setOpenDeleteTicket] = useState(false);

  const handleOpenAddTicket = () => setOpenAddTicket(true);
  const handleCloseAddTicket = () => setOpenAddTicket(false);

  const handleOpenEditTicket = () => {
    setOpenEditTicket(true);
  };
  const handleCloseEditTicket = () => {
    setOpenEditTicket(false);
  };

  const handleOpenDeleteTicket = () => setOpenDeleteTicket(true);
  const handleCloseDeleteTicket = () => setOpenDeleteTicket(false);

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

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        let res = await handleGetListTickets();
        console.log("res list tickets >>>", res);
        if (res && res.tickets) {
          const formattedData = res.tickets.map((item) => ({
            ticketId: item.ticketId,
            userId: item.userId,
            psmId: item.psmId,
            stId: item.stId,
            bank: item.bank,
            price: item.price,
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <ModalAddTicket
          isOpen={openAddTicket}
          handleOpen={handleOpenAddTicket}
          handleClose={handleCloseAddTicket}
        />
      </div>

      <TableContainer component={Paper} sx={{ maxHeight: "fit-content" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID Vé</TableCell>
              <TableCell>ID Khách Hàng</TableCell>
              <TableCell>PSM ID</TableCell>
              <TableCell>ST ID</TableCell>
              <TableCell>Ngân Hàng</TableCell>
              <TableCell>Giá Vé</TableCell>
              <TableCell>Ngày Đặt Vé</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? tickets.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tickets
            ).map((ticket, index) => (
              <TableRow key={index}>
                <TableCell>{ticket.ticketId}</TableCell>
                <TableCell>{ticket.userId}</TableCell>
                <TableCell>{ticket.psmId}</TableCell>
                <TableCell>{ticket.stId}</TableCell>
                <TableCell>{ticket.bank}</TableCell>
                <TableCell>{ticket.price}</TableCell>
                <TableCell>{ticket.ticketsDate}</TableCell>
                <TableCell>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <ModalEditTicket
                      isOpen={openEditTicket}
                      handleOpen={handleOpenEditTicket}
                      handleClose={handleCloseEditTicket}
                      ticket={ticket}
                    />
                    <ModalDeleteTicket
                      isOpen={openDeleteTicket}
                      handleOpen={handleOpenDeleteTicket}
                      handleClose={handleCloseDeleteTicket}
                      ticket={ticket}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
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
