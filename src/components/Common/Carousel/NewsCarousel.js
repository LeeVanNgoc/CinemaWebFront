import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Card, CardMedia, Stack } from '@mui/material';

const items = [
    [
        { imageUrl: "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FThumbs%2F0017339.png&w=256&q=75" },
        { imageUrl: "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FThumbs%2F0012808.jpeg&w=256&q=75" },
        { imageUrl: "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FThumbs%2F0017333.png&w=256&q=75" }
    ],
    [
        { imageUrl: "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FThumbs%2F0017735.jpg&w=256&q=75" },
        { imageUrl: "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FThumbs%2F0013153.png&w=256&q=75" },
        { imageUrl: "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FThumbs%2F0012851.jpeg&w=256&q=75" },
    ]
];


function NewsCarousel() {
    return (
        <Carousel navButtonsAlwaysInvisible={true}>
            {items.map((group, i) => (
                <Stack 
                key={i} 
                spacing={3}
                >
                    {group.map((item, j) => (
                        <Item key={j} item={item} />
                    ))}
                </Stack>
            ))}
        </Carousel>
    );
}

function Item(props) {
    return (
        <Card className="news-card" sx={{ backgroundColor: "transparent", borderRadius: "15px" }}>
            <CardMedia
                component="img"
                height="140"
                image={props.item.imageUrl}
                sx={{ objectFit: 'cover' }}
            />
        </Card>
    );
}

export default NewsCarousel;