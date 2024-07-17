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

const ShowtimesCard = () => {
  return (
    <>
      <Card
        sx={{
          maxHeight: "fit-content",
          height: "300px",
          bgcolor: "grey.900",
          color: "white",
          margin: "10px",
          display: "flex",
          flexDirection: "row",
          border: "1px solid gray",
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
            <Typography variant="caption" color="grey.500">
              Hài, Hoạt hình, Phiêu lưu - 94 phút
            </Typography>
            <Chip
              label="2D"
              size="small"
              sx={{ bgcolor: "grey.700", color: "white" }}
            />
          </Grid>
          <Typography gutterBottom variant="h6" component="div">
            KẺ TRỘM MẶT TRĂNG-P (Lồng Tiếng)
          </Typography>
          <Typography variant="body2" color="white">
            Xuất xứ: Mỹ
          </Typography>
          <Typography variant="body2" color="white">
            Khởi chiếu: 05/07/2024
          </Typography>
          <Typography variant="body2" color="red">
            P - PHIM ĐƯỢC PHÉP PHỔ BIẾN ĐẾN NGƯỜI XEM Ở MỌI ĐỘ TUỔI.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              mt: 2,
              gap: 1,
              justifyContent: "center",
            }}
          >
            {["15:00", "18:20", "19:30", "20:00"].map((time, index) => (
              <Button
                key={index}
                variant="contained"
                size="small"
                sx={{ bgcolor: "grey.700", width: "60px" }}
              >
                {time}
              </Button>
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ShowtimesCard;
