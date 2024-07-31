import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./MovieCard.scss";

export default function MovieCard() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/bookticket");
  };

  return (
    <div>
      <Card
        className="image-card"
        sx={{ width: 205, backgroundColor: "transparent", color: "white" }}
        onClick={() => handleClick()}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image="https://chieuphimquocgia.com.vn/_next/image?url=https%3A%2F%2Fapi.chieuphimquocgia.com.vn%2FContent%2FImages%2F0017682_0.jpg&w=256&q=75"
            alt="green iguana"
            sx={{ borderRadius: "20px" }}
          />
          <CardContent>
            <Typography variant="body2" color="grey">
              Hài, Hoạt hình, Phiêu lưu
            </Typography>
            <Typography variant="body2" color="grey">
              05/07/2024
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              KẺ TRỘM MẶT TRĂNG-P (Lồng Tiếng)
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
