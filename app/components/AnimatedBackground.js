'use client';

import { useEffect, useState } from 'react';
import styles from './AnimatedBackground.module.css';

export default function AnimatedBackground() {
  const [particles, setParticles] = useState([]);
  const [orbs, setOrbs] = useState([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20,
      size: 2 + Math.random() * 4
    }));
    setParticles(newParticles);

    // Generate glowing orbs
    const newOrbs = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 20 + Math.random() * 15,
      size: 100 + Math.random() * 200,
      color: ['#FF6B9D', '#9B59B6', '#FFB347', '#9AE66E', '#F7DC6F'][i % 5]
    }));
    setOrbs(newOrbs);
  }, []);

  return (
    <div className={styles.container}>
      {/* Glowing orbs */}
      <div className={styles.orbsLayer}>
        {orbs.map(orb => (
          <div
            key={orb.id}
            className={styles.orb}
            style={{
              left: `${orb.left}%`,
              top: `${orb.top}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              background: `radial-gradient(circle, ${orb.color}40 0%, transparent 70%)`,
              animationDelay: `${orb.delay}s`,
              animationDuration: `${orb.duration}s`
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className={styles.particlesLayer}>
        {particles.map(particle => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      {/* Scanning light effect */}
      <div className={styles.scanningLight} />
      
      {/* Gradient waves */}
      <div className={styles.wave1} />
      <div className={styles.wave2} />
      <div className={styles.wave3} />
    </div>
  );
}
