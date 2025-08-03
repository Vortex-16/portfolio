import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './hooks/useTheme';

// Components
import LoadingScreen from './components/ui/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import PerformanceMonitor from './components/ui/PerformanceMonitor';
import AccessibilityOverlay from './components/ui/AccessibilityOverlay';
import KeyboardShortcuts from './components/ui/KeyboardShortcuts';
import SimpleBackground from './components/ui/SimpleBackground';
import ThemeToggle from './components/ui/ThemeToggle';
import ResponsiveNavigation from './components/ui/ResponsiveNavigation';
import InteractiveTerminal from './components/ui/InteractiveTerminal';
import FloatingActionMenu from './components/ui/FloatingActionMenu';
import Homepage from './components/Homepage';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

const AppContent = () => {
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [showTerminal, setShowTerminal] = useState(false);

  // Handle scroll-based section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTerminalToggle = () => {
    setShowTerminal(!showTerminal);
  };

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

      {/* Main Content */}
      <main id="main" className="relative z-10">
        <Homepage />
        <About />
        <Projects />
        <Contact />
      </main>

      {/* Navigation */}
      <ResponsiveNavigation 
        activeSection={activeSection} 
        onNavigate={setActiveSection}
      />

      {/* Conditional Terminal */}
      {showTerminal && <InteractiveTerminal onClose={() => setShowTerminal(false)} />}

      {/* Floating Action Menu with Games */}
      <FloatingActionMenu onTerminalToggle={handleTerminalToggle} />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
