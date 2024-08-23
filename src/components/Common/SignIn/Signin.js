import React, { useState, useEffect } from "react";
import { FormControl } from "@mui/base/FormControl";
import Button from "@mui/material/Button";
import { handleLoginRedux } from "./redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./Signin.scss";
import {
  StyledInput,
  Label,
  HelperText,
  Modal,
  StyledBackdrop,
  ModalContent,
} from "./style";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ForgotPassword from "./ForgotPassword/ForgotPassword";

export default function Signin({ isOpen, handleClose, switchToSignUp }) {
  const dispatch = useDispatch();

  const account = useSelector((state) => state.user.account);
  const isLoading = useSelector((state) => state.user.isLoading);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password is required!");
      return;
    }

    dispatch(handleLoginRedux(email, password));
  };

  const handleEnter = (e) => {
    if (e && e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if (account && account.auth === true) {
      handleClose();
    }
  }, []);

  return (
    <div>
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
              <StyledInput
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Mật khẩu</Label>
              <StyledInput
                placeholder="Mật khẩu"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
              />
              <HelperText />
            </FormControl>
          </div>

          <span className="flex justify-end">
            <ForgotPassword />
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
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : null}
          <p
            id="parent-modal-description"
            className="modal-description"
            style={{ textAlign: "center" }}
          >
            Bạn chưa có tài khoản?
            <span
              style={{ color: "#d65712", marginLeft: 5, cursor: "pointer" }}
              onClick={switchToSignUp}
            >
              Đăng ký
            </span>
          </p>
        </ModalContent>
      </Modal>
    </div>
  );
}
