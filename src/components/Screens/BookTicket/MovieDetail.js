import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function MovieDetail() {
  const movie = useSelector((state) => state.manageMovies.selectedMovie);

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        marginTop: "50px",
        maxWidth: "60%",
        height: "fit-content",
        flexGrow: 1,
        bgcolor: "transparent",
        boxShadow: "none",
        color: "white",
      }}
    >
      <Grid container spacing={4}>
        <Grid item>
          <Img
            alt="complex"
            src={movie.image}
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
                  {movie.title}
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
                  Hài, Hoạt hình, Phiêu lưu - {movie.country} - {movie.duration}{" "}
                  phút
                  <br />
                  Khởi chiếu: {movie.releaseDate.split("T")[0]}
                  <br />
                  <br />
                  {movie.description}
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
