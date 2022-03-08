import React, { useState, useEffect } from "react";
import axios from "axios";
import Filters from "../Filters";
import Stories from "../Stories";
import styles from "./WatchlistContent.module.scss";
import Header from "../WatchlistHeader";

const WatchlistContent = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios
      .get("https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories")
      .then((res) => {
        console.log(res.data);
        setStories(res.data.stories);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <Header setShowFilters={setShowFilters} />
        {showFilters && (
          <Filters setIsLoading={setIsLoading} setStories={setStories} />
        )}
        {!isLoading ? (
          stories.length > 0 && <Stories stories={stories} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className={styles.rightPanel}></div>
    </div>
  );
};

export default WatchlistContent;
