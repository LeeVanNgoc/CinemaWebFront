import React, { useEffect, useState } from "react";
import { RadioGroup, Radio, FormControlLabel, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setBank } from "./redux/actions/bookingAction";

export const BankRadioButton = () => {
  const [selectedOption, setSelectedOption] = useState("Vietcombank");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBank(selectedOption));
  }, [dispatch, selectedOption]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <RadioGroup
          value={selectedOption}
          onChange={(event) => setSelectedOption(event.target.value)}
        >
          <FormControlLabel
            value="Vietcombank"
            control={<Radio />}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img
                  src="https://admin.tamlyvietphap.vn/uploaded/Images/Original/2020/10/16/logo_vietcombank_1610091313.jpg"
                  alt="Vietcombank"
                  width={24}
                  height={24}
                />
                Vietcombank
              </Box>
            }
          />
          <FormControlLabel
            value="MB Bank"
            control={<Radio />}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img
                  src="https://brandlogos.net/wp-content/uploads/2021/10/mb-bank-logo.png"
                  alt="MB Bank"
                  width={24}
                  height={24}
                />
                MB Bank
              </Box>
            }
          />
          <FormControlLabel
            value="Vietin Bank"
            control={<Radio />}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img
                  src="https://pluspng.com/img-png/logo-vietinbank-png-t-p-tin-logo-c-a-vietinbank-png-400.png"
                  alt="Vietin Bank"
                  width={24}
                  height={24}
                />
                Vietin Bank
              </Box>
            }
          />
          <FormControlLabel
            value="BIDV"
            control={<Radio />}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img
                  src="https://1000logos.net/wp-content/uploads/2022/09/BIDV-logo.png"
                  alt="BIDV"
                  width={24}
                  height={24}
                />
                BIDV
              </Box>
            }
          />
        </RadioGroup>
      </Box>
    </>
  );
};
