import React, { useEffect, useState } from "react";
import { FormControl } from "@mui/base/FormControl";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { Seats } from "../Seat/Seat";

export default function ModalScreenSeat({
  isOpen,
  roomId,

  handleClose,
}) {
  useEffect(() => {
    if (roomId) {
      console.log("Check roomId from Modal screen seat: ", roomId);
    }
  }, [roomId]);

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        maxWidth="xl"
      >
        <DialogTitle id="modal-title">Quản lý ghế</DialogTitle>
        <DialogContent>
          <Seats roomId={roomId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
