'use client'
import { memo, useMemo } from 'react'
import styles from './StarField.module.css'

function StarField() {
  const stars = useMemo(() => 
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 3,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.7,
    }))
  , [])

  const shootingStars = useMemo(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      delay: 5 + i * 8,
      top: `${10 + Math.random() * 40}%`,
    }))
  , [])

  return (
    <div className={styles.starField}>
      {/* Static/twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={styles.star}
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            opacity: star.opacity,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((ss) => (
        <div
          key={ss.id}
          className={styles.shootingStar}
          style={{
            top: ss.top,
            animationDelay: `${ss.delay}s`,
          }}
        />
      ))}

      {/* Nebula clouds */}
      <div className={styles.nebula1} />
      <div className={styles.nebula2} />
      <div className={styles.nebula3} />
    </div>
  )
}

export default memo(StarField)
