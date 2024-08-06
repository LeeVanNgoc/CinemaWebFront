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
import { handleEditPrice } from "./config";
import { useSelector } from "react-redux";

export default function ModalEditPrice({ isOpen, handleOpen, handleClose }) {
  const price = useSelector((state) => state.managePrices.selectedPrice);

  const [cost, setCost] = useState(price.cost);
  const [type, setType] = useState(price.type);
  const [isWeekend, setIsWeekend] = useState(price.isWeekend);

  const handleUpdatePrice = async () => {
    await handleEditPrice(price.pricesId, cost, type, isWeekend);
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
            <FormControl defaultValue={price.pricesId} aria-readonly>
              <Label>Mã giá vé</Label>
              <StyledInput readOnly />
              <HelperText />
            </FormControl>

            <FormControl defaultValue={price.cost} required sx={{ flex: 1 }}>
              <Label>Mức giá</Label>
              <StyledInput onChange={(e) => setCost(e.target.value)} />
              <HelperText />
            </FormControl>

            <FormControl defaultValue={price.type} required sx={{ flex: 1 }}>
              <Label>Kiểu ghế</Label>
              <StyledInput onChange={(e) => setType(e.target.value)} />
              <HelperText />
            </FormControl>

            <FormControl
              defaultValue={price.isWeekend}
              required
              sx={{ flex: 1 }}
            >
              <Label>Cuối tuần/Lễ</Label>
              <StyledInput onChange={(e) => setIsWeekend(e.target.value)} />
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
            onClick={handleUpdatePrice}
          >
            Sửa
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
