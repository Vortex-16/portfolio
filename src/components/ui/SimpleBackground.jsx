import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SimpleBackground = ({ isDark = false }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create simple floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900' 
          : 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200'
      }`} />
      
      {/* Animated Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            isDark ? 'bg-purple-400/20' : 'bg-emerald-400/20'
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Floating Geometric Shapes */}
      <motion.div
        className={`absolute top-20 left-20 w-32 h-32 rounded-full border-2 ${
          isDark ? 'border-purple-400/10' : 'border-emerald-400/10'
        }`}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className={`absolute bottom-32 right-20 w-24 h-24 rotate-45 border-2 ${
          isDark ? 'border-purple-400/10' : 'border-emerald-400/10'
        }`}
        animate={{
          rotate: [45, 405],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default SimpleBackground;
