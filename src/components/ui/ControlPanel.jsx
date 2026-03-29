import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';
import { FaVolumeUp, FaVolumeMute, FaBatteryFull, FaSun, FaMoon, FaPowerOff } from 'react-icons/fa';
import { MdSettings, MdRestartAlt, MdCameraAlt as MdScreenshot } from 'react-icons/md';

const ControlPanel = ({ isOpen, onClose, anchorRef }) => {
    const { isDark, toggleTheme, brightness, setBrightness } = useTheme();
    const { isPlaying, togglePlay, volume = 0.3, setVolume } = useMusicPlayer();
    const [screenshotFlash, setScreenshotFlash] = useState(false);
    const panelRef = useRef(null);

    const handleScreenshot = () => {
        setScreenshotFlash(true);
        setTimeout(() => setScreenshotFlash(false), 200);
        // Play shutter sound if we had one, or just notification
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target) &&
                anchorRef.current && !anchorRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose, anchorRef]);

    const ControlButton = ({ icon: Icon, label, isActive, onClick, colorClass = "" }) => (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all duration-300 relative overflow-hidden ${isActive
                ? (isDark ? 'bg-arch-blue text-white' : 'bg-emerald-600 text-white')
                : (isDark ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-black/5 text-gray-600 hover:bg-black/10')
                } ${colorClass}`}
        >
            <div className="text-xl relative z-10">
                <Icon />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider relative z-10">{label}</span>
        </button>
    );

    const SliderField = ({ icon: Icon, value, onChange, label, min = 0, max = 100 }) => (
        <div className={`flex items-center gap-4 p-3 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
            <Icon className={isDark ? 'text-arch-blue' : 'text-emerald-600'} />
            <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight opacity-50">
                    <span>{label}</span>
                    <span>{value}%</span>
                </div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className={`w-full h-1.5 rounded-full appearance-none cursor-pointer transition-all ${isDark ? 'accent-arch-blue bg-white/10' : 'accent-emerald-600 bg-black/10'
                        }`}
                />
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Screenshot Flash */}
                    {screenshotFlash && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-white z-[200] pointer-events-none"
                        />
                    )}

                    <motion.div
                        ref={panelRef}
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={`fixed top-16 right-4 lg:right-4 z-[100] w-[calc(100%-2rem)] max-w-[320px] left-4 lg:left-auto p-4 rounded-[2rem] border backdrop-blur-3xl shadow-2xl ${isDark
                            ? 'bg-arch-black/80 border-white/10 shadow-black/40'
                            : 'bg-white/80 border-black/5 shadow-gray-400/20'
                            }`}
                    >
                        {/* Header / User Info */}
                        <div className="flex items-center justify-between mb-6 px-2">
                            <div className="flex items-center gap-3">
                                <div className={`p-0.5 rounded-full border-2 ${isDark ? 'border-arch-blue' : 'border-emerald-500'}`}>
                                    <img src="/alpha.png" alt="User" className="w-10 h-10 rounded-full object-cover" />
                                </div>
                                <div>
                                    <h3 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Vikash</h3>
                                    <p className={`text-[10px] font-medium opacity-50 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>vikash@archlinux</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-black/5 text-gray-600'}`}>
                                    <MdSettings size={20} />
                                </button>
                                <button
                                    onClick={() => window.location.href = 'about:blank'}
                                    className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-100 text-red-600'}`}
                                >
                                    <FaPowerOff size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Quick Settings Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <ControlButton
                                icon={isDark ? FaMoon : FaSun}
                                label={isDark ? "Dark" : "Light"}
                                isActive={true}
                                onClick={toggleTheme}
                            />
                            <ControlButton
                                icon={isPlaying ? FaVolumeUp : FaVolumeMute}
                                label="Music"
                                isActive={isPlaying}
                                onClick={togglePlay}
                            />
                            <ControlButton
                                icon={MdRestartAlt}
                                label="Reset"
                                isActive={false}
                                onClick={() => window.location.reload()}
                            />
                            <ControlButton
                                icon={MdScreenshot}
                                label="Shot"
                                isActive={false}
                                onClick={handleScreenshot}
                            />
                        </div>

                        {/* Sliders */}
                        <div className="flex flex-col gap-3 mb-6">
                            <SliderField
                                icon={FaVolumeUp}
                                label="Volume"
                                value={Math.round(volume * 100)}
                                onChange={(val) => setVolume && setVolume(val / 100)}
                            />
                            <SliderField
                                icon={FaSun}
                                label="Brightness"
                                value={brightness}
                                onChange={(val) => setBrightness(val)}
                            />
                        </div>

                        {/* Battery Status */}
                        <div className={`flex items-center justify-between p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-black/5'
                            }`}>
                            <div className="flex items-center gap-3">
                                <FaBatteryFull className="text-emerald-500" />
                                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Battery</span>
                            </div>
                            <span className={`text-xs font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>100%</span>
                        </div>

                        {/* Footer Info */}
                        <div className="mt-6 flex justify-center">
                            <span className={`text-[9px] font-bold tracking-[0.2em] uppercase opacity-30 ${isDark ? 'text-white' : 'text-black'}`}>
                                Arch Linux x86_64
                            </span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ControlPanel;
