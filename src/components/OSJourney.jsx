import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../hooks/useTheme';
import { BentoGrid, BentoCard, BentoTitle, BentoDescription } from './ui/BentoGrid';
import { FaLinux, FaTerminal, FaCode, FaBook, FaRocket, FaCog } from 'react-icons/fa';
import { SiArchlinux, SiGnubash, SiVim, SiGit } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const OSJourney = () => {
  const { isDark } = useTheme();
  const headerRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    // Animate header
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out',
    });

    // Terminal typing effect
    const terminal = terminalRef.current;
    if (terminal) {
      const text = "vikash@endeavouros:~$ exploring the depths of operating systems...";
      let i = 0;
      
      const typeWriter = () => {
        if (i < text.length) {
          terminal.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      };
      
      setTimeout(typeWriter, 500);
    }
  }, []);

  return (
    <div className={`min-h-screen py-20 px-4 md:px-8 lg:px-16 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200'
    }`}>
      {/* Header Section */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16 text-center">
        <div className="flex items-center justify-center mb-6">
          <FaLinux className={`text-6xl md:text-8xl ${isDark ? 'text-purple-400' : 'text-emerald-600'}`} />
        </div>
        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          My Journey into Operating Systems
        </h1>
        <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Building the foundation to create my own OS, exploring Linux from the ground up with EndeavourOS
        </p>
      </div>

      {/* Terminal Display */}
      <div className={`max-w-5xl mx-auto mb-16 p-6 rounded-xl ${
        isDark ? 'bg-gray-900/80' : 'bg-gray-800/90'
      } backdrop-blur-sm border ${isDark ? 'border-purple-500/30' : 'border-emerald-500/30'}`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="font-mono text-green-400 text-sm md:text-base">
          <p ref={terminalRef} className="whitespace-pre-wrap"></p>
          <span className="animate-pulse">▋</span>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="max-w-7xl mx-auto">
        <BentoGrid className="grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {/* Why OS Development */}
          <BentoCard size="large">
            <div className="h-full flex flex-col justify-between">
              <div>
                <BentoTitle>🚀 Why Build an OS?</BentoTitle>
                <BentoDescription>
                  Building an operating system is the ultimate challenge in computer science. 
                  It's about understanding every layer of abstraction from hardware to software, 
                  and creating something that gives complete control over the machine.
                </BentoDescription>
              </div>
              <div className={`mt-6 p-4 rounded-lg ${
                isDark ? 'bg-purple-900/30' : 'bg-emerald-100/50'
              }`}>
                <p className={`text-sm italic ${isDark ? 'text-purple-200' : 'text-emerald-800'}`}>
                  "The dream of every true programmer is to build their own operating system from scratch."
                </p>
              </div>
            </div>
          </BentoCard>

          {/* EndeavourOS */}
          <BentoCard size="medium">
            <SiArchlinux className={`text-5xl mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <BentoTitle>EndeavourOS</BentoTitle>
            <BentoDescription>
              My daily driver for learning Linux internals. An Arch-based distribution that 
              gives me direct access to the system without hiding complexity.
            </BentoDescription>
            <ul className={`mt-4 space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>✓ Rolling release model</li>
              <li>✓ Access to AUR packages</li>
              <li>✓ Lightweight and customizable</li>
            </ul>
          </BentoCard>

          {/* Learning Resources */}
          <BentoCard size="tall">
            <FaBook className={`text-4xl mb-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <BentoTitle>Learning Path</BentoTitle>
            <div className="space-y-3 mt-4">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  OS Development
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  OSDev.org, Bootloader design
                </p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Kernel Programming
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Linux Kernel, Memory Management
                </p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  System Programming
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  C/C++, Assembly, POSIX
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Terminal Skills */}
          <BentoCard size="medium">
            <FaTerminal className={`text-4xl mb-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            <BentoTitle>Terminal Mastery</BentoTitle>
            <BentoDescription>
              Living in the terminal, mastering shell scripting, and understanding the command-line tools 
              that power Unix-like systems.
            </BentoDescription>
            <div className="flex gap-4 mt-4">
              <SiGnubash className={`text-3xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              <SiVim className={`text-3xl ${isDark ? 'text-green-500' : 'text-green-600'}`} />
              <SiGit className={`text-3xl ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
          </BentoCard>

          {/* Current Projects */}
          <BentoCard size="wide">
            <FaCode className={`text-4xl mb-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <BentoTitle>Current OS Projects</BentoTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                <h4 className={`font-bold mb-2 ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                  Bootloader
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Writing a custom bootloader in Assembly to understand the boot process
                </p>
              </div>
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                <h4 className={`font-bold mb-2 ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                  Kernel Modules
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Developing Linux kernel modules to understand driver development
                </p>
              </div>
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                <h4 className={`font-bold mb-2 ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                  Shell Implementation
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Building a Unix shell from scratch in C
                </p>
              </div>
            </div>
          </BentoCard>

          {/* System Architecture */}
          <BentoCard size="medium">
            <FaCog className={`text-4xl mb-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <BentoTitle>System Architecture</BentoTitle>
            <BentoDescription>
              Understanding computer architecture, CPU operations, memory hierarchies, 
              and how hardware interfaces with software.
            </BentoDescription>
            <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-purple-900/30' : 'bg-purple-100/50'}`}>
              <p className={`text-sm font-mono ${isDark ? 'text-purple-200' : 'text-purple-800'}`}>
                CPU → Memory → Storage → I/O
              </p>
            </div>
          </BentoCard>

          {/* Future Vision */}
          <BentoCard size="large">
            <FaRocket className={`text-5xl mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
            <BentoTitle>My OS Vision</BentoTitle>
            <BentoDescription className="mb-4">
              My goal is to create a microkernel-based OS that emphasizes:
            </BentoDescription>
            <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-red-400' : 'bg-red-600'}`}></span>
                Modularity and minimal kernel footprint
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-red-400' : 'bg-red-600'}`}></span>
                Security through isolation
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-red-400' : 'bg-red-600'}`}></span>
                Modern hardware support
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-red-400' : 'bg-red-600'}`}></span>
                Developer-friendly tooling
              </li>
            </ul>
            <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-red-900/20' : 'bg-red-100/50'} border ${
              isDark ? 'border-red-500/30' : 'border-red-300/50'
            }`}>
              <p className={`text-sm italic ${isDark ? 'text-red-200' : 'text-red-800'}`}>
                "Every great OS started as a hobby project. This is mine."
              </p>
            </div>
          </BentoCard>
        </BentoGrid>
      </div>
    </div>
  );
};

export default OSJourney;
