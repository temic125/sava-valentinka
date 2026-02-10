'use client'
import { useEffect, useRef, useState, useMemo, memo } from 'react'
import styles from './FinalScreen.module.css'

function FinalScreen() {
  const [visible, setVisible] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [fireworks, setFireworks] = useState([])
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const ref = useRef()

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const colors = useMemo(() => ['#ff4444', '#ff69b4', '#ffab00', '#4ff8f8', '#4ade80', '#e040fb', '#ff6b6b'], [])

  const handleYes = () => {
    setAnswered(true)
    // Запускаем фейерверки
    const newFireworks = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      size: 8 + Math.random() * 12,
    }))
    setFireworks(newFireworks)

    // Ещё волна
    setTimeout(() => {
      const more = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + 100 + i,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 1.5,
        size: 8 + Math.random() * 12,
      }))
      setFireworks(prev => [...prev, ...more])
    }, 1500)
  }

  const handleNo = () => {
    // Кнопка убегает
    setNoButtonPos({
      x: -100 + Math.random() * 200,
      y: -100 + Math.random() * 200,
    })
  }

  return (
    <div className={styles.final} ref={ref}>
      {/* Ночное небо */}
      <div className={styles.nightSky}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      {/* Луна-сердце */}
      <div className={`${styles.moon} ${visible ? styles.moonVisible : ''}`}>
        <img src="/white_heart.png" alt="Heart" className={styles.moonHeartImg} loading="lazy" />
        <div className={styles.moonGlow} />
      </div>

      {/* Персонаж с табличкой */}
      <div className={`${styles.signArea} ${visible ? styles.signVisible : ''}`}>
        <div className={styles.signCharacter}>
          <div className={styles.charHead} />
          <div className={styles.charBody} />
          <div className={styles.charLegs}>
            <div className={styles.leg} />
            <div className={styles.leg} />
          </div>
        </div>
        <div className={styles.sign}>
          <div className={styles.signBoard}>
            <p className={styles.signText}>Will you be my Valentine?</p>
          </div>
          <div className={styles.signPost} />
        </div>
      </div>

      {/* Кнопки */}
      {!answered && visible && (
        <div className={styles.buttons}>
          <button className={styles.yesBtn} onClick={handleYes}>
            💚 Yes
          </button>
          <button
            className={styles.noBtn}
            onClick={handleNo}
            style={{
              transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
            }}
          >
            💔 No
          </button>
        </div>
      )}

      {/* Фейерверки */}
      {answered && (
        <>
          <div className={styles.fireworksContainer}>
            {fireworks.map(fw => (
              <div
                key={fw.id}
                className={styles.firework}
                style={{
                  left: `${fw.left}%`,
                  animationDelay: `${fw.delay}s`,
                  color: fw.color,
                  fontSize: `${fw.size}px`,
                }}
              >
                ✦
              </div>
            ))}
          </div>

          {/* Летящие сердца */}
          <div className={styles.heartsRain}>
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className={styles.flyHeart}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  fontSize: `${14 + Math.random() * 20}px`,
                }}
              >
                {['❤️', '💖', '💗', '💝', '💕'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>

          <div className={styles.worldSaved}>
            <div className={styles.savedBox}>
              <p className={styles.savedText}>✦ World saved. ✦</p>
              <p className={styles.savedSub}>❤️ Happy Valentine&apos;s Day, Amina ❤️</p>
            </div>
          </div>
        </>
      )}

      {/* Земля */}
      <div className={styles.ground}>
        <div className={styles.grass} />
        <div className={styles.dirt} />
      </div>

      {/* Подпись разработчика */}
      <div className={styles.credits}>
        <p className={styles.creditsText}>Made with ❤️ by Ozganbay Temirlan 11M</p>
      </div>
    </div>
  )
}

export default memo(FinalScreen)
