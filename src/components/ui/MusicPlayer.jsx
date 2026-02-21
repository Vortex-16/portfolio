import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';

const MusicPlayer = () => {
  const { isDark } = useTheme();
  const {
    isPlaying, isMuted, volume, currentTrack, duration, currentTime, tracks,
    togglePlay, toggleMute, handleVolumeChange, handleSeek, changeTrack, formatTime,
  } = useMusicPlayer();

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    // Desktop only — mobile uses the top bar button
    <div className="hidden lg:block">
      <motion.div
        className={`fixed bottom-6 right-6 z-50 ${isExpanded ? 'w-80' : 'w-16'} transition-all duration-300`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div
          className={`backdrop-blur-md border rounded-xl overflow-hidden transition-all duration-300 ${isDark
              ? 'bg-white/10 border-white/20'
              : 'bg-emerald-900/80 border-emerald-700/40 shadow-lg'
            }`}
          layout
        >
          {/* Compact View */}
          <div className="flex items-center p-3 gap-2">
            {/* Play/Pause Button */}
            <motion.button
              onClick={togglePlay}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDark ? 'text-white hover:bg-white/20' : 'text-emerald-50 hover:bg-emerald-800/50'
                }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.button>

            {!isExpanded && (
              <motion.button
                onClick={() => setIsExpanded(true)}
                className={`p-1 rounded transition-colors ${isDark ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-emerald-200 hover:text-emerald-50 hover:bg-emerald-800/30'
                  }`}
                whileHover={{ scale: 1.1 }}
                aria-label="Expand music player"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </motion.button>
            )}

            {isExpanded && (
              <div className="flex-1 flex justify-end">
                <motion.button
                  onClick={() => setIsExpanded(false)}
                  className={`p-1 rounded transition-colors ${isDark ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-emerald-200 hover:text-emerald-50 hover:bg-emerald-800/30'
                    }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Collapse music player"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </motion.button>
              </div>
            )}
          </div>

          {/* Expanded View */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-3 pb-3"
              >
                <div className="mb-3">
                  <h4 className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-emerald-50'}`}>
                    {tracks[currentTrack].name}
                  </h4>
                  <div className={`text-xs ${isDark ? 'text-white/70' : 'text-emerald-200'}`}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                <div
                  className={`w-full h-1 rounded-full cursor-pointer mb-3 ${isDark ? 'bg-white/20' : 'bg-emerald-800/30'}`}
                  onClick={handleSeek}
                >
                  <div
                    className={`h-full rounded-full transition-all music-progress-bar ${isDark ? 'bg-white' : 'bg-emerald-300'}`}
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <motion.button
                    onClick={toggleMute}
                    className={`p-1 rounded transition-colors ${isDark ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-emerald-200 hover:text-emerald-50 hover:bg-emerald-800/30'
                      }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                      </svg>
                    )}
                  </motion.button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: isDark
                        ? `linear-gradient(to right, white 0%, white ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
                        : `linear-gradient(to right, rgb(110 231 183) 0%, rgb(110 231 183) ${volume * 100}%, rgba(34 197 94, 0.3) ${volume * 100}%, rgba(34 197 94, 0.3) 100%)`,
                    }}
                  />
                </div>

                <div className="space-y-1">
                  {tracks.map((track, index) => (
                    <motion.button
                      key={index}
                      onClick={() => changeTrack(index)}
                      className={`w-full text-left p-2 rounded text-xs transition-colors ${currentTrack === index
                          ? (isDark ? 'bg-white/20 text-white' : 'bg-emerald-700/50 text-emerald-50')
                          : (isDark ? 'text-white/70 hover:bg-white/10 hover:text-white' : 'text-emerald-200 hover:bg-emerald-800/30 hover:text-emerald-50')
                        }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {track.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MusicPlayer;