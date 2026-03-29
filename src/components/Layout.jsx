import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import ScrollProgress from './ui/ScrollProgress';
import InteractiveDotGrid from './ui/InteractiveDotGrid';
import PerformanceMonitor from './ui/PerformanceMonitor';
import AccessibilityOverlay from './ui/AccessibilityOverlay';
import KeyboardShortcuts from './ui/KeyboardShortcuts';
import ThemeToggle from './ui/ThemeToggle';
import ResponsiveNavigation from './ui/ResponsiveNavigation';

const Layout = () => {
  const { isDark } = useTheme();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

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
    </div>
  );
};

export default Layout;
