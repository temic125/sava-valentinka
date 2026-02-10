'use client'
import { useState, useEffect, useMemo, memo } from 'react'
import styles from './SpawnScreen.module.css'

function SpawnScreen({ onEnter }) {
  const [lines, setLines] = useState([])
  const [showButton, setShowButton] = useState(false)
  const [showHeart, setShowHeart] = useState(false)
  const [progress, setProgress] = useState(0)

  const loadingLines = useMemo(() => [
    { text: 'Loading world...', delay: 400 },
    { text: 'Generating chunks...', delay: 1200 },
    { text: 'Building terrain...', delay: 2000 },
    { text: 'Placing hearts...', delay: 2800 },
    { text: 'Welcome, Amina ❤️', delay: 3800 },
  ], [])

  useEffect(() => {
    // Постепенное заполнение прогресс-бара
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    loadingLines.forEach(({ text, delay }) => {
      setTimeout(() => {
        setLines(prev => {
          // Проверяем, нет ли уже этого сообщения
          if (prev.includes(text)) return prev
          return [...prev, text]
        })
      }, delay)
    })

    setTimeout(() => setShowHeart(true), 4500)
    setTimeout(() => setShowButton(true), 5200)

    return () => clearInterval(progressInterval)
  }, [loadingLines])

  return (
    <div className={styles.spawn}>
      {/* Частицы фона */}
      <div className={styles.particles}>
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Прогресс-бар */}
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Строки загрузки */}
      <div className={styles.terminal}>
        {lines.map((line, i) => (
          <div key={i} className={styles.line} style={{ animationDelay: `${i * 0.1}s` }}>
            <span className={styles.prefix}>&gt;</span> {line}
          </div>
        ))}
      </div>

      {/* Сердечко */}
      {showHeart && (
        <div className={styles.heartContainer}>
          <img src="/heart.png" alt="Heart" className={styles.heartImg} loading="eager" />
        </div>
      )}

      {/* Кнопка входа */}
      {showButton && (
        <button className={styles.enterButton} onClick={onEnter}>
          <span className={styles.btnIcon}>▶</span> Enter the world
        </button>
      )}
    </div>
  )
}

export default memo(SpawnScreen)