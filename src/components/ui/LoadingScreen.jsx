import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../hooks/useTheme';

const LoadingScreen = ({ onComplete, onLoadingComplete }) => {
  const { isDark } = useTheme();
  const loadingRef = useRef(null);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState('initializing');
  const [binaryStream, setBinaryStream] = useState('');
  const [hexStream, setHexStream] = useState('');
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showUnmutePrompt, setShowUnmutePrompt] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  const handleComplete = onLoadingComplete || onComplete;

  // Generate random binary string
  const generateBinary = useCallback(() => {
    return Array.from({ length: 32 }, () => Math.round(Math.random())).join('');
  }, []);

  // Generate random hex string
  const generateHex = useCallback(() => {
    return Array.from({ length: 8 }, () => 
      Math.floor(Math.random() * 16).toString(16).toUpperCase()
    ).join('');
  }, []);

  // Loading phases text
  const loadingPhases = {
    initializing: 'INITIALIZING SYSTEM...',
    components: 'LOADING COMPONENTS...',
    assets: 'FETCHING ASSETS...',
    github: 'CONNECTING TO GITHUB...',
    ui: 'RENDERING UI...',
    finalizing: 'FINALIZING...',
    complete: 'SYSTEM READY'
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Binary/Hex stream animation
  useEffect(() => {
    const interval = setInterval(() => {
      setBinaryStream(generateBinary());
      setHexStream(generateHex());
    }, 50);
    return () => clearInterval(interval);
  }, [generateBinary, generateHex]);

  // Preload video for wide screens
  useEffect(() => {
    if (isWideScreen && videoRef.current) {
      videoRef.current.load();
    }
  }, [isWideScreen]);

  // Main loading logic
  useEffect(() => {
    const preloadAssets = async () => {
      setProgress(0);
      setLoadingPhase('initializing');

      // Step 1: Load Homepage (0-15%)
      setLoadingPhase('components');
      await import('../Homepage');
      setProgress(15);
      await new Promise(resolve => setTimeout(resolve, 120));

      // Step 2: Load About page (15-25%)
      await import('../About');
      setProgress(25);
      await new Promise(resolve => setTimeout(resolve, 120));

      // Step 3: Load Projects page with GitHub API (25-50%)
      setLoadingPhase('github');
      await import('../Projects');
      try {
        const response = await fetch('https://api.github.com/users/Vortex-16/repos?sort=updated&per_page=10');
        await response.json();
      } catch (error) {
        console.log('GitHub API preload failed, will retry on page');
      }
      setProgress(50);
      await new Promise(resolve => setTimeout(resolve, 120));

      // Step 4: Load Contact page (50-60%)
      setLoadingPhase('components');
      await import('../Contact');
      setProgress(60);
      await new Promise(resolve => setTimeout(resolve, 120));

      // Step 5: Load OS Journey page (60-70%)
      await import('../OSJourney');
      setProgress(70);
      await new Promise(resolve => setTimeout(resolve, 120));

      // Step 6: Load images and assets (70-85%)
      setLoadingPhase('assets');
      const images = [
        '/PofileNew.jpeg',
        '/alpha.png',
        '/CantLaLa.mp3',
        '/portfolio.mp3',
        '/conci.mp3'
      ];

      const imagePromises = images.map(src => {
        return new Promise((resolve) => {
          if (src.endsWith('.mp3')) {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.oncanplaythrough = resolve;
            audio.onerror = resolve;
            audio.src = src;
          } else {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve;
            img.src = src;
          }
        });
      });

      await Promise.all(imagePromises);
      setProgress(85);
      await new Promise(resolve => setTimeout(resolve, 120));

      // Step 7: Initialize UI components (85-95%)
      setLoadingPhase('ui');
      await import('./MusicPlayer');
      await import('./CustomCursor');
      await import('./AnimatedBackground');
      setProgress(95);
      await new Promise(resolve => setTimeout(resolve, 120));

      // Step 8: Final preparation (95-100%)
      setLoadingPhase('finalizing');
      await new Promise(resolve => setTimeout(resolve, 150));
      setProgress(100);
      setLoadingPhase('complete');
      await new Promise(resolve => setTimeout(resolve, 400));
    };

    const startLoading = async () => {
      try {
        if (isWideScreen && videoRef.current) {
          preloadAssets()
            .then(() => setAssetsLoaded(true))
            .catch(err => {
              console.error('Asset preloading error:', err);
              setAssetsLoaded(true);
            });
          return;
        }

        await preloadAssets();
        setAssetsLoaded(true);
        setIsTransitioning(true);

        gsap.to(loadingRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            if (handleComplete) {
              setTimeout(() => handleComplete(), 100);
            }
          }
        });
      } catch (error) {
        console.error('Loading error:', error);
        if (handleComplete) handleComplete();
      }
    };

    startLoading();
  }, [handleComplete, isWideScreen]);

  // Handle video end for wide screens
  const handleVideoEnd = () => {
    const completeTransition = () => {
      setIsTransitioning(true);
      
      if (loadingRef.current) {
        gsap.to(loadingRef.current, {
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
          onComplete: () => {
            if (handleComplete) {
              setTimeout(() => handleComplete(), 100);
            }
          }
        });
      }
    };

    if (assetsLoaded) {
      completeTransition();
    } else {
      let checkCount = 0;
      const maxChecks = 100;
      const checkInterval = setInterval(() => {
        checkCount++;
        if (assetsLoaded || checkCount >= maxChecks) {
          clearInterval(checkInterval);
          completeTransition();
        }
      }, 100);
    }
  };

  // Handle video loaded
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    
    if (videoRef.current) {
      videoRef.current.volume = 0.7;
      
      videoRef.current.play().catch(err => {
        console.error('Video play failed:', err);
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play()
            .then(() => setTimeout(() => setShowUnmutePrompt(true), 1000))
            .catch(e => {
              console.error('Muted play failed:', e);
              setVideoError(true);
            });
        }
      });
    }
  };

  // Handle unmute button click
  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.7;
      setShowUnmutePrompt(false);
    }
  };

  // Handle video error
  const handleVideoError = () => {
    console.error('Video failed to load');
    setVideoError(true);
    setIsWideScreen(false);
  };

  return (
    <div
      ref={loadingRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${isTransitioning ? 'pointer-events-none' : ''
        } ${isDark ? 'bg-[#0a0a0f]' : 'bg-[#f0fdf4]'}`}
      style={{
        willChange: 'opacity',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(5, 150, 105, 0.3)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(5, 150, 105, 0.3)'} 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Scan Line */}
        <div 
          className={`absolute left-0 right-0 h-[2px] ${isDark ? 'bg-purple-500/20' : 'bg-emerald-500/20'}`}
          style={{
            animation: 'scan 3s linear infinite',
            boxShadow: isDark 
              ? '0 0 20px rgba(168, 85, 247, 0.4)' 
              : '0 0 20px rgba(5, 150, 105, 0.4)'
          }}
        />
      </div>

      {/* Video for wide screens (PC/Tablet) */}
      {isWideScreen ? (
        <>
          {!videoLoaded && !videoError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`font-lexa text-7xl md:text-8xl font-bold mb-8 ${isDark
                    ? 'text-white'
                    : 'text-gray-900'
                  }`}
                  style={{
                    textShadow: isDark 
                      ? '0 0 40px rgba(168, 85, 247, 0.4)' 
                      : '0 0 40px rgba(5, 150, 105, 0.3)'
                  }}>
                  VIKASH
                </div>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            className={`w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundColor: isDark ? '#0a0a0f' : '#f0fdf4', objectFit: 'cover' }}
            preload="auto"
            playsInline
            onLoadedData={handleVideoLoaded}
            onCanPlayThrough={handleVideoLoaded}
            onEnded={handleVideoEnd}
            onError={handleVideoError}
          >
            <source src="/assets/Loading.mp4" type="video/mp4" />
          </video>

          {showUnmutePrompt && videoLoaded && (
            <button
              onClick={handleUnmute}
              className={`absolute bottom-8 right-8 px-6 py-3 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-2 font-monorama ${isDark
                  ? 'text-purple-300 hover:text-purple-400'
                  : 'text-emerald-600 hover:text-emerald-700'
                } font-semibold hover:bg-white/20`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              UNMUTE
            </button>
          )}

          {/* Loading indicator during video */}
          {videoLoaded && !assetsLoaded && (
            <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2 px-5 py-3 rounded-xl backdrop-blur-md bg-black/40 border border-white/10">
              <div className="flex items-baseline gap-1">
                <span className={`font-monorama text-4xl font-bold tabular-nums ${isDark ? 'text-purple-400' : 'text-emerald-500'}`}>
                  {String(progress).padStart(3, '0')}
                </span>
                <span className={`font-monorama text-lg ${isDark ? 'text-purple-400/60' : 'text-emerald-500/60'}`}>%</span>
              </div>
              <div className={`font-monorama text-[10px] tracking-wider opacity-60 ${isDark ? 'text-purple-300' : 'text-emerald-600'}`}>
                {binaryStream.slice(0, 20)}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Mobile Loading Screen - Modern Design */
        <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 md:p-10">
          {/* Top Section - Name */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Decorative Lines */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`h-[1px] w-12 sm:w-16 ${isDark ? 'bg-purple-500/50' : 'bg-emerald-500/50'}`}></div>
              <span className={`font-monorama text-[10px] sm:text-xs tracking-[0.3em] uppercase ${isDark ? 'text-purple-400/60' : 'text-emerald-600/60'}`}>
                PORTFOLIO
              </span>
              <div className={`h-[1px] w-12 sm:w-16 ${isDark ? 'bg-purple-500/50' : 'bg-emerald-500/50'}`}></div>
            </div>

            {/* Main Name with Lexa Font */}
            <h1 
              className={`font-lexa text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{
                textShadow: isDark 
                  ? '0 0 60px rgba(168, 85, 247, 0.3), 0 0 100px rgba(168, 85, 247, 0.1)' 
                  : '0 0 60px rgba(5, 150, 105, 0.2), 0 0 100px rgba(5, 150, 105, 0.1)'
              }}
            >
              VIKASH
            </h1>

            {/* Subtitle */}
            <p className={`font-monorama text-xs sm:text-sm mt-4 tracking-[0.15em] sm:tracking-[0.2em] ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              DEVELOPER • CREATOR • EXPLORER
            </p>
          </div>

          {/* Bottom Right Section - Loading Counter & Binary */}
          <div className="flex justify-end">
            <div className="text-right space-y-2 sm:space-y-3">
              {/* Progress Counter */}
              <div className="flex items-end justify-end gap-1">
                <span 
                  className={`font-monorama text-5xl sm:text-6xl md:text-7xl font-bold tabular-nums ${isDark ? 'text-purple-400' : 'text-emerald-600'}`}
                  style={{
                    textShadow: isDark 
                      ? '0 0 30px rgba(168, 85, 247, 0.5)' 
                      : '0 0 30px rgba(5, 150, 105, 0.4)'
                  }}
                >
                  {String(progress).padStart(3, '0')}
                </span>
                <span className={`font-monorama text-xl sm:text-2xl font-medium mb-1 sm:mb-2 ${isDark ? 'text-purple-400/60' : 'text-emerald-600/60'}`}>
                  %
                </span>
              </div>

              {/* Loading Phase Text */}
              <div className={`font-monorama text-[10px] sm:text-xs tracking-wider ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                {loadingPhases[loadingPhase]}
              </div>

              {/* Progress Bar */}
              <div className={`h-[2px] w-full max-w-[200px] sm:max-w-[250px] ml-auto ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                <div 
                  className={`h-full transition-all duration-200 ease-out ${isDark 
                      ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600' 
                      : 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500'
                    }`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Binary Stream */}
              <div className={`font-monorama text-[9px] sm:text-[10px] tracking-widest overflow-hidden ${isDark ? 'text-purple-500/30' : 'text-emerald-500/30'}`}>
                {binaryStream}
              </div>

              {/* Hex Stream */}
              <div className="flex items-center justify-end gap-2">
                <span className={`font-monorama text-[9px] sm:text-[10px] ${isDark ? 'text-gray-700' : 'text-gray-300'}`}>
                  0x
                </span>
                <span className={`font-monorama text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] ${isDark ? 'text-purple-400/50' : 'text-emerald-500/50'}`}>
                  {hexStream}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
