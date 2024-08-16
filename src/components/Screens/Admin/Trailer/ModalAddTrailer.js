import React, { useState, useEffect } from "react";
import { FormControl } from "@mui/base/FormControl";
import { Button, Autocomplete, TextField } from "@mui/material/";
import {
  TriggerButton,
  StyledInput,
  Label,
  HelperText,
  Modal,
  StyledBackdrop,
  ModalContent,
} from "./style";
import { handleCreateTrailer } from "./config";
import { handleGetListMoviesTitleAndCode } from "../Movie/config";

export default function ModalAddTrailer({ isOpen, handleOpen, handleClose }) {
  const [movieCode, setMovieCode] = useState("");
  const [link, setLink] = useState("");
  const [listMovies, setListMovies] = useState([]);

  const handleFetchMovies = async () => {
    const response = await handleGetListMoviesTitleAndCode();
    setListMovies(response.movies);
  };

  useEffect(() => {
    handleFetchMovies();
  }, []);

  const handleAddTrailer = async () => {
    handleCreateTrailer(movieCode, link);
    handleClose();
    // window.location.reload();
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
        Thêm trailer
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
            classType="modal-title"
            style={{ fontSize: 20, fontWeight: "bold" }}
          >
            Thêm trailer
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl
              // defaultValue={trailer.movieTitle}
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
                  setMovieCode(value ? value.movieCode : "");
                }}
                sx={{ width: "400px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label={trailer.movieTitle ? trailer.movieTitle : "Movie"}
                  />
                )}
              />
            </FormControl>
            <FormControl defaultValue="" required>
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
            href="#outlined-buttons"
            onClick={handleAddTrailer}
          >
            Thêm mới
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
