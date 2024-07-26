import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { handleGetListUsers } from "./config";
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
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteUser from "./ModalDeleteUser";
import "./Users.scss";

export const Users = () => {
  const [users, setUsers] = useState([]);

  const [openAddUser, setOpenAddUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);

  const handleOpenAddUser = () => setOpenAddUser(true);
  const handleCloseAddUser = () => setOpenAddUser(false);

  const handleOpenEditUser = () => {
    setOpenEditUser(true);
  };
  const handleCloseEditUser = () => {
    setOpenEditUser(false);
  };

  const handleOpenDeleteUser = () => setOpenDeleteUser(true);
  const handleCloseDeleteUser = () => setOpenDeleteUser(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let res = await handleGetListUsers();
        console.log("res list users >>>", res);
        if (res && res.users) {
          const formattedData = res.users.map((item) => ({
            userId: item.userId,
            email: item.email,
            firstName: item.firstName,
            lastName: item.lastName,
            userName: item.userName,
            birthYear: item.birthYear,
            phonenumber: item.phonenumber,
          }));
          setUsers(formattedData);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
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
        <ModalAddUser
          isOpen={openAddUser}
          handleOpen={handleOpenAddUser}
          handleClose={handleCloseAddUser}
        />
      </div>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: "fit-content", overflow: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Họ</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Tên tài khoản</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Năm sinh</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? users.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : users
            ).map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phonenumber}</TableCell>
                <TableCell>{user.birthYear}</TableCell>
                <TableCell>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <ModalEditUser
                      isOpen={openEditUser}
                      handleOpen={handleOpenEditUser}
                      handleClose={handleCloseEditUser}
                      user={user}
                    />
                    <ModalDeleteUser
                      isOpen={openDeleteUser}
                      handleOpen={handleOpenDeleteUser}
                      handleClose={handleCloseDeleteUser}
                      user={user}
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
                count={users.length}
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
