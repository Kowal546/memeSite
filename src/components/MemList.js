import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { 
  selectHotMemes, 
  selectRegularMemes, 
  selectFavouriteMemes,
  selectMemesStatus, 
  selectMemesError, 
  fetchMemes 
} from '../store/memesSlice';
import Mem from './Mem';
import styles from './MemList.module.css';

const MemList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const status = useSelector(selectMemesStatus);
  const error = useSelector(selectMemesError);
  const hotMemes = useSelector(selectHotMemes);
  const regularMemes = useSelector(selectRegularMemes);
  const favouriteMemes = useSelector(selectFavouriteMemes);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMemes());
    }
  }, [status, dispatch]);

  const getMemesToShow = () => {
    switch (location.pathname) {
      case '/hot':
        return hotMemes;
      case '/regular':
        return regularMemes;
      case '/favourites':
        return favouriteMemes;
      default:
        return regularMemes;
    }
  };

  const memesToShow = getMemesToShow();
  const currentCategory = location.pathname === '/hot' 
    ? 'Hot' 
    : location.pathname === '/favourites'
      ? 'Favourites'
      : 'Regular';

  if (status === 'loading') {
    return (
      <div className={styles.memList}>
        <div className={styles.memListHeader}>
          <h2 className={styles.memListTitle}>Loading memes...</h2>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className={styles.memList}>
        <div className={styles.memListHeader}>
          <h2 className={styles.memListTitle}>Error loading memes</h2>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.memList}>
      <div className={styles.memListHeader}>
        <h2 className={styles.memListTitle}>{currentCategory} Memes</h2>
        <p className={styles.memesCount}>
          {memesToShow.length} {memesToShow.length === 1 ? 'meme' : 'memes'} found
        </p>
      </div>

      {memesToShow.length === 0 ? (
        <div className={styles.noMemes}>
          <p className={styles.noMemesText}>No {currentCategory.toLowerCase()} memes found!</p>
          {location.pathname === '/hot' && (
            <p className={`${styles.noMemesText} ${styles.hint}`}>
              Memes need a score greater than 5 to appear in Hot section.
            </p>
          )}
          {location.pathname === '/favourites' && (
            <p className={`${styles.noMemesText} ${styles.hint}`}>
              Star memes to add them to your favourites!
            </p>
          )}
        </div>
      ) : (
        <div className={styles.memesContainer}>
          {memesToShow.map(meme => (
            <Mem key={meme.id} meme={meme} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemList; 