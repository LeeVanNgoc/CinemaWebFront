import React, { useState } from "react";
import OTP from "./OTP";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { handleLoginByOtpRedux } from "../redux/actions/userAction";

export default function OTPInput(userEmail) {
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");

  const handleLoginByOtpCode = async () => {
    dispatch(handleLoginByOtpRedux(userEmail.userEmail, otp));
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
      <Button onClick={() => handleLoginByOtpCode()}>Submit</Button>
    </Box>
  );
}
