import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../hooks/useTheme';

const bootSequence = [
  { text: "Starting Arch Linux...", color: "text-white" },
  { text: "[  OK  ] Started Network Manager.", color: "text-green-500" },
  { text: "[  OK  ] Reached target Network.", color: "text-green-500" },
  { text: "[  OK  ] Started User Manager for UID 1000.", color: "text-green-500" },
  { text: "[  OK  ] Started Session 1 of user vikash.", color: "text-green-500" },
  { text: "         Mounting /dev/sda1...", color: "text-gray-400" },
  { text: "[  OK  ] Mounted /dev/sda1.", color: "text-green-500" },
  { text: "         Starting GNOME Display Manager...", color: "text-gray-400" },
  { text: "[  OK  ] Started GNOME Display Manager.", color: "text-green-500" },
  { text: "         Starting Hyprland Compositor...", color: "text-cyan-400" },
  { text: "[  OK  ] Reached target Graphical Interface.", color: "text-green-500" },
  { text: "         Initializing Portfolio Assets...", color: "text-purple-400" },
  { text: "         Loading Projects...", color: "text-purple-400" },
  { text: "         Fetching GitHub Data...", color: "text-purple-400" },
  { text: "[  OK  ] System Ready.", color: "text-green-500 font-bold" },
];

const LoadingScreen = ({ onComplete, onLoadingComplete }) => {
  const { isDark } = useTheme();
  const loadingRef = useRef(null);
  const videoRef = useRef(null);
  const handleComplete = onLoadingComplete || onComplete;
  const [progress, setProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState('initializing');
  const [binaryStream, setBinaryStream] = useState('');
  const [hexStream, setHexStream] = useState('');
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Boot sequence state
  const [bootLogs, setBootLogs] = useState([]);
  const logsContainerRef = useRef(null);

  // Boot animation effect
  useEffect(() => {
    if (isWideScreen) {
      let logIndex = 0;
      const interval = setInterval(() => {
        if (logIndex < bootSequence.length) {
          const logEntry = bootSequence[logIndex];
          if (logEntry) {
            setBootLogs(prev => [...prev, logEntry]);
          }
          logIndex++;
          // Auto-scroll to bottom
          if (logsContainerRef.current) {
            logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
          }
        } else {
          clearInterval(interval);
          setTimeout(() => {
            // Trigger transition after logs complete
            setAssetsLoaded(true);
            handleVideoEnd(); // Re-use transition logic
          }, 800);
        }
      }, 150); // Speed of logs

      return () => clearInterval(interval);
    } else {
      // Mobile: Simulate a short load time then finish
      const timer = setTimeout(() => {
        setAssetsLoaded(true);
        handleVideoEnd();
      }, 2000); // 2 seconds load
      return () => clearTimeout(timer);
    }
  }, [isWideScreen]);

  // Main loading logic (Background asset loading)
  useEffect(() => {
    // ... keep asset loading logic but detach it from UI triggers if we want standard boot time ...
    // For now, let's keep the asset loading running in parallel
    const loadResources = async () => {
      // ... (keep existing preloading logic here if needed, or simplify)
      // Since we are simulating boot, we can just rely on the timer for the "boot effect"
      // and ensure assets are loaded in background.

      // Simplified Asset Preloading for background
      const images = [
        '/PofileNew.jpeg',
        'iitkgprp.png',
        '/alpha.png'
      ];
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    loadResources();
  }, []);


  // Transition logic re-used
  const handleVideoEnd = () => {
    setIsTransitioning(true);
    if (loadingRef.current) {
      gsap.to(loadingRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          if (handleComplete) {
            handleComplete();
          }
        }
      });
    }
  };

  return (
    <div
      ref={loadingRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${isTransitioning ? 'pointer-events-none' : ''
        } ${isDark ? 'bg-[#000000]' : 'bg-[#ecfdf5]'}`} // Pure black for boot
      style={{
        willChange: 'opacity',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
    >
      {/* Video/Boot for wide screens (PC/Tablet) */}
      {isWideScreen ? (
        <div className="absolute inset-0 bg-black font-mono p-8 md:p-12 overflow-hidden flex flex-col justify-end pb-20">
          <div ref={logsContainerRef} className="text-sm md:text-base space-y-1 h-full overflow-y-auto font-bold">
            {bootLogs.map((log, index) => (
              <div key={index} className={`${log.color}`}>
                {log.text.startsWith("[") ? (
                  <span>
                    <span className={log.text.includes("OK") ? "text-green-500" : "text-gray-400"}>
                      {log.text.substring(0, log.text.indexOf("]") + 1)}
                    </span>
                    <span className="text-white ml-2">{log.text.substring(log.text.indexOf("]") + 1)}</span>
                  </span>
                ) : (
                  <span className={log.color}>{log.text}</span>
                )}
              </div>
            ))}
            <div className="animate-pulse text-white">_</div>
          </div>

          <div className="absolute bottom-8 right-8 text-xs text-gray-500 flex flex-col items-end">
            <span>Arch Linux 6.8.9-arch1-1</span>
            <span>/dev/sda1: clean, 25123/123456 files, 12345/654321 blocks</span>
          </div>
        </div>
      ) : (
        /* Mobile Loading Screen - Keep Existing */
        <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 md:p-10">
          {/* ... existing mobile code ... */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex items-center gap-4 mb-6">
              <div className={`h-[1px] w-12 sm:w-16 ${isDark ? 'bg-purple-500/50' : 'bg-emerald-500/50'}`}></div>
              <span className={`font-monorama text-[10px] sm:text-xs tracking-[0.3em] uppercase ${isDark ? 'text-purple-400/60' : 'text-emerald-600/60'}`}>
                PORTFOLIO
              </span>
              <div className={`h-[1px] w-12 sm:w-16 ${isDark ? 'bg-purple-500/50' : 'bg-emerald-500/50'}`}></div>
            </div>

            <h1
              className={`font-lexa text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              VIKASH
            </h1>
            <p className={`font-monorama text-xs sm:text-sm mt-4 tracking-[0.15em] sm:tracking-[0.2em] ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              DEVELOPER • CREATOR • EXPLORER
            </p>
          </div>

          {/* Simple Mobile Loader */}
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;

