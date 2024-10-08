import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { setRender } from "../../../../redux/renderAction";
import "./Post.scss";

export default function ModalEditPost({ isOpen, handleOpen, handleClose }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.managePosts.selectedPost);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImage(post.image);
      setLink(post.link);
    }
  }, [post]);

  const handleUpdatePost = async () => {
    await handleEditPost(post.postCode, title, content, image, link);
    dispatch(setRender(true));
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
            Sửa bài viết
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
            </div>
            <FormControl defaultValue={post.content} required>
              <Label>Nội dung</Label>
              <StyledInput
                as="textarea"
                rows={4}
                defaultValue={post.content}
                onChange={(e) => setContent(e.target.value)}
                sx={{
                  border: "1px solid lightgray",
                  borderRadius: "10px",
                  width: "430px",
                }}
              />
              <HelperText />
            </FormControl>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
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
