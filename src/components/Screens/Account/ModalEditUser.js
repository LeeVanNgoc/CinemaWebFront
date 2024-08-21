import React, { useState, useEffect } from "react";
import { FormControl } from "@mui/base/FormControl";
import Button from "@mui/material/Button";
import { handleGetUserById } from "../Admin/Users/config";
import {
  TriggerButton,
  StyledInput,
  Label,
  HelperText,
  Modal,
  StyledBackdrop,
  ModalContent,
} from "./style";
import { handleEditUser } from "../Admin/Users/config";
import jwtDecode from "jwt-decode";

export default function ModalEditUser({ isOpen, handleOpen, handleClose }) {
  const decoded = jwtDecode(localStorage.getItem("token"));
  const [info, setInfo] = useState(null);
  const userCode = decoded.userCode;

  // Khởi tạo state với dữ liệu người dùng từ props
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [userName, setUserName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let res = await handleGetUserById(userCode);
      console.log("res info >>>", res);
      if (res && res.errCode === 0) {
        setInfo(res.user);
      }
    };
    fetchData();
  }, [userCode]);

  const handleUpdateUser = async () => {
    await handleEditUser(
      userCode,
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
        {info && (
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
                <FormControl value={info.email}>
                  <Label>Email</Label>
                  <StyledInput readOnly />
                  <HelperText />
                </FormControl>
              </div>

              <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                <FormControl
                  defaultValue={info.firstName}
                  required
                  sx={{ flex: 1 }}
                >
                  <Label>Tên</Label>
                  <StyledInput onChange={(e) => setFirstName(e.target.value)} />
                  <HelperText />
                </FormControl>

                <FormControl
                  defaultValue={info.lastName}
                  required
                  sx={{ flex: 1 }}
                >
                  <Label>Họ</Label>
                  <StyledInput onChange={(e) => setLastName(e.target.value)} />
                  <HelperText />
                </FormControl>
              </div>
              <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                <FormControl
                  value={info.password}
                  aria-readonly
                  sx={{ flex: 1 }}
                >
                  <Label>Mật khẩu</Label>
                  <StyledInput readOnly />
                  <HelperText />
                </FormControl>

                <FormControl
                  defaultValue={info.birthYear}
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
                  defaultValue={info.userName}
                  required
                  sx={{ flex: 1 }}
                >
                  <Label>Tên tài khoản</Label>
                  <StyledInput onChange={(e) => setUserName(e.target.value)} />
                  <HelperText />
                </FormControl>

                <FormControl
                  defaultValue={info.phonenumber}
                  required
                  sx={{ flex: 1 }}
                >
                  <Label>Số điện thoại</Label>
                  <StyledInput
                    onChange={(e) => setPhonenumber(e.target.value)}
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
              onClick={handleUpdateUser}
            >
              Sửa
            </Button>
          </ModalContent>
        )}
      </Modal>
    </div>
  );
}
