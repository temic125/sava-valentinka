'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import dynamic from 'next/dynamic';

// Dynamic imports для компонентов
const LoveSymbol = dynamic(() => import('./components/LoveSymbol'), { ssr: false });
const StarField = dynamic(() => import('./components/StarField'), { ssr: false });
const LoveMessage = dynamic(() => import('./components/LoveMessage'), { ssr: false });
const AnimatedBackground = dynamic(() => import('./components/AnimatedBackground'), { ssr: false });
const MemoryGallery = dynamic(() => import('./components/MemoryGallery'), { ssr: false });
const ReasonsList = dynamic(() => import('./components/ReasonsList'), { ssr: false });

// TODO: Replace placeholder images with actual movie character images
// Символы из любимых мультфильмов с персональными посланиями для Гаухар
const SYMBOLS = [
  {
    id: 'ferdinand',
    emoji: '/images/ferdinand.png', // TODO: Add actual Ferdinand flower image
    label: 'Цветок',
    movie: 'Фердинанд',
    phrase: 'Гаухар, ты моя нежность среди всего хаоса мира',
    color: '#FF6B9D',
    glowColor: 'rgba(255, 107, 157, 0.6)',
    position: { top: '15%', left: '20%' },
    mobilePosition: { top: '12%', left: '15%' }
  },
  {
    id: 'shrek',
    emoji: '/images/shrek.png', // TODO: Add actual Shrek crown image
    label: 'Корона',
    movie: 'Шрек',
    phrase: 'Ты моя Фиона — прекрасная в любом виде!',
    color: '#9AE66E',
    glowColor: 'rgba(154, 230, 110, 0.6)',
    position: { top: '25%', left: '75%' },
    mobilePosition: { top: '20%', left: '70%' }
  },
  {
    id: 'coco',
    emoji: '/images/coco.png', // TODO: Add actual Coco candle image
    label: 'Свеча',
    movie: 'Тайна Коко',
    phrase: 'Моя любовь к тебе никогда не угаснет, Гаухар',
    color: '#FFB347',
    glowColor: 'rgba(255, 179, 71, 0.6)',
    position: { top: '60%', left: '15%' },
    mobilePosition: { top: '45%', left: '20%' }
  },
  {
    id: 'monsters',
    emoji: '/images/monstersinc.png', // TODO: Add actual Monsters Inc door image
    label: 'Дверь',
    movie: 'Корпорация Монстров',
    phrase: 'Ты заставляешь мое сердце светиться ярче энергии смеха!',
    color: '#9B59B6',
    glowColor: 'rgba(155, 89, 182, 0.6)',
    position: { top: '70%', left: '80%' },
    mobilePosition: { top: '55%', left: '65%' }
  },
  {
    id: 'toystory',
    emoji: '/images/toystory.png', // TODO: Add actual Toy Story star badge image
    label: 'Звезда',
    movie: 'История Игрушек',
    phrase: 'К бесконечности и дальше — только с тобой, моя звёздочка!',
    color: '#F7DC6F',
    glowColor: 'rgba(247, 220, 111, 0.6)',
    position: { top: '40%', left: '50%' },
    mobilePosition: { top: '35%', left: '45%' }
  }
];

export default function LoveUniverse() {
  const [showIntro, setShowIntro] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const [showReasons, setShowReasons] = useState(false);
  const [hoveredSymbol, setHoveredSymbol] = useState(null);
  const [revealedSymbols, setRevealedSymbols] = useState([]);
  const [allRevealed, setAllRevealed] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Интро анимация
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Проверяем, все ли символы раскрыты
  useEffect(() => {
    if (revealedSymbols.length === SYMBOLS.length && !allRevealed) {
      setAllRevealed(true);
      // Показываем финальное послание через секунду
      setTimeout(() => {
        setShowMessage(true);
      }, 1000);
    }
  }, [revealedSymbols, allRevealed]);

  const handleSymbolClick = (symbolId) => {
    if (!revealedSymbols.includes(symbolId)) {
      setRevealedSymbols([...revealedSymbols, symbolId]);
    }
    // На мобильных устройствах устанавливаем выбранный символ
    if (isMobile) {
      setSelectedSymbol(symbolId);
    }
  };

  return (
    <main className={styles.universe}>
      <StarField />
      <AnimatedBackground />
      
      {/* Intro Screen */}
      {showIntro && (
        <div className={styles.intro}>
          <div className={styles.introContent}>
            <h1 className={styles.introTitle}>Гаухар</h1>
            <p className={styles.introSubtitle}>Это послание от твоего Саввы...</p>
            <div className={styles.loadingAnimation}>
              <div className={styles.heartbeat}></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Universe */}
      <div className={`${styles.content} ${showIntro ? styles.hidden : ''}`}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.titleText}>Моя любимая Гаухар</span>
          </h1>
          <p className={styles.subtitle}>
            Нажми на каждый символ, чтобы открыть моё послание...
          </p>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(revealedSymbols.length / SYMBOLS.length) * 100}%` }}
            />
            <span className={styles.progressText}>
              {revealedSymbols.length} / {SYMBOLS.length} посланий
            </span>
          </div>
        </header>

        {/* Floating Symbols */}
        <div className={styles.symbolsContainer}>
          {SYMBOLS.map((symbol, index) => (
            <LoveSymbol
              key={symbol.id}
              symbol={symbol}
              index={index}
              isHovered={hoveredSymbol === symbol.id}
              isRevealed={revealedSymbols.includes(symbol.id)}
              onHover={setHoveredSymbol}
              onClick={() => handleSymbolClick(symbol.id)}
            />
          ))}
        </div>

        {/* Hint when hovering */}
        {hoveredSymbol && !revealedSymbols.includes(hoveredSymbol) && (
          <div className={styles.hintOverlay}>
            <p className={styles.hintText}>
              Нажми, чтобы открыть послание из «{SYMBOLS.find(s => s.id === hoveredSymbol)?.movie}»
            </p>
          </div>
        )}

        {/* Mobile message display area */}
        {isMobile && selectedSymbol && (
          <div className={styles.mobileMessageArea}>
            <div className={styles.mobileMessageCard}>
              <span className={styles.mobileMovieBadge}>
                {SYMBOLS.find(s => s.id === selectedSymbol)?.movie}
              </span>
              <p className={styles.mobilePhrase}>
                {SYMBOLS.find(s => s.id === selectedSymbol)?.phrase}
              </p>
            </div>
          </div>
        )}

        {/* All Revealed Celebration */}
        {allRevealed && !showMessage && (
          <div className={styles.celebration}>
            <div className={styles.celebrationAnimation}>
              <div className={styles.sparkles}></div>
            </div>
            <p>Все послания открыты!</p>
          </div>
        )}

        {/* Footer */}
        <footer className={styles.footer}>
          <p className={styles.footerText}>
            С любовью от твоего <span className={styles.savvaName}>Саввы</span>
          </p>
        </footer>

        {/* Additional Pages Buttons */}
        <div className={styles.pagesButtons}>
          <button 
            className={styles.pageButton}
            onClick={() => setShowMemories(true)}
          >
            <span className={styles.buttonText}>Наши воспоминания</span>
          </button>
          <button 
            className={styles.pageButton}
            onClick={() => setShowReasons(true)}
          >
            <span className={styles.buttonText}>Почему я люблю тебя</span>
          </button>
        </div>
      </div>

      {/* Final Love Message */}
      {showMessage && (
        <LoveMessage onClose={() => setShowMessage(false)} />
      )}

      {/* Memory Gallery */}
      {showMemories && (
        <MemoryGallery onClose={() => setShowMemories(false)} />
      )}

      {/* Reasons List */}
      {showReasons && (
        <ReasonsList onClose={() => setShowReasons(false)} />
      )}
    </main>
  );
}
