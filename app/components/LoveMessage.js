'use client';

import { useState, useEffect } from 'react';
import styles from './LoveMessage.module.css';

export default function LoveMessage({ onClose }) {
  const [showContent, setShowContent] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  
  useEffect(() => {
    // Появление контента
    const timer1 = setTimeout(() => setShowContent(true), 500);
    const timer2 = setTimeout(() => setShowHearts(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Генерация летящих сердечек
  const hearts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 4,
    size: 0.5 + Math.random() * 1.5
  }));

  return (
    <div className={styles.overlay}>
      {/* Летящие сердечки */}
      {showHearts && (
        <div className={styles.heartsContainer}>
          {hearts.map(heart => (
            <div
              key={heart.id}
              className={styles.floatingHeart}
              style={{
                left: `${heart.left}%`,
                animationDelay: `${heart.delay}s`,
                animationDuration: `${heart.duration}s`,
                fontSize: `${heart.size}rem`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Основное послание */}
      <div className={`${styles.messageContainer} ${showContent ? styles.visible : ''}`}>
        <div className={styles.messageCard}>
          
          {/* Заголовок */}
          <h1 className={styles.title}>
            Моя любимая Мария
          </h1>
          
          {/* Послание */}
          <div className={styles.letterContent}>
            <p className={styles.greeting}>Привет, моё солнышко!</p>
            
            <p className={styles.paragraph}>
              Ты открыла все мои послания, а значит, пришло время сказать тебе 
              самое главное...
            </p>
            
            <p className={styles.paragraph}>
              Ты — моя самая большая радость, мой лучший друг и любовь всей 
              моей жизни. Каждый день с тобой — это как любимый мультфильм, 
              который хочется пересматривать снова и снова.
            </p>
            
            <p className={styles.paragraph}>
              Ты делаешь меня лучше, ты заставляешь меня улыбаться даже в 
              самые трудные дни. Рядом с тобой я чувствую себя самым 
              счастливым человеком на свете.
            </p>
            
            <p className={styles.bigMessage}>
              Я люблю тебя бесконечно!
            </p>
            
            <p className={styles.signature}>
              Твой Алекс
            </p>
          </div>
          
          {/* Кнопка закрытия */}
          <button className={styles.closeButton} onClick={onClose}>
            Вернуться к звёздам
          </button>
        </div>
      </div>
    </div>
  );
}
