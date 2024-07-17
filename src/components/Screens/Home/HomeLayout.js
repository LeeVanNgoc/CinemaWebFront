import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const movies = [
  {
    title: 'BÉ MA CỦA ANH-T16',
    genre: 'Hài, Tâm lý, tình cảm',
    releaseDate: '19/07/2024',
    image: 'link_to_image_1',
  },
  {
    title: 'DỰ ÁN MẬT: THẢM HOẠ TRÊN CẦU-T16',
    genre: 'Hành động',
    releaseDate: '19/07/2024',
    image: 'link_to_image_2',
  },
  {
    title: 'VÂY HÃM TRÊN KHÔNG - T16',
    genre: 'Hành động',
    releaseDate: '19/07/2024',
    image: 'link_to_image_3',
  },
  {
    title: 'TÍN HIỆU VŨ TRỤ - T13',
    genre: 'Phiêu lưu, Tâm lý, tình cảm',
    releaseDate: '12/07/2024',
    image: 'link_to_image_4',
  },
];

const promotions = [
  {
    title: 'Combo Thật Đã',
    image: 'link_to_promotion_image_1',
  },
  {
    title: 'Hè Bất Tận',
    image: 'link_to_promotion_image_2',
  },
];

const MovieCard = ({ title, genre, releaseDate, image }) => (
  <Card>
    <CardMedia
      component="img"
      height="140"
      image={image}
      alt={title}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {genre}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {releaseDate}
      </Typography>
    </CardContent>
  </Card>
);

const PromotionCard = ({ title, image }) => (
  <Card sx={{ marginBottom: 2 }}>
    <CardMedia
      component="img"
      height="140"
      image={image}
      alt={title}
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {title}
      </Typography>
    </CardContent>
  </Card>
);

const HomeLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            {movies.map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <MovieCard {...movie} />
            </Grid>
            ))}
        </Grid>
        </Box>
        <Box sx={{ width: 300, marginLeft: 2 }}>
        <Typography variant="h5" gutterBottom>
            Khuyến mãi
        </Typography>
        {promotions.map((promo, index) => (
            <PromotionCard {...promo} key={index} />
        ))}
        </Box>
    </Box>
  )
};

export default HomeLayout;