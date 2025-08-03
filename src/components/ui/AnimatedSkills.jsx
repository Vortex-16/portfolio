import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../hooks/useTheme';

gsap.registerPlugin(ScrollTrigger);

const AnimatedSkills = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const skillsRef = useRef([]);

  const skills = [
    { name: 'React', level: 90, icon: '⚛️', category: 'Frontend' },
    { name: 'JavaScript', level: 85, icon: '🟨', category: 'Language' },
    { name: 'Node.js', level: 80, icon: '🟢', category: 'Backend' },
    { name: 'Python', level: 85, icon: '🐍', category: 'Language' },
    { name: 'HTML/CSS', level: 95, icon: '🎨', category: 'Frontend' },
    { name: 'MongoDB', level: 75, icon: '🍃', category: 'Database' },
    { name: 'Git', level: 90, icon: '📚', category: 'Tools' },
    { name: 'Express.js', level: 80, icon: '�', category: 'Backend' },
    { name: 'Tailwind CSS', level: 88, icon: '💨', category: 'Frontend' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      skillsRef.current.forEach((skill) => {
        if (skill) {
          gsap.set(skill, { 
            opacity: 0, 
            y: 50, 
            scale: 0.8,
            rotationY: 45 
          });
        }
      });

      // Animate skills on scroll
      skillsRef.current.forEach((skill, index) => {
        if (skill) {
          ScrollTrigger.create({
            trigger: skill,
            start: 'top 80%',
            onEnter: () => {
              gsap.to(skill, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationY: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'back.out(1.2)'
              });

              // Animate progress bar
              const progressBar = skill.querySelector('.progress-bar');
              const level = skill.dataset.level;
              if (progressBar) {
                gsap.fromTo(progressBar, 
                  { width: '0%' },
                  { 
                    width: `${level}%`, 
                    duration: 1.5, 
                    delay: index * 0.1 + 0.3,
                    ease: 'power2.out'
                  }
                );
              }

              // Animate percentage counter
              const counter = skill.querySelector('.skill-counter');
              if (counter) {
                gsap.fromTo(counter, 
                  { textContent: '0' },
                  {
                    textContent: level,
                    duration: 1.5,
                    delay: index * 0.1 + 0.3,
                    ease: 'power2.out',
                    snap: { textContent: 1 }
                  }
                );
              }
            }
          });

          // Hover animations
          skill.addEventListener('mouseenter', () => {
            gsap.to(skill, {
              scale: 1.05,
              y: -5,
              duration: 0.3,
              ease: 'power2.out'
            });
          });

          skill.addEventListener('mouseleave', () => {
            gsap.to(skill, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        }
      });

      // Title animation
      const title = sectionRef.current?.querySelector('.section-title');
      if (title) {
        ScrollTrigger.create({
          trigger: title,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(title,
              { opacity: 0, y: 30, scale: 0.9 },
              { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 1,
                ease: 'back.out(1.4)'
              }
            );
          }
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getSkillColor = (category) => {
    const colors = {
      Frontend: isDark ? 'from-blue-500 to-purple-600' : 'from-blue-400 to-blue-600',
      Backend: isDark ? 'from-green-500 to-emerald-600' : 'from-green-400 to-green-600',
      Language: isDark ? 'from-yellow-500 to-orange-600' : 'from-yellow-400 to-orange-500',
      Database: isDark ? 'from-purple-500 to-pink-600' : 'from-purple-400 to-pink-500',
      Tools: isDark ? 'from-gray-500 to-gray-700' : 'from-gray-400 to-gray-600',
      DevOps: isDark ? 'from-cyan-500 to-blue-600' : 'from-cyan-400 to-blue-500',
      Cloud: isDark ? 'from-indigo-500 to-purple-600' : 'from-indigo-400 to-purple-500',
      API: isDark ? 'from-pink-500 to-rose-600' : 'from-pink-400 to-rose-500',
      Framework: isDark ? 'from-violet-500 to-purple-600' : 'from-violet-400 to-purple-500'
    };
    return colors[category] || (isDark ? 'from-gray-500 to-gray-700' : 'from-gray-400 to-gray-600');
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute top-10 left-10 w-32 h-32 rounded-full ${
          isDark ? 'bg-purple-500' : 'bg-emerald-500'
        } blur-3xl`} />
        <div className={`absolute bottom-10 right-10 w-40 h-40 rounded-full ${
          isDark ? 'bg-pink-500' : 'bg-blue-500'
        } blur-3xl`} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <h2 className={`section-title text-5xl md:text-6xl font-black text-center mb-16 ${
          isDark 
            ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400' 
            : 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800'
        } bg-clip-text text-transparent`}>
          Skills & Expertise
        </h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={el => skillsRef.current[index] = el}
              data-level={skill.level}
              className={`skill-card relative p-6 rounded-2xl backdrop-blur-sm border cursor-pointer ${
                isDark 
                  ? 'bg-gray-900/50 border-gray-700/50 hover:bg-gray-800/60' 
                  : 'bg-white/50 border-gray-200/50 hover:bg-white/70'
              } transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              {/* Skill Icon & Name */}
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{skill.icon}</span>
                <div>
                  <h3 className={`text-xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {skill.name}
                  </h3>
                  <span className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {skill.category}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className={`w-full h-3 rounded-full ${
                  isDark ? 'bg-gray-700' : 'bg-gray-200'
                } overflow-hidden`}>
                  <div 
                    className={`progress-bar h-full bg-gradient-to-r ${getSkillColor(skill.category)} rounded-full relative`}
                    style={{ width: '0%' }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Percentage */}
              <div className="flex justify-between items-center">
                <span className={`text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Proficiency
                </span>
                <span className={`text-lg font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  <span className="skill-counter">0</span>%
                </span>
              </div>

              {/* Glowing border effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${getSkillColor(skill.category)} opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
            </div>
          ))}
        </div>

        {/* Fun Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Years Coding', value: '3+', icon: '💻' },
              { label: 'Projects Built', value: '15+', icon: '🚀' },
              { label: 'Technologies', value: '10+', icon: '⚡' },
              { label: 'Coffee Cups', value: '∞', icon: '☕' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`p-4 rounded-xl ${
                  isDark ? 'bg-gray-800/50' : 'bg-white/50'
                } backdrop-blur-sm border ${
                  isDark ? 'border-gray-700/50' : 'border-gray-200/50'
                }`}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedSkills;
