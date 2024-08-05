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
import { handleEditPlan } from "./config";
import { useSelector } from "react-redux";

export default function ModalEditPlan({ isOpen, handleOpen, handleClose }) {
  const plan = useSelector((state) => state.managePlans.selectedPlan);

  const [roomId, setRoomId] = useState(plan.roomId);
  const [movieId, setMovieId] = useState(plan.movieId);
  const [dateScreen, setDateScreen] = useState(plan.dateScreen);
  const [startTime, setStartTime] = useState(plan.startTime);
  const [endTime, setEndTime] = useState(plan.endTime);

  const handleUpdatePlan = async () => {
    await handleEditPlan(
      plan.planScreenMovieId,
      roomId,
      movieId,
      dateScreen,
      endTime,
      startTime
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

            <FormControl
              defaultValue={plan.dateScreen}
              required
              sx={{ flex: 1 }}
            >
              <Label>Ngày chiếu</Label>
              <StyledInput onChange={(e) => setDateScreen(e.target.value)} />
              <HelperText />
            </FormControl>

            <FormControl
              defaultValue={plan.startTime}
              required
              sx={{ flex: 1 }}
            >
              <Label>Thời gian bắt đầu</Label>
              <StyledInput onChange={(e) => setStartTime(e.target.value)} />
              <HelperText />
            </FormControl>

            <FormControl defaultValue={plan.endTime} required sx={{ flex: 1 }}>
              <Label>Thời gian kết thúc</Label>
              <StyledInput onChange={(e) => setEndTime(e.target.value)} />
              <HelperText />
            </FormControl>
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
