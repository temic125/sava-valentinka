'use client'
import { useState, lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import styles from './page.module.css'

const SpawnScreen = dynamic(() => import('./components/SpawnScreen'), { ssr: false })
const SunsetWorld = dynamic(() => import('./components/SunsetWorld'), { ssr: false })
const CozyHouse = dynamic(() => import('./components/CozyHouse'), { ssr: false })
const DiamondMine = dynamic(() => import('./components/DiamondMine'), { ssr: false })
const FlowerGarden = dynamic(() => import('./components/FlowerGarden'), { ssr: false })
const FinalScreen = dynamic(() => import('./components/FinalScreen'), { ssr: false })

export default function Home() {
  const [entered, setEntered] = useState(false)

  if (!entered) {
    return <SpawnScreen onEnter={() => setEntered(true)} />
  }

  return (
    <main className={styles.main}>
      {/* Экран 2 — Мир при закате */}
      <SunsetWorld />

      {/* Экран 3 — Уютный домик */}
      <CozyHouse />

      {/* Экран 4 — Алмазная шахта */}
      <DiamondMine />

      {/* Экран 5 — Сад для Амины */}
      <FlowerGarden />

      {/* Экран 6 — Финальная валентинка */}
      <FinalScreen />

      {/* Навигационные точки */}
      <div className={styles.scrollHint}>
        <div className={styles.scrollArrow}>▼</div>
        <span className={styles.scrollText}>scroll</span>
      </div>
    </main>
  )
}
