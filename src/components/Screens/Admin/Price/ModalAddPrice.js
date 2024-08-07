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
import { handleCreatePrice } from "./config";

export default function ModalAddPrice({ isOpen, handleOpen, handleClose }) {
  const [cost, setCost] = useState("");
  const [roomType, setRoomType] = useState("");
  const [seatType, setSeatType] = useState("");
  const [isWeekend, setIsWeekend] = useState(false);

  const handleAddPrice = async () => {
    handleCreatePrice(cost, roomType, seatType, isWeekend);
    handleClose();
    window.location.reload();
  };

  const handleEnter = (e) => {
    if (e && e.key === "Enter") {
      handleAddPrice();
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
        Tạo giá vé mới
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
            Tạo giá vé mới
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
              <Label>Mức vé</Label>
              <StyledInput
                // placeholder="Cost"
                onChange={(e) => setCost(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Loại phòng</Label>
              <StyledInput
                // placeholder="Mật khẩu"
                onChange={(e) => setRoomType(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Loại ghế</Label>
              <StyledInput
                // placeholder="Mật khẩu"
                onChange={(e) => setSeatType(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Cuối tuần/Lễ</Label>
              <StyledInput
                // placeholder="Mật khẩu"
                onChange={(e) => setIsWeekend(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
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
            onClick={handleAddPrice}
          >
            Tạo mới
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
