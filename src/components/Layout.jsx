import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import CustomCursor from './ui/CustomCursor';
import ScrollProgress from './ui/ScrollProgress';
import PerformanceMonitor from './ui/PerformanceMonitor';
import AccessibilityOverlay from './ui/AccessibilityOverlay';
import KeyboardShortcuts from './ui/KeyboardShortcuts';
import ThemeToggle from './ui/ThemeToggle';
import MusicPlayer from './ui/MusicPlayer';
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
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200'
    }`}>
      <ScrollProgress />
      <AccessibilityOverlay />
      <KeyboardShortcuts />
      <PerformanceMonitor isDevelopment={import.meta.env.DEV} />
      <CustomCursor />
      
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-500 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-violet-900/50' 
          : 'bg-gradient-to-br from-emerald-900/20 via-emerald-800/15 to-emerald-700/25'
      }`} />

      <ThemeToggle />
      <ResponsiveNavigation />

      <main id="main" className="relative z-10">
        <Outlet />
      </main>

      <MusicPlayer />
    </div>
  );
};

export default Layout;
