import * as React from "react";
import { Tabs } from "@mui/base/Tabs";
import { Tab, TabPanel, TabsList } from "./style";
import "./AdminNavBar.scss";
import { Tickets } from "../../Screens/Admin/Tickets/Tickets";
import { Users } from "../../Screens/Admin/Users/Users";
import { Theaters } from "../../Screens/Admin/Theater/Theaters";
import { Prices } from "../../Screens/Admin/Price/Price";
import { Plans } from "../../Screens/Admin/PlanScreenMovie/Plans";
import { Movies } from "../../Screens/Admin/Movies/Movies";
import { Rooms } from "../../Screens/Admin/Room/Room";
import { Trailers } from "../../Screens/Admin/Trailer/Trailer";
import { Post } from "../../Screens/Admin/Post/Post";

export default function AdminNavBar() {
  return (
    <div className="admin-nav">
      <Tabs defaultValue={0}>
        <TabsList>
          <Tab value={0}>Người dùng</Tab>
          <Tab value={1}>Quản lý phim</Tab>
          <Tab value={2}>Quản lý vé</Tab>
          <Tab value={3}>Rạp chiếu</Tab>
          <Tab value={4}>Giá vé</Tab>
          <Tab value={5}>Phòng</Tab>
          <Tab value={6}>Trailer</Tab>
          <Tab value={7}>Lịch chiếu</Tab>
          <Tab value={8}>Tin tức</Tab>
          <Tab value={9}>Khuyến mãi</Tab>
          <Tab value={10}>Vé ghế?</Tab>
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
          <Theaters />
        </TabPanel>

        <TabPanel value={4}>
          <Prices />
        </TabPanel>

        <TabPanel value={5}>
          <Prices />
        </TabPanel>

        <TabPanel value={6}>
          <Rooms />
        </TabPanel>

        <TabPanel value={7}>
          <Trailers />
        </TabPanel>

        <TabPanel value={8}>
          <Plans />
        </TabPanel>

        <TabPanel value={9}>
          <Post />
        </TabPanel>

        <TabPanel value={10}></TabPanel>

        <TabPanel value={11}></TabPanel>
      </Tabs>
    </div>
  );
}
