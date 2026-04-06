import { useEffect, useRef } from 'react';

/**
 * useScrollReveal
 * Attaches an IntersectionObserver to a container ref.
 * Any child element with class `scroll-reveal` will get class `visible`
 * added when it enters the viewport.
 *
 * @param {object} options - IntersectionObserver options
 * @returns {React.RefObject} containerRef — attach to your section wrapper
 */
const useScrollReveal = (options = {}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const defaults = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
    const config = { ...defaults, ...options };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    }, config);

    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll('.scroll-reveal');
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  return containerRef;
};

export default useScrollReveal;
