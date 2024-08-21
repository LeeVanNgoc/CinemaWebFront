import React, { useState } from "react";
import OTPInput from "./OTPInput";
import { Input as BaseInput } from "@mui/base/Input";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import { Button } from "@mui/material";
import { handleGetOTP, handleLoginByOTP } from "../config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const handleOpen = (type) => {
    type === "modal" ? setOpen(true) : setShow(!show);
  };

  const handleClose = (type) => {
    type === "modal" ? setOpen(false) : setShow(false);
  };

  const handleGetOtp = async (userEmail, type) => {
    try {
      const res = await handleGetOTP(userEmail);
      if (res && res.errCode === 0) {
        handleOpen(type);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <Button
        sx={{
          color: "#d65712",
          marginTop: "8px",
          fontSize: 15,
          textTransform: "none",
        }}
        onClick={() => handleOpen("modal")}
      >
        Quên mật khẩu?
      </Button>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={() => handleClose("modal")}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400 }}>
          <p id="unstyled-modal-description" className="modal-description">
            Email:
          </p>
          <Input
            aria-label="Demo input"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button onClick={() => handleGetOtp(email, "otp-input")}>
            Get OTP
          </Button>
          {show && (
            <div>
              A message with a verification code has been sent to your email.
              Enter the code to continue.
              <OTPInput
                userEmail={email}
                type="otp-input"
                handleClose={handleClose}
              />
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ForgotPassword;

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

const Input = React.forwardRef(function CustomInput(props, ref) {
  return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
});

const InputElement = styled("input")(
  ({ theme }) => `
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
