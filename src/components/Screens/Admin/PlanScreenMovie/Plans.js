import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { handleGetListPlansInformation } from "./config";
import { useDispatch } from "react-redux";
import {
  setSelectedPlan,
  clearSelectedPlan,
} from "./redux/actions/planActions";
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
import ModalAddPlan from "./ModalAddPlan";
import ModalEditPlan from "./ModalEditPlan";

import ModalDeletePlan from "./ModalDeletePlan";

export const Plans = () => {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);
  const [query, setQuery] = useState("");

  const [openAddPlan, setOpenAddPlan] = useState(false);
  const [openEditPlan, setOpenEditPlan] = useState(false);
  const [openDeletePlan, setOpenDeletePlan] = useState(false);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("plansDate");

  const handleOpenAddPlan = () => setOpenAddPlan(true);
  const handleCloseAddPlan = () => setOpenAddPlan(false);

  const handleOpenEditPlan = (plan) => {
    dispatch(setSelectedPlan(plan));
    setOpenEditPlan(true);
  };
  const handleCloseEditPlan = () => {
    setOpenEditPlan(false);
    dispatch(clearSelectedPlan());
  };

  const handleOpenDeletePlan = (plan) => {
    dispatch(setSelectedPlan(plan));
    setOpenDeletePlan(true);
  };
  const handleCloseDeletePlan = () => {
    setOpenDeletePlan(false);
    dispatch(clearSelectedPlan());
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - plans.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredPlans = plans.filter((plan) => {
    if (query === "") {
      return plans;
    } else if (plan.startTime && plan.startTime.includes(query)) {
      return plan;
    }
    return null;
  });

  const displayedPlans =
    rowsPerPage > 0
      ? filteredPlans.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : filteredPlans;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        let res = await handleGetListPlansInformation();
        console.log("res list plans >>>", res);
        if (res && res.planScreenMovies) {
          const formattedData = res.planScreenMovies.map((item) => ({
            planScreenMovieCode: item.planScreenMovieCode,
            roomCode: item.roomCode,
            movieCode: item.movieCode,
            movieTitle: item.movieTitle,
            dateScreen: item.dateScreen,
            startTime: item.startTime,
            endTime: item.endTime,
          }));
          setPlans(formattedData);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
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
        <ModalAddPlan
          isOpen={openAddPlan}
          handleOpen={handleOpenAddPlan}
          handleClose={handleCloseAddPlan}
        />
      </div>

      <TableContainer component={Paper} sx={{ maxHeight: "fit-content" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Mã Lịch Chiếu</TableCell>
              <TableCell>Mã Phòng</TableCell>
              <TableCell>Tên Phim</TableCell>
              <TableCell>Ngày Chiếu</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "startTime"}
                  direction={orderBy === "startTime" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "startTime")}
                >
                  Giờ Chiếu
                </TableSortLabel>
              </TableCell>
              <TableCell>Giờ Kết Thúc</TableCell>

              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(displayedPlans, getComparator(order, orderBy)).map(
              (plan, index) => (
                <TableRow key={index}>
                  <TableCell>{plan.planScreenMovieCode}</TableCell>
                  <TableCell>{plan.roomCode}</TableCell>
                  <TableCell>{plan.movieTitle}</TableCell>
                  <TableCell>{plan.dateScreen}</TableCell>
                  <TableCell>{plan.startTime}</TableCell>
                  <TableCell>{plan.endTime}</TableCell>

                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <ModalEditPlan
                        isOpen={openEditPlan}
                        handleOpen={() => handleOpenEditPlan(plan)}
                        handleClose={handleCloseEditPlan}
                      />
                      <ModalDeletePlan
                        isOpen={openDeletePlan}
                        handleOpen={() => handleOpenDeletePlan(plan)}
                        handleClose={handleCloseDeletePlan}
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
                count={plans.length}
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
