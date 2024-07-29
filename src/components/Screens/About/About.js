import * as React from 'react';
import {
  Tab,
  Box,
} from "@mui/material";
import { 
  TabList,
  TabPanel,
  TabContext,
}from '@mui/lab';
import "./About.scss";
import Introduction from './Introduction';
import Services from './Services';
import Rooms from './Rooms';

export default function About() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="info-container">
      <div className="section-name">
        <span>Giới thiệu</span>
      </div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList 
              onChange={handleChange}
              centered
            >
              <Tab label="Giới thiệu" value="1" />
              <Tab label="Dịch vụ" value="2" />
              <Tab label="Phòng chiếu" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1"><Introduction /></TabPanel>
          <TabPanel value="2"><Services /></TabPanel>
          <TabPanel value="3"><Rooms /></TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}