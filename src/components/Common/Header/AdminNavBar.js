import * as React from "react";
import { Tabs } from "@mui/base/Tabs";
import { Tab, TabPanel, TabsList } from "./style";
import "./AdminNavBar.scss";
import { Tickets } from "../../Screens/Admin/Tickets/Tickets";
import { Users } from "../../Screens/Admin/Users/Users";
import { Theaters } from "../../Screens/Admin/Theater/Theaters";
import { Seats } from "../../Screens/Admin/Seat/Seat";

export default function AdminNavBar() {
  return (
    <div className="admin-nav">
      <Tabs defaultValue={0}>
        <TabsList>
          <Tab value={0}>Người dùng</Tab>
          <Tab value={1}>Quản lý phim</Tab>
          <Tab value={2}>Quản lý vé</Tab>
          <Tab value={3}>Rạp chiếu</Tab>
          <Tab value={4}>Quản lý ghế</Tab>
          <Tab value={5}>Giá vé</Tab>
          <Tab value={6}>Phòng</Tab>
          <Tab value={7}>Trailer</Tab>
          <Tab value={8}>Lịch chiếu</Tab>
          <Tab value={9}>Tin tức</Tab>
          <Tab value={10}>Khuyến mãi</Tab>
          <Tab value={11}>Vé ghế?</Tab>
        </TabsList>
        <TabPanel value={0}>
          <Users />
        </TabPanel>
        <TabPanel value={1}>
          <Tickets />
        </TabPanel>
        <TabPanel value={2}>
          <Tickets />
        </TabPanel>
        <TabPanel value={3}>
          <Theaters />
        </TabPanel>
        <TabPanel value={4}>
          <Seats />
        </TabPanel>
        <TabPanel value={5}>
          <Tickets />
        </TabPanel>
        <TabPanel value={6}>
          <Tickets />
        </TabPanel>
        <TabPanel value={7}>
          <Tickets />
        </TabPanel>
        <TabPanel value={8}>
          <Tickets />
        </TabPanel>
        <TabPanel value={9}>
          <Tickets />
        </TabPanel>
        <TabPanel value={10}>
          <Tickets />
        </TabPanel>
        <TabPanel value={11}>
          <Tickets />
        </TabPanel>
      </Tabs>
    </div>
  );
}
