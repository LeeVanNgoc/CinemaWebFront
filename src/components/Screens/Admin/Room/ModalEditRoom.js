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
import { handleEditRoom } from "./config";
import { useSelector, useDispatch } from "react-redux";
import { setRender } from "../../../../redux/renderAction";

export default function ModalEditRoom({ isOpen, handleOpen, handleClose }) {
  const dispatch = useDispatch();

  const room = useSelector((state) => state.manageRooms.selectedRoom);
  const [type, setType] = useState(room.type);
  const [isAvailable, setIsAvailable] = useState(room.isAvailable);

  const handleUpdateRoom = async () => {
    await handleEditRoom(
      room.roomCode,
      room.theaterCode,
      type,
      room.numberSeats,
      isAvailable
    );
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
            Cập nhật phòng
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
              <FormControl defaultValue={room.roomCode} aria-readonly>
                <Label>Mã phòng</Label>
                <StyledInput readOnly />
                <HelperText />
              </FormControl>

              <FormControl
                defaultValue={room.theaterCode}
                aria-readonly
                sx={{ flex: 1 }}
              >
                <Label>Rạp</Label>
                <StyledInput readOnly />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue={room.type} required sx={{ flex: 1 }}>
                <Label>Loại phòng</Label>
                <StyledInput onChange={(e) => setType(e.target.value)} />
                <HelperText />
              </FormControl>

              <FormControl
                defaultValue={room.isAvailable}
                required
                sx={{ flex: 1 }}
              >
                <Label>Trạng thái</Label>
                <StyledInput onChange={(e) => setIsAvailable(e.target.value)} />
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
            onClick={handleUpdateRoom}
          >
            Sửa
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
