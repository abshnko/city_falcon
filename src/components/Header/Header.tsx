import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <img
        src={`${process.env.PUBLIC_URL}/img/logo-1366.png`}
        alt=""
        className={styles.logo}
      />
    </div>
  );
};

export default Header;
