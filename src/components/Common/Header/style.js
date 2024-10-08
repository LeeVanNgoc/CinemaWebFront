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
    // width: 80vw;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    padding: 20px 12px;
    background-color: white;
    background: ${theme.palette.mode === "dark" ? grey[900] : "white"};
    border-radius: none;
    opacity: 1;
    display: absolute;
    justify-content: center;
    justify-items: center;
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
    justify-items: center;
    `
);
