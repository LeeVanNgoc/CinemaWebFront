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
import { useSelector } from "react-redux";

export default function ModalEditPlan({ isOpen, handleOpen, handleClose }) {
  const plan = useSelector((state) => state.managePlans.selectedPlan);

  const [roomCode, setRoomCode] = useState(plan.roomCode);
  const [movieCode, setMovieCode] = useState(plan.movieCode);
  const [dateScreen, setDateScreen] = useState(plan.dateScreen);
  const [startTime, setStartTime] = useState(dayjs(plan.startTime));
  // const [endTime, setEndTime] = useState(plan.endTime);
  const [listMovies, setListMovies] = useState([]);

  const handleFetchMovies = async () => {
    const response = await handleGetListMoviesTitleAndCode();
    setListMovies(response.movies);
  };

  useEffect(() => {
    handleFetchMovies();
  }, []);

  const handleUpdatePlan = async () => {
    await handleEditPlan(
      plan.planScreenMovieCode,
      roomCode,
      movieCode,
      dateScreen.format("YYYY-MM-DD"),
      startTime?.format("HH:mm:ss")
    );
    handleClose();
  };

  const handleChange = (e) => {
    console.log("New roomCode:", e.target.value);
    setRoomCode(e.target.value);
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
              <FormControl
                defaultValue={plan.planScreenMovieCode}
                aria-readonly
              >
                <Label>Mã lịch chiếu</Label>
                <StyledInput readOnly />
                <HelperText />
              </FormControl>

              <FormControl
                defaultValue={plan.roomCode}
                required
                sx={{ flex: 1 }}
              >
                <Label>Mã phòng</Label>
                <StyledInput onChange={(e) => handleChange} />
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
                      value={dayjs(plan.dateScreen)}
                      onChange={(newValue) => setDateScreen(newValue)}
                    />
                  </DemoContainer>
                  <DemoContainer
                    components={["TimeField", "TimeField", "TimeField"]}
                  >
                    <TimeField
                      label="Giờ chiếu"
                      defaultValue={dayjs(plan.startTime, "HH:mm:ss")}
                      format="HH:mm:ss"
                      onChange={(newValue) => setStartTime(newValue)}
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
