import * as React from "react";
import { FormControl } from "@mui/base/FormControl";
import Button from "@mui/material/Button";
import "./Signup.scss";
import {
  TriggerButton,
  StyledInput,
  StyledInputRow,
  Label,
  HelperText,
  Modal,
  StyledBackdrop,
  ModalContent,
} from "./style";

export default function Signup({
  isOpen,
  handleOpen,
  handleClose,
  switchToSignIn,
}) {
  return (
    <div>
      <TriggerButton
        type="button"
        onClick={handleOpen}
        sx={{
          borderRadius: "40px",
          backgroundColor: "transparent",
          textTransform: "none",
          color: "white",
          border: "1px solid white",
        }}
      >
        Đăng ký
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
            width: 575,
          }}
        >
          <h1
            id="unstyled-modal-title"
            className="modal-title"
            style={{ fontSize: 20, fontWeight: "bold" }}
          >
            Đăng ký
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
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Họ</Label>
                <StyledInputRow placeholder="Họ" />
                <HelperText />
              </FormControl>
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Tên</Label>
                <StyledInputRow placeholder="Tên" />
                <HelperText />
              </FormControl>
            </div>
            <FormControl defaultValue="" required>
              <Label>Tên tài khoản</Label>
              <StyledInput placeholder="Tên tài khoản" />
              <HelperText />
            </FormControl>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Số điện thoại</Label>
                <StyledInputRow placeholder="Số điện thoại" />
                <HelperText />
              </FormControl>
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Email</Label>
                <StyledInputRow placeholder="Email" />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Mật khẩu</Label>
                <StyledInputRow placeholder="Mật khẩu" />
                <HelperText />
              </FormControl>
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Xác nhận mật khẩu</Label>
                <StyledInputRow placeholder="Xác nhận mật khẩu" />
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
            onClick={handleClose}
          >
            Đăng ký
          </Button>
          <p
            id="parent-modal-description"
            className="modal-description"
            style={{ textAlign: "center" }}
          >
            Bạn đã có tài khoản?
            <span
              style={{ color: "#d65712", marginLeft: 5, cursor: "pointer" }}
              onClick={switchToSignIn}
            >
              Đăng nhập
            </span>
          </p>
        </ModalContent>
      </Modal>
    </div>
  );
}
