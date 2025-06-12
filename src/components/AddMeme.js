import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addMeme } from '../store/memesSlice';
import styles from './AddMeme.module.css';

const AddMeme = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    img: '',
    starred: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.img.trim()) {
      newErrors.img = 'Image URL is required';
    } else {
      try {
        new URL(formData.img);
      } catch {
        newErrors.img = 'Please enter a valid URL';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(addMeme({
        title: formData.title.trim(),
        img: formData.img.trim(),
        starred: formData.starred
      }));
      
      setFormData({
        title: '',
        img: '',
        starred: false
      });
      
      navigate('/regular');
    }
  };

  return (
    <div className={styles.addMeme}>
      <div className={styles.addMemeContainer}>
        <h2 className={styles.addMemeTitle}>Add New Meme</h2>
        
        <form onSubmit={handleSubmit} className={styles.addMemeForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="title">Meme Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.title ? styles.formInputError : ''}`}
              placeholder="Enter meme title..."
            />
            {errors.title && <p className={styles.errorMessage}>{errors.title}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="img">Image URL *</label>
            <input
              type="url"
              id="img"
              name="img"
              value={formData.img}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.img ? styles.formInputError : ''}`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.img && <p className={styles.errorMessage}>{errors.img}</p>}
          </div>

          <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="starred"
                checked={formData.starred}
                onChange={handleChange}
              />
              <span className={styles.checkmark}>★</span>
              Start as starred
            </label>
          </div>

          {formData.img && (
            <div className={styles.imagePreview}>
              <p className={styles.imagePreviewText}>Preview:</p>
              <img 
                src={formData.img} 
                alt="Preview" 
                className={styles.imagePreviewImg}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
                onLoad={(e) => {
                  e.target.style.display = 'block';
                }}
              />
            </div>
          )}

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitBtn}>
              Add Meme
            </button>
            <button 
              type="button" 
              className={styles.cancelBtn}
              onClick={() => navigate('/regular')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMeme; 