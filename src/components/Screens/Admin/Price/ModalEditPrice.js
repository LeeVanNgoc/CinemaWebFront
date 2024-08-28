import React, { useState, useEffect } from "react";
import { FormControl } from "@mui/base/FormControl";
import { Button, Autocomplete, TextField } from "@mui/material";
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
              marginBottom: "30px",
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
            <div style={{ display: "flex", gap: "10px", width: "100%", marginBottom: "30px" }}>
            <FormControl required>
                <Label>Loại phòng</Label>
                <Autocomplete
                  sx={{ width: "195px" }}
                  options={["2D", "3D"]}
                  onChange={(e, value) => setRoomType(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={price.roomType}
                      size="big"
                      sx={{ height: "20px" }}
                    />
                  )}
                />
                <HelperText />
              </FormControl>
              <FormControl required>
                <Label>Loại ghế</Label>
                <Autocomplete
                  sx={{ width: "195px" }}
                  options={["Standard", "Vip", "Sweetbox"]}
                  onChange={(e, value) => setSeatType(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={price.seatType}
                      size="big"
                      sx={{ height: "20px" }}
                    />
                  )}
                />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl required>
                <Label>Khung giờ</Label>
                <Autocomplete
                  sx={{ width: "195px" }}
                  options={["10-12", "12-17", "17-23"]}
                  onChange={(e, value) => setTimeFrame(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={price.timeFrame}
                      size="big"
                      sx={{ height: "20px" }}
                    />
                  )}
                />
                <HelperText />
              </FormControl>
              <FormControl required>
                <Label>Cuối tuần/lễ?</Label>
                <Autocomplete
                  sx={{ width: "195px" }}
                  options={["0", "1"]}
                  getOptionLabel={(option) => option === "0" ? "Không" : "Có"}
                  onChange={(e, value) => setIsWeekend(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={price.isWeekend === "0" ? "Không" : "Có"}
                      size="big"
                      sx={{ height: "20px" }}
                    />
                  )}
                />
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
