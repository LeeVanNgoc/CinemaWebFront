import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  getPosts,
  setSelectedPost,
} from "../Admin/Post/redux/actions/postActions";
import "./NewsCard.scss";

export default function NewsCard() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.managePosts.posts.posts);

  const handleClick = (post) => {
    dispatch(setSelectedPost(post));
    window.open(post.link, "_blank");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(getPosts());
    };

    fetchPosts();
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      {posts &&
        posts
          .map((post, index) => (
            <Grid item xs={9.5} sm={6} md={4} lg={3} key={index}>
              <Card
                className="image-card"
                sx={{
                    width: "auto",
                    height: "auto",
                    backgroundColor: "transparent",
                    color: "white",
                }}
                onClick={() => handleClick(post)}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={post.image}
                    alt={post.title}
                    sx={{ borderRadius: "20px", height: "180px" }}
                  />
                  <CardContent>
                    <Typography textAlign={'left'} gutterBottom variant="h6" component="div">
                      {post.title}
                    </Typography>
                    <Typography textAlign={'left'} variant="body2" color="grey">
                      {post.postDate.split("T")[0]}
                    </Typography>
                  </CardContent>
                  <Typography textAlign={'left'} gutterBottom variant="body2" component="div">
                      {post.content}
                    </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
    </Grid>
  );
}
