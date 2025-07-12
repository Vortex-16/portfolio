import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc';

const DockIcon = ({ icon: Icon, label, isActive, onClick, mouseX }) => {
  const ref = useRef(null);
  
  const distance = mouseX !== null && ref.current 
    ? Math.abs(mouseX - (ref.current.offsetLeft + ref.current.offsetWidth / 2))
    : Infinity;
  
  const scale = Math.max(1, Math.min(1.6, 1 + (60 - Math.min(60, distance)) / 60 * 0.6));
  
  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${
        isActive 
          ? 'bg-white/20 text-white shadow-lg' 
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
      style={{
        transform: `scale(${scale})`,
      }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon size={20} />
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100">
        {label}
      </span>
    </motion.button>
  );
};

const Dock = ({ activeSection, onNavigate }) => {
  const [mouseX, setMouseX] = useState(null);
  const dockRef = useRef(null);

  const handleMouseMove = (e) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left);
    }
  };

  const handleMouseLeave = () => {
    setMouseX(null);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onNavigate(sectionId);
  };

  const navItems = [
    { id: 'home', icon: VscHome, label: 'Home' },
    { id: 'projects', icon: VscArchive, label: 'Projects' },
    { id: 'about', icon: VscAccount, label: 'About' },
    { id: 'contact', icon: VscSettingsGear, label: 'Contact' },
  ];

  return (
    <motion.nav
      ref={dockRef}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
        {navItems.map((item) => (
          <DockIcon
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeSection === item.id}
            onClick={() => scrollToSection(item.id)}
            mouseX={mouseX}
          />
        ))}
      </div>
    </motion.nav>
  );
};

export default Dock;
