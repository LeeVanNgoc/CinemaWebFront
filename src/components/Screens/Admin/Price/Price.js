import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { handleGetListPrices } from "./config";
import { useDispatch } from "react-redux";
import {
  setSelectedPrice,
  clearSelectedPrice,
} from "./redux/actions/priceActions";
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
import ModalAddPrice from "./ModalAddPrice";
import ModalEditPrice from "./ModalEditPrice";
import ModalDeletePrice from "./ModalDeletePrice";
import "./Price.scss";

export const Prices = () => {
  const dispatch = useDispatch();
  const [prices, setPrices] = useState([]);
  const [query, setQuery] = useState("");

  const [openAddPrice, setOpenAddPrice] = useState(false);
  const [openEditPrice, setOpenEditPrice] = useState(false);
  const [openDeletePrice, setOpenDeletePrice] = useState(false);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("pricesDate");

  const handleOpenAddPrice = () => setOpenAddPrice(true);
  const handleCloseAddPrice = () => setOpenAddPrice(false);

  const handleOpenEditPrice = (price) => {
    dispatch(setSelectedPrice(price));
    setOpenEditPrice(true);
  };
  const handleCloseEditPrice = () => {
    setOpenEditPrice(false);
    dispatch(clearSelectedPrice());
  };

  const handleOpenDeletePrice = (price) => {
    dispatch(setSelectedPrice(price));
    setOpenDeletePrice(true);
  };
  const handleCloseDeletePrice = () => {
    setOpenDeletePrice(false);
    dispatch(clearSelectedPrice());
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - prices.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredPrices = prices.filter((price) => {
    if (query === "") {
      return prices;
    } else if (price.type && price.type.includes(query)) {
      return price;
    }
    return null;
  });

  const displayedPrices =
    rowsPerPage > 0
      ? filteredPrices.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : filteredPrices;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        let res = await handleGetListPrices();
        console.log("res list prices >>>", res);
        if (res && res.prices) {
          const formattedData = res.prices.map((item) => ({
            priceCode: item.priceCode,
            cost: item.cost,
            roomType: item.roomType,
            seatType: item.seatType,
            timeFrame: item.timeFrame,
            isWeekend: item.isWeekend,
          }));
          setPrices(formattedData);
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
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
        <ModalAddPrice
          isOpen={openAddPrice}
          handleOpen={handleOpenAddPrice}
          handleClose={handleCloseAddPrice}
        />
      </div>

      <TableContainer component={Paper} sx={{ maxHeight: "fit-content" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Mã Giá Vé</TableCell>
              <TableCell>Mức Giá (VNĐ)</TableCell>
              <TableCell>Loại Phòng</TableCell>
              <TableCell>Loại Ghế</TableCell>
              <TableCell>Khung giờ</TableCell>
              <TableCell>Cuối Tuần/Lễ</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(displayedPrices, getComparator(order, orderBy)).map(
              (price, index) => (
                <TableRow key={index}>
                  <TableCell>{price.priceCode}</TableCell>
                  <TableCell>{price.cost}</TableCell>
                  <TableCell>{price.roomType}</TableCell>
                  <TableCell>{price.seatType}</TableCell>
                  <TableCell>{price.timeFrame}</TableCell>
                  <TableCell>{price.isWeekend ? 'Có' : 'Không'}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <ModalEditPrice
                        isOpen={openEditPrice}
                        handleOpen={() => handleOpenEditPrice(price)}
                        handleClose={handleCloseEditPrice}
                      />
                      <ModalDeletePrice
                        isOpen={openDeletePrice}
                        handleOpen={() => handleOpenDeletePrice(price)}
                        handleClose={handleCloseDeletePrice}
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
                count={prices.length}
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
