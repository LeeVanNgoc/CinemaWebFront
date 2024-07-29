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
import { handleEditTicket } from "./config";
import { useSelector } from "react-redux";

export default function ModalEditTicket({ isOpen, handleOpen, handleClose }) {
  const ticket = useSelector((state) => state.manageTickets.selectedTicket);

  // Khởi tạo state với dữ liệu vé từ props
  const [stId, setStId] = useState(ticket.stId);
  const [psmId, setPsmId] = useState(ticket.psmId);
  const [bank, setBank] = useState(ticket.bank);
  const [price, setPrice] = useState(ticket.price);

  const handleUpdateTicket = async () => {
    await handleEditTicket(ticket.ticketId, stId, psmId, price, bank);
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
            Cập nhật vé
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", width: "100%" }}>
              <FormControl defaultValue={ticket.ticketId} aria-readonly>
                <Label>Mã vé</Label>
                <StyledInput readOnly />
                <HelperText />
              </FormControl>
            </div>

            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue={ticket.stId} required sx={{ flex: 1 }}>
                <Label>Mã ghế</Label>
                <StyledInput onChange={(e) => setStId(e.target.value)} />
                <HelperText />
              </FormControl>

              <FormControl defaultValue={psmId} required sx={{ flex: 1 }}>
                <Label>Giờ chiếu</Label>
                <StyledInput onChange={(e) => setPsmId(e.target.value)} />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue={ticket.bank} required sx={{ flex: 1 }}>
                <Label>Hình thức thanh toán</Label>
                <StyledInput onChange={(e) => setBank(e.target.value)} />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl
                defaultValue={ticket.price}
                required
                sx={{ flex: 1 }}
              >
                <Label>Tổng đơn</Label>
                <StyledInput onChange={(e) => setPrice(e.target.value)} />
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
            onClick={handleUpdateTicket}
          >
            Sửa
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
