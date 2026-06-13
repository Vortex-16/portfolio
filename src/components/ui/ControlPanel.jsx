import { useEffect, useRef, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';
import { FaVolumeUp, FaVolumeMute, FaBatteryFull, FaSun, FaMoon, FaPowerOff } from 'react-icons/fa';
import { MdSettings, MdRestartAlt, MdCameraAlt as MdScreenshot } from 'react-icons/md';

// ─────────────────────────────────────────────────────────────────────────────
// Module-scope sub-components.
// IMPORTANT: these MUST live outside ControlPanel. If they were defined inside
// the component body they'd be re-created on every render, causing React to
// unmount/remount the DOM nodes — which broke slider dragging (the active drag
// was lost on each value change) and made buttons need multiple clicks.
// ─────────────────────────────────────────────────────────────────────────────

const ControlButton = ({ icon: Icon, label, isActive, isDark, onClick, colorClass = "" }) => (
    <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClick?.(); }}
        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all duration-300 relative overflow-hidden active:scale-95 ${isActive
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

const SliderField = ({ icon: Icon, value, onChange, label, isDark, min = 0, max = 100 }) => (
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
                // Stop pointer/click events from reaching the panel's outside-click
                // handler so dragging the thumb never closes the panel.
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                onInput={(e) => onChange(parseInt(e.target.value))}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className={`w-full h-1.5 rounded-full appearance-none cursor-pointer transition-all ${isDark ? 'accent-arch-blue bg-white/10' : 'accent-emerald-600 bg-black/10'
                    }`}
            />
        </div>
    </div>
);

const ControlPanel = ({ isOpen, onClose, anchorRef }) => {
    const { isDark, toggleTheme, brightness, setBrightness } = useTheme();
    const { isPlaying, togglePlay, volume = 0.3, setVolume } = useMusicPlayer();
    const [screenshotFlash, setScreenshotFlash] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [poweringOff, setPoweringOff] = useState(false);
    const panelRef = useRef(null);

    const handleScreenshot = () => {
        setScreenshotFlash(true);
        setTimeout(() => setScreenshotFlash(false), 200);
    };

    // Settings → toggle browser fullscreen (functional, OS-like behaviour)
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.().catch(() => { });
        } else {
            document.exitFullscreen?.().catch(() => { });
        }
    };

    // Keep fullscreen state in sync with the actual document state
    useEffect(() => {
        const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', onFsChange);
        return () => document.removeEventListener('fullscreenchange', onFsChange);
    }, []);

    // Graceful "power off": fade to black, then reload back to a fresh boot
    const handlePowerOff = () => {
        setPoweringOff(true);
        setTimeout(() => {
            localStorage.removeItem('vk_visited'); // replay the boot sequence
            window.location.reload();
        }, 1100);
    };

    // Close on click outside — uses pointerdown so it cooperates with drags.
    useEffect(() => {
        if (!isOpen) return;
        const handlePointerDown = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target) &&
                anchorRef?.current && !anchorRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('pointerdown', handlePointerDown);
        return () => document.removeEventListener('pointerdown', handlePointerDown);
    }, [isOpen, onClose, anchorRef]);

    return (
        <AnimatePresence>
            {poweringOff && (
                <motion.div
                    key="poweroff"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black z-[300] flex flex-col items-center justify-center gap-5"
                >
                    <motion.div
                        className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                    />
                    <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/60">
                        Shutting down…
                    </span>
                </motion.div>
            )}
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
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                                    title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                                    className={`p-2 rounded-full transition-colors ${isFullscreen
                                        ? (isDark ? 'bg-arch-blue/20 text-arch-blue' : 'bg-emerald-100 text-emerald-600')
                                        : (isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-black/5 text-gray-600')}`}
                                >
                                    <MdSettings size={20} />
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); handlePowerOff(); }}
                                    title="Power off"
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
                                isActive={isDark}
                                isDark={isDark}
                                onClick={toggleTheme}
                            />
                            <ControlButton
                                icon={isPlaying ? FaVolumeUp : FaVolumeMute}
                                label="Music"
                                isActive={isPlaying}
                                isDark={isDark}
                                onClick={togglePlay}
                            />
                            <ControlButton
                                icon={MdRestartAlt}
                                label="Reset"
                                isActive={false}
                                isDark={isDark}
                                onClick={() => window.location.reload()}
                            />
                            <ControlButton
                                icon={MdScreenshot}
                                label="Shot"
                                isActive={false}
                                isDark={isDark}
                                onClick={handleScreenshot}
                            />
                        </div>

                        {/* Sliders */}
                        <div className="flex flex-col gap-3 mb-6">
                            <SliderField
                                icon={FaVolumeUp}
                                label="Volume"
                                isDark={isDark}
                                value={Math.round(volume * 100)}
                                onChange={(val) => setVolume && setVolume(val / 100)}
                            />
                            <SliderField
                                icon={FaSun}
                                label="Brightness"
                                isDark={isDark}
                                min={20}
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

export default memo(ControlPanel);
