'use client';

import styles from './ReasonsList.module.css';

export default function ReasonsList({ onClose }) {
  const reasons = [
    {
      id: 1,
      number: '01',
      reason: 'Твоя улыбка',
      description: 'Она освещает даже самые темные дни'
    },
    {
      id: 2,
      number: '02',
      reason: 'Твой смех',
      description: 'Это самый прекрасный звук в мире'
    },
    {
      id: 3,
      number: '03',
      reason: 'Твоя доброта',
      description: 'Ты делаешь мир вокруг лучше'
    },
    {
      id: 4,
      number: '04',
      reason: 'Твоя поддержка',
      description: 'Ты всегда рядом, когда мне нужно'
    },
    {
      id: 5,
      number: '05',
      reason: 'Твоя красота',
      description: 'Внутренняя и внешняя, безупречная'
    },
    {
      id: 6,
      number: '06',
      reason: 'Твоя умность',
      description: 'С тобой можно говорить обо всём'
    },
    {
      id: 7,
      number: '07',
      reason: 'Твоя нежность',
      description: 'Каждое прикосновение особенное'
    },
    {
      id: 8,
      number: '08',
      reason: 'Твоё понимание',
      description: 'Ты знаешь меня лучше всех'
    },
    {
      id: 9,
      number: '09',
      reason: 'Твоя любовь',
      description: 'Она делает меня счастливым каждый день'
    },
    {
      id: 10,
      number: '10',
      reason: 'Просто ты',
      description: 'Всё в тебе идеально, моя Гаухар'
    }
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <h2 className={styles.title}>10 причин, почему я люблю тебя</h2>
        <p className={styles.subtitle}>На самом деле их бесконечно много...</p>

        <div className={styles.reasonsGrid}>
          {reasons.map((item, index) => (
            <div 
              key={item.id} 
              className={styles.reasonCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.number}>{item.number}</div>
              <h3 className={styles.reasonTitle}>{item.reason}</h3>
              <p className={styles.reasonDescription}>{item.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>И это только начало списка... 💕</p>
        </div>
      </div>
    </div>
  );
}
