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
  const [seatTicketId, setSeatTicketId] = useState(ticket.seatTicketId);
  const [planScreenMovieId, setPlanScreenMovieId] = useState(
    ticket.planScreenMovieId
  );
  const [bank, setBank] = useState(ticket.bank);
  const [price, setPrice] = useState(ticket.price);

  const handleUpdateTicket = async () => {
    await handleEditTicket(
      ticket.ticketId,
      seatTicketId,
      planScreenMovieId,
      price,
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
            <FormControl defaultValue={ticket.ticketId} aria-readonly>
              <Label>Mã vé</Label>
              <StyledInput readOnly />
              <HelperText />
            </FormControl>

            <FormControl
              defaultValue={ticket.seatTicketId}
              required
              sx={{ flex: 1 }}
            >
              <Label>Mã ghế</Label>
              <StyledInput onChange={(e) => setSeatTicketId(e.target.value)} />
              <HelperText />
            </FormControl>

            <FormControl
              defaultValue={ticket.planScreenMovieId}
              required
              sx={{ flex: 1 }}
            >
              <Label>Giờ chiếu</Label>
              <StyledInput
                onChange={(e) => setPlanScreenMovieId(e.target.value)}
              />
              <HelperText />
            </FormControl>

            {/* <Paragraph>Thanh toán</Paragraph>
            <Select
              defaultValue={ticket.bank}
              onChange={(_, newValue) => setBank(newValue)}
              sx={{ flex: 1 }}
            >
              <Option value="cash">cash</Option>
              <Option value="cost">cost</Option>
            </Select> */}

            <FormControl defaultValue={ticket.bank} required sx={{ flex: 1 }}>
              <Label>Thanh toán</Label>
              <StyledInput onChange={(e) => setBank(e.target.value)} />
              <HelperText />
            </FormControl>

            <FormControl defaultValue={ticket.price} required sx={{ flex: 1 }}>
              <Label>Tổng đơn</Label>
              <StyledInput onChange={(e) => setPrice(e.target.value)} />
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
            onClick={handleUpdateTicket}
          >
            Sửa
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
