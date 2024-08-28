import React, { useState } from "react";
import { FormControl } from "@mui/base/FormControl";
import { Button, Autocomplete, TextField } from "@mui/material";
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
import { useDispatch } from "react-redux";
import { setRender } from "../../../../redux/renderAction";

export default function ModalAddUser({ isOpen, handleOpen, handleClose }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthYear, setsetBirthYear] = useState("");
  const [userName, setUserName] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [phonenumber, setPhoneNumer] = useState("");

  const handleAddUser = async () => {
    handleCreateUser(
      email,
      password,
      firstName,
      lastName,
      birthYear,
      userName,
      phonenumber,
      role,
      city
    );
    dispatch(setRender(true));
    handleClose();
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
            id="unstyled-modal-title"
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
            <div style={{ display: "flex", width: "100%", gap: "10px" }}>
              <FormControl defaultValue="" required>
                <Label>Email</Label>
                <StyledInput
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>

              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Mật khẩu</Label>
                <StyledInput
                  // placeholder="Mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>
            </div>

            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Họ</Label>
                <StyledInput
                  // placeholder="Mật khẩu"
                  onChange={(e) => setLastName(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>

              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Tên</Label>
                <StyledInput
                  // placeholder="Mật khẩu"
                  onChange={(e) => setFirstName(e.target.value)}
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
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Năm sinh</Label>
                <StyledInput
                  // placeholder="Mật khẩu"
                  onChange={(e) => setsetBirthYear(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <HelperText />
              </FormControl>

              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>Vai trò</Label>
                <Autocomplete
                  sx={{ width: "200px" }}
                  options={["Admin", "User"]}
                  onChange={(e, value) => setRole(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select role"
                      size="small"
                      sx={{ height: "20px" }}
                    />
                  )}
                />
                <HelperText />
              </FormControl>
            </div>

            <div style={{ display: "flex" }}>
              <FormControl defaultValue="" required sx={{ flex: 1 }}>
                <Label>City</Label>
                <Autocomplete
                  sx={{ width: "200px" }}
                  options={["Hà Nội", "Đà Nẵng", "Hồ Chí Minh", "None"]}
                  onChange={(e, value) => setRole(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select city"
                      size="small"
                      sx={{ height: "20px" }}
                    />
                  )}
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
