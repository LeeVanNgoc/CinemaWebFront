import React, { useState } from "react";
import { FormControl } from "@mui/base/FormControl";
import { Button } from "@mui/material";
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
  const [seats, setSeats] = useState(ticket.seats);
  const [planScreenMovieCode, setPlanScreenMovieCode] = useState(
    ticket.planScreenMovieCode
  );
  const [bank, setBank] = useState(ticket.bank);
  const [totalPrice, setTotalPrice] = useState(ticket.totalPrice);

  const handleUpdateTicket = async () => {
    await handleEditTicket(
      ticket.ticketCode,
      seats,
      planScreenMovieCode,
      totalPrice,
      bank
    );
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
            <FormControl value={ticket.ticketCode} aria-readonly>
              <Label>Mã vé</Label>
              <StyledInput readOnly />
              <HelperText />
            </FormControl>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <FormControl value={ticket.seats} required sx={{ flex: 1 }}>
              <Label>Ghế</Label>
              <StyledInput onChange={(e) => setSeats(e.target.value)} />
              <HelperText />
            </FormControl>

            <FormControl
              value={ticket.planScreenMovieCode}
              required
              sx={{ flex: 1 }}
            >
              <Label>Giờ chiếu</Label>
              <StyledInput
                onChange={(e) => setPlanScreenMovieCode(e.target.value)}
              />
              <HelperText />
            </FormControl>
            </div>

            {/* <Paragraph>Thanh toán</Paragraph>
            <Select
              value={ticket.bank}
              onChange={(_, newValue) => setBank(newValue)}
              sx={{ flex: 1 }}
            >
              <Option value="cash">cash</Option>
              <Option value="cost">cost</Option>
            </Select> */}
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl value={ticket.bank} required sx={{ flex: 1 }}>
                <Label>Thanh toán</Label>
                <StyledInput onChange={(e) => setBank(e.target.value)} />
                <HelperText />
              </FormControl>

              <FormControl value={ticket.totalPrice} required sx={{ flex: 1 }}>
                <Label>Tổng đơn</Label>
                <StyledInput onChange={(e) => setTotalPrice(e.target.value)} />
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
