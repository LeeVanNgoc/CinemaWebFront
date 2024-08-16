import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ChangeSeats from "../Seat/ChangeSeats";
import { clearSeats } from "../Seat/redux/actions/seatActions";
import { useDispatch } from "react-redux";

export default function ModalScreenSeat({ isOpen, roomCode, handleClose }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (roomCode) {
      console.log("Check roomCode from Modal screen seat: ", roomCode);
    }
  }, [roomCode]);

  const handleCloseModal = () => {
    handleClose();
    dispatch(clearSeats());
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        maxWidth="xl"
      >
        <DialogTitle id="modal-title">Quản lý ghế phòng {roomCode}</DialogTitle>
        <DialogContent>
          <ChangeSeats roomCode={roomCode} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseModal()} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
