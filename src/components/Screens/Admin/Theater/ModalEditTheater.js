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
import { handleEditTheater } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { setRender } from "../../../../redux/renderAction";

export default function ModalEditTheater({ isOpen, handleOpen, handleClose }) {
  const dispatch = useDispatch();

  const theater = useSelector((state) => state.manageTheaters.selectedTheater);

  const [name, setName] = useState(theater.name);
  const [address, setAddress] = useState(theater.address);
  const [city, setCity] = useState(theater.city);

  const handleUpdateTheater = async () => {
    await handleEditTheater(theater.theaterCode, name, address, city);
    dispatch(setRender(true));
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
            Cập nhật rạp
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl defaultValue={theater.theaterCode} aria-readonly>
              <Label>Mã rạp</Label>
              <StyledInput readOnly />
              <HelperText />
            </FormControl>

            <FormControl defaultValue={theater.name} required sx={{ flex: 1 }}>
              <Label>Tên rạp</Label>
              <StyledInput onChange={(e) => setName(e.target.value)} />
              <HelperText />
            </FormControl>

            <FormControl
              defaultValue={theater.address}
              required
              sx={{ flex: 1 }}
            >
              <Label>Địa chỉ</Label>
              <StyledInput onChange={(e) => setAddress(e.target.value)} />
              <HelperText />
            </FormControl>

            <FormControl defaultValue={theater.city} required sx={{ flex: 1 }}>
              <Label>Thành phố</Label>
              <StyledInput readOnly />
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
            onClick={handleUpdateTheater}
          >
            Sửa
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
