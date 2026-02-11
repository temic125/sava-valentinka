'use client'
import { useEffect, useRef, useState, useMemo, memo } from 'react'
import styles from './CozyHouse.module.css'

function CozyHouse() {
  const [visible, setVisible] = useState(false)
  const [hoveredPainting, setHoveredPainting] = useState(null)
  const ref = useRef()

  const paintings = useMemo(() => [
    { text: 'Хочу познакомиться поближе', img: '/world.png', color: '#ff6b6b' },
    { text: 'Ты кажешься интересным человеком', img: '/diamond.png', color: '#4ecdc4' },
    { text: 'Давай пообщаемся?', img: '/gold.png', color: '#ffe66d' },
  ], [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className={styles.house} ref={ref}>
      {/* Стена */}
      <div className={styles.wall}>
        {/* Бревна текстура */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className={styles.plank} />
        ))}
      </div>

      {/* Крыша */}
      <div className={styles.roof} />

      {/* Окно */}
      <div className={styles.window}>
        <div className={styles.windowGlow} />
      </div>

      {/* Камин */}
      <div className={`${styles.fireplace} ${visible ? styles.fpVisible : ''}`}>
        <div className={styles.fireplaceFrame} />
        <div className={styles.fire}>
          <div className={styles.flame} style={{ '--delay': '0s' }} />
          <div className={styles.flame} style={{ '--delay': '0.2s' }} />
          <div className={styles.flame} style={{ '--delay': '0.4s' }} />
          <div className={styles.flame} style={{ '--delay': '0.1s' }} />
          <div className={styles.flame} style={{ '--delay': '0.3s' }} />
        </div>
        <div className={styles.embers}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={styles.ember}
              style={{
                left: `${20 + Math.random() * 60}%`,
                '--drift': `${-15 + Math.random() * 30}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Изумруд на полке */}
      <div className={`${styles.emeraldShelf} ${visible ? styles.emeraldVisible : ''}`}>
        <img src="/emerald.png" alt="Emerald" className={styles.emeraldImg} loading="lazy" />
        <div className={styles.emeraldGlow} />
      </div>

      {/* Фонари */}
      <div className={styles.lanterns}>
        <div className={`${styles.lantern} ${styles.lanternLeft}`}>
          <div className={styles.lanternLight} />
          <div className={styles.lanternBody}>🏮</div>
        </div>
        <div className={`${styles.lantern} ${styles.lanternRight}`}>
          <div className={styles.lanternLight} />
          <div className={styles.lanternBody}>🏮</div>
        </div>
      </div>

      {/* Сердечки-частицы */}
      {visible && (
        <div className={styles.heartParticles}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={styles.heartParticle}
              style={{
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
                fontSize: `${12 + Math.random() * 16}px`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      {/* Картины */}
      <div className={`${styles.paintings} ${visible ? styles.paintingsVisible : ''}`}>
        {paintings.map((p, i) => (
          <div
            key={i}
            className={`${styles.painting} ${hoveredPainting === i ? styles.paintingActive : ''}`}
            style={{
              animationDelay: `${0.3 + i * 0.4}s`,
              '--glow-color': p.color,
            }}
            onMouseEnter={() => setHoveredPainting(i)}
            onMouseLeave={() => setHoveredPainting(null)}
            onClick={() => setHoveredPainting(hoveredPainting === i ? null : i)}
          >
            <div className={styles.paintingFrame}>
              <img src={p.img} alt="Icon" className={styles.paintingImg} loading="lazy" />
              <p className={styles.paintingText}>{p.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Пол */}
      <div className={styles.floor}>
        {[...Array(16)].map((_, i) => (
          <div key={i} className={styles.floorTile} />
        ))}
      </div>
    </div>
  )
}

export default memo(CozyHouse)
