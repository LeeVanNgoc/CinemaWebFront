import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const TwoFactorAuthentication = () => {
  const [code, setCode] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setCode(inputValue);
  };

  const handleSubmit = () => {
    // Submit the code to your backend for verification
    console.log("Code submitted:", code);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Two-Factor Authentication</h2>
      <TextField
        label="Verification Code"
        type="text"
        value={code}
        onChange={handleInputChange}
        inputProps={{ maxLength: 6 }}
        className="w-full max-w-xs"
      />
      <p className="mt-2">
        A message with a verification code has been sent to your email. Enter
        the code to continue.
      </p>
      <Button variant="contained" onClick={handleSubmit} className="mt-4">
        Submit
      </Button>
    </div>
  );
};

export default TwoFactorAuthentication;
