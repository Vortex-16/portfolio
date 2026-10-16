import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { MusicProvider } from './hooks/useMusicPlayer';
import { routeImporters, preloadAllRoutesIdle } from './utils/routePreloader';

// Static imports for always-needed shell components
import LoadingScreen from './components/ui/LoadingScreen';
import Layout from './components/layout/Layout';

// Lazy-loaded page routes using shared importers so preloaded promises are reused
const Homepage = lazy(routeImporters['/']);
const About    = lazy(routeImporters['/about']);
const Journey  = lazy(routeImporters['/journey']);
const Projects = lazy(routeImporters['/projects']);
const OSJourney = lazy(routeImporters['/os-journey']);
const Contact  = lazy(routeImporters['/contact']);

// Top progress indicator for smooth non-blocking transitions
const PageFallback = () => (
  <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] overflow-hidden bg-transparent pointer-events-none" aria-hidden="true">
    <div className="h-full w-full bg-gradient-to-r from-emerald-400 via-teal-300 to-purple-500 animate-pulse duration-500" />
  </div>
);

const AppContent = () => {
  // Skip boot on return visits
  const [isLoading, setIsLoading] = useState(
    () => !localStorage.getItem('vk_visited')
  );

  // Preload all remaining route chunks in background idle time
  useEffect(() => {
    preloadAllRoutesIdle();
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

      {/* Main App */}
      <Router>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="about" element={<About />} />
              <Route path="journey" element={<Journey />} />
              <Route path="projects" element={<Projects />} />
              <Route path="os-journey" element={<OSJourney />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
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
