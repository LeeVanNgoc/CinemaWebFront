import React, { useState, useEffect } from "react";
import { FormControl } from "@mui/base/FormControl";
import { Button, Select, MenuItem } from "@mui/material";
import {
  TriggerButton,
  StyledInput,
  Label,
  HelperText,
  Modal,
  StyledBackdrop,
  ModalContent,
} from "./style";
import { handleEditPrice } from "./config";
import { useSelector } from "react-redux";

export default function ModalEditPrice({ isOpen, handleOpen, handleClose }) {
  const price = useSelector((state) => state.managePrices.selectedPrice);

  const [cost, setCost] = useState("");
  const [roomType, setRoomType] = useState("");
  const [seatType, setSeatType] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [isWeekend, setIsWeekend] = useState("");

  useEffect(() => {
    if (price) {
      setCost(price.cost);
      setRoomType(price.roomType);
      setSeatType(price.seatType);
      setTimeFrame(price.timeFrame);
      setIsWeekend(price.isWeekend);
    }
  }, [price]);

  const handleUpdatePrice = async () => {
    await handleEditPrice(price.priceCode, cost, roomType, seatType, timeFrame, isWeekend);
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
            Cập nhật giá vé
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
              <FormControl defaultValue={price.priceCode} aria-readonly>
                <Label>Mã giá vé</Label>
                <StyledInput readOnly />
                <HelperText />
              </FormControl>
              <FormControl defaultValue={price.cost} required sx={{ flex: 1 }}>
                <Label>Mức giá</Label>
                <StyledInput onChange={(e) => setCost(e.target.value)} />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl required sx={{ flex: 1 }}>
                <Label>Loại phòng</Label>
                <Select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  sx={{ width: '100%' }}
                >
                  <MenuItem value="2D">2D</MenuItem>
                  <MenuItem value="3D">3D</MenuItem>
                </Select>
                <HelperText />
              </FormControl>
              <FormControl required sx={{ flex: 1 }}>
                <Label>Loại ghế</Label>
                <Select
                  value={seatType}
                  onChange={(e) => setSeatType(e.target.value)} 
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
              <FormControl required sx={{ flex: 1 }}>
                <Label>Khung giờ</Label>
                <Select
                  value={timeFrame}
                  onChange={(e) => setTimeFrame(e.target.value)} 
                  sx={{ width: '100%' }}
                >
                  <MenuItem value="10-12">10-12</MenuItem>
                  <MenuItem value="12-17">12-17</MenuItem>
                  <MenuItem value="17-23">17-23</MenuItem>
                </Select>
                <HelperText />
              </FormControl>
              <FormControl required sx={{ flex: 1 }}>
                <Label>Cuối tuần/Lễ</Label>
                <Select
                  value={isWeekend}
                  onChange={(e) => setIsWeekend(e.target.value)} 
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
            onClick={handleUpdatePrice}
          >
            Sửa
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
