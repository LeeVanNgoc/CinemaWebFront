import React, { useState, useEffect } from "react";
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

export default function ModalEditTicket({
  isOpen,
  handleOpen,
  handleClose,
  user,
}) {
  // Khởi tạo state với dữ liệu người dùng từ props
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [birthYear, setBirthYear] = useState(user?.birthYear || "");
  const [userName, setTicketName] = useState(user?.userName || "");
  const [phonenumber, setPhonenumber] = useState(user?.phonenumber || "");

  // Cập nhật state khi props `user` thay đổi
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setBirthYear(user.birthYear);
      setTicketName(user.userName);
      setPhonenumber(user.phonenumber);
    }
  }, [user]);

  // Hàm cập nhật người dùng
  const handleUpdateTicket = async () => {
    await handleEditTicket(
      user.userId, // Đảm bảo truyền đúng userId
      firstName,
      lastName,
      userName,
      phonenumber,
      birthYear
    );
    handleClose(); // Đóng modal sau khi cập nhật
    // Có thể thêm logic khác nếu cần
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
              <FormControl defaultValue={user?.email} aria-readonly>
                <Label>Email</Label>
                <StyledInput readOnly />
                <HelperText />
              </FormControl>
            </div>

            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl value={firstName} required sx={{ flex: 1 }}>
                <Label>Tên</Label>
                <StyledInput onChange={(e) => setFirstName(e.target.value)} />
                <HelperText />
              </FormControl>

              <FormControl value={lastName} required sx={{ flex: 1 }}>
                <Label>Họ</Label>
                <StyledInput onChange={(e) => setLastName(e.target.value)} />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl
                defaultValue={user?.password}
                aria-readonly
                sx={{ flex: 1 }}
              >
                <Label>Mật khẩu</Label>
                <StyledInput readOnly />
                <HelperText />
              </FormControl>

              <FormControl value={birthYear} required sx={{ flex: 1 }}>
                <Label>Năm sinh</Label>
                <StyledInput onChange={(e) => setBirthYear(e.target.value)} />
                <HelperText />
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl value={userName} required sx={{ flex: 1 }}>
                <Label>Tên tài khoản</Label>
                <StyledInput onChange={(e) => setTicketName(e.target.value)} />
                <HelperText />
              </FormControl>

              <FormControl defaultValue={phonenumber} required sx={{ flex: 1 }}>
                <Label>Số điện thoại</Label>
                <StyledInput readOnly />
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
