import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc';
import { FaLinux, FaWifi, FaVolumeUp, FaVolumeMute, FaBatteryFull, FaBatteryThreeQuarters, FaBatteryHalf, FaBatteryQuarter, FaBatteryEmpty } from 'react-icons/fa';
import { MdWifiOff, MdSignalWifiStatusbarConnectedNoInternet } from 'react-icons/md';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggle from './ThemeToggle';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';

// Compact music button for the mobile top bar
const MobileMusicButton = () => {
  const { isDark } = useTheme();
  const { isPlaying, togglePlay } = useMusicPlayer();
  return (
    <motion.button
      onClick={togglePlay}
      whileTap={{ scale: 0.88 }}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-600 hover:bg-emerald-50'
        }`}
    >
      {/* Subtle pulse ring when playing */}
      {isPlaying && (
        <span className={`absolute inset-0 rounded-full animate-ping opacity-20 ${isDark ? 'bg-arch-blue' : 'bg-emerald-500'}`} />
      )}
      {isPlaying ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </motion.button>
  );
};





// --- Functional Tray Buttons ---

// WiFi: real online status via navigator.onLine
const WifiButton = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);
  return (
    <span
      title={isOnline ? 'Connected' : 'No Connection'}
      className={`flex items-center ${isOnline ? 'text-current' : 'text-red-400'}`}
    >
      {isOnline
        ? <FaWifi size={14} />
        : <MdWifiOff size={15} />}
    </span>
  );
};

// Volume: toggles music mute
const VolumeButton = () => {
  const { isMuted, toggleMute } = useMusicPlayer();
  return (
    <motion.button
      onClick={toggleMute}
      whileTap={{ scale: 0.85 }}
      title={isMuted ? 'Unmute' : 'Mute music'}
      className="flex items-center hover:opacity-70 transition-opacity"
    >
      {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
    </motion.button>
  );
};

// Battery: real battery level via Battery Status API
const BatteryButton = () => {
  const [battery, setBattery] = useState({ level: 1, charging: false });
  useEffect(() => {
    if (!navigator.getBattery) return;
    let bat = null;
    const update = (b) => setBattery({ level: b.level, charging: b.charging });
    navigator.getBattery().then((b) => {
      bat = b;
      update(b);
      b.addEventListener('levelchange', () => update(b));
      b.addEventListener('chargingchange', () => update(b));
    }).catch(() => {});
    return () => {
      if (bat) {
        bat.removeEventListener('levelchange', () => {});
        bat.removeEventListener('chargingchange', () => {});
      }
    };
  }, []);

  const pct = Math.round(battery.level * 100);
  const Icon =
    battery.level > 0.87 ? FaBatteryFull :
    battery.level > 0.62 ? FaBatteryThreeQuarters :
    battery.level > 0.37 ? FaBatteryHalf :
    battery.level > 0.12 ? FaBatteryQuarter :
    FaBatteryEmpty;

  const color =
    battery.charging ? 'text-emerald-400' :
    battery.level <= 0.15 ? 'text-red-400' :
    battery.level <= 0.3 ? 'text-amber-400' :
    'inherit';

  return (
    <span title={`${pct}%${battery.charging ? ' (Charging)' : ''}`} className={`flex items-center ${color}`}>
      <Icon size={14} />
    </span>
  );
};

// Tiny music button for the desktop Hyprland system tray
const DesktopMusicButton = () => {
  const { isPlaying, togglePlay } = useMusicPlayer();
  return (
    <motion.button
      onClick={togglePlay}
      whileTap={{ scale: 0.85 }}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      title={isPlaying ? 'Pause music' : 'Play music'}
      className="relative flex items-center justify-center w-4 h-4 hover:opacity-70 transition-opacity"
    >
      {isPlaying && (
        <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-current" />
      )}
      {isPlaying ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </motion.button>
  );
};

const NavItem = ({ to, icon: Icon, label, isActive, isMobile = false, onClick }) => {
  if (isMobile) {
    return (
      <NavLink to={to} onClick={onClick} className="block w-full">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
            ? 'bg-gray-800/90 dark:bg-purple-500/20 text-white dark:text-purple-400 font-semibold shadow-md'
            : 'text-gray-900 dark:text-gray-200 hover:text-white hover:bg-gray-700/80 dark:hover:text-white dark:hover:bg-white/10'
            }`}
        >
          <Icon size={20} className="flex-shrink-0" />
          <span className="font-medium">{label}</span>
        </div>
      </NavLink>
    );
  }

  // Hyprland Workspace Style (Desktop)
  return (
    <NavLink to={to}>
      <div
        className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isActive
          ? 'bg-emerald-500 dark:bg-arch-blue w-12'
          : 'bg-gray-200 dark:bg-arch-surface hover:bg-gray-300 dark:hover:bg-white/10'
          }`}
        title={label}
      >
        <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}>
          {/* Use Number or Icon */}
          {label === 'Home' ? '1' : label === 'About' ? '2' : label === 'Projects' ? '3' : label === 'OS Journey' ? '4' : '5'}
        </span>
      </div>
    </NavLink>
  );
};

const ResponsiveNavigation = () => {
  const [time, setTime] = useState(new Date());
  const { isDark } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };


  const navItems = [
    { path: '/', icon: VscHome, label: 'Home' },
    { path: '/about', icon: VscAccount, label: 'About' },
    { path: '/projects', icon: VscArchive, label: 'Projects' },
    { path: '/os-journey', icon: FaLinux, label: 'OS Journey' },
    { path: '/contact', icon: VscSettingsGear, label: 'Contact' },
  ];

  return (
    <>
      {/* Desktop Navigation - Hyprland/Waybar Style Top Bar */}
      <motion.header
        className="hidden lg:flex fixed top-0 left-0 right-0 z-50 px-4 py-2"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
      >
        <div className="w-full flex justify-between items-center">

          {/* Left: Workspaces */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg ${isDark ? 'bg-arch-black/80' : 'bg-white/80'}`}>
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                to={item.path}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.path}
              />
            ))}
          </div>

          {/* Center: Clock/Date */}
          <div className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg font-mono text-sm font-semibold ${isDark ? 'bg-arch-black/80 text-white' : 'bg-white/80 text-gray-800'}`}>
            <span>{formatDate(time)}</span>
            <span className={isDark ? 'text-arch-blue' : 'text-emerald-600'}>{formatTime(time)}</span>
          </div>

          {/* Right: System Tray & Profile */}
          <div className="flex items-center gap-3">
            {/* System Tray */}
            <div className={`flex items-center gap-3 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg ${isDark ? 'bg-arch-black/80 text-gray-300' : 'bg-white/80 text-gray-600'}`}>
              <ThemeToggle className="!p-0 !bg-transparent !border-none !shadow-none hover:!bg-transparent" />
              <div className="w-px h-3 bg-current opacity-20"></div>
              {/* Music button */}
              <DesktopMusicButton />
              <div className="w-px h-3 bg-current opacity-20"></div>
              <WifiButton />
              <VolumeButton />
              <BatteryButton />
            </div>

            {/* Profile/Power */}
            <motion.a
              href="https://alphacoders-official.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg transition-colors ${isDark ? 'bg-arch-black/80 hover:bg-white/10 text-white' : 'bg-white/80 hover:bg-gray-100 text-gray-800'}`}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/alpha.png"
                alt="Alpha Coder"
                className="h-5 w-5 rounded-full object-cover"
              />
              <span className="text-xs font-bold mr-1">ALPHA</span>
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Slim top bar - just logo + music btn + theme toggle */}
        <div className={`fixed top-0 left-0 right-0 z-50 px-4 py-2.5 flex justify-between items-center backdrop-blur-md border-b ${isDark ? 'bg-black/85 border-white/10' : 'bg-white/85 border-gray-100'}`}>
          <span className={`font-lexa font-bold tracking-widest text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>VIKASH</span>
          <div className="flex items-center gap-2">
            <MobileMusicButton />
            <ThemeToggle />
          </div>
        </div>

        {/* Modern Floating Bottom Tab Bar */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
            className={`flex items-center gap-1 px-3 py-2 rounded-2xl backdrop-blur-xl border shadow-2xl ${isDark
              ? 'bg-black/90 border-white/10 shadow-black/60'
              : 'bg-white/90 border-gray-200/80 shadow-gray-400/30'
              }`}
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <NavLink key={item.path} to={item.path} className="relative">
                  <motion.div
                    whileTap={{ scale: 0.88 }}
                    className="relative flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-colors duration-200"
                  >
                    {/* Active background pill */}
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveTab"
                        className={`absolute inset-0 rounded-xl ${isDark
                          ? 'bg-arch-blue/20'
                          : 'bg-emerald-500/15'
                          }`}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    {/* Icon */}
                    <Icon
                      size={20}
                      className={`relative z-10 transition-colors duration-200 ${isActive
                        ? isDark ? 'text-arch-blue' : 'text-emerald-600'
                        : isDark ? 'text-gray-500' : 'text-gray-400'
                        }`}
                    />
                    {/* Label */}
                    <span
                      className={`relative z-10 text-[9px] font-semibold mt-0.5 tracking-wide transition-colors duration-200 ${isActive
                        ? isDark ? 'text-arch-blue' : 'text-emerald-600'
                        : isDark ? 'text-gray-600' : 'text-gray-400'
                        }`}
                    >
                      {item.label}
                    </span>

                    {/* Active dot indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveDot"
                        className={`absolute -bottom-0.5 w-1 h-1 rounded-full ${isDark ? 'bg-arch-blue' : 'bg-emerald-500'}`}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </NavLink>
              );
            })}
          </motion.nav>
        </div>
      </div>
    </>
  );
};

export default ResponsiveNavigation;
