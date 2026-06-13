import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import useLenis from '../../hooks/useLenis';
import ScrollProgress from '../ui/ScrollProgress';
import InteractiveDotGrid from '../ui/InteractiveDotGrid';
import PerformanceMonitor from '../ui/PerformanceMonitor';
import AccessibilityOverlay from '../ui/AccessibilityOverlay';
import KeyboardShortcuts from '../ui/KeyboardShortcuts';
import ThemeToggle from '../ui/ThemeToggle';
import ResponsiveNavigation from '../ui/ResponsiveNavigation';
import AskVikash from '../ui/AskVikash';

const Layout = () => {
  const { isDark, brightness } = useTheme();
  const location = useLocation();
  const lenisRef = useLenis();

  useEffect(() => {
    // Scroll to top on route change — go through Lenis when available so the
    // smooth-scroll engine stays in sync, otherwise fall back to native.
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location.pathname, lenisRef]);

  return (
    <div
      className={`min-h-screen transition-all duration-500 relative ${isDark
        ? 'bg-[#0f0f0f]'
        : 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200'
        }`}
    >
      <ScrollProgress />
      <AccessibilityOverlay />
      <KeyboardShortcuts />
      <PerformanceMonitor isDevelopment={import.meta.env.DEV} />

      {/* Global Background overlay */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-500 -z-20 ${isDark
        ? 'bg-[#0f0f0f]' // Plain Arch Black
        : 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200'
        }`} />

      {/* Interactive Dot Grid Background - Only for non-home pages */}
      {location.pathname !== '/' && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <InteractiveDotGrid />
        </div>
      )}


      <ResponsiveNavigation />

      <main id="main" className="relative z-10 pb-24 lg:pb-0">
        <Outlet />
      </main>

      <AskVikash />

      {/* Screen-brightness dimmer — driven by the Control Centre slider.
          A pointer-events-none overlay (instead of a CSS filter on <html>,
          which would break every position:fixed element). Sits below the
          control panel (z-100) so the panel stays readable while you adjust. */}
      <div
        aria-hidden
        className="fixed inset-0 z-[60] pointer-events-none bg-black transition-opacity duration-150"
        style={{ opacity: Math.min(0.85, Math.max(0, (100 - (brightness ?? 100)) / 100)) }}
      />
    </div>
  );
};

export default Layout;
