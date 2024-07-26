import React from "react";
import Button from "@mui/material/Button";
import { TriggerButton, Modal, StyledBackdrop, ModalContent } from "./style";
import { handleDeleteUser } from "./config";

export default function ModalDeleteUser({
  isOpen,
  handleOpen,
  handleClose,
  user,
}) {
  const handleDelete = async () => {
    await handleDeleteUser(user.userId);
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
        Xóa
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
            Xóa người dùng {user.userName}?
          </h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              sx={{
                borderRadius: "40px",
                backgroundColor: "grey",
                textTransform: "none",
                marginTop: "15px",
                marginBottom: "15px",
              }}
              variant="contained"
              onClick={handleClose}
            >
              Trở về
            </Button>
            <Button
              sx={{
                borderRadius: "40px",
                backgroundColor: "#dc1313f0",
                textTransform: "none",
                marginTop: "15px",
                marginBottom: "15px",
              }}
              variant="contained"
              onClick={handleDelete}
            >
              Xác nhận
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
