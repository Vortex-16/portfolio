import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const MusicPlayer = () => {
  const { isDark } = useTheme();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3); // Default 30% volume
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const tracks = [
    { name: 'Portfolio Theme', file: '/portfolio.mp3' }
  ];

  // Initialize audio and auto-play
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.muted = isMuted;
      
      // Auto-play portfolio.mp3 on load
      const playAudio = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Autoplay prevented:', error);
          // Autoplay failed, user needs to interact first
        }
      };

      playAudio();
    }
  }, []);

  // Update audio when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const wasPlaying = isPlaying;
      audio.src = tracks[currentTrack].file;
      audio.load();
      
      if (wasPlaying) {
        audio.play().then(() => setIsPlaying(true)).catch(console.error);
      }
    }
  }, [currentTrack]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Update mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Audio event handlers
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling play:', error);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const changeTrack = (index) => {
    setCurrentTrack(index);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio && duration) {
      const clickX = e.nativeEvent.offsetX;
      const width = e.currentTarget.offsetWidth;
      const newTime = (clickX / width) * duration;
      audio.currentTime = newTime;
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={tracks[currentTrack].file}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        loop={false}
      />

      {/* Music Player UI */}
      <motion.div
        className={`fixed bottom-6 right-6 z-50 ${
          isExpanded ? 'w-80' : 'w-16'
        } transition-all duration-300`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div
          className={`backdrop-blur-md border rounded-xl overflow-hidden transition-all duration-300 ${
            isDark 
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
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isDark 
                  ? 'text-white hover:bg-white/20' 
                  : 'text-emerald-50 hover:bg-emerald-800/50'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </motion.button>

            {/* Expand/Collapse */}
            {!isExpanded && (
              <motion.button
                onClick={() => setIsExpanded(true)}
                className={`p-1 rounded transition-colors ${
                  isDark 
                    ? 'text-white/70 hover:text-white hover:bg-white/10' 
                    : 'text-emerald-200 hover:text-emerald-50 hover:bg-emerald-800/30'
                }`}
                whileHover={{ scale: 1.1 }}
                aria-label="Expand music player"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </motion.button>
            )}

            {/* Close Button at right edge */}
            {isExpanded && (
              <div className="flex-1 flex justify-end">
                <motion.button
                  onClick={() => setIsExpanded(false)}
                  className={`p-1 rounded transition-colors ${
                    isDark 
                      ? 'text-white/70 hover:text-white hover:bg-white/10' 
                      : 'text-emerald-200 hover:text-emerald-50 hover:bg-emerald-800/30'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Collapse music player"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
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
                {/* Track Info */}
                <div className="mb-3">
                  <h4 className={`text-sm font-medium truncate ${
                    isDark ? 'text-white' : 'text-emerald-50'
                  }`}>
                    {tracks[currentTrack].name}
                  </h4>
                  <div className={`text-xs ${
                    isDark ? 'text-white/70' : 'text-emerald-200'
                  }`}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                {/* Progress Bar */}
                <div 
                  className={`w-full h-1 rounded-full cursor-pointer mb-3 ${
                    isDark ? 'bg-white/20' : 'bg-emerald-800/30'
                  }`}
                  onClick={handleSeek}
                >
                  <div 
                    className={`h-full rounded-full transition-all music-progress-bar ${
                      isDark ? 'bg-white' : 'bg-emerald-300'
                    }`}
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 mb-3">
                  {/* Mute Button */}
                  <motion.button
                    onClick={toggleMute}
                    className={`p-1 rounded transition-colors ${
                      isDark 
                        ? 'text-white/70 hover:text-white hover:bg-white/10' 
                        : 'text-emerald-200 hover:text-emerald-50 hover:bg-emerald-800/30'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                    )}
                  </motion.button>

                  {/* Volume Slider */}
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className={`flex-1 h-1 rounded-full appearance-none cursor-pointer ${
                      isDark ? 'bg-white/20' : 'bg-emerald-800/30'
                    }`}
                    style={{
                      background: isDark 
                        ? `linear-gradient(to right, white 0%, white ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
                        : `linear-gradient(to right, rgb(110 231 183) 0%, rgb(110 231 183) ${volume * 100}%, rgba(34 197 94, 0.3) ${volume * 100}%, rgba(34 197 94, 0.3) 100%)`
                    }}
                  />
                </div>

                {/* Track Selection */}
                <div className="space-y-1">
                  {tracks.map((track, index) => (
                    <motion.button
                      key={index}
                      onClick={() => changeTrack(index)}
                      className={`w-full text-left p-2 rounded text-xs transition-colors ${
                        currentTrack === index
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
    </>
  );
};

export default MusicPlayer;