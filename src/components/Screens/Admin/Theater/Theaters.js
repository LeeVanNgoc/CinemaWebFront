import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { handleGetListTheaters } from "./config";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedTheater,
  clearSelectedTheater,
} from "./redux/actions/theaterActions";
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
import ModalAddTheater from "./ModalAddTheater";
import ModalEditTheater from "./ModalEditTheater";
import ModalDeleteTheater from "./ModalDeleteTheater";
import { setRender } from "../../../../redux/renderAction";
import { jwtDecode } from "jwt-decode";

export const Theaters = () => {
  const dispatch = useDispatch();

  let decoded = "";
  if (localStorage.token) {
    decoded = jwtDecode(localStorage.token);
  }

  const [theaters, setTheaters] = useState([]);
  const isRender = useSelector((state) => state.render.isRender);

  const loading = useSelector((state) => state.manageTheaters.loading);
  const error = useSelector((state) => state.manageTheaters.error);

  const [query, setQuery] = useState("");

  const [openAddTheater, setOpenAddTheater] = useState(false);
  const [openEditTheater, setOpenEditTheater] = useState(false);
  const [openDeleteTheater, setOpenDeleteTheater] = useState(false);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("theaterCode");

  const handleOpenAddTheater = () => setOpenAddTheater(true);
  const handleCloseAddTheater = () => setOpenAddTheater(false);

  const handleOpenEditTheater = (theater) => {
    dispatch(setSelectedTheater(theater));
    setOpenEditTheater(true);
  };
  const handleCloseEditTheater = () => {
    setOpenEditTheater(false);
    dispatch(clearSelectedTheater());
  };

  const handleOpenDeleteTheater = (theater) => {
    dispatch(setSelectedTheater(theater));
    setOpenDeleteTheater(true);
  };
  const handleCloseDeleteTheater = () => {
    setOpenDeleteTheater(false);
    dispatch(clearSelectedTheater());
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - theaters.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredTheaters = theaters.filter((theater) => {
    if (query === "") {
      return theater;
    } else if (
      (theater.name &&
        theater.name.toLowerCase().includes(query.toLowerCase())) ||
      (theater.city && theater.city.toLowerCase().includes(query.toLowerCase()))
    ) {
      return theater;
    }
    return null;
  });

  const displayedTheaters =
    rowsPerPage > 0
      ? filteredTheaters.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : filteredTheaters;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const fetchTheaters = async () => {
    try {
      let res = await handleGetListTheaters();
      console.log("res list theaters >>>", res);
      if (res && res.theaters) {
        const formattedData = res.theaters
          .filter((item) => item.city.includes(decoded.city))
          .map((item) => ({
            theaterCode: item.theaterCode,
            name: item.name,
            address: item.address,
            city: item.city,
          }));
        setTheaters(formattedData);
      }
    } catch (error) {
      console.error("Error fetching theaters:", error);
    }
  };

  useEffect(() => {
    if (theaters.length === 0) {
      fetchTheaters();
    }

    if (isRender) {
      fetchTheaters();
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
        <ModalAddTheater
          isOpen={openAddTheater}
          handleOpen={handleOpenAddTheater}
          handleClose={handleCloseAddTheater}
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
                  active={orderBy === "theaterCode"}
                  direction={orderBy === "theaterCode" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "theaterCode")}
                >
                  ID
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "name")}
                >
                  Tên
                </TableSortLabel>
              </TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Thành phố</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {stableSort(displayedTheaters, getComparator(order, orderBy)).map(
              (theater, index) => (
                <TableRow key={index}>
                  <TableCell>{theater.theaterCode}</TableCell>
                  <TableCell>{theater.name}</TableCell>
                  <TableCell>{theater.address}</TableCell>
                  <TableCell>{theater.city}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <ModalEditTheater
                        isOpen={openEditTheater}
                        handleOpen={() => handleOpenEditTheater(theater)}
                        handleClose={handleCloseEditTheater}
                      />
                      <ModalDeleteTheater
                        isOpen={openDeleteTheater}
                        handleOpen={() => handleOpenDeleteTheater(theater)}
                        handleClose={handleCloseDeleteTheater}
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
                count={theaters.length}
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
