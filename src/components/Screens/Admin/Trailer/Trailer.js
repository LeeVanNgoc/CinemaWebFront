import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { handleGetListTrailers } from "./config";
import { useDispatch } from "react-redux";
import {
  setSelectedTrailer,
  clearSelectedTrailer,
} from "./redux/actions/trailerActions";
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
import ModalAddTrailer from "./ModalAddTrailer";
import ModalEditTrailer from "./ModalEditTrailer";
import ModalScreenTrailer from "./ModalScreenTrailer";

export const Trailers = () => {
  const dispatch = useDispatch();
  const [trailers, setTrailers] = useState([]);
  const [query, setQuery] = useState("");

  //Screen Trailer open modal
  const [openScreenTrailer, setOpenScreenTrailer] = useState(false);
  const handleOpenScreenTrailer = (trailer) => {
    dispatch(setSelectedTrailer(trailer));
    setOpenScreenTrailer(true);
  };

  const handleCloseScreenTrailer = () => {
    setOpenScreenTrailer(false);
    dispatch(clearSelectedTrailer());
  };

  // Open modal edit trailer
  const [openEditTrailer, setOpenEditTrailer] = useState(false);

  const handleOpenEditTrailer = (trailer) => {
    dispatch(setSelectedTrailer(trailer));
    setOpenEditTrailer(true);
  };
  const handleCloseEditTrailer = () => {
    setOpenEditTrailer(false);
    dispatch(clearSelectedTrailer());
  };

  // Open Modal add trailer
  const [openAddTrailer, setOpenAddTrailer] = useState(false);
  const handleOpenAddTrailer = () => setOpenAddTrailer(true);
  const handleCloseAddTrailer = () => setOpenAddTrailer(false);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - trailers.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredTrailers = trailers.filter((trailer) => {
    if (query === "") {
      return trailers;
    } else if (trailer.isAvailable && trailer.isAvailable.includes(query)) {
      return trailer;
    }
    return null;
  });

  const displayedTrailers =
    rowsPerPage > 0
      ? filteredTrailers.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : filteredTrailers;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        let res = await handleGetListTrailers();
        console.log("res list trailers >>>", res);
        if (res && res.trailers) {
          const formattedData = res.trailers.map((item) => ({
            trailerId: item.trailerId,
            movieId: item.movieId,
            link: item.link,
          }));
          setTrailers(formattedData);
        }
      } catch (error) {
        console.error("Error fetching trailers:", error);
      }
    };

    fetchTrailers();
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
        <ModalAddTrailer
          isOpen={openAddTrailer}
          handleOpen={handleOpenAddTrailer}
          handleClose={handleCloseAddTrailer}
        />
      </div>

      <TableContainer component={Paper} sx={{ maxHeight: "fit-content" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Mã Trailer</TableCell>
              <TableCell>Mã Phim</TableCell>
              <TableCell>Đường dẫn</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(displayedTrailers, getComparator(order, orderBy)).map(
              (trailer, index) => (
                <TableRow key={index}>
                  <TableCell>{trailer.trailerId}</TableCell>
                  <TableCell>{trailer.movieId}</TableCell>
                  <TableCell>{trailer.link}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <ModalEditTrailer
                        isOpen={openEditTrailer}
                        handleOpen={() => handleOpenEditTrailer(trailer)}
                        handleClose={handleCloseEditTrailer}
                      />
                      <ModalScreenTrailer
                        isOpen={openScreenTrailer}
                        link={trailer.link}
                        movieId={trailer.movieId}
                        handleOpen={() => handleOpenScreenTrailer(trailer)}
                        handleClose={handleCloseScreenTrailer}
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
                count={trailers.length}
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
