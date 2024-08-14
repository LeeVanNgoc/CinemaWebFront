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
import { handleCreateMovie } from "./config";

export function ModalAddMovie({ isOpen, handleOpen, handleClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [duration, setDuration] = useState("");
  const [country, setCountry] = useState("");
  const [genreCode, setGenreCode] = useState("");
  const [image, setImage] = useState("");

  const handleAddMovie = async () => {
    handleCreateMovie(title, description, releaseDate, duration, country, genreCode, image);
    handleClose();
    // window.location.reload();
  };

  const handleEnter = (e) => {
    if (e && e.key === "Enter") {
      handleAddMovie();
    }
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
        Thêm phim mới
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
            width: 450,
          }}
        >
          <h1
            id="unstyled-modal-title"
            className="modal-title"
            style={{ fontSize: 20, fontWeight: "bold" }}
          >
            Thêm phim mới
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
              <FormControl defaultValue="" required>
                <Label>Tên phim</Label>
                <StyledInput
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>
              <FormControl defaultValue="" required>
                <Label>Mô tả</Label>
                <StyledInput
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Ngày công chiếu</Label>
                <StyledInput               
                  onChange={(e) => setReleaseDate(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Thời lượng</Label>
                <StyledInput               
                  onChange={(e) => setDuration(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Quốc gia</Label>
                <StyledInput                
                  onChange={(e) => setCountry(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Mã thể loại</Label>
                <StyledInput               
                  onChange={(e) => setGenreCode(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>
            </div>
            <FormControl defaultValue="" required>
              <Label>Url poster</Label>
              <StyledInput               
                onChange={(e) => setImage(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
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
            href="#outlined-buttons"
            onClick={handleAddMovie}
          >
            Thêm mới
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
