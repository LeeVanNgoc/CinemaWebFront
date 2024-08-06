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

export default function ModalEditmovie({ isOpen, handleOpen, handleClose }) {
  const movie = useSelector((state) => state.manageMovies.selectedMovie);

  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [genreID, setGenreID] = useState(movie.genreID);
  const [duration, setDuration] = useState(movie.duration);
  const [country, setCountry] = useState(movie.country);
  const [cast, setCast] = useState(movie.cast);
  const [sTimeid, setSTimeid] = useState(movie.sTimeid);

  const handleUpdateMovie = async () => {
    await handleEditMovie(
      title,
      description,
      genreID,
      duration,
      country,
      cast,
      sTimeid,
    );
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
            Sửa phim
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
            <FormControl
                defaultValue={movie.title}
                required
                sx={{ flex: 1 }}
              >
                <Label>Tên phim</Label>
                <StyledInput onChange={(e) => setTitle(e.target.value)} />
                <HelperText />
              </FormControl>
              
              <FormControl
                defaultValue={movie.description}
                required
                sx={{ flex: 1 }}
              >
                <Label>Mô tả</Label>
                <StyledInput onChange={(e) => setDescription(e.target.value)} />
                <HelperText />
              </FormControl>

              <FormControl
                defaultValue={movie.genreID}
                required
                sx={{ flex: 1 }}
              >
                <Label>Thể loại</Label>
                <StyledInput onChange={(e) => setGenreID(e.target.value)} />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl value={movie.duration} aria-readonly sx={{ flex: 1 }}>
                <Label>Thời lượng</Label>
                <StyledInput readOnly />
                <HelperText />
              </FormControl>

              <FormControl
                defaultValue={movie.country}
                required
                sx={{ flex: 1 }}
              >
                <Label>Quốc gia</Label>
                <StyledInput onChange={(e) => setCountry(e.target.value)} />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl
                defaultValue={movie.cast}
                required
                sx={{ flex: 1 }}
              >
                <Label>Diễn viên</Label>
                <StyledInput onChange={(e) => setCast(e.target.value)} />
                <HelperText />
              </FormControl>

              <FormControl
                defaultValue={movie.sTimeid}
                required
                sx={{ flex: 1 }}
              >
                <Label>Giờ chiếu</Label>
                <StyledInput onChange={(e) => setSTimeid(e.target.value)} />
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
