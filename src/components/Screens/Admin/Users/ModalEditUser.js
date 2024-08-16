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
import { handleEditUser } from "./config";
import { useSelector } from "react-redux";

export default function ModalEditUser({ isOpen, handleOpen, handleClose }) {
  const user = useSelector((state) => state.manageUsers.selectedUser);

  // Khởi tạo state với dữ liệu người dùng từ props
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [birthYear, setBirthYear] = useState(user.birthYear);
  const [userName, setUserName] = useState(user.userName);
  const [phonenumber, setPhonenumber] = useState(user.phonenumber);

  const handleUpdateUser = async () => {
    await handleEditUser(
      user.userCode,
      firstName,
      lastName,
      userName,
      phonenumber,
      birthYear
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
            Sửa người dùng
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
              <FormControl value={user.email}>
                <Label>Email</Label>
                <StyledInput readOnly />
                <HelperText />
              </FormControl>
            </div>

            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl
                defaultValue={user.firstName}
                required
                sx={{ flex: 1 }}
              >
                <Label>Tên</Label>
                <StyledInput onChange={(e) => setFirstName(e.target.value)} />
                <HelperText />
              </FormControl>

              <FormControl
                defaultValue={user.lastName}
                required
                sx={{ flex: 1 }}
              >
                <Label>Họ</Label>
                <StyledInput onChange={(e) => setLastName(e.target.value)} />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl value={user.password} aria-readonly sx={{ flex: 1 }}>
                <Label>Mật khẩu</Label>
                <StyledInput readOnly />
                <HelperText />
              </FormControl>

              <FormControl
                defaultValue={user.birthYear}
                required
                sx={{ flex: 1 }}
              >
                <Label>Năm sinh</Label>
                <StyledInput onChange={(e) => setBirthYear(e.target.value)} />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl
                defaultValue={user.userName}
                required
                sx={{ flex: 1 }}
              >
                <Label>Tên tài khoản</Label>
                <StyledInput onChange={(e) => setUserName(e.target.value)} />
                <HelperText />
              </FormControl>

              <FormControl
                defaultValue={user.phonenumber}
                required
                sx={{ flex: 1 }}
              >
                <Label>Số điện thoại</Label>
                <StyledInput onChange={(e) => setPhonenumber(e.target.value)} />
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
            onClick={handleUpdateUser}
          >
            Sửa
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
