'use client'
import { memo, useState, useEffect } from 'react'
import styles from './LoveSymbol.module.css'

function LoveSymbol({ symbol, index, isHovered, isRevealed, onHover, onClick }) {
  const [particles, setParticles] = useState([])
  const [showPhrase, setShowPhrase] = useState(false)

  // Показать фразу после раскрытия
  useEffect(() => {
    if (isRevealed && !showPhrase) {
      const timer = setTimeout(() => setShowPhrase(true), 300)
      return () => clearTimeout(timer)
    }
  }, [isRevealed, showPhrase])

  // Generate ambient particles for each symbol type
  useEffect(() => {
    const interval = setInterval(() => {
      if (isHovered) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: Math.random() * 60 - 30,
          y: Math.random() * 60 - 30,
        }
        setParticles(prev => [...prev.slice(-5), newParticle])
      }
    }, 300)

    return () => clearInterval(interval)
  }, [isHovered])

  // Symbol-specific ambient animations
  const getAmbientClass = () => {
    switch (symbol.id) {
      case 'ferdinand': return styles.flowerAmbient
      case 'shrek': return styles.swampAmbient
      case 'coco': return styles.candleAmbient
      case 'monsters': return styles.doorAmbient
      case 'toystory': return styles.starAmbient
      default: return ''
    }
  }

  return (
    <div
      className={`${styles.symbolWrapper} ${isHovered ? styles.hovered : ''} ${isRevealed ? styles.revealed : ''}`}
      style={{
        ...symbol.position,
        '--symbol-color': symbol.color,
        '--glow-color': symbol.glowColor,
      }}
      onMouseEnter={() => onHover(symbol.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      {/* Glow ring */}
      <div className={styles.glowRing} />
      
      {/* Ambient effect specific to symbol */}
      <div className={`${styles.ambientEffect} ${getAmbientClass()}`}>
        {/* Ferdinand: floating petals */}
        {symbol.id === 'ferdinand' && (
          <>
            <span className={styles.petal}>🌸</span>
            <span className={styles.petal}>🩷</span>
            <span className={styles.petal}>🌸</span>
          </>
        )}
        
        {/* Shrek: bubbles */}
        {symbol.id === 'shrek' && (
          <>
            <span className={styles.bubble}>○</span>
            <span className={styles.bubble}>○</span>
            <span className={styles.bubble}>○</span>
          </>
        )}
        
        {/* Coco: flame particles */}
        {symbol.id === 'coco' && (
          <div className={styles.flameParticles}>
            <span>✨</span>
            <span>✨</span>
          </div>
        )}
        
        {/* Monsters: energy sparks */}
        {symbol.id === 'monsters' && (
          <div className={styles.energyBar}>
            <div className={styles.energyFill} />
          </div>
        )}
        
        {/* Toy Story: sparkles */}
        {symbol.id === 'toystory' && (
          <>
            <span className={styles.sparkle}>✦</span>
            <span className={styles.sparkle}>✦</span>
            <span className={styles.sparkle}>✦</span>
            <span className={styles.sparkle}>✦</span>
          </>
        )}
      </div>

      {/* Main symbol */}
      <div className={styles.symbol}>
        {/* TODO: Replace with actual images */}
        <img 
          src={symbol.emoji} 
          alt={symbol.label}
          className={styles.symbolImage}
          onError={(e) => {
            // Fallback to text if image not found
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <span className={styles.fallbackText} style={{display: 'none'}}>
          {symbol.label}
        </span>
      </div>

      {/* Hover particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className={styles.particle}
          style={{
            left: `calc(50% + ${p.x}px)`,
            top: `calc(50% + ${p.y}px)`,
          }}
        >
          ✨
        </div>
      ))}

      {/* Label on hover */}
      <div className={styles.labelContainer}>
        <span className={styles.label}>{symbol.label}</span>
      </div>

      {/* Ripple effect on hover */}
      {isHovered && !isRevealed && <div className={styles.ripple} />}

      {/* Revealed phrase */}
      {isRevealed && showPhrase && (
        <div className={styles.phraseContainer}>
          <div className={styles.phraseBubble}>
            <span className={styles.movieBadge}>{symbol.movie}</span>
            <p className={styles.phrase}>{symbol.phrase}</p>
          </div>
          <div className={styles.checkmark}>✓</div>
        </div>
      )}
    </div>
  )
}

export default memo(LoveSymbol)
