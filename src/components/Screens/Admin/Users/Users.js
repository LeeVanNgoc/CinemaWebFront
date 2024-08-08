import React, { useEffect, useState, useCallback } from "react";
import { TablePagination } from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { handleGetListUsers } from "./config";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedUser,
  clearSelectedUser,
} from "./redux/actions/userActions";
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
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteUser from "./ModalDeleteUser";
import "./Users.scss";

export const Users = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const loading = useSelector((state) => state.manageUsers.loading);
  const error = useSelector((state) => state.manageUsers.error);

  const [query, setQuery] = useState("");

  const [openAddUser, setOpenAddUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("userId");

  const handleOpenAddUser = () => setOpenAddUser(true);
  const handleCloseAddUser = () => {
    setOpenAddUser(false);
  };

  const handleOpenEditUser = (user) => {
    dispatch(setSelectedUser(user));
    setOpenEditUser(true);
  };
  const handleCloseEditUser = () => {
    setOpenEditUser(false);
    dispatch(clearSelectedUser());
  };

  const handleOpenDeleteUser = (user) => {
    dispatch(setSelectedUser(user));
    setOpenDeleteUser(true);
  };
  const handleCloseDeleteUser = () => {
    setOpenDeleteUser(false);
    dispatch(clearSelectedUser());
  };

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

  const filteredUsers = users.filter((user) => {
    if (query === "") {
      return user;
    } else if (
      (user.phonenumber && user.phonenumber.includes(query.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(query.toLowerCase())) ||
      (user.userName &&
        user.userName.toLowerCase().includes(query.toLowerCase()))
    ) {
      return user;
    }
    return null;
  });

  const displayedUsers =
    rowsPerPage > 0
      ? filteredUsers.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : filteredUsers;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const fetchUsers = useCallback(async () => {
    try {
      let res = await handleGetListUsers();
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
  }, []);

  useEffect(() => {
    // const intervalId = setInterval(() => {
    fetchUsers(); // Gọi API để cập nhật dữ liệu
    // }, 5000); // Gọi API mỗi 5 giây

    // return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount hoặc khi useEffect chạy lại
  }, [fetchUsers]);

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
        <ModalAddUser
          isOpen={openAddUser}
          handleOpen={handleOpenAddUser}
          handleClose={handleCloseAddUser}
        />
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      <TableContainer
        component={Paper}
        sx={{ maxHeight: "fit-content", overflow: "auto" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "userId"}
                  direction={orderBy === "userId" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "userId")}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>Họ</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "firstName"}
                  direction={orderBy === "firstName" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "firstName")}
                >
                  Tên
                </TableSortLabel>
              </TableCell>
              <TableCell>Tên tài khoản</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Năm sinh</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {stableSort(displayedUsers, getComparator(order, orderBy)).map(
              (user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
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
                        handleOpen={() => handleOpenEditUser(user)}
                        handleClose={handleCloseEditUser}
                      />
                      <ModalDeleteUser
                        isOpen={openDeleteUser}
                        handleOpen={() => handleOpenDeleteUser(user)}
                        handleClose={handleCloseDeleteUser}
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
