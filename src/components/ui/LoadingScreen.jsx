import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../hooks/useTheme';

const LoadingScreen = ({ onComplete, onLoadingComplete }) => {
  const { isDark } = useTheme();
  const loadingRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  const handleComplete = onLoadingComplete || onComplete;

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
        await preloadAssets();
        
        // Animate out
        const tl = gsap.timeline();
        
        tl.to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5
        })
        .to(loadingRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            if (handleComplete) handleComplete();
          }
        });
      } catch (error) {
        console.error('Loading error:', error);
        // Still complete even if there's an error
        if (handleComplete) handleComplete();
      }
    };

    startLoading();

    // Create floating particles
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
  }, [isDark, handleComplete]);

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

  return (
    <div 
      ref={loadingRef}
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
          : 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200'
      }`}
    >
      <div className="text-center max-w-md w-full px-6">
        {/* Logo/Name */}
        <div className={`text-6xl font-black mb-8 ${
          isDark 
            ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400' 
            : 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800'
        } bg-clip-text text-transparent`}>
          VIKASH
        </div>

        {/* Progress Bar */}
        <div className={`w-full h-3 rounded-full mb-6 overflow-hidden ${
          isDark ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <div 
            ref={progressRef}
            className={`h-full bg-gradient-to-r transition-all duration-300 ${
              isDark 
                ? 'from-purple-500 to-pink-500' 
                : 'from-emerald-500 to-emerald-600'
            }`}
          />
        </div>

        {/* Progress Text */}
        <div className={`text-2xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {progress}%
        </div>

        {/* Loading Text */}
        <div 
          ref={textRef}
          className={`text-lg ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {loadingText}
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                isDark ? 'bg-purple-400' : 'bg-emerald-500'
              }`}
              style={{
                animation: `bounce 1.4s ease-in-out infinite both ${i * 0.16}s`
              }}
            />
          ))}
        </div>
      </div>

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
