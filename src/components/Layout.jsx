import { Outlet } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import CustomCursor from './ui/CustomCursor';
import ScrollProgress from './ui/ScrollProgress';
import PerformanceMonitor from './ui/PerformanceMonitor';
import AccessibilityOverlay from './ui/AccessibilityOverlay';
import KeyboardShortcuts from './ui/KeyboardShortcuts';
import SimpleBackground from './ui/SimpleBackground';
import ThemeToggle from './ui/ThemeToggle';
import MusicPlayer from './ui/MusicPlayer';
import ResponsiveNavigation from './ui/ResponsiveNavigation';

const Layout = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200'
    }`}>
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Accessibility Overlay */}
      <AccessibilityOverlay />
      
      {/* Keyboard Shortcuts Help */}
      <KeyboardShortcuts />
      
      {/* Performance Monitor (Development only) */}
      <PerformanceMonitor isDevelopment={import.meta.env.DEV} />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Background Effects */}
      <SimpleBackground isDark={isDark} />
      
      {/* Gradient Overlay */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-500 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-violet-900/50' 
          : 'bg-gradient-to-br from-emerald-900/20 via-emerald-800/15 to-emerald-700/25'
      }`} />

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Navigation */}
      <ResponsiveNavigation />

      {/* Main Content */}
      <main id="main" className="relative z-10">
        <Outlet />
      </main>

      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
};

export default Layout;
