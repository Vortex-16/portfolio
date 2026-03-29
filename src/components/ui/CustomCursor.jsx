import { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';

const CustomCursor = () => {
  const { isDark } = useTheme();
  const dotRef = useRef(null);
  const diamondRef = useRef(null);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice.current) return;

    document.body.classList.add('custom-cursor');

    const dot = dotRef.current;
    const diamond = diamondRef.current;
    if (!dot || !diamond) return;

    // Diamond tail — lags slightly behind for feel
    let tailX = -100, tailY = -100;
    let rawX = -100, rawY = -100;
    let animFrame;

    const onMove = (e) => {
      rawX = e.clientX;
      rawY = e.clientY;
      // Dot: direct DOM transform — literally zero lag
      dot.style.transform = `translate(${rawX}px, ${rawY}px) translate(-50%, -50%)`;
    };

    const checkHover = (el) =>
      el?.closest?.('a, button, input, textarea, select, [role="button"], .cursor-pointer, [tabindex]:not([tabindex="-1"])');

    const onOver = (e) => {
      if (checkHover(e.target)) {
        diamond.style.width = '26px';
        diamond.style.height = '26px';
        diamond.style.rotate = '0deg';
        diamond.style.opacity = '1';
        dot.style.transform = `translate(${rawX}px, ${rawY}px) translate(-50%, -50%) scale(0.6)`;
      } else {
        diamond.style.width = '20px';
        diamond.style.height = '20px';
        diamond.style.rotate = '45deg';
        diamond.style.opacity = '0.8';
        dot.style.transform = `translate(${rawX}px, ${rawY}px) translate(-50%, -50%) scale(1)`;
      }
    };

    const onDown = () => {
      diamond.style.width = '14px';
      diamond.style.height = '14px';
      diamond.style.opacity = '0.5';
    };

    const onUp = (e) => {
      const isHov = checkHover(e.target);
      diamond.style.width = isHov ? '26px' : '20px';
      diamond.style.height = isHov ? '26px' : '20px';
      diamond.style.rotate = isHov ? '0deg' : '45deg';
      diamond.style.opacity = '0.8';
    };

    // Diamond easing loop — runs on RAF, no spring overhead
    const easeAmount = 0.18; // Lower = more lag (trail), higher = snappier
    const loop = () => {
      tailX += (rawX - tailX) * easeAmount;
      tailY += (rawY - tailY) * easeAmount;
      diamond.style.transform = `translate(${tailX}px, ${tailY}px) translate(-50%, -50%)`;
      animFrame = requestAnimationFrame(loop);
    };
    animFrame = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      document.body?.classList.remove('custom-cursor');
      cancelAnimationFrame(animFrame);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  // Update colors when theme changes
  useEffect(() => {
    const dot = dotRef.current;
    const diamond = diamondRef.current;
    if (!dot || !diamond) return;
    const accent = isDark ? '#89dceb' : '#059669';
    dot.style.backgroundColor = accent;
    diamond.style.borderColor = accent;
    dot.style.boxShadow = isDark
      ? '0 0 8px 2px rgba(137,220,235,0.4)'
      : '0 0 8px 2px rgba(5,150,105,0.3)';
  }, [isDark]);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  const accent = isDark ? '#89dceb' : '#059669';

  return (
    <>
      {/* Precision dot — raw DOM, zero lag */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: accent,
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          boxShadow: isDark
            ? '0 0 8px 2px rgba(137,220,235,0.4)'
            : '0 0 8px 2px rgba(5,150,105,0.3)',
          transition: 'width 0.1s, height 0.1s',
        }}
      />
      {/* Diamond — eased trail via RAF */}
      <div
        ref={diamondRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          border: `2px solid ${accent}`,
          borderRadius: 2,
          rotate: '45deg',
          opacity: 0.8,
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
          transition: 'width 0.15s ease, height 0.15s ease, rotate 0.2s ease, opacity 0.15s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;
