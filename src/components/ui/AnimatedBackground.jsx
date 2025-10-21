import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../hooks/useTheme';

const AnimatedBackground = () => {
  const { isDark } = useTheme();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.life = Math.random() * 100 + 100;
        this.maxLife = this.life;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;

        if (this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }

        this.opacity = (this.life / this.maxLife) * 0.5;
      }

      draw() {
        ctx.fillStyle = isDark 
          ? `rgba(168, 85, 247, ${this.opacity})` 
          : `rgba(5, 150, 105, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Smoke/Wave effect
    class SmokeWave {
      constructor(y, amplitude, frequency, speed) {
        this.y = y;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed;
        this.offset = Math.random() * Math.PI * 2;
      }

      update() {
        this.offset += this.speed;
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(0, this.y);

        for (let x = 0; x <= canvas.width; x += 5) {
          const y = this.y + Math.sin((x * this.frequency) + this.offset) * this.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, this.y, 0, canvas.height);
        if (isDark) {
          gradient.addColorStop(0, 'rgba(88, 28, 135, 0.1)');
          gradient.addColorStop(1, 'rgba(17, 24, 39, 0.05)');
        } else {
          gradient.addColorStop(0, 'rgba(5, 150, 105, 0.1)');
          gradient.addColorStop(1, 'rgba(236, 253, 245, 0.05)');
        }

        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Create particles
    const particles = Array.from({ length: 80 }, () => new Particle());

    // Create smoke waves
    const waves = [
      new SmokeWave(canvas.height * 0.3, 50, 0.005, 0.02),
      new SmokeWave(canvas.height * 0.5, 70, 0.004, 0.015),
      new SmokeWave(canvas.height * 0.7, 40, 0.006, 0.018),
    ];

    // Animation loop
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw waves
      waves.forEach(wave => {
        wave.update();
        wave.draw();
      });

      // Draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections between nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = isDark
              ? `rgba(168, 85, 247, ${(1 - distance / 150) * 0.1})`
              : `rgba(5, 150, 105, ${(1 - distance / 150) * 0.1})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating orbs with GSAP
    const orbs = container.querySelectorAll('.floating-orb');
    
    orbs.forEach((orb, index) => {
      gsap.to(orb, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2,
      });

      gsap.to(orb, {
        scale: `random(1, 1.5)`,
        duration: `random(2, 4)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.3,
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Canvas for particle system */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Floating orbs with blur effect */}
      <div className="floating-orb absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(5, 150, 105, 0.4) 0%, transparent 70%)',
        }}
      />
      <div className="floating-orb absolute top-1/2 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
        }}
      />
      <div className="floating-orb absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full opacity-25 blur-3xl"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)'
            : 'linear-gradient(rgba(5, 150, 105, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(5, 150, 105, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(17, 24, 39, 0.8) 100%)'
            : 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(236, 253, 245, 0.6) 100%)',
        }}
      />

      {/* Animated gradient mesh */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10 blur-2xl animate-pulse"
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: isDark
                ? `radial-gradient(circle, rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 50}, ${Math.random() * 100 + 200}, 0.3) 0%, transparent 70%)`
                : `radial-gradient(circle, rgba(${Math.random() * 100 + 5}, ${Math.random() * 100 + 150}, ${Math.random() * 100 + 100}, 0.3) 0%, transparent 70%)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${Math.random() * 3 + 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
