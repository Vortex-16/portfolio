// Route preloader utility to ensure instant page transitions across the portfolio.
// Chunks are prefetched on user intent (hover/focus/touch) and progressively in background idle time.

export const routeImporters = {
  '/': () => import('../components/pages/Homepage'),
  '/about': () => import('../components/pages/About'),
  '/journey': () => import('../components/pages/Journey'),
  '/projects': () => import('../components/pages/Projects'),
  '/os-journey': () => import('../components/pages/OSJourney'),
  '/contact': () => import('../components/pages/Contact'),
};

const preloadedRoutes = new Set();

/**
 * Preload a specific route chunk by pathname.
 * Idempotent: once fetched, subsequent calls are no-ops.
 */
export const preloadRoute = (path) => {
  const importer = routeImporters[path];
  if (importer && !preloadedRoutes.has(path)) {
    preloadedRoutes.add(path);
    importer().catch((err) => {
      // Allow retry if there was a network glitch
      preloadedRoutes.delete(path);
      if (import.meta.env.DEV) {
        console.warn(`[routePreloader] Failed to preload route "${path}":`, err);
      }
    });
  }
};

/**
 * Progressively preloads all route chunks during browser idle time so that
 * any navigation happens instantly with 0ms network latency.
 */
export const preloadAllRoutesIdle = () => {
  if (typeof window === 'undefined') return;

  const routesToPreload = ['/about', '/projects', '/journey', '/os-journey', '/contact'];

  const scheduleNext = (remaining) => {
    if (remaining.length === 0) return;
    const [current, ...rest] = remaining;

    preloadRoute(current);

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => scheduleNext(rest), { timeout: 2000 });
    } else {
      setTimeout(() => scheduleNext(rest), 350);
    }
  };

  // Wait 1.2s after initial page render to prioritize main page interactivity first
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => scheduleNext(routesToPreload), { timeout: 3000 });
  } else {
    setTimeout(() => scheduleNext(routesToPreload), 1200);
  }
};
