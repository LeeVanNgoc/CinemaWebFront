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
import { handleEditPost } from "./config";
import { useSelector } from "react-redux";

export default function ModalEditPost({ isOpen, handleOpen, handleClose }) {
  const post = useSelector((state) => state.managePosts.selectedPost);

  const [postCode, setPostCode] = useState(post.postCode);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [image, setImage] = useState(post.image);
  const [link, setLink] = useState(post.link);

  const handleUpdatePost = async () => {
    await handleEditPost(post.postId, postCode, title, content, image, link);
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
            Cập nhật giá vé
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl defaultValue={post.postCode} aria-readonly>
              <Label>Mã tin tức</Label>
              <StyledInput readOnly />
              <HelperText />
            </FormControl>

            <FormControl defaultValue={post.title} required sx={{ flex: 1 }}>
              <Label>Tên tin tức</Label>
              <StyledInput onChange={(e) => setTitle(e.target.value)} />
              <HelperText />
            </FormControl>

            <FormControl defaultValue={post.content} required sx={{ flex: 1 }}>
              <Label>Nội dung</Label>
              <StyledInput onChange={(e) => setContent(e.target.value)} />
              <HelperText />
            </FormControl>

            <FormControl defaultValue={post.image} required sx={{ flex: 1 }}>
              <Label>Hình ảnh</Label>
              <StyledInput onChange={(e) => setImage(e.target.value)} />
              <HelperText />
            </FormControl>

            <FormControl defaultValue={post.link} required sx={{ flex: 1 }}>
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
            onClick={handleUpdatePost}
          >
            Sửa
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
