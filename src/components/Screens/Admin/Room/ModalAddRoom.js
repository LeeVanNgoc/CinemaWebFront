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
import { handleCreateRoom } from "./config";

export default function ModalAddRoom({ isOpen, handleOpen, handleClose }) {
  const [theaterCode, setTheaterCode] = useState("");
  const [type, setType] = useState("");
  const [numberSeats, setNumberSeats] = useState("");
  const [isAvailable, setIsAvailable] = useState("");

  const handleAddRoom = async () => {
    handleCreateRoom(theaterCode, type, numberSeats, isAvailable);
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
        Thêm phòng
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
            Thêm phòng
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
              <FormControl defaultValue="" required>
                <Label>Mã rạp</Label>
                <StyledInput onChange={(e) => setTheaterCode(e.target.value)} />
                <HelperText />
              </FormControl>

              <FormControl defaultValue="" required>
                <Label>Loại ghế</Label>
                <StyledInput
                  // placeholder="Type"
                  onChange={(e) => setType(e.target.value)}
                />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue="" required>
                <Label>Số ghế</Label>
                <StyledInput onChange={(e) => setNumberSeats(e.target.value)} />
                <HelperText />
              </FormControl>

              <FormControl defaultValue="" required>
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
            href="#outlined-buttons"
            onClick={handleAddRoom}
          >
            Thêm mới
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
