import { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ThemeProvider, useTheme } from './hooks/useTheme';

// Components
import SimpleBackground from './components/ui/SimpleBackground';
import ThemeToggle from './components/ui/ThemeToggle';
import ResponsiveNavigation from './components/ui/ResponsiveNavigation';
import Homepage from './components/Homepage';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

const AppContent = () => {
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState('home');

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

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200'
    }`}>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Vikash Gupta - CSE Student & Developer Portfolio</title>
        <meta name="description" content="Portfolio of Vikash Gupta, a passionate 2nd-year Computer Science & Engineering student specializing in web development and software engineering." />
        <meta name="keywords" content="Vikash Gupta, CSE student, web developer, React, JavaScript, portfolio, computer science" />
        <meta name="author" content="Vikash Gupta" />
        <meta property="og:title" content="Vikash Gupta - CSE Student & Developer Portfolio" />
        <meta property="og:description" content="Passionate 2nd-year CSE student creating innovative solutions through code." />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/png" href="/fav.png" />
      </Helmet>

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
      <main className="relative z-10">
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
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
