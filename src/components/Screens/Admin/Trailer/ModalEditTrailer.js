import React, { useState, useEffect } from "react";
import { FormControl } from "@mui/base/FormControl";
import { Button, TextField, Autocomplete } from "@mui/material/";
import {
  TriggerButton,
  StyledInput,
  Label,
  HelperText,
  Modal,
  StyledBackdrop,
  ModalContent,
} from "./style";
import { handleEditTrailer } from "./config";
import { handleGetListMoviesTitleAndCode } from "../../Admin/Movie/config";
import { useSelector } from "react-redux";

export default function ModalEditTrailer({ isOpen, handleOpen, handleClose }) {
  const trailer = useSelector((state) => state.manageTrailers.selectedTrailer);

  const [movieTitle, setMovieTitle] = useState(trailer.movieTitle);
  const [movieCode, setMovieCode] = useState(trailer.movieCode);
  const [link, setLink] = useState(trailer.link);
  const [listMovies, setListMovies] = useState([]);

  // Giả sử bạn đã có hàm lấy danh sách phim
  const handleFetchMovies = async () => {
    const response = await handleGetListMoviesTitleAndCode();
    setListMovies(response.movies);
  };

  useEffect(() => {
    handleFetchMovies();
  }, []);

  console.log("Movie title list : ", listMovies);

  const handleUpdateTrailer = async () => {
    await handleEditTrailer(trailer.trailerCode, movieTitle, link);
    handleClose();
  };

  return (
    <div>
      <TriggerButton
        type="button"
        onClick={handleOpen}
        sx={{
          borderRadius: "40px",
          backgroundColor: "#dc1313f0",
          textTransform: "none",
          color: "white",
          border: "none",
        }}
      >
        Sửa
      </TriggerButton>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={isOpen}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent
          sx={{
            width: "fit-content",
          }}
        >
          <h1
            className="edit-modal-title"
            style={{ fontSize: 20, fontWeight: "bold" }}
          >
            Cập nhật trailer
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "400px",
            }}
          >
            <FormControl defaultValue={trailer.trailerCode} aria-readonly>
              <Label>Mã Trailer</Label>
              <StyledInput readOnly />
              <HelperText />
            </FormControl>

            <FormControl
              defaultValue={trailer.movieTitle}
              required
              sx={{ flex: 1 }}
            >
              <Label>Tên Phim</Label>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={listMovies}
                getOptionLabel={(option) => option.title}
                onChange={(e, value) => {
                  // setMovieTitle(value ? value.title : "");
                  setMovieCode(value ? value.code : "");
                }}
                sx={{ width: "400px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={trailer.movieTitle ? trailer.movieTitle : "Movie"}
                  />
                )}
              />
            </FormControl>

            <FormControl defaultValue={trailer.link} required sx={{ flex: 1 }}>
              <Label>Đường dẫn</Label>
              <StyledInput onChange={(e) => setLink(e.target.value)} />
              <HelperText />
            </FormControl>
          </div>

          <Button
            sx={{
              borderRadius: "40px",
              backgroundColor: "#dc1313f0",
              textTransform: "none",
              marginTop: "15px",
              marginBottom: "15px",
            }}
            variant="contained"
            onClick={handleUpdateTrailer}
          >
            Sửa
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
