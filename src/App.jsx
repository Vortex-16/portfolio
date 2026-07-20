import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { MusicProvider } from './hooks/useMusicPlayer';

// Static imports for always-needed shell components
import LoadingScreen from './components/ui/LoadingScreen';
import Layout from './components/layout/Layout';

// Lazy-loaded page routes — each page ships as its own JS chunk.
// Vite will only fetch a page's code when the user first navigates to it.
const Homepage = lazy(() => import('./components/pages/Homepage'));
const About    = lazy(() => import('./components/pages/About'));
const Projects = lazy(() => import('./components/pages/Projects'));
const OSJourney = lazy(() => import('./components/pages/OSJourney'));
const Contact  = lazy(() => import('./components/pages/Contact'));

// Minimal suspense fallback — just keeps the layout from flashing.
// The LoadingScreen handles the real first-load experience.
const PageFallback = () => (
  <div className="min-h-screen" aria-hidden="true" />
);

const AppContent = () => {
  // Skip boot on return visits
  const [isLoading, setIsLoading] = useState(
    () => !localStorage.getItem('vk_visited')
  );

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
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Homepage />} />
                <Route path="about" element={<About />} />
                <Route path="projects" element={<Projects />} />
                <Route path="os-journey" element={<OSJourney />} />
                <Route path="contact" element={<Contact />} />
              </Route>
            </Routes>
          </Suspense>
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
