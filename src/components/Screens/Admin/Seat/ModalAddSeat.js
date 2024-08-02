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
import { handleCreateSeat } from "./config";

export default function ModalAddSeat({ isOpen, handleOpen, handleClose }) {
  const [type, setType] = useState("");
  const [roomId, setRoomId] = useState("");
  const [row, setRow] = useState("");
  const [col, setCol] = useState("");
  const [isAvailable, setIsAvailable] = useState("");

  const handleAddSeat = async () => {
    handleCreateSeat(type, roomId, row, col, isAvailable);
    handleClose();
    window.location.reload();
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
        Thêm ghế
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
            Thêm ghế
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
              <Label>Loại ghế</Label>
              <StyledInput
                // placeholder="Type"
                onChange={(e) => setType(e.target.value)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Mã phòng</Label>
              <StyledInput onChange={(e) => setRoomId(e.target.value)} />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Hàng</Label>
              <StyledInput onChange={(e) => setRow(e.target.value)} />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Cột</Label>
              <StyledInput onChange={(e) => setCol(e.target.value)} />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
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
            href="#outlined-buttons"
            onClick={handleAddSeat}
          >
            Thêm mới
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
