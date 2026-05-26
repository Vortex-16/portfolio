import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { MusicProvider } from './hooks/useMusicPlayer';

// Components
import LoadingScreen from './components/ui/LoadingScreen';
import Layout from './components/layout/Layout';
import Homepage from './components/pages/Homepage';
import Projects from './components/pages/Projects';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import OSJourney from './components/pages/OSJourney';

// Preload all route components
const preloadRoutes = () => {
  // These imports will be cached by the browser
  import('./components/pages/Homepage');
  import('./components/pages/About');
  import('./components/pages/Projects');
  import('./components/pages/Contact');
  import('./components/pages/OSJourney');
};

const AppContent = () => {
  // Skip boot on return visits
  const [isLoading, setIsLoading] = useState(
    () => !localStorage.getItem('vk_visited')
  );

  useEffect(() => {
    // Preload routes when app loads
    preloadRoutes();
  }, []);

  const handleLoadingComplete = () => {
    localStorage.setItem('vk_visited', '1');
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}

      {/* Main App - Only show when not loading */}
      {!isLoading && (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="about" element={<About />} />
              <Route path="projects" element={<Projects />} />
              <Route path="os-journey" element={<OSJourney />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </Router>
      )}
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <MusicProvider>
        <AppContent />
      </MusicProvider>
    </ThemeProvider>
  );
}

export default App;
