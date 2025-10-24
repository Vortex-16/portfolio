import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { VscHome, VscArchive, VscAccount, VscSettingsGear, VscMenu, VscClose } from 'react-icons/vsc';
import { FaLinux } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const NavItem = ({ to, icon: Icon, label, isActive, isMobile = false, isDock = false, onClick }) => {
  if (isDock) {
    return (
      <NavLink to={to} onClick={onClick}>
        <motion.div
          className={`relative p-3 rounded-xl transition-all duration-300 group ${
            isActive 
              ? 'bg-gray-800/90 dark:bg-purple-500/30 text-white dark:text-purple-300 shadow-lg' 
              : 'text-gray-900 dark:text-white/80 hover:bg-gray-700/80 hover:text-white dark:hover:bg-white/20'
          }`}
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }}
          title={label}
        >
          <Icon size={22} className="transition-colors duration-200" />
          {isActive && (
            <motion.div
              className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-gray-900 dark:bg-purple-400 rounded-full"
              layoutId="activeIndicator"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.div>
      </NavLink>
    );
  }

  return (
    <NavLink to={to} onClick={onClick}>
      <motion.div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${isActive
          ? 'bg-gray-800/90 dark:bg-purple-500/20 text-white dark:text-purple-400 font-semibold shadow-md'
          : 'text-gray-900 dark:text-white/70 hover:text-white hover:bg-gray-700/80 dark:hover:text-white dark:hover:bg-white/10'
          } ${isMobile ? 'justify-center w-auto' : 'justify-start w-full'}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Icon size={20} className="flex-shrink-0" />
        {!isMobile && <span className="font-medium whitespace-nowrap">{label}</span>}
      </motion.div>
    </NavLink>
  );
};

const ResponsiveNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark } = useTheme();
  const location = useLocation();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
      {/* Desktop Navigation - Dock Style */}
      <motion.nav
        className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 transform z-50"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
        style={{ marginTop: '-3rem' }}
      >
        <div className={`flex flex-col items-center gap-1 p-2 backdrop-blur-xl rounded-2xl border-2 shadow-2xl ${
          isDark 
            ? 'bg-black/40 border-white/20 shadow-purple-500/20' 
            : 'bg-white/20 border-emerald-300/40 shadow-emerald-900/30'
        }`}>
          {/* Alpha Coder Logo */}
          <motion.a
            href="https://alpha-coders.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 mb-2 rounded-xl hover:bg-white/10 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Alpha Coder"
          >
            <img 
              src="/alpha.png" 
              alt="Alpha Coder" 
              className="h-8 w-8 rounded-lg object-cover"
            />
          </motion.a>
          
          {/* Divider */}
          <div className={`w-6 h-px mb-2 ${isDark ? 'bg-white/30' : 'bg-emerald-600/40'}`}></div>
          
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              to={item.path}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
              isDock={true}
            />
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden fixed top-8 left-6 z-50 p-3 rounded-full backdrop-blur-md border shadow-lg ${isDark
            ? 'bg-black/30 border-white/20 text-white'
            : 'bg-emerald-900/85 border-emerald-700/40 text-emerald-50'
            }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {isMobileMenuOpen ? <VscClose size={20} /> : <VscMenu size={20} />}
        </motion.button>

        {/* Mobile Slide-out Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
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
                  ? 'bg-black/80 border-white/20'
                  : 'bg-emerald-900/90 border-emerald-700/40'
                  }`}
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <div className="flex flex-col p-6 pt-20">
                  <div className="mb-8">
                    <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-emerald-50'}`}>
                      Vikash Gupta
                    </h2>
                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-emerald-200'}`}>
                      CSE Student & Developer
                    </p>

                    <a
                      href="https://alpha-coders.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 mt-3 opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <img
                        src="/alpha.png"
                        alt="Alpha Coder"
                        className="h-6 w-6 rounded"
                      />
                      <span className={`text-sm ${isDark ? 'text-white/80' : 'text-emerald-100'}`}>
                        Alpha Coder
                      </span>
                    </a>
                  </div>

                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <NavItem
                        key={item.path}
                        to={item.path}
                        icon={item.icon}
                        label={item.label}
                        isActive={location.pathname === item.path}
                        onClick={closeMobileMenu}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tablet Navigation - Bottom Dock */}
      <motion.nav
        className="hidden md:flex lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      >
        <div className={`flex items-center gap-1 px-3 py-2 backdrop-blur-xl rounded-2xl border-2 shadow-2xl ${
          isDark 
            ? 'bg-black/40 border-white/20 shadow-purple-500/20' 
            : 'bg-white/20 border-emerald-300/40 shadow-emerald-900/30'
        }`}>
          {navItems.map((item) => (
            <NavItem
              key={`tablet-${item.path}`}
              to={item.path}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
              isDock={true}
            />
          ))}
        </div>
      </motion.nav>
    </>
  );
};

export default ResponsiveNavigation;
