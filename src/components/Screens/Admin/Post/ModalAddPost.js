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
        Tạo tin tức mới
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
            Thêm bài viết
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
              <Label>Tên tin tức</Label>
              <StyledInput
                // placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Nội dung</Label>
              <StyledInput
                as="textarea"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
                sx={{ 
                  border: "1px solid lightgray", 
                  borderRadius: "10px",
                }}
              />
              <HelperText />
            </FormControl>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue="" required>
                <Label>Hình ảnh</Label>
                <StyledInput
                  onChange={(e) => setImage(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>
              <FormControl defaultValue="" required>
                <Label>Đường dẫn</Label>
                <StyledInput
                  onChange={(e) => setLink(e.target.value)}
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
            onClick={handleAddPost}
          >
            Tạo mới
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
