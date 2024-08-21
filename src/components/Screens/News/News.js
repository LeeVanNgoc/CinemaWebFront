import "./News.scss";
import React from "react";
import NewsCard from "./NewsCard";

const News = () => {

  return (
    <div className="news-container">
      <div className="section-name">
        <span>Tin tức</span>
      </div>
        <NewsCard/>
    </div>
  )
};
export default News;