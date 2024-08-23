import React, { useEffect, useState } from "react";
import { RadioGroup, Radio, FormControlLabel, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setBank } from "./redux/actions/bookingAction";

export const BankRadioButton = () => {
  const [selectedOption, setSelectedOption] = useState("MoMo");
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
            value="MoMo"
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
                  src={require("./assets/momo-logo.png")}
                  alt="MoMo"
                  width={24}
                  height={24}
                />
                MoMo
              </Box>
            }
          />
          <FormControlLabel
            value="ZaloPay"
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
                  src={require("./assets/ZaloPay_logo.png")}
                  alt="ZaloPay"
                  width={24}
                  height={24}
                />
                ZaloPay
              </Box>
            }
          />
          <FormControlLabel
            value="Cards"
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
                  src={require("./assets/debitcard.png")}
                  alt="Cards"
                  width={24}
                  height={24}
                />
                Cards
              </Box>
            }
          />
        </RadioGroup>
      </Box>
    </>
  );
};
