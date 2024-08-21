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
import { handleEditPlan } from "./config";
import { useSelector } from "react-redux";

export default function ModalEditPlan({ isOpen, handleOpen, handleClose }) {
  const plan = useSelector((state) => state.managePlans.selectedPlan);

  const [roomId, setRoomId] = useState(plan.roomId);
  const [movieId, setMovieId] = useState(plan.movieId);
  const [dateScreen, setDateScreen] = useState(plan.dateScreen);
  const [startTime, setStartTime] = useState(dayjs(plan.startTime));
  // const [endTime, setEndTime] = useState(plan.endTime);

  const handleUpdatePlan = async () => {
    await handleEditPlan(
      plan.planScreenMovieId,
      movieId,
      roomId,
      dateScreen.format("YYYY-MM-DD"),
      startTime?.format("HH:mm:ss")
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
            <FormControl defaultValue={plan.planScreenMovieId} aria-readonly>
              <Label>Mã lịch chiếu</Label>
              <StyledInput readOnly />
              <HelperText />
            </FormControl>

            <FormControl defaultValue={plan.roomId} required sx={{ flex: 1 }}>
              <Label>Mã phòng</Label>
              <StyledInput onChange={(e) => setRoomId(e.target.value)} />
              <HelperText />
            </FormControl>

            <FormControl defaultValue={plan.movieId} required sx={{ flex: 1 }}>
              <Label>Mã phim</Label>
              <StyledInput onChange={(e) => setMovieId(e.target.value)} />
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
                    value={dayjs(plan.dateScreen)}
                    onChange={(newValue) => setDateScreen(newValue)}
                  />
                </DemoContainer>
                <DemoContainer
                  components={["TimeField", "TimeField", "TimeField"]}
                >
                  <TimeField
                    label="Giờ chiếu"
                    value={dayjs(plan.startTime, "HH:mm:ss")}
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
            onClick={handleUpdatePlan}
          >
            Sửa
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
