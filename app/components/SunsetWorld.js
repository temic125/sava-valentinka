'use client'
import { useEffect, useRef, useState, useMemo, memo } from 'react'
import styles from './SunsetWorld.module.css'

function SunsetWorld() {
  const [visible, setVisible] = useState(false)
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const ref = useRef()

  const fullText1 = useMemo(() => 'В каждом мире есть что-то редкое.', [])
  const fullText2 = useMemo(() => 'В этом — ты.', [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let i = 0
    const t1 = setInterval(() => {
      if (i < fullText1.length) {
        setText1(fullText1.slice(0, i + 1))
        i++
      } else {
        clearInterval(t1)
        let j = 0
        const t2 = setInterval(() => {
          if (j < fullText2.length) {
            setText2(fullText2.slice(0, j + 1))
            j++
          } else clearInterval(t2)
        }, 70)
      }
    }, 50)
    return () => clearInterval(t1)
  }, [visible])

  return (
    <div className={styles.sunset} ref={ref}>
      {/* Небо-градиент */}
      <div className={styles.sky}>
        <div className={styles.sun} />
        <div className={styles.clouds}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={styles.cloud} style={{
              left: `${10 + i * 18}%`,
              top: `${10 + (i % 3) * 8}%`,
              animationDelay: `${i * 2}s`,
              opacity: 0.6 + (i % 3) * 0.15,
            }} />
          ))}
        </div>
      </div>

      {/* Пейзаж */}
      <div className={styles.landscape}>
        {/* Горы */}
        <div className={styles.mountains}>
          <div className={`${styles.mountain} ${styles.m1}`} />
          <div className={`${styles.mountain} ${styles.m2}`} />
          <div className={`${styles.mountain} ${styles.m3}`} />
        </div>

        {/* Деревья */}
        <div className={styles.trees}>
          {[...Array(7)].map((_, i) => (
            <div key={i} className={styles.tree} style={{
              left: `${5 + i * 14}%`,
              height: `${60 + (i % 3) * 20}px`,
              animationDelay: `${i * 0.3}s`,
            }}>
              <div className={styles.leaves} />
              <div className={styles.leaves2} />
              <div className={styles.trunk} />
            </div>
          ))}
        </div>

        {/* Река */}
        <div className={styles.river}>
          <div className={styles.riverFlow} />
        </div>

        {/* Земля */}
        <div className={styles.ground}>
          <div className={styles.grass} />
        </div>

        {/* Персонаж */}
        <div className={`${styles.character} ${visible ? styles.charVisible : ''}`}>
          <div className={styles.charHead} />
          <div className={styles.charBody} />
          <div className={styles.charLegs}>
            <div className={styles.leg} />
            <div className={styles.leg} />
          </div>
        </div>
      </div>

      {/* Текст */}
      <div className={`${styles.textBox} ${visible ? styles.textVisible : ''}`}>
        <p className={styles.text}>
          {text1}<span className={styles.cursor}>▌</span>
        </p>
        {text2 && (
          <p className={`${styles.text} ${styles.textHighlight}`}>
            {text2}<span className={styles.cursor}>▌</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default memo(SunsetWorld)
