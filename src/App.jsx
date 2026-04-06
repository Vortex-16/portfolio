import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { MusicProvider } from './hooks/useMusicPlayer';

// Components
import LoadingScreen from './components/ui/LoadingScreen';
import Layout from './components/Layout';
import Homepage from './components/Homepage';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import OSJourney from './components/OSJourney';

// Preload all route components
const preloadRoutes = () => {
  // These imports will be cached by the browser
  import('./components/Homepage');
  import('./components/About');
  import('./components/Projects');
  import('./components/Contact');
  import('./components/OSJourney');
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
