import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedNews } from "../Admin/News/redux/actions/newsActions";
import "./NewsCard.scss";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";

export default function NewsCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const news = useSelector((state) => state.manageNews.news.news);

  const handleClick = (post) => {
    dispatch(setSelectedNews(post));
    navigate("/");
  };

  return (
    <Grid container spacing={2}>
      {news &&
        news.map((post, index) => (
          <Grid item xs={12} md={6} lg={6} key={index}>
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
                cursor: "pointer",
                textAlign: "left",
              }}
              onClick={() => handleClick(post)}
            >
              <CardMedia
                component="img"
                image={post.image}
                alt="Movie Poster"
                sx={{ height: "100%", width: "auto" }}
              />
              <CardContent>
                  <Typography variant="caption" color="grey.500">
                    {post.postDate}
                  </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {post.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};