import React from "react";
import Header from "../components/Header/Header";
import WatchlistContent from "../components/content/WatchlistContent/WatchlistContent";
import styles from "./Watchlist.module.scss";

const Watchlist = () => {
  return (
    <div className={styles.watchlist}>
      <Header />
      <WatchlistContent />
    </div>
  );
};

export default Watchlist;
