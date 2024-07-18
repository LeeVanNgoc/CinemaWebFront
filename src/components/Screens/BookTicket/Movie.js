import * as React from "react";
import Button from "@mui/material/Button";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Grid,
  Box,
} from "@mui/material";

const Movie = () => {
  return (
    <>
      <div className="detail">
        <Card
          sx={{
            maxWidth: "800px",
            height: "300px",
            bgcolor: "transparent",
            color: "white",
            margin: "10px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <CardMedia
            component="img"
            image="https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2F0017594_0.jpg&w=256&q=75"
            alt="Movie Poster"
            sx={{ height: "100%", width: "auto" }}
          />
          <CardContent>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginBottom: 2 }}
            >
              <Typography gutterBottom variant="h6" component="div">
                KẺ TRỘM MẶT TRĂNG-P (Lồng Tiếng)
              </Typography>
              <Chip
                label="2D"
                size="small"
                sx={{ bgcolor: "grey.700", color: "white" }}
              />
              <Typography variant="caption" color="grey.500">
                Hài, Hoạt hình, Phiêu lưu - Mỹ - 94 phút
              </Typography>
            </Grid>
            <Typography variant="body2" color="white">
              Khởi chiếu: 05/07/2024
            </Typography>
            <Typography variant="body2" color="red">
              P - PHIM ĐƯỢC PHÉP PHỔ BIẾN ĐẾN NGƯỜI XEM Ở MỌI ĐỘ TUỔI.
            </Typography>

            <Button
              variant="outlined"
              size="small"
              sx={{ marginTop: "20px", borderRadius: "20px" }}
            >
              Xem trailer
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Movie;
