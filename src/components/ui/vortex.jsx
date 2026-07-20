import React, { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';
import { motion } from 'framer-motion';

export const Vortex = ({
  children,
  className = '',
  containerClassName = '',
  particleCount = 700,
  rangeY = 100,
  baseHue = 220,
  baseSpeed = 0.0,
  rangeSpeed = 1.5,
  baseRadius = 1,
  rangeRadius = 2,
  backgroundColor = 'transparent',
  isDark = true,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const noise3D = createNoise3D();

  const particlePropsLength = 9;
  const particleRadius = baseRadius;
  const particleRangeRadius = rangeRadius;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let tick = 0;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleProps = new Float32Array(particleCount * particlePropsLength);

    const initParticle = (i) => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const vx = 0;
      const vy = 0;
      const life = 0;
      const ttl = 100 + Math.random() * 200;
      const speed = baseSpeed + Math.random() * rangeSpeed;
      const radius = particleRadius + Math.random() * particleRangeRadius;
      const hue = baseHue + Math.random() * 100;

      particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    };

    for (let i = 0; i < particleCount * particlePropsLength; i += particlePropsLength) {
      initParticle(i);
    }

    const drawParticle = (x, y, x2, y2, life, ttl, radius, hue) => {
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineWidth = radius;
      // Dark mode: bright luminous hues; Light mode: rich deep tones with lower opacity to prevent text washout
      const alpha = isDark ? (1 - life / ttl) * 0.7 : (1 - life / ttl) * 0.35;
      const lightness = isDark ? '65%' : '38%';
      ctx.strokeStyle = `hsla(${hue}, 80%, ${lightness}, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    };

    const updateParticle = (i) => {
      let x = particleProps[i];
      let y = particleProps[i + 1];
      let vx = particleProps[i + 2];
      let vy = particleProps[i + 3];
      let life = particleProps[i + 4];
      const ttl = particleProps[i + 5];
      const speed = particleProps[i + 6];
      const radius = particleProps[i + 7];
      const hue = particleProps[i + 8];

      const n = noise3D(x * 0.0015, y * 0.0015, tick * 0.0015) * Math.PI * 2;
      vx = Math.cos(n) * speed;
      vy = Math.sin(n) * speed;

      const x2 = x + vx;
      const y2 = y + vy;

      drawParticle(x, y, x2, y2, life, ttl, radius, hue);

      life++;

      particleProps[i] = x2;
      particleProps[i + 1] = y2;
      particleProps[i + 2] = vx;
      particleProps[i + 3] = vy;
      particleProps[i + 4] = life;

      if (x2 < 0 || x2 > width || y2 < 0 || y2 > height || life > ttl) {
        initParticle(i);
      }
    };

    const render = () => {
      tick++;
      if (backgroundColor === 'transparent') {
        ctx.fillStyle = isDark ? 'rgba(15, 15, 22, 0.2)' : 'rgba(236, 253, 245, 0.25)';
      } else {
        ctx.fillStyle = backgroundColor;
      }
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particleCount * particlePropsLength; i += particlePropsLength) {
        updateParticle(i);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, baseHue, baseSpeed, rangeSpeed, baseRadius, rangeRadius, backgroundColor, isDark]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${containerClassName}`} ref={containerRef}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`relative z-10 ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Vortex;
