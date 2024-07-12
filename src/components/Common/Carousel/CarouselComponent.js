import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { styled } from "@mui/system";

const CarouselItem = styled(Paper)({
  textAlign: "center",
  backgroundColor: "#f5f5f5",
});

const items = [
  {
    imageUrl: "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0017716.jpg&w=1920&q=75",
  },
  {
    imageUrl: "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0017685.jpg&w=1920&q=75",
  },
  {
    imageUrl: "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0017643.jpg&w=1920&q=75",
  },
  {
    imageUrl: "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0017632.png&w=1920&q=75"
  },
  {
    imageUrl: "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0017626.jpg&w=1920&q=75"
  },
];

function CarouselComponent() {
  return (
    <Carousel 
        indicators={false}
        navButtonsAlwaysVisible={true}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  const { item } = props;

  return (
    <CarouselItem>
        <img src={item.imageUrl} alt={item.name} style={{ width: "100%" }} />
    </CarouselItem>
  );
}

export default CarouselComponent;