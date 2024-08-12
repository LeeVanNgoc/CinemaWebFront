import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./News.scss";
import NewsCard from "./NewsCard";
import { getNews } from "../Admin/News/redux/actions/newsActions";
import { Container } from "@mui/material";

const News = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(getNews());
    };

    fetchMovies();
  }, [dispatch]);


  return (
    <Container>
      <div className="news-container">
        <div className="section-name">
          <span>Tin tức</span>
        </div>
        <NewsCard />
      </div>
    </Container>
  )
};
export default News;