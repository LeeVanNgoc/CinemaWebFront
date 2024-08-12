import React from "react";
import Button from "@mui/material/Button";
import { TriggerButton, Modal, StyledBackdrop, ModalContent } from "./style";
import AddSeats from "./AddSeats";

export default function ModalAddSeat({ isOpen, handleOpen, handleClose }) {
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
        Thêm/Sửa ghế
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
            maxWidth: "fit-content",
            minWidth: "80vw",
            height: "80vh",
            overflow: "scroll",
          }}
        >
          <AddSeats />

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
            onClick={handleClose}
          >
            Đóng
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
