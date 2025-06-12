import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const [urlLink, setUrlLink] = useState(0);

  const setCurrentUrlLink = (link) => {
    setUrlLink(link);
  };

  const isActive = (link) => {
    return urlLink === link;
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        <div className={styles.navBrand}>
          <Link
            to="/"
            className={styles.startPage}
            onClick={() => setCurrentUrlLink("")}
          >
            Best memes
          </Link>
        </div>

        <div className={styles.navLinks}>
          <Link
            to="/hot"
            className={`${styles.navLink}${
              isActive("hot") ? " " + styles.navLinkActive : ""
            }`}
            onClick={() => setCurrentUrlLink("hot")}
          >
            Hot
          </Link>

          <Link
            to="/regular"
            className={`${styles.navLink}${
              isActive("regular") ? " " + styles.navLinkActive : ""
            }`}
            onClick={() => setCurrentUrlLink("regular")}
          >
            Regular
          </Link>

          <Link
            to="/favourites"
            className={`${styles.navLink}${
              isActive("favourites") ? " " + styles.navLinkActive : ""
            }`}
            onClick={() => setCurrentUrlLink("favourites")}
          >
            My favourites
          </Link>

          <Link
            to="/add"
            className={`${styles.navLink}${
              isActive("add") ? " " + styles.navLinkActive : ""
            }`}
            onClick={() => setCurrentUrlLink("add")}
          >
            Add Meme
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
