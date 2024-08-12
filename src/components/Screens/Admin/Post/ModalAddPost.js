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
import { handleCreatePost } from "./config";

export default function ModalAddPost({ isOpen, handleOpen, handleClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState(false);

  const handleAddPost = async () => {
    handleCreatePost(title, content, image, link);
    handleClose();
    window.location.reload();
  };

  const handleEnter = (e) => {
    if (e && e.key === "Enter") {
      handleAddPost();
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
        Tạo giá vé mới
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
            Tạo giá vé mới
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl defaultValue="" required>
              <Label>Mức vé</Label>
              <StyledInput
                // placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Loại phòng</Label>
              <StyledInput
                // placeholder="Mật khẩu"
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Loại ghế</Label>
              <StyledInput
                // placeholder="Mật khẩu"
                onChange={(e) => setImage(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Cuối tuần/Lễ</Label>
              <StyledInput
                // placeholder="Mật khẩu"
                onChange={(e) => setLink(e.target.value)}
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
            onClick={handleAddPost}
          >
            Tạo mới
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
