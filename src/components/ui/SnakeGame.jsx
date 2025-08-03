import React, { useState, useEffect, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../hooks/useTheme';

const SnakeGame = ({ isVisible, onClose }) => {
  const { isDark } = useTheme();
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('waiting'); // waiting, playing, gameOver, paused
  const [gameSpeed, setGameSpeed] = useState(150);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('snakeHighScore') || '0');
  });

  const gameStateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    direction: { x: 0, y: 0 },
    food: { x: 15, y: 15 },
    gridSize: 20,
    tileCount: 20
  });

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { snake, food, gridSize, tileCount } = gameStateRef.current;

    // Clear canvas
    ctx.fillStyle = isDark ? '#1a1a2e' : '#f0fdf4';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = isDark ? '#16213e' : '#dcfce7';
    ctx.lineWidth = 1;
    for (let i = 0; i <= tileCount; i++) {
      ctx.beginPath();
      ctx.moveTo(i * gridSize, 0);
      ctx.lineTo(i * gridSize, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * gridSize);
      ctx.lineTo(canvas.width, i * gridSize);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
      if (index === 0) {
        // Snake head
        ctx.fillStyle = isDark ? '#a855f7' : '#059669';
        ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + 2, gridSize - 4, gridSize - 4);
        
        // Eyes
        ctx.fillStyle = isDark ? '#1a1a2e' : '#ffffff';
        ctx.fillRect(segment.x * gridSize + 5, segment.y * gridSize + 5, 3, 3);
        ctx.fillRect(segment.x * gridSize + 12, segment.y * gridSize + 5, 3, 3);
      } else {
        // Snake body
        ctx.fillStyle = isDark ? '#7c3aed' : '#10b981';
        ctx.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);
      }
    });

    // Draw food
    ctx.fillStyle = isDark ? '#f59e0b' : '#ef4444';
    ctx.beginPath();
    ctx.arc(
      food.x * gridSize + gridSize / 2,
      food.y * gridSize + gridSize / 2,
      gridSize / 2 - 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }, [isDark]);

  const generateFood = useCallback(() => {
    const { snake, tileCount } = gameStateRef.current;
    let newFood;
    
    do {
      newFood = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    gameStateRef.current.food = newFood;
  }, []);

  const moveSnake = useCallback(() => {
    const gameState = gameStateRef.current;
    const { snake, direction, food, tileCount } = gameState;

    if (direction.x === 0 && direction.y === 0) return;

    const head = { ...snake[0] };
    head.x += direction.x;
    head.y += direction.y;

    // Check wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
      setGameState('gameOver');
      return;
    }

    // Check self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameState('gameOver');
      return;
    }

    snake.unshift(head);

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
      const newScore = score + 10;
      setScore(newScore);
      
      // Increase speed slightly as score increases
      if (newScore % 50 === 0 && gameSpeed > 80) {
        setGameSpeed(prev => prev - 10);
      }
      
      generateFood();
      
      // Enhanced celebration effect
      gsap.fromTo(canvasRef.current, 
        { scale: 1 },
        { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.inOut" }
      );
      
      // Score pop animation
      if (canvasRef.current && canvasRef.current.parentNode) {
        const scorePopup = document.createElement('div');
        scorePopup.textContent = '+10';
        scorePopup.style.cssText = `
          position: absolute;
          top: 20px;
          right: 20px;
          color: ${isDark ? '#10b981' : '#059669'};
          font-size: 20px;
          font-weight: bold;
          pointer-events: none;
          z-index: 100;
          text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        `;
        canvasRef.current.parentNode.appendChild(scorePopup);
        
        gsap.fromTo(scorePopup, 
          { opacity: 0, y: 10, scale: 0.5 },
          { 
            opacity: 1, 
            y: -30, 
            scale: 1.2,
            duration: 0.6,
            ease: "back.out(1.7)",
            onComplete: () => {
              if (scorePopup.parentNode) {
                scorePopup.parentNode.removeChild(scorePopup);
              }
            }
          }
        );
      }
    } else {
      snake.pop();
    }
  }, [generateFood]);

  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return;
    
    moveSnake();
    drawGame();
    
    gameLoopRef.current = setTimeout(gameLoop, gameSpeed);
  }, [gameState, moveSnake, drawGame, gameSpeed]);

  const startGame = () => {
    gameStateRef.current = {
      snake: [{ x: 10, y: 10 }],
      direction: { x: 0, y: 0 },
      food: { x: 15, y: 15 },
      gridSize: 20,
      tileCount: 20
    };
    setScore(0);
    setGameSpeed(150);
    setGameState('playing');
    generateFood();
  };

  const pauseGame = () => {
    setGameState(gameState === 'playing' ? 'paused' : 'playing');
  };

  const handleKeyPress = useCallback((e) => {
    if (gameState !== 'playing') return;

    const { direction } = gameStateRef.current;
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault(); // Prevent page scrolling
        if (direction.y !== 1) gameStateRef.current.direction = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
        e.preventDefault(); // Prevent page scrolling
        if (direction.y !== -1) gameStateRef.current.direction = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
        e.preventDefault(); // Prevent page scrolling
        if (direction.x !== 1) gameStateRef.current.direction = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
        e.preventDefault(); // Prevent page scrolling
        if (direction.x !== -1) gameStateRef.current.direction = { x: 1, y: 0 };
        break;
      case ' ':
      case 'Space':
        e.preventDefault();
        pauseGame();
        break;
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoop();
    } else if (gameState === 'gameOver') {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('snakeHighScore', score.toString());
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop, score, highScore]);

  useEffect(() => {
    const gameKeyHandler = (e) => {
      // When snake game is visible, handle arrow keys and prevent page scrolling
      if (isVisible && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        handleKeyPress(e);
      }
    };

    const preventScrollHandler = (e) => {
      // Prevent page scrolling when snake game is open and arrow keys are pressed
      if (isVisible && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', gameKeyHandler);
    window.addEventListener('keydown', preventScrollHandler);
    
    return () => {
      window.removeEventListener('keydown', gameKeyHandler);
      window.removeEventListener('keydown', preventScrollHandler);
    };
  }, [handleKeyPress, isVisible]);

  useEffect(() => {
    if (isVisible) {
      drawGame();
    }
  }, [isVisible, drawGame]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        // Close when clicking outside the game container
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={`${
        isDark ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
      } rounded-2xl shadow-2xl p-6 max-w-md w-full relative ${
        gameState === 'playing' ? 'ring-2 ring-emerald-500/50' : ''
      }`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-2xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Snake Game
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark 
                ? 'text-white hover:bg-gray-800 hover:text-gray-300' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            aria-label="Close Snake Game"
          >
            <span className="text-2xl font-bold">×</span>
          </button>
        </div>

        {/* Score */}
        <div className={`flex justify-between mb-4 p-3 rounded-xl ${
          isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'
        }`}>
          <div className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Score: <span className={`font-bold text-lg ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}>{score}</span>
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            High Score: <span className={`font-bold text-lg ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`}>{highScore}</span>
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Speed: <span className={`font-bold text-lg ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}>{Math.round((200 - gameSpeed) / 10)}</span>
          </div>
        </div>

        {/* Game Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className={`rounded-lg w-full h-auto border-2 ${
              isDark ? 'border-gray-600' : 'border-gray-300'
            }`}
          />
          
          {/* Game State Overlay */}
          {gameState !== 'playing' && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                {gameState === 'waiting' && (
                  <>
                    <p className="mb-4 text-lg">🐍 Ready to play Snake?</p>
                    <button
                      onClick={startGame}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      Start Game
                    </button>
                  </>
                )}
                {gameState === 'paused' && (
                  <>
                    <p className="mb-4 text-xl font-bold">⏸️ Game Paused</p>
                    <button
                      onClick={pauseGame}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      Resume
                    </button>
                  </>
                )}
                {gameState === 'gameOver' && (
                  <>
                    <p className="mb-2 text-2xl font-bold">💀 Game Over!</p>
                    <p className="mb-4 text-lg">Final Score: <span className="text-yellow-400">{score}</span></p>
                    {score === highScore && score > 0 && (
                      <p className="mb-4 text-green-400 font-bold">🎉 New High Score!</p>
                    )}
                    <button
                      onClick={startGame}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      Play Again
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className={`mt-4 text-sm text-center p-2 rounded-lg ${
          isDark 
            ? 'text-gray-300 bg-gray-800/30' 
            : 'text-gray-600 bg-gray-100/50'
        }`}>
          🎮 Use <kbd className={`px-1.5 py-0.5 mx-1 rounded text-xs font-mono ${
            isDark ? 'bg-gray-700 text-gray-200 border border-gray-600' : 'bg-white text-gray-700 border border-gray-300'
          }`}>Arrow Keys</kbd> to control • Press <kbd className={`px-1.5 py-0.5 mx-1 rounded text-xs font-mono ${
            isDark ? 'bg-gray-700 text-gray-200 border border-gray-600' : 'bg-white text-gray-700 border border-gray-300'
          }`}>SPACE</kbd> to pause • Avoid walls and yourself!
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
