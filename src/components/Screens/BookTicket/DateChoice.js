import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import TimeChoice from "./TimeChoice";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedSeats, setDate } from "./redux/actions/bookingAction";
import "./scss/DateChoice.scss";

export default function DateChoice() {
  const dispatch = useDispatch();

  const today = new Date();
  const getNextDay = (current) => {
    const nextDay = new Date(current);
    nextDay.setDate(current.getDate() + 1);
    return nextDay;
  };

  const tomorrow = getNextDay(today);
  const nextTomorrow = getNextDay(tomorrow);

  const handleClearSelectedSeats = () => {
    dispatch(clearSelectedSeats());
  };

  const handlesetDate = (date) => {
    dispatch(setDate(date));
    handleClearSelectedSeats();
  };

  return (
    <Tabs
      aria-label="Basic tabs"
      defaultValue={0}
      sx={{
        marginTop: 10,
        backgroundColor: "transparent",
        color: "#fff",
        alignItems: "center",
      }}
    >
      <div>
        <TabList>
          <div
            onClick={() =>
              handlesetDate(`${today.toLocaleDateString("vi-VN")}`)
            }
          >
            <Tab>{today.toLocaleDateString("vi-VN")}</Tab>
          </div>
          <div
            onClick={() =>
              handlesetDate(`${tomorrow.toLocaleDateString("vi-VN")}`)
            }
          >
            <Tab>{tomorrow.toLocaleDateString("vi-VN")}</Tab>
          </div>
          <div
            onClick={() =>
              handlesetDate(`${nextTomorrow.toLocaleDateString("vi-VN")}`)
            }
          >
            <Tab>{nextTomorrow.toLocaleDateString("vi-VN")}</Tab>
          </div>
        </TabList>
      </div>
      <TabPanel value={0} sx={{ color: "#fff", textAlign: "center" }}>
        <TimeChoice />
      </TabPanel>
      <TabPanel value={1} sx={{ color: "#fff", textAlign: "center" }}>
        <b>Second</b> tab panel
        <TimeChoice />
      </TabPanel>
      <TabPanel value={2} sx={{ color: "#fff", textAlign: "center" }}>
        <b>Third</b> tab panel
        <TimeChoice />
      </TabPanel>
    </Tabs>
  );
}
