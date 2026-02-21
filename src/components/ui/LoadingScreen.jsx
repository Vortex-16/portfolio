import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../hooks/useTheme';

const bootSequence = [
  { text: "Arch Linux 6.8.9-arch1-1 (tty1)", color: "text-white", delay: 80 },
  { text: " ", color: "", delay: 40 },
  { text: "[    0.000000] Booting Linux on physical CPU 0x0", color: "text-gray-500", delay: 60 },
  { text: "[    0.000000] ACPI: Core revision 20230628", color: "text-gray-500", delay: 40 },
  { text: "[    0.419201] pci 0000:00:00.0: [8086:29c0] type 00 class 0x060000", color: "text-gray-500", delay: 40 },
  { text: "[  OK  ] Started Kernel Audit Daemon.", color: "text-green-400", delay: 60 },
  { text: "[  OK  ] Started D-Bus System Message Bus.", color: "text-green-400", delay: 60 },
  { text: "[  OK  ] Started Network Manager.", color: "text-green-400", delay: 60 },
  { text: "[  OK  ] Reached target Network.", color: "text-green-400", delay: 50 },
  { text: "         Mounting /boot/efi...", color: "text-gray-400", delay: 40 },
  { text: "[  OK  ] Mounted /boot/efi.", color: "text-green-400", delay: 50 },
  { text: "[  OK  ] Started User Manager for UID 1000.", color: "text-green-400", delay: 60 },
  { text: "[  OK  ] Started Session 1 of user vikash.", color: "text-green-400", delay: 70 },
  { text: "         Starting Hyprland Compositor...", color: "text-cyan-400", delay: 80 },
  { text: "[  OK  ] target Graphical Interface.", color: "text-green-400", delay: 60 },
  { text: " ", color: "", delay: 30 },
  { text: ">>> Initializing Portfolio...", color: "text-purple-400", delay: 90 },
  { text: ">>> Loading project data...", color: "text-purple-400", delay: 80 },
  { text: ">>> Fetching GitHub contributions...", color: "text-purple-400", delay: 80 },
  { text: ">>> Mounting asset pipeline...", color: "text-purple-400", delay: 70 },
  { text: " ", color: "", delay: 30 },
  { text: "[  OK  ] System Ready. Welcome, vikash.", color: "text-green-400 font-semibold", delay: 120 },
];

const LoadingScreen = ({ onComplete, onLoadingComplete }) => {
  const { isDark } = useTheme();
  const loadingRef = useRef(null);
  const handleComplete = onLoadingComplete || onComplete;
  const [isWideScreen] = useState(() => window.innerWidth >= 768);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Desktop: rendered log lines (text revealed char-by-char)
  const [renderedLogs, setRenderedLogs] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentLineText, setCurrentLineText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const logsContainerRef = useRef(null);

  // Mobile: progress
  const [mobileProgress, setMobileProgress] = useState(0);

  // Blinking cursor
  useEffect(() => {
    const t = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(t);
  }, []);

  // GSAP exit
  const triggerExit = useCallback(() => {
    setIsTransitioning(true);
    if (loadingRef.current) {
      // Brief bright flash then fade
      gsap.timeline()
        .to(loadingRef.current, { opacity: 1, duration: 0.05 })
        .to(loadingRef.current, { opacity: 0, duration: 0.6, ease: 'power2.inOut' })
        .call(() => handleComplete?.());
    }
  }, [handleComplete]);

  // Desktop: type each log line char-by-char
  useEffect(() => {
    if (!isWideScreen) return;
    if (currentLineIndex >= bootSequence.length) {
      setTimeout(triggerExit, 600);
      return;
    }

    const line = bootSequence[currentLineIndex];
    const fullText = line.text;

    if (fullText.trim() === '') {
      // Empty spacer line — add instantly
      setRenderedLogs(prev => [...prev, { ...line, text: '' }]);
      setCurrentLineIndex(i => i + 1);
      setCurrentLineText('');
      return;
    }

    let charIndex = 0;
    setCurrentLineText('');

    const charInterval = setInterval(() => {
      charIndex++;
      setCurrentLineText(fullText.slice(0, charIndex));
      if (charIndex >= fullText.length) {
        clearInterval(charInterval);
        setRenderedLogs(prev => [...prev, { ...line, text: fullText }]);
        setCurrentLineText('');
        setTimeout(() => {
          setCurrentLineIndex(i => i + 1);
        }, line.delay ?? 60);
      }
    }, 12); // chars per tick

    return () => clearInterval(charInterval);
  }, [currentLineIndex, isWideScreen, triggerExit]);

  // Auto-scroll desktop logs
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [renderedLogs, currentLineText]);

  // Mobile: progress bar animation
  useEffect(() => {
    if (isWideScreen) return;
    const start = Date.now();
    const duration = 2200;
    const frame = () => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setMobileProgress(p);
      if (p < 100) requestAnimationFrame(frame);
      else setTimeout(triggerExit, 300);
    };
    requestAnimationFrame(frame);
  }, [isWideScreen, triggerExit]);

  // Preload assets in background
  useEffect(() => {
    ['/PofileNew.jpeg', '/iitkgprp.png', '/alpha.png'].forEach(src => {
      const img = new Image(); img.src = src;
    });
  }, []);

  const formatLineColor = (log) => {
    if (!log.text.startsWith('[')) return log.color;
    return '';
  };

  const renderLine = (log, i, isActive = false, activeText = '') => {
    const text = isActive ? activeText : log.text;
    const isOk = text.startsWith('[  OK  ]');
    const isErr = text.startsWith('[ FAIL ]') || text.startsWith('[FAILED]');
    const isInfo = text.startsWith('>>>');

    if (isOk) {
      return (
        <div key={i} className="flex items-start gap-0">
          <span className="text-gray-700">[</span>
          <span className="text-green-400 font-bold">{"  OK  "}</span>
          <span className="text-gray-700">]</span>
          <span className="text-gray-300 ml-1">{text.slice(8)}</span>
        </div>
      );
    }
    if (isErr) {
      return (
        <div key={i} className="flex items-start gap-0">
          <span className="text-gray-700">[</span>
          <span className="text-red-400 font-bold">{"FAILED"}</span>
          <span className="text-gray-700">]</span>
          <span className="text-gray-300 ml-1">{text.slice(8)}</span>
        </div>
      );
    }
    if (isInfo) {
      return <div key={i} className="text-purple-400">{text}</div>;
    }
    return <div key={i} className={log.color || 'text-gray-400'}>{text}</div>;
  };

  return (
    <div
      ref={loadingRef}
      className={`fixed inset-0 z-[9999] ${isTransitioning ? 'pointer-events-none' : ''}`}
      style={{ willChange: 'opacity', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
    >
      {isWideScreen ? (
        /* ── Desktop: Arch Linux terminal boot ── */
        <div className="absolute inset-0 bg-[#0a0a0a] font-mono flex flex-col">
          {/* Top status bar */}
          <div className="flex items-center justify-between px-6 py-2 border-b border-white/5 text-[11px] text-gray-600">
            <span>vikash@archlinux</span>
            <span className="text-gray-700">Linux 6.8.9-arch1-1 x86_64</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>

          {/* Boot log area */}
          <div
            ref={logsContainerRef}
            className="flex-1 px-6 py-4 text-[13px] leading-relaxed overflow-y-auto scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {renderedLogs.map((log, i) => renderLine(log, i))}
            {/* Currently typing line */}
            {currentLineIndex < bootSequence.length && (
              <div className="flex items-center">
                {renderLine(bootSequence[currentLineIndex], 'active', true, currentLineText)}
                <span className={`ml-0.5 text-white transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▌</span>
              </div>
            )}
          </div>

          {/* Bottom info bar */}
          <div className="flex items-center justify-between px-6 py-2 border-t border-white/5 text-[10px] text-gray-700">
            <span>/dev/sda1: clean, 38,491/983,040 files</span>
            <span className="text-green-600">● systemd 255 (255-1-arch)</span>
            <span>Arch Linux 6.8.9</span>
          </div>
        </div>
      ) : (
        /* ── Mobile: Clean minimal boot ── */
        <div className={`w-full h-full flex flex-col items-center justify-center gap-8 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#f0fdf4]'}`}>
          {/* Name reveal */}
          <div className="text-center">
            <div className={`font-mono text-[10px] tracking-[0.4em] mb-4 uppercase ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              Arch Linux
            </div>
            <h1 className={`font-lexa text-6xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              VIKASH
            </h1>
            <p className={`font-mono text-[10px] mt-3 tracking-[0.25em] ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              DEVELOPER • CREATOR • EXPLORER
            </p>
          </div>

          {/* Progress bar */}
          <div className={`w-48 h-[2px] rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
            <div
              className={`h-full rounded-full transition-none ${isDark ? 'bg-green-400' : 'bg-emerald-500'}`}
              style={{ width: `${mobileProgress}%`, transition: 'width 0.05s linear' }}
            />
          </div>

          <div className={`font-mono text-[10px] tracking-widest ${isDark ? 'text-gray-700' : 'text-gray-400'}`}>
            BOOTING...
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
