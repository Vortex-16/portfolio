import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useGsapReveal
 * GSAP ScrollTrigger-powered reveal for a grid/list of items. Any descendant
 * of the returned container ref that carries the `selector` class is animated
 * in with a batched stagger as it enters the viewport — staying in sync with
 * Lenis smooth scroll (both run off GSAP's ticker).
 *
 * Respects `prefers-reduced-motion`: items are simply shown with no animation.
 *
 * @param {object}  opts
 * @param {string}  [opts.selector='.gsap-reveal'] - class of items to reveal
 * @param {number}  [opts.y=40]                     - mobile initial vertical offset (px)
 * @param {number}  [opts.x=90]                     - desktop initial horizontal offset (px, from right)
 * @param {number}  [opts.duration=0.7]
 * @param {number}  [opts.stagger=0.08]
 * @param {string}  [opts.start='top 88%']          - ScrollTrigger start
 * @param {Array}   [opts.deps=[]]                  - re-run when these change
 * @returns {React.RefObject} containerRef — attach to the wrapper element
 */
const useGsapReveal = ({
  selector = '.gsap-reveal',
  y = 40,
  x = 90,
  duration = 0.7,
  stagger = 0.08,
  start = 'top 88%',
  deps = [],
} = {}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = el.querySelectorAll(selector);
    if (!items.length) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      gsap.set(items, { opacity: 1, x: 0, y: 0, clearProps: 'transform' });
      return;
    }

    const mm = gsap.matchMedia();

    // Shared batch reveal factory — `from` decides the entrance direction.
    const buildReveal = (from) => () => {
      const ctx = gsap.context(() => {
        gsap.set(items, { opacity: 0, willChange: 'transform, opacity', ...from });

        ScrollTrigger.batch(items, {
          start,
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              x: 0,
              y: 0,
              duration,
              stagger,
              ease: 'power3.out',
              overwrite: true,
              onComplete: () => gsap.set(batch, { willChange: 'auto' }),
            }),
        });
      }, el);

      ScrollTrigger.refresh();
      return () => ctx.revert();
    };

    // Desktop / laptop: cards slide in from the right (right → left).
    mm.add('(min-width: 1024px)', buildReveal({ x, y: 0 }));
    // Mobile / tablet: keep the original bottom → top reveal.
    mm.add('(max-width: 1023px)', buildReveal({ y, x: 0 }));

    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
};

export default useGsapReveal;
