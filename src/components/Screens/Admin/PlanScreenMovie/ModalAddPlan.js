import React, { useState } from "react";
import { FormControl } from "@mui/base/FormControl";
import Button from "@mui/material/Button";
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

export default function ModalAddPlan({ isOpen, handleOpen, handleClose }) {
  const [roomId, setRoomId] = useState(0);
  const [movieId, setMovieId] = useState(0);
  const [dateScreen, setDateScreen] = useState(dayjs());
  const [startTime, setStartTime] = useState(dayjs());
  // const [endTime, setEndTime] = useState("");

  const handleAddPlan = async () => {
    handleCreatePlan(
      roomId,
      movieId,
      dateScreen.format("YYYY-MM-DD"),
      startTime?.format("HH:mm:ss")
    );
    handleClose();
    // window.location.reload();
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
            <FormControl defaultValue="" required>
              <Label>Mã phòng chiếu</Label>
              <StyledInput
                // placeholder="RoomId"
                onChange={(e) => setRoomId(e.target.value)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Mã phim</Label>
              <StyledInput
                // placeholder="Mật khẩu"
                onChange={(e) => setMovieId(e.target.value)}
              />
              <HelperText />
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex-row mt-6">
                <DemoContainer
                  components={["DatePicker", "DatePicker"]}
                  sx={{ marginBottom: "24px" }}
                >
                  <DatePicker
                    label="Ngày chiếu"
                    value={dateScreen}
                    onChange={(newValue) => setDateScreen(newValue)}
                  />
                </DemoContainer>
                <DemoContainer
                  components={["TimeField", "TimeField", "TimeField"]}
                >
                  <TimeField
                    label="Giờ chiếu"
                    defaultValue={startTime}
                    format="HH:mm:ss"
                    onChange={(newValue) => setStartTime(newValue)}
                  />
                </DemoContainer>
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
