import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";

export const StyledInput = styled(Input)(
  ({ theme }) => `
    
      .${inputClasses.input} {
        width: 100%;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px 16px;
        border-radius: 8px;
        margin-left: 15px;
        color: white;
        background: ${theme.palette.mo === "dark" ? "#1C2025" : "transparent"};
        border: 1px solid ${
          theme.palette.mode === "dark" ? "#434D5B" : "#DAE2ED"
        };
        box-shadow: 0px 2px 2px ${
          theme.palette.mode === "dark" ? "#1C2025" : "#F3F6F9"
        };
    
        &:hover {
          border-color: "#3399FF";
        }
    
        &:focus {
          outline: 0;
          border-color: "#3399FF"};
          box-shadow: 0 0 0 3px ${
            theme.palette.mode === "dark" ? "#0072E5" : "#99CCFF"
          };
        }
      }
    `
);
