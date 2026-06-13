import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useLenis
 * Initializes a single global Lenis smooth-scroll instance and drives it from
 * GSAP's ticker so Lenis and ScrollTrigger stay perfectly in sync.
 *
 * Respects `prefers-reduced-motion` — when the user opts out of motion, Lenis
 * is not started and native scrolling is left untouched.
 *
 * @returns {React.MutableRefObject<Lenis|null>} ref to the live Lenis instance
 */
const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Honor reduced-motion preference — skip smooth scroll entirely.
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger updated on every Lenis scroll.
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker (single rAF loop for both libs).
    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
};

export default useLenis;
