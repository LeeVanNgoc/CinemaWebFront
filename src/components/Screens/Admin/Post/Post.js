import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { handleGetListPosts } from "./config";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedPost,
  clearSelectedPost,
} from "./redux/actions/postActions";
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
import ModalAddPost from "./ModalAddPost";
import ModalEditPost from "./ModalEditPost";
import ModalDeletePost from "./ModalDeletePost";
import "./Post.scss";
import { setRender } from "../../../../redux/renderAction";

export const Post = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");

  const isRender = useSelector((state) => state.render.isRender);

  const [openAddPost, setOpenAddPost] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const [openDeletePost, setOpenDeletePost] = useState(false);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("postsDate");

  const handleOpenAddPost = () => setOpenAddPost(true);
  const handleCloseAddPost = () => setOpenAddPost(false);

  const handleOpenEditPost = (post) => {
    dispatch(setSelectedPost(post));
    setOpenEditPost(true);
  };
  const handleCloseEditPost = () => {
    setOpenEditPost(false);
    dispatch(clearSelectedPost());
  };

  const handleOpenDeletePost = (post) => {
    dispatch(setSelectedPost(post));
    setOpenDeletePost(true);
  };
  const handleCloseDeletePost = () => {
    setOpenDeletePost(false);
    dispatch(clearSelectedPost());
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredPosts = posts.filter((post) => {
    if (query === "") {
      return posts;
    } else if (post.type && post.type.includes(query)) {
      return post;
    }
    return null;
  });

  const displayedPosts =
    rowsPerPage > 0
      ? filteredPosts.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : filteredPosts;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const fetchPosts = async () => {
    try {
      let res = await handleGetListPosts();
      console.log("res list posts >>>", res);
      if (res && res.posts) {
        const formattedData = res.posts.map((item) => ({
          postCode: item.postCode,
          title: item.title,
          content: item.content,
          postDate: item.postDate,
          image: item.image,
          link: item.link,
        }));
        setPosts(formattedData);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }

    if (isRender) {
      fetchPosts();
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
        <ModalAddPost
          isOpen={openAddPost}
          handleOpen={handleOpenAddPost}
          handleClose={handleCloseAddPost}
        />
      </div>

      <TableContainer component={Paper} sx={{ maxHeight: "fit-content" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Mã tin tức</TableCell>
              <TableCell>Tên tin tức</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Đường dẫn</TableCell>
              <TableCell>Ngày đăng</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(displayedPosts, getComparator(order, orderBy)).map(
              (post, index) => (
                <TableRow key={index}>
                  <TableCell>{post.postCode}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.content}</TableCell>
                  <TableCell
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={post.image}
                      style={{
                        height: "6rem",
                        maxWidth: "100vw",
                        maxHeight: "100vh",
                        cursor: "pointer",
                      }}
                      alt={post.title}
                    />
                  </TableCell>
                  <TableCell>
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#007bff", textDecoration: "none" }}
                    >
                      {post.link}
                    </a>
                  </TableCell>
                  <TableCell>{post.postDate}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <ModalEditPost
                        isOpen={openEditPost}
                        handleOpen={() => handleOpenEditPost(post)}
                        handleClose={handleCloseEditPost}
                      />
                      <ModalDeletePost
                        isOpen={openDeletePost}
                        handleOpen={() => handleOpenDeletePost(post)}
                        handleClose={handleCloseDeletePost}
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
                count={posts.length}
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
