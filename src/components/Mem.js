import React from 'react';
import { useDispatch } from 'react-redux';
import { upvote, downvote, toggleStar } from '../store/memesSlice';
import styles from './Mem.module.css';

const Mem = ({ meme }) => {
  const dispatch = useDispatch();

  const handleUpvote = () => {
    dispatch(upvote(meme.id));
  };

  const handleDownvote = () => {
    dispatch(downvote(meme.id));
  };

  const handleToggleStar = () => {
    dispatch(toggleStar(meme.id));
  };

  const score = meme.upvotes - meme.downvotes;

  return (
    <div className={styles.memCard}>
      <div className={styles.memHeader}>
        <h3 className={styles.memTitle}>{meme.title}</h3>
        <button 
          className={`${styles.starBtn} ${meme.starred ? styles.starBtnStarred : ''}`}
          onClick={handleToggleStar}
          aria-label="Toggle star"
        >
          ★
        </button>
      </div>
      
      <div className={styles.memImageContainer}>
        <img 
          src={meme.img} 
          alt={meme.title}
          className={styles.memImage}
        />
      </div>
      
      <div className={styles.memControls}>
        <button 
          className={`${styles.voteBtn} ${styles.upvoteBtn}`} 
          onClick={handleUpvote}
          aria-label="Upvote"
        >
          👍 {meme.upvotes}
        </button>
        
        <span className={`${styles.score} ${score > 5 ? styles.scoreHot : ''}`}>
          Score: {score}
        </span>
        
        <button 
          className={`${styles.voteBtn} ${styles.downvoteBtn}`} 
          onClick={handleDownvote}
          aria-label="Downvote"
        >
          👎 {meme.downvotes}
        </button>
      </div>
    </div>
  );
};

export default Mem; 