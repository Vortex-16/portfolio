import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../hooks/useTheme';
import SnakeGame from './SnakeGame';
import CodeRain from './CodeRain';

const FloatingActionMenu = ({ onTerminalToggle }) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showSnake, setShowSnake] = useState(false);
  const [showCodeRain, setShowCodeRain] = useState(false);
  const menuRef = useRef(null);

  const menuItems = [
    {
      icon: '🐍',
      label: 'Snake Game',
      action: () => setShowSnake(true),
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: '💻',
      label: 'Code Rain',
      action: () => setShowCodeRain(!showCodeRain),
      color: 'from-green-500 to-cyan-600'
    },
    {
      icon: '📟',
      label: 'Terminal',
      action: () => onTerminalToggle && onTerminalToggle(),
      color: 'from-gray-600 to-gray-800'
    },
    {
      icon: '🚀',
      label: 'Rocket Launch',
      action: () => {
        // Create rocket animation
        const rocket = document.createElement('div');
        rocket.innerHTML = '🚀';
        rocket.style.cssText = `
          position: fixed;
          bottom: 10px;
          right: 50%;
          font-size: 3rem;
          z-index: 1000;
          pointer-events: none;
        `;
        document.body.appendChild(rocket);
        
        gsap.to(rocket, {
          y: -window.innerHeight - 100,
          x: Math.random() * 200 - 100,
          rotation: 360,
          duration: 3,
          ease: 'power2.out',
          onComplete: () => rocket.remove()
        });
        
        // Add some sparkles
        for (let i = 0; i < 10; i++) {
          const sparkle = document.createElement('div');
          sparkle.innerHTML = '✨';
          sparkle.style.cssText = `
            position: fixed;
            bottom: ${Math.random() * 100 + 10}px;
            right: ${Math.random() * 100 + 45}%;
            font-size: 1.5rem;
            z-index: 1000;
            pointer-events: none;
          `;
          document.body.appendChild(sparkle);
          
          gsap.to(sparkle, {
            y: -200,
            x: Math.random() * 100 - 50,
            rotation: Math.random() * 360,
            opacity: 0,
            duration: 2,
            delay: i * 0.1,
            ease: 'power2.out',
            onComplete: () => sparkle.remove()
          });
        }
      },
      color: 'from-orange-500 to-red-600'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(menuRef.current?.children || [], 
        { scale: 0, opacity: 0, rotation: 180 },
        { 
          scale: 1, 
          opacity: 1, 
          rotation: 0,
          duration: 0.3,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        }
      );
    }
  }, [isOpen]);

  return (
    <>
      {/* Code Rain Effect */}
      <CodeRain isActive={showCodeRain} />

      {/* Snake Game */}
      <SnakeGame isVisible={showSnake} onClose={() => setShowSnake(false)} />

      {/* Floating Action Menu */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Menu Items */}
        {isOpen && (
          <div ref={menuRef} className="absolute bottom-16 right-0 space-y-3">
            {menuItems.map((item, index) => (
              <div
                key={item.label}
                className="flex items-center space-x-3"
              >
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                } shadow-lg whitespace-nowrap`}>
                  {item.label}
                </span>
                <button
                  onClick={item.action}
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-xl`}
                >
                  {item.icon}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-2xl ${
            isDark 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500' 
              : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600'
          } text-white`}
          style={{
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
          }}
        >
          {isOpen ? '✕' : '🎉'}
        </button>

        {/* Fun Background Effects */}
        {isOpen && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${
                  isDark ? 'bg-purple-400' : 'bg-emerald-400'
                } opacity-60`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float 3s ease-in-out infinite ${i * 0.5}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dismiss Effects */}
      {showCodeRain && (
        <button
          onClick={() => setShowCodeRain(false)}
          className="fixed top-6 right-6 z-50 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Exit Code Rain
        </button>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, -10px) rotate(120deg); }
          66% { transform: translate(-5px, 5px) rotate(240deg); }
        }
      `}</style>
    </>
  );
};

export default FloatingActionMenu;
