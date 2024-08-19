import React from "react";
import Button from "@mui/material/Button";
import { TriggerButton, Modal, StyledBackdrop, ModalContent } from "./style";
import { handleDeleteTheater } from "./config";
import { useSelector, useDispatch } from "react-redux";
import { setRender } from "../../../../redux/renderAction";

export default function ModalDeleteTheater({
  isOpen,
  handleOpen,
  handleClose,
}) {
  const dispatch = useDispatch();

  const theater = useSelector((state) => state.manageTheaters.selectedTheater);

  const handleDelete = async () => {
    await handleDeleteTheater(theater.theaterCode);
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
            Xóa rạp ID = {theater.theaterCode}?
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
