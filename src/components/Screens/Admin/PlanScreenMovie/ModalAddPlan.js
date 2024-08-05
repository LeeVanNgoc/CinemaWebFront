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
import { handleCreatePlan } from "./config";

export default function ModalAddPlan({ isOpen, handleOpen, handleClose }) {
  const [roomId, setRoomId] = useState(0);
  const [movieId, setMovieId] = useState(0);
  const [dateScreen, setDateScreen] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [space, setSpace] = useState("");

  const handleAddPlan = async () => {
    handleCreatePlan(roomId, movieId, dateScreen, startTime, endTime, space);
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
            <FormControl defaultValue="" required>
              <Label>Ngày chiếu</Label>
              <StyledInput
                // placeholder="Mật khẩu"
                onChange={(e) => setDateScreen(e.target.value)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Thời gian bắt đầu</Label>
              <StyledInput
                // placeholder="Mật khẩu"
                onChange={(e) => setStartTime(e.target.value)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Thời gian kết thúc</Label>
              <StyledInput
                // placeholder="Mật khẩu"
                onChange={(e) => setEndTime(e.target.value)}
              />
              <HelperText />
            </FormControl>
            <FormControl defaultValue="" required>
              <Label>Số ghế</Label>
              <StyledInput
                // placeholder="Mật khẩu"
                onChange={(e) => setSpace(e.target.value)}
              />
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
