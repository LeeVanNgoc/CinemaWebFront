import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import TimeChoice from "./TimeChoice";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedSeatsAndTime,
  setDate,
  getPlanTime,
} from "./redux/actions/bookingAction";
import "./scss/DateChoice.scss";

export default function DateChoice() {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.manageMovies.selectedMovie);

  const today = new Date();
  const getNextDay = (current) => {
    const nextDay = new Date(current);
    nextDay.setDate(current.getDate() + 1);
    return nextDay;
  };

  const tomorrow = getNextDay(today);
  const nextTomorrow = getNextDay(tomorrow);

  const handleClearSelectedSeats = () => {
    dispatch(clearSelectedSeatsAndTime());
  };

  const handlesetDate = (date) => {
    dispatch(setDate(date));
    handleClearSelectedSeats();
    dispatch(getPlanTime(date, movie.movieId));
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
          <div onClick={() => handlesetDate(today.toISOString().slice(0, 10))}>
            <Tab>{today.toLocaleDateString("vi-VN")}</Tab>
          </div>
          <div
            onClick={() => handlesetDate(tomorrow.toISOString().slice(0, 10))}
          >
            <Tab>{tomorrow.toLocaleDateString("vi-VN")}</Tab>
          </div>
          <div
            onClick={() =>
              handlesetDate(nextTomorrow.toISOString().slice(0, 10))
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
