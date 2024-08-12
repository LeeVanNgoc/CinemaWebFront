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
import { Select, MenuItem, InputLabel } from "@mui/material";
import { handleEditSeat } from "./config";
import { useSelector } from "react-redux";

export default function ModalEditSeat({ isOpen, handleOpen, handleClose }) {
  const seat = useSelector((state) => state.manageSeats.selectedSeat);

  const [type, setType] = useState(seat.type);
  const [roomId, setRoomId] = useState(seat.roomId);
  const [row, setRow] = useState(seat.row);
  const [col, setCol] = useState(seat.col);
  const [isAvailable, setIsAvailable] = useState(seat.isAvailable);

  const handleUpdateSeat = async () => {
    await handleEditSeat(seat.seatId, type, roomId, row, col, isAvailable);
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
            Cập nhật ghế
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl defaultValue={seat.seatId} aria-readonly>
              <Label>Mã ghế</Label>
              <StyledInput readOnly />
              <HelperText />
            </FormControl>

            <FormControl>
              <InputLabel id="room-type-label" sx={{ marginTop: "20px" }}>
                Loại ghế
              </InputLabel>
              <Select
                labelId="room-type-label"
                value={seat.type}
                label="Loại ghế"
                onChange={(event) => setType(event.target.value)}
                sx={{ width: "210px", height: "50px" }}
              >
                <MenuItem value="VIP">VIP</MenuItem>
                <MenuItem value="Regular">Regular</MenuItem>
                <MenuItem value="Double">Double</MenuItem>
              </Select>
            </FormControl>

            <FormControl defaultValue={seat.roomId} required sx={{ flex: 1 }}>
              <Label>Mã phòng</Label>
              <StyledInput onChange={(e) => setRoomId(e.target.value)} />
              <HelperText />
            </FormControl>

            <FormControl defaultValue={seat.row} required sx={{ flex: 1 }}>
              <Label>Hàng</Label>
              <StyledInput onChange={(e) => setRow(e.target.value)} />
              <HelperText />
            </FormControl>

            <FormControl defaultValue={seat.col} required sx={{ flex: 1 }}>
              <Label>Cột</Label>
              <StyledInput onChange={(e) => setCol(e.target.value)} />
              <HelperText />
            </FormControl>

            <FormControl
              defaultValue={seat.isAvailable}
              required
              sx={{ flex: 1 }}
            >
              <Label>Trạng thái</Label>
              <StyledInput onChange={(e) => setIsAvailable(e.target.value)} />
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
            onClick={handleUpdateSeat}
          >
            Sửa
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
