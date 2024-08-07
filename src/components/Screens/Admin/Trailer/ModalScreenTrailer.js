import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TriggerButton, Modal, StyledBackdrop, ModalContent } from "./style";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { handleGetTitleMovieByMovieId } from "./config";
export default function ModalScreenTrailer({
  isOpen,
  handleOpen,
  handleClose,
  link,
  movieId,
}) {
  const [movieTitle, setMovieTitle] = useState("");
  const [trailerLink, setTrailerLink] = useState(link);

  function convertToEmbedUrl(youtubeUrl) {
    // Kiểm tra nếu youtubeUrl là undefined hoặc không phải là chuỗi
    if (typeof youtubeUrl !== "string") {
      console.error("URL không hợp lệ");
      return "";
    }

    console.log(youtubeUrl);

    let videoId = "";

    // Kiểm tra xem URL có phải dạng "https://www.youtube.com/watch?v=..."
    if (youtubeUrl.includes("watch?v=")) {
      videoId = youtubeUrl.split("watch?v=")[1].split("&")[0];
    }

    // Kiểm tra xem URL có phải dạng "https://youtu.be/..."
    else if (youtubeUrl.includes("youtu.be/")) {
      videoId = youtubeUrl.split("youtu.be/")[1];
    }

    // Nếu không tìm thấy videoId, cảnh báo và trả về chuỗi rỗng
    if (!videoId) {
      console.error("Không thể tìm thấy video ID trong URL");
      return "";
    }

    // Tạo URL nhúng
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return embedUrl;
  }
  // useEffect(() => {
  //   const handleGetMovieTitle = async () => {
  //     const fetchMovieTitle = await handleGetTitleMovieByMovieId(movieId);
  //     setMovieTitle(fetchMovieTitle);
  //     handleClose();
  //   };
  //   handleGetMovieTitle();
  // }, [movieId]);

  useEffect(() => {
    setTrailerLink(convertToEmbedUrl(link));
  });

  const handleCloseTrailer = () => {
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
        Xem Trailer
      </TriggerButton>

      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={isOpen}
        onClose={handleCloseTrailer}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent
          sx={{
            width: "fit-content",
          }}
        >
          <div>
            <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <DialogTitle>Trailer</DialogTitle>
                <DialogActions>
                  <IconButton
                    onClick={handleCloseTrailer}
                    sx={{ color: "black", marginRight: "10px" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogActions>
              </div>
              <DialogContent>
                <iframe
                  width="100%"
                  height="400px"
                  src={trailerLink}
                  title="Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </DialogContent>
            </Dialog>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
