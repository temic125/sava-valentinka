'use client'
import { useEffect, useRef, useState, useMemo, memo } from 'react'
import styles from './FlowerGarden.module.css'

function FlowerGarden() {
  const [visible, setVisible] = useState(false)
  const ref = useRef()

  const flowers = useMemo(() => [
    '/rose.png', '/yellow_flower.png', '/purple_flower.png', '/blue_flower.png',
    '/rose.png', '/yellow_flower.png', '/purple_flower.png', '/blue_flower.png',
    '/rose.png', '/yellow_flower.png', '/purple_flower.png', '/blue_flower.png'
  ], [])
  const nameBlocks = useMemo(() => 'AMINA'.split(''), [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className={styles.garden} ref={ref}>
      {/* Фон — светлое небо */}
      <div className={styles.gardenSky}>
        <div className={styles.skyGradient} />
      </div>

      {/* Светлячки */}
      <div className={styles.fireflies}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={styles.firefly}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Цветы */}
      <div className={`${styles.flowerBed} ${visible ? styles.flowerVisible : ''}`}>
        {flowers.map((flower, i) => (
          <div
            key={i}
            className={styles.flower}
            style={{
              animationDelay: `${i * 0.2}s`,
            }}
          >
            <img src={flower} alt="Flower" className={styles.flowerHead} loading="lazy" />
            <div className={styles.stem} />
          </div>
        ))}
      </div>

      {/* Имя AMINA из блоков с золотом */}
      <div className={`${styles.nameSection} ${visible ? styles.nameVisible : ''}`}>
        <img src="/gold.png" alt="Gold" className={styles.goldImg} loading="lazy" />
        <div className={styles.nameBlocks}>
          {nameBlocks.map((letter, i) => (
            <div
              key={i}
              className={styles.letterBlock}
              style={{ animationDelay: `${1.5 + i * 0.3}s` }}
            >
              {letter}
            </div>
          ))}
        </div>
        <img src="/gold.png" alt="Gold" className={`${styles.goldImg} ${styles.goldRight}`} loading="lazy" />
      </div>

      {/* Текст */}
      <div className={`${styles.gardenText} ${visible ? styles.textVisible : ''}`}>
        <p className={styles.line1}>Этот мир стал лучше,</p>
        <p className={styles.line2}>потому что в нём есть ты.</p>
      </div>

      {/* Трава */}
      <div className={styles.gardenGround}>
        <div className={styles.grassLayer} />
        <div className={styles.dirtLayer} />
      </div>
    </div>
  )
}

export default memo(FlowerGarden)
