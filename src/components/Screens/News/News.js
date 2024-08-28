import "./News.scss";
import React from "react";
import NewsCard from "./NewsCard";
import Header from "../../Common/Header/Header";

const News = () => {
  return (
    <>
      <Header />
      <div className="news-container">
        <div className="section-name">
          <span>Tin tức</span>
        </div>
        <NewsCard />
      </div>
    </>
  );
};
export default News;
