import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { handleGetListMovies } from "./config";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedMovie,
  clearSelectedMovie,
} from "./redux/actions/movieActions";
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
import ModalAddMovie from "./ModalAddMovie";
import ModalEditMovie from "./ModalEditMovie";
import ModalDeleteMovie from "./ModalDeleteMovie";
import "./Movies.scss";

export const Movies = () => {
  const dispatch = useDispatch();
  const [Movies, setMovies] = useState([]);
  const loading = useSelector((state) => state.manageMovies.loading);
  const error = useSelector((state) => state.manageMovies.error);

  const [query, setQuery] = useState("");

  const [openAddMovie, setOpenAddMovie] = useState(false);
  const [openEditMovie, setOpenEditMovie] = useState(false);
  const [openDeleteMovie, setOpenDeleteMovie] = useState(false);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("movieId");

  const handleOpenAddMovie = () => setOpenAddMovie(true);
  const handleCloseAddMovie = () => setOpenAddMovie(false);

  const handleOpenEditMovie = (Movie) => {
    dispatch(setSelectedMovie(Movie));
    setOpenEditMovie(true);
  };
  const handleCloseEditMovie = () => {
    setOpenEditMovie(false);
    dispatch(clearSelectedMovie());
  };

  const handleOpenDeleteMovie = (Movie) => {
    dispatch(setSelectedMovie(Movie));
    setOpenDeleteMovie(true);
  };
  const handleCloseDeleteMovie = () => {
    setOpenDeleteMovie(false);
    dispatch(clearSelectedMovie());
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Movies.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const filteredMovies = Movies.filter((Movie) => {
    if (query === "") {
      return Movie;
    } else if (
      (Movie.title &&
        Movie.title.toLowerCase().includes(query.toLowerCase()))
    ) {
      return Movie;
    }
    return null;
  });

  const displayedMovies =
    rowsPerPage > 0
      ? filteredMovies.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : filteredMovies;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let res = await handleGetListMovies();
        console.log("res list Movies >>>", res);
        if (res && res.Movies) {
          const formattedData = res.Movies.map((item) => ({
            movieId: item.movieId,
            title: item.title,
            description: item.description,
            genreID: item.genreID,
            duration: item.duration,
            country: item.country,
            cast: item.cast,
            sTimeid: item.sTimeid,
          }));
          setMovies(formattedData);
        }
      } catch (error) {
        console.error("Error fetching Movies:", error);
      }
    };

    fetchMovies();
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
        <ModalAddMovie
          isOpen={openAddMovie}
          handleOpen={handleOpenAddMovie}
          handleClose={handleCloseAddMovie}
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
                  active={orderBy === "movieId"}
                  direction={orderBy === "movieId" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "movieId")}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>Tên phim</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "title"}
                  direction={orderBy === "title" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "title")}
                >
                  Tên
                </TableSortLabel>
              </TableCell>
              <TableCell>Tên phim</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Thể loại</TableCell>
              <TableCell>Thời lượng</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {stableSort(displayedMovies, getComparator(order, orderBy)).map(
              (Movie, index) => (
                <TableRow key={index}>
                  <TableCell>{Movie.movieId}</TableCell>
                  <TableCell>{Movie.title}</TableCell>
                  <TableCell>{Movie.description}</TableCell>
                  <TableCell>{Movie.genreID}</TableCell>
                  <TableCell>{Movie.duration}</TableCell>
                  <TableCell>{Movie.country}</TableCell>
                  <TableCell>{Movie.cast}</TableCell>
                  <TableCell>{Movie.sTimeid}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <ModalEditMovie
                        isOpen={openEditMovie}
                        handleOpen={() => handleOpenEditMovie(Movie)}
                        handleClose={handleCloseEditMovie}
                      />
                      <ModalDeleteMovie
                        isOpen={openDeleteMovie}
                        handleOpen={() => handleOpenDeleteMovie(Movie)}
                        handleClose={handleCloseDeleteMovie}
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
                count={Movies.length}
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
