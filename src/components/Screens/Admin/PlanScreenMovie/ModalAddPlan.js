import React, { useState, useEffect } from "react";
import { FormControl } from "@mui/base/FormControl";
import { Button, Box, Autocomplete, TextField } from "@mui/material";
import {
  TriggerButton,
  StyledInput,
  Label,
  HelperText,
  Modal,
  StyledBackdrop,
  ModalContent,
} from "./style";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { handleCreatePlan } from "./config";
import { handleGetListMoviesTitleAndCode } from "../../Admin/Movie/config";
import { handleGetListRoomCode } from "../../Admin/Room/config";
import { toast } from "react-toastify";

export default function ModalAddPlan({ isOpen, handleOpen, handleClose }) {
  const [roomCode, setRoomCode] = useState(0);
  const [movieCode, setMovieCode] = useState(0);
  const [dateScreen, setDateScreen] = useState(dayjs());
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [listMovies, setListMovies] = useState([]);
  const [listRooms, setListRooms] = useState([]);

  const handleFetchMovies = async () => {
    const response = await handleGetListMoviesTitleAndCode();
    setListMovies(response.movies);
  };

  useEffect(() => {
    handleFetchMovies();
  }, []);

  const handleFetchRooms = async () => {
    const response = await handleGetListRoomCode();
    setListRooms(response.roomCodes);
  };

  useEffect(() => {
    handleFetchRooms();
  }, []);

  const handleAddPlan = async () => {
    handleCreatePlan(
      roomCode,
      movieCode,
      dateScreen.format("YYYY-MM-DD"),
      startTime?.format("HH:mm:ss"),
      endTime?.format("HH:mm:ss")
    );
    toast.success("Create plan successfully");
    handleClose();
  };

  return (
    <div>
      <TriggerButton
        type="button"
        onClick={handleOpen}
        sx={{
          borderRadius: "40px",
          backgroundColor: "#dc1313f0",
          textTransform: "none",
          color: "white",
          border: "none",
        }}
      >
        Tạo lịch chiếu mới
      </TriggerButton>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={isOpen}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent
          sx={{
            width: 450,
          }}
        >
          <h1
            id="unstyled-modal-title"
            className="modal-title"
            style={{ fontSize: 20, fontWeight: "bold" }}
          >
            Tạo lịch chiếu mới
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl required sx={{ flex: 2 }}>
              <Label>Tên Phim</Label>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={listMovies}
                getOptionLabel={(option) => option.title}
                onChange={(e, value) => {
                  // setMovieTitle(value ? value.title : "");
                  setMovieCode(value ? value.movieCode : "");
                }}
                sx={{ width: "400px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Chọn phim" />
                )}
              />
            </FormControl>
            <FormControl required>
              <Label>Mã phòng chiếu</Label>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={listRooms}
                getOptionLabel={(option) => option.roomCode}
                onChange={(e, value) => {
                  setRoomCode(value ? value.roomCode : "");
                }}
                sx={{ width: "400px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Chọn mã phòng" />
                )}
              />
              <HelperText />
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex-row">
                <DemoContainer
                  components={["DatePicker", "DatePicker"]}
                  sx={{ marginBottom: "12px", marginTop: "12px" }}
                >
                  <DatePicker
                    label="Ngày chiếu"
                    value={dateScreen}
                    onChange={(newValue) => setDateScreen(newValue)}
                  />
                </DemoContainer>
              </div>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex-row">
                <Box display={"flex"} gap={"20px"}>
                  <DemoContainer
                    components={["TimeField", "TimeField", "TimeField"]}
                    sx={{ marginBottom: "12px" }}
                  >
                    <TimeField
                      label="Giờ chiếu"
                      defaultValue={startTime}
                      format="HH:mm:ss"
                      onChange={(newValue) => setStartTime(newValue)}
                    />
                  </DemoContainer>
                  <DemoContainer
                    components={["TimeField", "TimeField", "TimeField"]}
                  >
                    <TimeField
                      label="Giờ kết"
                      defaultValue={endTime}
                      format="HH:mm:ss"
                      onChange={(newValue) => setEndTime(newValue)}
                    />
                  </DemoContainer>
                </Box>
              </div>
            </LocalizationProvider>
          </div>

          <Button
            sx={{
              borderRadius: "40px",
              backgroundColor: "#dc1313f0",
              textTransform: "none",
              marginTop: "15px",
              marginBottom: "15px",
            }}
            variant="contained"
            href="#outlined-buttons"
            onClick={handleAddPlan}
          >
            Tạo mới
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
