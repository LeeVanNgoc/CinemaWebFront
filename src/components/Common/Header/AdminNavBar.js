import * as React from "react";
import { Tabs } from "@mui/base/Tabs";
import { Tab, TabPanel, TabsList } from "./style";
import "./AdminNavBar.scss";
import { Tickets } from "../../Screens/Admin/Tickets/Tickets";
import { Users } from "../../Screens/Admin/Users/Users";
import { Movies } from "../../Screens/Admin/Movies/Movies";

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
          <Tab value={5}>Thể loại</Tab>
        </TabsList>
        <TabPanel value={0}>
          <Users />
        </TabPanel>
        <TabPanel value={1}>
          <Movies />
        </TabPanel>
        <TabPanel value={2}>
          <Tickets />
        </TabPanel>
        <TabPanel value={3}>
          <Tickets />
        </TabPanel>
        <TabPanel value={4}>
          <Tickets />
        </TabPanel>
        <TabPanel value={5}>
          <Tickets />
        </TabPanel>
      </Tabs>
    </div>
  );
}
