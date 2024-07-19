import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function MovieDetail() {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: "60%",
        height: "fit-content",
        flexGrow: 1,
        bgcolor: "transparent",
        boxShadow: "none",
        color: "white",

        // backgroundColor: (theme) =>
        //   theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={4}>
        <Grid item>
          <Img
            alt="complex"
            src="https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2F0017682_0.jpg&w=1920&q=75"
            sx={{ borderRadius: "10px", height: "40vh" }}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <div styles={{ color: "white" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold", marginBottom: "15px" }}
                >
                  KẺ TRỘM MẶT TRĂNG-P (Lồng Tiếng)
                  <Chip
                    label="2D"
                    size="medium"
                    sx={{
                      marginLeft: "20px",
                      bgcolor: "transparent",
                      color: "white",
                      border: "1px solid white",
                      borderRadius: "10px",
                    }}
                  />
                </Typography>

                <Typography variant="body2" gutterBottom>
                  Hài, Hoạt hình, Phiêu lưu - Mỹ - 94 phút
                  <br />
                  Khởi chiếu: 05/07/2024
                  <br />
                  <br />
                  Gru phải đối mặt với kẻ thù mới là Maxime Le Mal và Valentina
                  đang lên kế hoạch trả thù anh, buộc gia đình anh phải lẩn trốn
                  đi nơi khác. Bên cạnh việc đấu tranh bảo vệ gia đình, Gru đồng
                  thời còn phải tìm ra điểm chung với thành viên mới nhất trong
                  nhà đó là Gru Jr.
                </Typography>
              </div>

              <Typography variant="body2" color="red">
                <br />
                Khuyến cáo: P - PHIM ĐƯỢC PHÉP PHỔ BIẾN ĐẾN NGƯỜI XEM Ở MỌI ĐỘ
                TUỔI.
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  marginTop: "20px",
                  borderRadius: "20px",
                  color: "orange",
                  borderColor: "orange",
                }}
              >
                Xem trailer
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
