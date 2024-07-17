import * as React from "react";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import Button from "@mui/material/Button";
import "./Signin.scss";
import {
  Backdrop,
  TriggerButton,
  StyledInput,
  Label,
  HelperText,
  Modal,
  StyledBackdrop,
  ModalContent,
} from "./style";

export default function Signin() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        Đăng nhập
      </TriggerButton>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
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
            Đăng nhập
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
              <Label>Email</Label>
              <StyledInput placeholder="Email" />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Mật khẩu</Label>
              <StyledInput placeholder="Mật khẩu" />
              <HelperText />
            </FormControl>
          </div>

          <span
            id="parent-modal-description"
            className="modal-description"
            style={{
              textAlign: "right",
              color: "#d65712",
              marginTop: "8px",
              fontSize: 15,
            }}
          >
            Quên mật khẩu?
          </span>

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
            onClick={handleClose}
          >
            Đăng nhập
          </Button>
          <p
            id="parent-modal-description"
            className="modal-description"
            style={{ textAlign: "center" }}
          >
            Bạn chưa có tài khoản?
            <span style={{ color: "#d65712", marginLeft: 5 }}>Đăng ký</span>
          </p>
        </ModalContent>
      </Modal>
    </div>
  );
}