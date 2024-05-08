import React, { useState, useEffect } from "react";
import NewsItem from "../components/NewsItem";
import { baseUrl } from "../constants/constants";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState(null);

  useEffect((_) => {
    axios
      .get(baseUrl + "/news/all")
      .then((res) => setNews(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="news container-lg">
      <h3 className="text-center m-3">News</h3>
      <div className="row">
        {news && news.length > 0 ? (
          news.map((item) => (
            <NewsItem
              key={item.id}
              id={item.id}
              title={item.title}
              body={item.desc}
              imageUrl={item.image}
              date={item.date}
            />
          ))
        ) : (
          <h4 className="text-center">
            {news === null ? "Loading..." : "No news found"}
          </h4>
        )}
      </div>
    </div>
  );
};

export default News;
