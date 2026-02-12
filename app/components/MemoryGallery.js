'use client';

import { useState } from 'react';
import styles from './MemoryGallery.module.css';

export default function MemoryGallery({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // TODO: Replace with actual photos
  const memories = [
    {
      id: 1,
      title: 'Наша первая встреча',
      description: 'Помнишь тот день, когда всё началось?',
      placeholder: 'ФОТО 1'
    },
    {
      id: 2,
      title: 'Самый счастливый момент',
      description: 'Когда я понял, что ты та самая...',
      placeholder: 'ФОТО 2'
    },
    {
      id: 3,
      title: 'Вместе навсегда',
      description: 'Каждое мгновение с тобой бесценно',
      placeholder: 'ФОТО 3'
    },
    {
      id: 4,
      title: 'Наше будущее',
      description: 'Впереди столько всего прекрасного!',
      placeholder: 'ФОТО 4'
    }
  ];

  const nextMemory = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const prevMemory = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const currentMemory = memories[currentIndex];

  return (
    <div className={styles.overlay}>
      <div className={styles.gallery}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <h2 className={styles.title}>Наши воспоминания</h2>

        <div className={styles.memoryContainer}>
          {/* Navigation arrows */}
          <button className={styles.navButton} onClick={prevMemory}>
            ‹
          </button>

          <div className={styles.memoryCard}>
            <div className={styles.photoPlaceholder}>
              <span className={styles.placeholderText}>{currentMemory.placeholder}</span>
              <p className={styles.todoNote}>TODO: Добавь фото здесь</p>
            </div>
            
            <div className={styles.memoryInfo}>
              <h3 className={styles.memoryTitle}>{currentMemory.title}</h3>
              <p className={styles.memoryDescription}>{currentMemory.description}</p>
            </div>
          </div>

          <button className={styles.navButton} onClick={nextMemory}>
            ›
          </button>
        </div>

        {/* Progress dots */}
        <div className={styles.dots}>
          {memories.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
