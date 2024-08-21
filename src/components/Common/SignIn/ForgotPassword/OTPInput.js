import React, { useState } from "react";
import OTP from "./OTP";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { handleLoginByOTP } from "../config";
import { toast } from "react-toastify";

export default function OTPInput(userEmail, type, handleClose) {
  const [otp, setOtp] = useState("");

  const handleLoginByOtpCode = async (userEmail, otp, type) => {
    try {
      const res = await handleLoginByOTP(userEmail.userEmail, otp);
      if (res && res.errCode === 0) {
        handleClose(type);
        toast.success("Đăng nhập thành công!");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <OTP separator={<span></span>} value={otp} onChange={setOtp} length={6} />
      <Button onClick={() => handleLoginByOtpCode(userEmail, otp, "otp-input")}>
        Submit
      </Button>
    </Box>
  );
}
