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
import { handleCreateTicket } from "./config";

export default function ModalAddTicket({ isOpen, handleOpen, handleClose }) {
  const [userId, setUserId] = useState("");
  const [planScreenMovieId, setPlanScreenMovieId] = useState("");
  const [price, setPrice] = useState("");
  const [bank, setBank] = useState("");
  const [seatTicketId, setSeatTicketId] = useState("");

  const handleAddTicket = async () => {
    handleCreateTicket(userId, planScreenMovieId, price, bank, seatTicketId);
    handleClose();
    window.location.reload();
  };

  const handleEnter = (e) => {
    if (e && e.key === "Enter") {
      handleAddTicket();
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
        Tạo vé mới
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
            Tạo vé mới
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
              <Label>ID người dùng</Label>
              <StyledInput
                // placeholder="UserId"
                onChange={(e) => setUserId(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>PSM ID</Label>
              <StyledInput
                // placeholder="Mật khẩu"
                onChange={(e) => setPlanScreenMovieId(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Giá vé</Label>
              <StyledInput
                // placeholder="Mật khẩu"
                onChange={(e) => setPrice(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Ngân hàng</Label>
              <StyledInput
                // placeholder="Mật khẩu"
                onChange={(e) => setBank(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>St ID</Label>
              <StyledInput
                // placeholder="Mật khẩu"
                onChange={(e) => setSeatTicketId(e.target.value)}
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
            onClick={handleAddTicket}
          >
            Tạo mới
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
