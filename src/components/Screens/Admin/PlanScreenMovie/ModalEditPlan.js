import React, { useState, useEffect } from "react";
import { FormControl } from "@mui/base/FormControl";
import { Button, Autocomplete, TextField, Box } from "@mui/material/";
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
import { handleEditPlan } from "./config";
import { handleGetListMoviesTitleAndCode } from "../../Admin/Movie/config";
import { handleGetListRoomCode } from "../../Admin/Room/config";
import { useSelector } from "react-redux";

export default function ModalEditPlan({ isOpen, handleOpen, handleClose }) {
  const plan = useSelector((state) => state.managePlans.selectedPlan);

  const [roomCode, setRoomCode] = useState(plan.roomCode);
  const [movieCode, setMovieCode] = useState();
  const [dateScreen, setDateScreen] = useState();
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState();
  const [listMovies, setListMovies] = useState([]);
  const [listRooms, setListRooms] = useState([]);
  useEffect(() => {
    setRoomCode(plan.roomCode);
    setMovieCode(plan.movieCode);
    setDateScreen(dayjs(plan.dateScreen));
    setStartTime(plan.startTime);
    setEndTime(plan.endTime);
  }, [
    plan.roomCode,
    plan.movieCode,
    plan.dateScreen,
    plan.startTime,
    plan.endTime,
  ]);

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

  const handleUpdatePlan = async () => {
    console.log(dateScreen);

    await handleEditPlan(
      plan.planScreenMovieCode,
      roomCode,
      movieCode,
      dateScreen?.format("YYYY-MM-DD"),
      startTime?.format("HH:mm:ss"),
      endTime?.format("HH:mm:ss")
    );
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
        Sửa
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
            width: "fit-content",
          }}
        >
          <h1
            className="edit-modal-title"
            style={{ fontSize: 20, fontWeight: "bold" }}
          >
            Cập nhật lịch chiếu
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box display={"flex"} gap={"20px"}>
              <FormControl value={plan.planScreenMovieCode} aria-readonly>
                <Label>Mã lịch chiếu</Label>
                <StyledInput readOnly />
                <HelperText />
              </FormControl>

              <FormControl value={roomCode || ""} required sx={{ flex: 1 }}>
                <Label>Mã phòng</Label>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={listRooms}
                  getOptionLabel={(option) => option.roomCode}
                  onChange={(e, value) => {
                    setRoomCode(value ? value.roomCode : "");
                  }}
                  sx={{ width: "250px" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Chọn mã phòng" />
                  )}
                />
                <HelperText />
              </FormControl>
            </Box>
            <FormControl required sx={{ flex: 1 }}>
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
                sx={{ width: "500px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={plan.movieTitle ? plan.movieTitle : "Movie"}
                  />
                )}
              />
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex-row mt-6">
                <Box display={"flex"} gap={"20px"}>
                  <DemoContainer
                    components={["DatePicker", "DatePicker"]}
                    sx={{ marginBottom: "24px" }}
                  >
                    <DatePicker
                      label="Ngày chiếu"
                      value={dayjs(dateScreen)}
                      onChange={(value) => setDateScreen(value)}
                    />
                  </DemoContainer>
                  <DemoContainer
                    components={["TimeField", "TimeField", "TimeField"]}
                  >
                    <TimeField
                      label="Giờ chiếu"
                      value={dayjs(startTime, "HH:mm:ss")}
                      format="HH:mm:ss"
                      onChange={(value) => setStartTime(value)}
                    />
                  </DemoContainer>
                  <DemoContainer
                    components={["TimeField", "TimeField", "TimeField"]}
                  >
                    <TimeField
                      label="Giờ kết thúc"
                      value={dayjs(endTime, "HH:mm:ss")}
                      format="HH:mm:ss"
                      onChange={(value) => setEndTime(value)}
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
            onClick={handleUpdatePlan}
          >
            Sửa
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
