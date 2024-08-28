import * as React from "react";
import { Tabs } from "@mui/base/Tabs";
import { Tab, TabPanel, TabsList } from "./style";
import { Tickets } from "../../Screens/Admin/Tickets/Tickets";
import { Users } from "../../Screens/Admin/Users/Users";
import { Theaters } from "../../Screens/Admin/Theater/Theaters";
import { Prices } from "../../Screens/Admin/Price/Price";
import { Plans } from "../../Screens/Admin/PlanScreenMovie/Plans";
import { Movie } from "../../Screens/Admin/Movie/Movie";
import { Rooms } from "../../Screens/Admin/Room/Room";
import { Trailers } from "../../Screens/Admin/Trailer/Trailer";
import { Post } from "../../Screens/Admin/Post/Post";

export default function AdminNavBar() {
  return (
    <div className="flex justify-around w-full">
      <Tabs defaultValue={0}>
        <TabsList>
          <Tab value={0}>Rạp chiếu</Tab>
          <Tab value={1}>Phòng</Tab>
          <Tab value={2}>Người dùng</Tab>
          <Tab value={3}>Quản lý phim</Tab>
          <Tab value={4}>Trailer</Tab>
          <Tab value={5}>Lịch chiếu</Tab>
          <Tab value={6}>Quản lý vé</Tab>
          <Tab value={7}>Giá vé</Tab>
          <Tab value={8}>Tin tức</Tab>
          {/* <Tab value={9}>Khuyến mãi</Tab> */}
        </TabsList>
        <TabPanel value={0}>
          <Theaters />
        </TabPanel>

        <TabPanel value={1}>
          <Rooms />
        </TabPanel>

        <TabPanel value={2}>
          <Users />
        </TabPanel>

        <TabPanel value={3}>
          <Movie />
        </TabPanel>

        <TabPanel value={4}>
          <Trailers />
        </TabPanel>

        <TabPanel value={5}>
          <Plans />
        </TabPanel>

        <TabPanel value={6}>
          <Tickets />
        </TabPanel>

        <TabPanel value={7}>
          <Prices />
        </TabPanel>

        <TabPanel value={8}>
          <Post />
        </TabPanel>
      </Tabs>
    </div>
  );
}
