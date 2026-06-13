import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { useTheme } from '../../hooks/useTheme';
import { OS_JOURNEY } from '../../constants/os';
import {
    FaJava, FaLaptopCode, FaCode, FaTerminal, FaFire, FaClone,
    FaLinux, FaWindows, FaPowerOff, FaArrowLeft, FaArrowRight, FaRocket,
} from 'react-icons/fa';
import { SiArduino, SiArchlinux } from 'react-icons/si';

gsap.registerPlugin(Observer);

const ICONS = {
    java: FaJava,
    laptop: FaLaptopCode,
    arduino: SiArduino,
    code: FaCode,
    terminal: FaTerminal,
    fire: FaFire,
    dualboot: FaClone,
    endeavour: FaLinux,
    pop: FaLinux,
    arch: SiArchlinux,
    archcraft: SiArchlinux,
    power: FaPowerOff,
    now: FaWindows,
    rocket: FaRocket,
};

/**
 * OSJourneyTimeline
 * An animated GSAP carousel telling the OS journey as a growing progress path.
 * - A progress rail whose fill grows as you advance through the chapters.
 * - One milestone shown at a time, animated in with a GSAP timeline.
 * - Navigation: prev/next, clickable nodes, drag / swipe (Observer), arrow keys.
 * - Gentle autoplay that stops at the end and pauses on hover / interaction.
 * - Respects prefers-reduced-motion.
 */
const OSJourneyTimeline = () => {
    const { isDark } = useTheme();
    const [active, setActive] = useState(0);
    const N = OS_JOURNEY.length;

    const stageRef = useRef(null);
    const cardRef = useRef(null);
    const fillRef = useRef(null);
    const nodeRefs = useRef([]);
    const progressProxy = useRef({ p: 0 });
    const interactedRef = useRef(false);
    const reducedRef = useRef(false);

    const go = useCallback((i, viaUser = false) => {
        if (viaUser) interactedRef.current = true;
        setActive((prev) => {
            const next = Math.max(0, Math.min(N - 1, i));
            return next === prev ? prev : next;
        });
    }, [N]);

    const next = useCallback((viaUser = false) => go(active + 1, viaUser), [active, go]);
    const prev = useCallback((viaUser = false) => go(active - 1, viaUser), [active, go]);

    // Detect reduced motion once.
    useEffect(() => {
        reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);

    // Paint the rail from a single 0→1 progress value so the PIPE (line) fills
    // first and each BUBBLE (node) only colours in once the line reaches it.
    const accentRef = useRef(OS_JOURNEY[0].accent);
    accentRef.current = OS_JOURNEY[active].accent;

    const paintProgress = useCallback(() => {
        const p = progressProxy.current.p;
        const accent = accentRef.current;
        if (fillRef.current) fillRef.current.style.width = `${p * 100}%`;
        const nodes = nodeRefs.current;
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (!node) continue;
            const threshold = N > 1 ? i / (N - 1) : 0;
            const filled = p >= threshold - 0.0001;
            node.style.background = filled ? accent : (isDark ? '#27272a' : '#e5e7eb');
            node.style.borderColor = filled ? 'transparent' : (isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)');
        }
    }, [N, isDark]);

    // Animate progress toward the active node; the pipe grows, then the bubble.
    useEffect(() => {
        const target = N > 1 ? active / (N - 1) : 1;
        paintProgress(); // paint current state synchronously (no flash)
        if (reducedRef.current) {
            progressProxy.current.p = target;
            paintProgress();
            return;
        }
        const tw = gsap.to(progressProxy.current, {
            p: target,
            duration: 0.8,
            ease: 'power2.inOut',
            onUpdate: paintProgress,
        });
        return () => tw.kill();
    }, [active, N, paintProgress]);

    // Animate the active card content in on every change.
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;
        if (reducedRef.current) {
            gsap.set(card.querySelectorAll('[data-reveal]'), { opacity: 1, y: 0, x: 0 });
            return;
        }
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo(card.querySelector('[data-visual]'),
                { opacity: 0, scale: 0.85, rotateY: -12 },
                { opacity: 1, scale: 1, rotateY: 0, duration: 0.6, ease: 'power3.out' }
            );
            tl.fromTo(card.querySelectorAll('[data-reveal]'),
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out' },
                '-=0.4'
            );
            tl.fromTo(card.querySelectorAll('[data-chip]'),
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' },
                '-=0.3'
            );
        }, card);
        return () => ctx.revert();
    }, [active]);

    // Drag / swipe navigation.
    useEffect(() => {
        if (reducedRef.current || !stageRef.current) return;
        const observer = Observer.create({
            target: stageRef.current,
            type: 'touch,pointer',
            dragMinimum: 20,
            tolerance: 40,
            onLeft: () => next(true),   // swipe left → advance
            onRight: () => prev(true),  // swipe right → go back
        });
        return () => observer.kill();
    }, [next, prev]);

    // Keyboard arrows when the carousel is focused / hovered.
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight') next(true);
            else if (e.key === 'ArrowLeft') prev(true);
        };
        const el = stageRef.current;
        el?.addEventListener('keydown', onKey);
        return () => el?.removeEventListener('keydown', onKey);
    }, [next, prev]);

    // Gentle autoplay — stops at the end, pauses on hover / after interaction.
    useEffect(() => {
        if (reducedRef.current) return;
        const id = setInterval(() => {
            if (interactedRef.current) return;
            setActive((prev) => (prev >= N - 1 ? prev : prev + 1));
        }, 5000);
        return () => clearInterval(id);
    }, [N]);

    const pauseAuto = () => { interactedRef.current = true; };

    const m = OS_JOURNEY[active];
    const Icon = ICONS[m.icon] || FaLinux;
    const accent = m.accent;

    return (
        <div
            ref={stageRef}
            tabIndex={0}
            onMouseEnter={pauseAuto}
            className="relative outline-none select-none"
            aria-roledescription="carousel"
            aria-label="Operating system journey timeline"
        >
            {/* ── Progress rail ── */}
            <div className="relative mb-8 md:mb-10 px-1">
                <div className={`absolute left-0 right-0 top-[10px] h-[3px] rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-300/60'}`} />
                <div
                    ref={fillRef}
                    className="absolute left-0 top-[10px] h-[3px] rounded-full"
                    style={{ background: `linear-gradient(90deg, #3b82f6, ${accent})`, transition: 'background 0.6s ease' }}
                />
                <div className="relative flex justify-between">
                    {OS_JOURNEY.map((item, i) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => go(i, true)}
                            aria-label={`${item.period}: ${item.title}`}
                            aria-current={i === active}
                            title={item.title}
                            className="relative z-10 flex items-center justify-center group"
                            style={{ flex: '0 0 auto' }}
                        >
                            <span
                                ref={(el) => (nodeRefs.current[i] = el)}
                                className={`block rounded-full transition-all duration-300 ${i === active ? 'w-[22px] h-[22px]' : 'w-[14px] h-[14px]'}`}
                                style={{
                                    border: '1px solid transparent',
                                    boxShadow: i === active ? `0 0 0 4px ${accent}33` : 'none',
                                }}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Active milestone card (acrylic / glass) ── */}
            <div
                ref={cardRef}
                className={`relative rounded-3xl border overflow-hidden backdrop-blur-2xl ${isDark ? 'bg-white/[0.06] border-white/15' : 'bg-white/40 border-white/60'}`}
                style={{
                    perspective: '1200px',
                    boxShadow: isDark
                        ? '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)'
                        : '0 8px 40px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
                }}
            >
                {/* accent glow */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-40"
                    style={{ background: accent }}
                />
                {/* subtle second glow for depth */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-28 -left-20 w-72 h-72 rounded-full blur-3xl opacity-20"
                    style={{ background: accent }}
                />

                <div className="relative grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 md:gap-8 p-6 md:p-8 lg:p-10 min-h-[500px] sm:min-h-[440px] md:min-h-[400px] items-center">
                    {/* Visual */}
                    <div
                        data-visual
                        className="flex md:flex-col items-center justify-center gap-4"
                    >
                        <div
                            className="relative w-32 h-32 md:w-52 md:h-52 rounded-3xl flex items-center justify-center shrink-0 backdrop-blur-xl"
                            style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}
                        >
                            <div className="absolute inset-0 rounded-3xl overflow-hidden flex items-center justify-center">
                            {m.osImg ? (
                                <img
                                    src={m.osImg}
                                    alt={m.platform}
                                    className="w-full h-full object-contain p-3 md:p-4 drop-shadow-lg"
                                    loading="lazy"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            ) : (
                                <Icon style={{ color: accent }} className="text-6xl md:text-8xl drop-shadow-lg" />
                            )}
                            </div>
                            <span
                                className="absolute -top-3 -left-3 z-30 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg ring-2 ring-black/10"
                                style={{ background: accent }}
                            >
                                {active + 1}
                            </span>
                        </div>
                        <div className="text-center md:mt-2">
                            <span
                                className="inline-block px-3 py-1 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-wider backdrop-blur-md"
                                style={{ background: `${accent}2e`, color: accent }}
                            >
                                {m.platform}
                            </span>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="flex flex-col justify-center min-w-0">
                        <span
                            data-reveal
                            className="font-monorama text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-2"
                            style={{ color: accent }}
                        >
                            {m.period}
                        </span>
                        <h3
                            data-reveal
                            className={`font-lexa text-2xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            {m.title}
                        </h3>
                        <p
                            data-reveal
                            className={`font-monorama text-sm md:text-base leading-relaxed mb-5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                            {m.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {m.tech.map((t) => (
                                <span
                                    key={t}
                                    data-chip
                                    className={`font-monorama text-[11px] md:text-xs px-3 py-1.5 rounded-lg border backdrop-blur-md ${isDark ? 'bg-white/[0.07] border-white/15 text-gray-200' : 'bg-white/40 border-white/60 text-emerald-900'}`}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Controls ── */}
            <div className="flex items-center justify-between mt-6">
                <button
                    type="button"
                    onClick={() => prev(true)}
                    disabled={active === 0}
                    aria-label="Previous chapter"
                    className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wide transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-black/5 text-gray-800 hover:bg-black/10'}`}
                >
                    <FaArrowLeft size={12} /> <span className="hidden sm:inline">Prev</span>
                </button>

                <span className={`font-mono text-xs md:text-sm font-bold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span style={{ color: accent }}>{String(active + 1).padStart(2, '0')}</span>
                    <span className="opacity-50"> / {String(N).padStart(2, '0')}</span>
                </span>

                <button
                    type="button"
                    onClick={() => next(true)}
                    disabled={active === N - 1}
                    aria-label="Next chapter"
                    className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wide text-white transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ background: accent }}
                >
                    <span className="hidden sm:inline">Next</span> <FaArrowRight size={12} />
                </button>
            </div>
        </div>
    );
};

export default OSJourneyTimeline;
