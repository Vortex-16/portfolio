import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../hooks/useTheme';

const LoadingScreen = ({ onComplete, onLoadingComplete }) => {
  const { isDark } = useTheme();
  const loadingRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showUnmutePrompt, setShowUnmutePrompt] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  const handleComplete = onLoadingComplete || onComplete;

  // Handle window resize to detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload video for wide screens
  useEffect(() => {
    if (isWideScreen && videoRef.current) {
      // Start loading the video immediately
      videoRef.current.load();
    }
  }, [isWideScreen]);

  useEffect(() => {
    // Preload all components and assets with detailed progress
    const preloadAssets = async () => {
      setProgress(0);

      // Step 1: Load Homepage (0-15%)
      setLoadingText('Loading Homepage...');
      await import('../Homepage');
      setProgress(15);
      await new Promise(resolve => setTimeout(resolve, 200));

      // Step 2: Load About page (15-25%)
      setLoadingText('Loading About page...');
      await import('../About');
      setProgress(25);
      await new Promise(resolve => setTimeout(resolve, 200));

      // Step 3: Load Projects page with GitHub API (25-50%)
      setLoadingText('Loading Projects...');
      await import('../Projects');
      // Preload GitHub data
      try {
        const response = await fetch('https://api.github.com/users/Vortex-16/repos?sort=updated&per_page=10');
        await response.json();
      } catch (error) {
        console.log('GitHub API preload failed, will retry on page');
      }
      setProgress(50);
      await new Promise(resolve => setTimeout(resolve, 200));

      // Step 4: Load Contact page (50-60%)
      setLoadingText('Loading Contact page...');
      await import('../Contact');
      setProgress(60);
      await new Promise(resolve => setTimeout(resolve, 200));

      // Step 5: Load OS Journey page (60-70%)
      setLoadingText('Loading OS Journey...');
      await import('../OSJourney');
      setProgress(70);
      await new Promise(resolve => setTimeout(resolve, 200));

      // Step 6: Load images and assets (70-85%)
      setLoadingText('Loading assets...');
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
            // Preload audio
            const audio = new Audio();
            audio.preload = 'auto';
            audio.oncanplaythrough = resolve;
            audio.onerror = resolve;
            audio.src = src;
          } else {
            // Preload image
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve;
            img.src = src;
          }
        });
      });

      await Promise.all(imagePromises);
      setProgress(85);
      await new Promise(resolve => setTimeout(resolve, 200));

      // Step 7: Initialize UI components (85-95%)
      setLoadingText('Initializing UI components...');
      await import('./MusicPlayer');
      await import('./CustomCursor');
      await import('./AnimatedBackground');
      setProgress(95);
      await new Promise(resolve => setTimeout(resolve, 200));

      // Step 8: Final preparation (95-100%)
      setLoadingText('Almost ready...');
      await new Promise(resolve => setTimeout(resolve, 300));
      setProgress(100);
      await new Promise(resolve => setTimeout(resolve, 300));
    };

    const startLoading = async () => {
      try {
        if (isWideScreen && videoRef.current) {
          // For wide screens: preload assets while video plays
          preloadAssets()
            .then(() => setAssetsLoaded(true))
            .catch(err => {
              console.error('Asset preloading error:', err);
              setAssetsLoaded(true);
            });
          return;
        }

        // For mobile screens: normal loading with progress
        await preloadAssets();
        setAssetsLoaded(true);
        setIsTransitioning(true);

        const tl = gsap.timeline();
        tl.to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5
        }).to(loadingRef.current, {
          opacity: 0,
          duration: 1.2,
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

    // Create floating particles only for mobile screens
    if (!isWideScreen) {
      const particles = [];
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = `absolute w-2 h-2 rounded-full ${
          isDark ? 'bg-purple-400' : 'bg-emerald-400'
        } opacity-60`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        if (loadingRef.current) {
          loadingRef.current.appendChild(particle);
          particles.push(particle);

          gsap.to(particle, {
            y: `random(-50, 50)`,
            x: `random(-50, 50)`,
            rotation: 360,
            duration: `random(2, 4)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        }
      }

      return () => {
        particles.forEach(particle => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        });
      };
    }
  }, [isDark, handleComplete, isWideScreen]);

  // Sync progress bar with progress state
  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [progress]);

  // Handle video end for wide screens
  const handleVideoEnd = () => {
    const completeTransition = () => {
      setIsTransitioning(true);
      
      if (loadingRef.current) {
        gsap.to(loadingRef.current, {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
          onComplete: () => {
            if (handleComplete) {
              setTimeout(() => handleComplete(), 100);
            }
          }
        });
      }
    };

    // If assets are already loaded, complete immediately
    if (assetsLoaded) {
      completeTransition();
    } else {
      // Wait for assets to load with timeout to prevent infinite wait
      let checkCount = 0;
      const maxChecks = 100; // 10 seconds max wait
      const checkInterval = setInterval(() => {
        checkCount++;
        if (assetsLoaded || checkCount >= maxChecks) {
          clearInterval(checkInterval);
          completeTransition();
        }
      }, 100);
    }
  };

  // Handle video loaded (can play through)
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    
    if (videoRef.current) {
      videoRef.current.volume = 0.7;
      
      videoRef.current.play().catch(err => {
        console.error('Video play failed:', err);
        // Fallback to muted autoplay if audio autoplay blocked
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
    // Fall back to mobile loading screen behavior
    setIsWideScreen(false);
  };

  return (
    <div
      ref={loadingRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${isTransitioning ? 'pointer-events-none' : ''
        } ${isDark
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'
          : 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200'
        }`}
      style={{
        willChange: 'opacity',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
    >
      {/* Video for wide screens (PC/Tablet) */}
      {isWideScreen ? (
        <>
          {/* Show loading placeholder while video loads */}
          {!videoLoaded && !videoError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-6xl font-black mb-8 ${isDark
                    ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400'
                    : 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800'
                  } bg-clip-text text-transparent animate-pulse`}>
                  VIKASH
                </div>
                <div className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Loading video...
                </div>
              </div>
            </div>
          )}

          {/* Video element */}
          <video
            ref={videoRef}
            className={`w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              backgroundColor: isDark ? '#1a0933' : '#d1fae5',
              objectFit: 'cover'
            }}
            preload="auto"
            playsInline
            onLoadedData={handleVideoLoaded}
            onCanPlayThrough={handleVideoLoaded}
            onEnded={handleVideoEnd}
            onError={handleVideoError}
          >
            <source src="/assets/Loading.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Unmute prompt if video is muted */}
          {showUnmutePrompt && videoLoaded && (
            <button
              onClick={handleUnmute}
              className={`absolute bottom-8 right-8 px-8 py-3 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_40px_rgba(0,0,0,0.2)] transition-all duration-500 hover:scale-105 flex items-center gap-2 ${isDark
                  ? 'text-purple-300 hover:text-purple-400'
                  : 'text-emerald-300 hover:text-emerald-400'
                } font-semibold hover:bg-white/20`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Click to Unmute
            </button>

          )}

          {/* Subtle loading indicator while assets load during video playback */}
          {videoLoaded && !assetsLoaded && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10">
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-purple-400"
                    style={{
                      animation: `bounce 1.4s ease-in-out infinite both ${i * 0.16}s`
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-white/60">Loading content...</span>
            </div>
          )}
        </>
      ) : (
        /* Loading animation for mobile screens */
        <div className="text-center max-w-md w-full px-6">
          {/* Logo/Name */}
          <div className={`text-6xl font-black mb-8 ${isDark
              ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400'
              : 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800'
            } bg-clip-text text-transparent`}>
            VIKASH
          </div>

          {/* Progress Bar */}
          <div className={`w-full h-3 rounded-full mb-6 overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
            <div
              ref={progressRef}
              className={`h-full bg-gradient-to-r transition-all duration-300 ${isDark
                  ? 'from-purple-500 to-pink-500'
                  : 'from-emerald-500 to-emerald-600'
                }`}
            />
          </div>

          {/* Progress Text */}
          <div className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'
            }`}>
            {progress}%
          </div>

          {/* Loading Text */}
          <div
            ref={textRef}
            className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
          >
            {loadingText}
          </div>

          {/* Animated Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${isDark ? 'bg-purple-400' : 'bg-emerald-500'
                  }`}
                style={{
                  animation: `bounce 1.4s ease-in-out infinite both ${i * 0.16}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
