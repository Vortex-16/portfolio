import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { VscHome, VscArchive, VscAccount, VscSettingsGear, VscMenu, VscClose } from 'react-icons/vsc';
import { FaLinux, FaWifi, FaVolumeUp, FaBatteryThreeQuarters } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggle from './ThemeToggle';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
              <FaWifi size={14} />
              <FaVolumeUp size={14} />
              <FaBatteryThreeQuarters size={14} />
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
        {/* Mobile Menu Button - Top Bar Style for Mobile too */}
        <div className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 flex justify-between items-center backdrop-blur-md border-b ${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-emerald-100'}`}>
          <span className={`font-lexa font-bold ${isDark ? 'text-white' : 'text-emerald-900'}`}>VIKASH</span>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg ${isDark ? 'text-white hover:bg-white/10' : 'text-emerald-900 hover:bg-emerald-50'}`}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <VscClose size={24} /> : <VscMenu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 lg:hidden top-[57px]" // Below the top bar
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Menu Content */}
              <motion.div
                className={`absolute top-0 left-0 h-full w-64 backdrop-blur-md border-r ${isDark
                  ? 'bg-black/90 border-white/10'
                  : 'bg-white/90 border-emerald-100'
                  }`}
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <div className="flex flex-col p-6">
                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <NavItem
                        key={item.path}
                        to={item.path}
                        icon={item.icon}
                        label={item.label}
                        isActive={location.pathname === item.path}
                        isMobile={true}
                        onClick={() => setIsMobileMenuOpen(false)}
                      />
                    ))}
                  </div>

                  {/* Mobile System info */}
                  <div className={`mt-8 pt-6 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <div className={`flex items-center justify-between text-xs font-mono mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>UPTIME: 3h 24m</span>
                      <span>MEM: 32%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ResponsiveNavigation;
