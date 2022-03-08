import React from "react";
import styles from "./WatchlistHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  setShowFilters: any;
}

const Header = ({ setShowFilters }: HeaderProps) => {
  return (
    <div className="content-header">
      <h1 className={styles.title}>Watchlist Name</h1>
      <div className={styles.buttons}>
        <button className={styles.button}>
          <FontAwesomeIcon className={styles.icon} icon={faArrowRotateRight} />
          <span className={styles.text}>Refresh</span>
        </button>
        <button
          className={styles.button}
          onClick={() => setShowFilters((state: boolean) => !state)}
        >
          <FontAwesomeIcon
            className={styles.icon}
            icon={faFilter}
            style={{ width: "15px", height: "15px" }}
          />
          <span className={styles.text}>Filters</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
