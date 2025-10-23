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
    // Preload all components and assets
    const preloadAssets = async () => {
      const assets = [
        // Preload components by dynamically importing them
        () => import('../Homepage'),
        () => import('../About'),
        () => import('../Projects'),
        () => import('../Contact'),
        () => import('../OSJourney'),
        
        // Preload any images or assets
        () => new Promise((resolve) => {
          const images = [
            '/PofileNew.jpeg',
            '/alpha.png',
            // Add any other critical images
          ];
          let loadedCount = 0;
          images.forEach(src => {
            const img = new Image();
            img.onload = img.onerror = () => {
              loadedCount++;
              if (loadedCount === images.length) resolve();
            };
            img.src = src;
          });
          if (images.length === 0) resolve();
        })
      ];

      const totalSteps = assets.length;
      let completedSteps = 0;

      // Load each asset with progress tracking
      for (const loadAsset of assets) {
        try {
          setLoadingText(`Loading resources... (${completedSteps + 1}/${totalSteps})`);
          await loadAsset();
          completedSteps++;
          const currentProgress = (completedSteps / totalSteps) * 80; // 80% for loading
          setProgress(Math.round(currentProgress));
        } catch (error) {
          console.error('Error loading asset:', error);
          completedSteps++;
        }
      }

      // Final 20% for animation
      setLoadingText('Preparing your experience...');
      return new Promise((resolve) => {
        setTimeout(() => {
          setProgress(100);
          resolve();
        }, 500);
      });
    };

    const startLoading = async () => {
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
    };

    startLoading();

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
