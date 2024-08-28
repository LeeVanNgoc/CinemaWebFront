import React, { useState } from "react";
import { FormControl } from "@mui/base/FormControl";
import { Button, Select, MenuItem }from "@mui/material";
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
  const [timeFrame, setTimeFrame] = useState("");
  const [isWeekend, setIsWeekend] = useState(false);

  const handleAddPrice = async () => {
    handleCreatePrice(cost, roomType, seatType,timeFrame, isWeekend);
    handleClose();
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
              <Label>Mức giá</Label>
              <StyledInput
                onChange={(e) => setCost(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
              <HelperText />
            </FormControl>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue="" required style={{ flex: 1 }}>
                <Label>Loại phòng</Label>
                <Select
                  onChange={(e) => setRoomType(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                  sx={{ width: '100%' }}
                >
                  <MenuItem value="2D">2D</MenuItem>
                  <MenuItem value="3D">3D</MenuItem>
                </Select>
                <HelperText />
              </FormControl>
              <FormControl defaultValue="" required style={{ flex: 1 }}>
                <Label>Loại ghế</Label>
                <Select
                  onChange={(e) => setSeatType(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                  sx={{ width: '100%' }}
                >
                  <MenuItem value="Standard">Standard</MenuItem>
                  <MenuItem value="Vip">Vip</MenuItem>
                  <MenuItem value="Sweetbox">Sweetbox</MenuItem>
                </Select>
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue="" required style={{ flex: 1 }}>
                <Label>Khung giờ</Label>
                <Select
                  onChange={(e) => setTimeFrame(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                  sx={{ width: '100%' }}
                >
                  <MenuItem value="10-12">10-12</MenuItem>
                  <MenuItem value="12-17">12-17</MenuItem>
                  <MenuItem value="17-23">17-23</MenuItem>
                </Select>
                <HelperText />
              </FormControl>
              <FormControl defaultValue="" required style={{ flex: 1 }}>
                <Label>Cuối tuần/Lễ</Label>
                <Select
                  onChange={(e) => setIsWeekend(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                  sx={{ width: '100%' }}
                >
                  <MenuItem value="0">Không</MenuItem>
                  <MenuItem value="1">Có</MenuItem>
                </Select>
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
            onClick={handleAddPrice}
          >
            Tạo mới
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
