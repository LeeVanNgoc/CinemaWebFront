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
import { handleAddMovie } from "./config";

export default function ModalAddMovie({ isOpen, handleOpen, handleClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genreID, setGenreID] = useState("");
  const [duration, setDuration] = useState("");
  const [country, setCountry] = useState("");
  const [cast, setCast] = useState("");
  const [sTimeid, setSTimeid] = useState("");


  const handleAddMovie = async () => {
    handleAddMovie(
      title,
      description,
      genreID,
      duration,
      country,
      cast,
      sTimeid,
    );
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
        Thêm phim
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
            id="unstyled-modal-title"
            className="add-modal-title"
            style={{ fontSize: 20, fontWeight: "bold" }}
          >
            Thêm phim
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
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Tên phim</Label>
                <StyledInput
                  // placeholder="Mật khẩu"
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>

              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Mô tả</Label>
                <StyledInput
                  // placeholder="Mật khẩu"
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Thể loại</Label>
                <StyledInput
                  // placeholder="Mật khẩu"
                  onChange={(e) => setGenreID(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>

              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Thời lượng</Label>
                <StyledInput
                  // placeholder="Mật khẩu"
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
                  // placeholder="Mật khẩu"
                  onChange={(e) => setCountry(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>

              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Diễn viên</Label>
                <StyledInput
                  // placeholder="Mật khẩu"
                  onChange={(e) => setCast(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>

              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Lịch chiếu</Label>
                <StyledInput
                  // placeholder="Mật khẩu"
                  onChange={(e) => setSTimeid(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
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
            href="#outlined-buttons"
            onClick={handleAddMovie}
          >
            Tạo mới
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
