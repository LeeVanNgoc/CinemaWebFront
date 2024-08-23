import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useDispatch, useSelector } from "react-redux";
import { ModalAddMovie } from "./ModalAddMovie";
import { ModalEditMovie } from "./ModalEditMovie";
import { ModalDeleteMovie } from "./ModalDeleteMovie";
import {
  setSelectedMovie,
  clearSelectedMovie,
  getMovies,
} from "./redux/actions/movieActions";
import { handleGetGenresForMovie } from "../Genre/config";
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

export const Movie = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.manageMovies.movies.movies || []);
  const loading = useSelector((state) => state.manageMovies.loading);
  const error = useSelector((state) => state.manageMovies.error);

  const [query, setQuery] = useState("");

  const [openAddMovie, setOpenAddMovie] = useState(false);
  const [openEditMovie, setOpenEditMovie] = useState(false);
  const [openDeleteMovie, setOpenDeleteMovie] = useState(false);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("moviesDate");

  const [genres, setGenres] = useState({});

  const handleOpenAddMovie = () => setOpenAddMovie(true);
  const handleCloseAddMovie = () => setOpenAddMovie(false);

  const handleOpenEditMovie = (movie) => {
    dispatch(setSelectedMovie(movie));
    setOpenEditMovie(true);
  };
  const handleCloseEditMovie = () => {
    setOpenEditMovie(false);
    dispatch(clearSelectedMovie());
  };

  const handleOpenDeleteMovie = (movie) => {
    dispatch(setSelectedMovie(movie));
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - movies.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredMovies = movies.filter((movie) => {
    if (query === "") {
      return movies;
    } else if (movie.title && movie.title.includes(query)) {
      return movie;
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
    const fetchGenresForAllMovies = async () => {
      for (const movie of movies) {
        if (movie.movieCode) {
          try {
            const res = await handleGetGenresForMovie(movie.movieCode);
            if (res && res.movieGenre && res.movieGenre.length > 0) {
              setGenres((prevGenres) => ({
                ...prevGenres,
                [movie.movieCode]: res.movieGenre.map((item) => item.name).join(", "),
              }));
            }
          } catch (error) {
            console.error("Error fetching genres:", error);
          }
        }
      }
    };

    if (movies.length > 0) {
      fetchGenresForAllMovies();
    }
  }, [movies]);

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(getMovies());
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
        {<ModalAddMovie
          isOpen={openAddMovie}
          handleOpen={handleOpenAddMovie}
          handleClose={handleCloseAddMovie}
        />}
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      <TableContainer component={Paper} sx={{ maxHeight: "fit-content" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Mã Phim</TableCell>
              <TableCell>Tên Phim</TableCell>
              <TableCell>Mô Tả</TableCell>
              <TableCell>Thời Lượng (Phút)</TableCell>
              <TableCell>Quốc Gia</TableCell>
              <TableCell>Ngày Khởi Chiếu</TableCell>
              <TableCell>Ảnh</TableCell>
              <TableCell>Thể Loại</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(displayedMovies, getComparator(order, orderBy)).map(
              (movie, index) => (
                <TableRow key={index}>
                  <TableCell>{movie.movieCode}</TableCell>
                  <TableCell>{movie.title}</TableCell>
                  <TableCell>{movie.description}</TableCell>
                  <TableCell>{movie.duration}</TableCell>
                  <TableCell>{movie.country}</TableCell>
                  <TableCell>{movie.releaseDate}</TableCell>
                  <TableCell>
                    <img
                      src={movie.image}
                      style={{ height: "6rem" }}
                      alt={movie.title}
                    />
                  </TableCell>
                  <TableCell>{genres[movie.movieCode]  || "Đang tải..."}</TableCell>

                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      {<ModalEditMovie
                        isOpen={openEditMovie}
                        handleOpen={() => handleOpenEditMovie(movie)}
                        handleClose={handleCloseEditMovie}
                      />}
                      {<ModalDeleteMovie
                        isOpen={openDeleteMovie}
                        handleOpen={() => handleOpenDeleteMovie(movie)}
                        handleClose={handleCloseDeleteMovie}
                      />}
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
                count={movies.length}
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
