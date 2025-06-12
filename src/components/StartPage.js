import React from "react";
import styles from "./StartPage.module.css";

const StartPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Mem Serwis</h1>
      <p className={styles.paragraph}>
        Where memes rise, fall, and get judged harder than reality TV
        contestants.
      </p>
      <p className={styles.paragraph}>
        Check out the <strong>HOT</strong> section for top-tier meme.
        <br />
        Dive into <strong>REGULAR</strong> for memes that... still exist.
      </p>
      <p className={styles.paragraph}>
        Feeling creative? Add your own meme and let the internet decide your
        fate.
      </p>
    </div>
  );
};

export default StartPage;
