import { createContext, useContext, useRef, useEffect, useState } from 'react';

const MusicContext = createContext(null);

export const useMusicPlayer = () => {
    const ctx = useContext(MusicContext);
    if (!ctx) throw new Error('useMusicPlayer must be used within MusicProvider');
    return ctx;
};

export const MusicProvider = ({ children }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const tracks = [{ name: 'Portfolio Theme', file: '/portfolio.mp3' }];

    // Init audio + autoplay
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = volume;
        audio.muted = isMuted;
        audio.play().then(() => setIsPlaying(true)).catch(() => { });
    }, []);

    // Track change
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const wasPlaying = isPlaying;
        audio.src = tracks[currentTrack].file;
        audio.load();
        if (wasPlaying) audio.play().then(() => setIsPlaying(true)).catch(() => { });
    }, [currentTrack]);

    useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);
    useEffect(() => { if (audioRef.current) audioRef.current.muted = isMuted; }, [isMuted]);

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) { audio.pause(); setIsPlaying(false); }
        else { await audio.play().catch(() => { }); setIsPlaying(true); }
    };

    const toggleMute = () => setIsMuted(m => !m);
    const handleVolumeChange = (e) => {
        const v = parseFloat(e.target.value);
        setVolume(v);
        if (v > 0 && isMuted) setIsMuted(false);
    };
    const handleLoadedMetadata = () => {
        if (audioRef.current) setDuration(audioRef.current.duration);
    };
    const handleTimeUpdate = () => {
        if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    };
    const handleEnded = () => setCurrentTrack(p => (p + 1) % tracks.length);
    const handleSeek = (e) => {
        const audio = audioRef.current;
        if (audio && duration) {
            const clickX = e.nativeEvent.offsetX;
            const width = e.currentTarget.offsetWidth;
            audio.currentTime = (clickX / width) * duration;
        }
    };
    const changeTrack = (i) => setCurrentTrack(i);

    const formatTime = (t) => {
        if (isNaN(t)) return '0:00';
        return `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
    };

    return (
        <MusicContext.Provider value={{
            isPlaying, isMuted, volume, currentTrack, duration, currentTime, tracks,
            togglePlay, toggleMute, handleVolumeChange, handleLoadedMetadata,
            handleTimeUpdate, handleEnded, handleSeek, changeTrack, formatTime, audioRef,
        }}>
            <audio
                ref={audioRef}
                src={tracks[currentTrack].file}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                loop={false}
            />
            {children}
        </MusicContext.Provider>
    );
};
