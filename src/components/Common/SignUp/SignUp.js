import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from './config';
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
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      return;
    }
    const formattedData = {
      ...userData,
      email: userData.email.toLowerCase(),
    };
    dispatch(registerUser(formattedData));
  };

  return (
    <>
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
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                <FormControl required sx={{ flex: 1 }}>
                  <Label>Họ</Label>
                  <StyledInputRow
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    placeholder="Họ"
                    required
                  />
                  <HelperText />
                </FormControl>
                <FormControl required sx={{ flex: 1 }}>
                  <Label>Tên</Label>
                  <StyledInputRow
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    placeholder="Tên"
                    required
                  />
                  <HelperText />
                </FormControl>
              </div>
              <FormControl required>
                <Label>Tên tài khoản</Label>
                <StyledInput
                  type="text"
                  name="userName"
                  value={userData.userName}
                  onChange={handleChange}
                  placeholder="Tên tài khoản"
                  required
                />
                <HelperText />
              </FormControl>
              <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                <FormControl required sx={{ flex: 1 }}>
                  <Label>Số điện thoại</Label>
                  <StyledInputRow
                    type="text"
                    name="phonenumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Số điện thoại"
                    required
                  />
                  <HelperText />
                </FormControl>
                <FormControl required sx={{ flex: 1 }}>
                  <Label>Email</Label>
                  <StyledInputRow
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                  <HelperText />
                </FormControl>
              </div>
              <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                <FormControl required sx={{ flex: 1 }}>
                  <Label>Mật khẩu</Label>
                  <StyledInputRow
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Mật khẩu"
                    required
                  />
                  <HelperText />
                </FormControl>
                <FormControl required sx={{ flex: 1 }}>
                  <Label>Xác nhận mật khẩu</Label>
                  <StyledInputRow
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Xác nhận mật khẩu"
                    required
                  />
                  <HelperText />
                </FormControl>
              </div>
            </div>
            <Button
              variant="contained"
              type="submit"
              sx={{
                borderRadius: "40px",
                backgroundColor: "#dc1313f0",
                textTransform: "none",
                marginTop: "15px",
                marginBottom: "15px",
                width: "100%",
              }}
            >
              Đăng ký
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
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
    </>
  );
}