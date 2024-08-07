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
import { handleEditTrailer } from "./config";
import { useSelector } from "react-redux";

export default function ModalEditTrailer({ isOpen, handleOpen, handleClose }) {
  const trailer = useSelector((state) => state.manageTrailers.selectedTrailer);


  const [movieId, setMovieId] = useState(trailer.movieId);
  const [link, setLink] = useState(trailer.link);


  const handleUpdateTrailer = async () => {
    await handleEditTrailer(trailer.trailerId,  movieId, link);
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
            Cập nhật ghế
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl defaultValue={trailer.trailerId} aria-readonly>
              <Label>Mã Trailer</Label>
              <StyledInput readOnly />
              <HelperText />
            </FormControl>

            <FormControl defaultValue={trailer.movieId} required sx={{ flex: 1 }}>
              <Label>Mã Phim</Label>
              <StyledInput onChange={(e) => setMovieId(e.target.value)} />
              <HelperText />
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
