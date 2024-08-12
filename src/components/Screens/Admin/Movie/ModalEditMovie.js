import React, { useState } from "react";
import { FormControl } from "@mui/base/FormControl";
import Button from "@mui/material/Button";
import {
  TriggerButton,
  StyledInput,
  Label,
  HelperText,
  Modal,
  StyledBackdrop,
  ModalContent,
} from "./style";
import { handleEditMovie } from "./config";
import { useSelector } from "react-redux";

export function ModalEditMovie({ isOpen, handleOpen, handleClose }) {
  const movie = useSelector((state) => state.manageMovies.selectedMovie);

  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [duration, setDuration] = useState(movie.duration);
  const [country, setCountry] = useState(movie.country);
  const [genreId, setGenreId] = useState(movie.genreId);
  const [releaseDate, setReleaseDate] = useState(movie.releaseDate);
  const [image, setImage] = useState(movie.image);

  const handleUpdateMovie = async () => {
    await handleEditMovie(movie.movieId, title, description, duration, country, genreId, releaseDate, image);
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
            Cập nhật phim
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue={movie.movieId} aria-readonly sx={{ flex: 1 }}>
                <Label>Mã phim</Label>
                <StyledInput readOnly />
                <HelperText />
              </FormControl>

              <FormControl defaultValue={movie.title} required sx={{ flex: 1 }}>
                <Label>Tên phim</Label>
                <StyledInput onChange={(e) => setTitle(e.target.value)} />
                <HelperText />
              </FormControl>
            </div>

            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl
                defaultValue={movie.description}
                required
                sx={{ flex: 1 }}
              >
                <Label>Mô tả</Label>
                <StyledInput onChange={(e) => setDescription(e.target.value)} />
                <HelperText />
              </FormControl>

              <FormControl defaultValue={movie.duration} required sx={{ flex: 1 }}>
                <Label>Thời lượng</Label>
                <StyledInput onChange={(e) => setDuration(e.target.value)} />
                <HelperText />
              </FormControl>
            </div>

            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue={movie.country} required sx={{ flex: 1 }}>
                <Label>Quốc gia</Label>
                <StyledInput onChange={(e) => setCountry(e.target.value)} />
                <HelperText />
              </FormControl>

              <FormControl defaultValue={movie.genreId} required sx={{ flex: 1 }}>
                <Label>Mã thể loại</Label>
                <StyledInput onChange={(e) => setGenreId(e.target.value)} />
                <HelperText />
              </FormControl>
            </div>

            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue={movie.releaseDate} required sx={{ flex: 1 }}>
                <Label>Ngày công chiếu</Label>
                <StyledInput onChange={(e) => setReleaseDate(e.target.value)} />
                <HelperText />
              </FormControl>

              <FormControl defaultValue={movie.image} required sx={{ flex: 1 }}>
                <Label>Url poster</Label>
                <StyledInput onChange={(e) => setImage(e.target.value)} />
                <HelperText />
              </FormControl>
            </div>
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
            onClick={handleUpdateMovie}
          >
            Sửa
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
