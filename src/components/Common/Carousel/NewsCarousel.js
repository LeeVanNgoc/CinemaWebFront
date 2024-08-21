import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Card, CardMedia, Stack } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import {
    getPosts,
    setSelectedPost,
  } from "../../Screens/Admin/Post/redux/actions/postActions";

function NewsCarousel() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.managePosts.posts.posts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const limitedPosts = posts.slice(0, 8);

    const groupedPosts = [];
    for (let i = 0; i < limitedPosts.length; i += 4) {
        groupedPosts.push(limitedPosts.slice(i, i + 4));
    }

    return (
        <Carousel navButtonsAlwaysInvisible={true}>
            {groupedPosts.map((group, i) => (
                <Stack 
                key={i} 
                spacing={3}
                >
                    {group.map((post, j) => (
                        <Item key={j} post={post} />
                    ))}
                </Stack>
            ))}
        </Carousel>
    );
}

function Item({ post }) {
    const dispatch = useDispatch();

    const handleClick = (post) => {
        dispatch(setSelectedPost(post));
        window.open(post.link, "_blank");
    };

    return (
        <Card className="news-card" sx={{ backgroundColor: "transparent", borderRadius: "15px" }}>
            <CardMedia
                component="img"
                height="140"
                image={post.image}
                sx={{ objectFit: 'cover' }}
                onClick={() => handleClick(post)}
            />
        </Card>
    );
}

export default NewsCarousel;