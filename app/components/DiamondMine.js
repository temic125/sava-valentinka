'use client'
import { useEffect, useRef, useState, memo } from 'react'
import styles from './DiamondMine.module.css'

function DiamondMine() {
  const [visible, setVisible] = useState(false)
  const [mining, setMining] = useState(false)
  const [diamondFound, setDiamondFound] = useState(false)
  const [blocksSmashed, setBlocksSmashed] = useState([])
  const ref = useRef()

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !visible) { setVisible(true) } },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [visible])

  useEffect(() => {
    if (!visible) return
    // Начинаем майнить через 1 сек
    const t1 = setTimeout(() => setMining(true), 1000)
    // Блоки ломаются по очереди
    const blocks = [0, 1, 2, 3, 4]
    blocks.forEach((b, i) => {
      setTimeout(() => {
        setBlocksSmashed(prev => [...prev, b])
      }, 2000 + i * 600)
    })
    // Алмаз найден
    const t2 = setTimeout(() => {
      setMining(false)
      setDiamondFound(true)
    }, 5200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [visible])

  return (
    <div className={styles.mine} ref={ref}>
      {/* Фон шахты — темные стены */}
      <div className={styles.mineWall}>
        {[...Array(60)].map((_, i) => (
          <div key={i} className={styles.stoneBlock} style={{
            background: i % 7 === 0 ? '#4a4a4a' : i % 5 === 0 ? '#555' : '#3a3a3a',
          }} />
        ))}
      </div>

      {/* Факелы */}
      <div className={styles.torches}>
        <div className={styles.torch}>
          <div className={styles.torchFlame} />
          <div className={styles.torchStick}>▪</div>
          <div className={styles.torchGlow} />
        </div>
        <div className={`${styles.torch} ${styles.torchRight}`}>
          <div className={styles.torchFlame} />
          <div className={styles.torchStick}>▪</div>
          <div className={styles.torchGlow} />
        </div>
      </div>

      {/* Блоки для добычи */}
      <div className={styles.mineArea}>
        <div className={styles.blocks}>
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={`${styles.oreBlock} ${blocksSmashed.includes(i) ? styles.smashed : ''}`}
            >
              <div className={styles.blockFace}>
                {i === 4 ? '💎' : '⬛'}
              </div>
              {blocksSmashed.includes(i) && (
                <div className={styles.breakParticles}>
                  {[...Array(6)].map((_, j) => (
                    <div key={j} className={styles.breakPart} style={{
                      '--angle': `${j * 60}deg`,
                      '--dist': `${20 + Math.random() * 30}px`,
                    }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Кирка */}
        {mining && (
          <div className={styles.pickaxe}>
            ⛏️
          </div>
        )}
      </div>

      {/* Алмаз-сердце */}
      {diamondFound && (
        <div className={styles.diamondReveal}>
          <div className={styles.diamondHeart}>
            <img
              src="/diamond.png"
              alt="Diamond"
              className={styles.diamondImg}
              loading="lazy"
            />
          </div>

          <div className={styles.diamondText}>
            <p className={styles.dLine1}>Я мог бы найти что угодно.</p>
            <p className={styles.dLine2}>Но нашёл тебя.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(DiamondMine)
