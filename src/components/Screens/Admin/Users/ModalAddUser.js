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
import { handleCreateUser } from "./config";

export default function ModalAddUser({ isOpen, handleOpen, handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthYear, setsetBirthYear] = useState("");
  const [userName, setUserName] = useState("");
  const [phonenumber, setPhoneNumer] = useState("");

  const handleAddUser = async () => {
    handleCreateUser(
      email,
      password,
      firstName,
      lastName,
      birthYear,
      userName,
      phonenumber
    );
    handleClose();
    // window.location.reload();
  };

  const handleEnter = (e) => {
    if (e && e.key === "Enter") {
      handleAddUser();
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
        Thêm người dùng
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
            // id="unstyled-modal-title"
            className="add-modal-title"
            style={{ fontSize: 20, fontWeight: "bold" }}
          >
            Thêm người dùng
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
              <FormControl defaultValue="" required>
                <Label>Email</Label>
                <StyledInput
                  // placeholder="UserId"
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>
            </div>

            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Tên</Label>
                <StyledInput
                  // placeholder="Mật khẩu"
                  onChange={(e) => setFirstName(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>

              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Họ</Label>
                <StyledInput
                  // placeholder="Mật khẩu"
                  onChange={(e) => setLastName(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Mật khẩu</Label>
                <StyledInput
                  // placeholder="Mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>

              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Năm sinh</Label>
                <StyledInput
                  // placeholder="Mật khẩu"
                  onChange={(e) => setsetBirthYear(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Tên tài khoản</Label>
                <StyledInput
                  // placeholder="Mật khẩu"
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>

              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Số điện thoại</Label>
                <StyledInput
                  // placeholder="Mật khẩu"
                  onChange={(e) => setPhoneNumer(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
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
            href="#outlined-buttons"
            onClick={handleAddUser}
          >
            Tạo mới
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
