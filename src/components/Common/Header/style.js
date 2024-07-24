import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { styled } from "@mui/system";

export const red = {
  200: "#d26767",
  400: "#d26767",
  600: "#941010",
};

export const grey = {
  200: "#DAE2ED",
  700: "#434D5B",
  900: "#323437",
};

export const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${red[400]};
  }

  &:focus {
    color: #fff;
  }

  &.${tabClasses.selected} {
    background-color: #f9ebeb;
    color: ${red[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    padding: 20px 12px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    border-radius: none;
    opacity: 0.6;
    `
);

export const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
    min-width: 400px;
    background-color: ${grey[900]};
    border-radius: none;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    `
);
