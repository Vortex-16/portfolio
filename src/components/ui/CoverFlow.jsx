import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { FaStar, FaCodeBranch } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

gsap.registerPlugin(Observer);

/**
 * CoverFlow
 * An infinite, draggable 3D cover-flow carousel for featured projects.
 * - Smooth GSAP-driven motion (a continuous `progress` value followed by a
 *   spring-like lerp on the ticker).
 * - Infinite wrap: cards loop seamlessly in both directions.
 * - Interaction: drag / swipe (Observer), prev/next buttons, click a side card
 *   to bring it to centre, click the centre card to open its details.
 * - Autoplay that pauses on hover / drag.
 * - Respects `prefers-reduced-motion` (renders a static, centred row).
 */
const CoverFlow = ({ projects = [], onSelect }) => {
    const { isDark } = useTheme();
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const stateRef = useRef({ progress: 0, target: 0 });

    useEffect(() => {
        const cards = cardsRef.current.filter(Boolean);
        const N = cards.length;
        if (!N) return;

        const state = stateRef.current;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Responsive horizontal spacing between adjacent cards.
        let spacing = 240;
        const computeSpacing = () => {
            const w = containerRef.current?.offsetWidth || window.innerWidth;
            spacing = Math.max(150, Math.min(280, w * 0.32));
        };
        computeSpacing();

        // Position every card based on its signed distance from the centre.
        const render = () => {
            for (let i = 0; i < N; i++) {
                let rel = i - state.progress;
                rel = ((rel % N) + N) % N;       // wrap into [0, N)
                if (rel > N / 2) rel -= N;        // fold to [-N/2, N/2] → infinite
                const abs = Math.abs(rel);
                gsap.set(cards[i], {
                    xPercent: -50,
                    yPercent: -50,
                    x: rel * spacing,
                    z: -abs * 180,
                    rotateY: gsap.utils.clamp(-58, 58, -rel * 48),
                    scale: gsap.utils.clamp(0.55, 1, 1 - abs * 0.12),
                    opacity: abs > 2.7 ? 0 : 1,
                    zIndex: 1000 - Math.round(abs * 10),
                    pointerEvents: abs > 2.7 ? 'none' : 'auto',
                });
            }
        };

        if (reduced) {
            // Static fallback — just centre the first card, no animation.
            state.progress = 0;
            state.target = 0;
            render();
            return;
        }

        // Spring-like follow of target on every frame.
        const tick = () => {
            state.progress += (state.target - state.progress) * 0.12;
            if (Math.abs(state.target - state.progress) < 0.0005) {
                state.progress = state.target;
            }
            render();
        };
        gsap.ticker.add(tick);

        // Autoplay (advance one card at a time); paused on hover / drag.
        let paused = false;
        const autoplay = setInterval(() => {
            if (!paused) state.target += 1;
        }, 3200);

        // Drag / swipe interaction.
        const observer = Observer.create({
            target: containerRef.current,
            type: 'touch,pointer',
            dragMinimum: 3,
            onPress: () => { paused = true; },
            onDragStart: () => { paused = true; },
            onDrag: (self) => { state.target -= self.deltaX / spacing; },
            onDragEnd: () => { state.target = Math.round(state.target); paused = false; },
            onRelease: () => { paused = false; },
        });

        const el = containerRef.current;
        const onEnter = () => { paused = true; };
        const onLeave = () => { paused = false; };
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);

        const onResize = () => { computeSpacing(); render(); };
        window.addEventListener('resize', onResize);

        // Expose a snap helper for the prev/next buttons + card clicks.
        el._goTo = (i) => { state.target = i; };
        el._step = (dir) => { state.target = Math.round(state.target) + dir; };

        return () => {
            gsap.ticker.remove(tick);
            clearInterval(autoplay);
            observer.kill();
            el.removeEventListener('mouseenter', onEnter);
            el.removeEventListener('mouseleave', onLeave);
            window.removeEventListener('resize', onResize);
        };
    }, [projects]);

    if (!projects.length) return null;

    const handleCardClick = (i, project) => {
        const el = containerRef.current;
        const N = projects.length;
        const state = stateRef.current;
        // Is this card currently the centred one?
        const active = ((Math.round(state.target) % N) + N) % N;
        if (i === active) {
            onSelect?.(project);
        } else if (el?._goTo) {
            // Bring the clicked card to centre via the shortest wrapped path.
            const base = Math.round(state.target);
            const baseMod = ((base % N) + N) % N;
            let diff = i - baseMod;
            if (diff > N / 2) diff -= N;
            if (diff < -N / 2) diff += N;
            el._goTo(base + diff);
        }
    };

    const step = (dir) => containerRef.current?._step?.(dir);

    return (
        <div className="relative w-full select-none">
            <div
                ref={containerRef}
                className="relative w-full h-[340px] sm:h-[380px] cursor-grab active:cursor-grabbing"
                style={{ perspective: '1400px' }}
            >
                <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                    {projects.map((project, i) => (
                        <div
                            key={project.id || i}
                            ref={(node) => (cardsRef.current[i] = node)}
                            onClick={() => handleCardClick(i, project)}
                            className="absolute top-1/2 left-1/2 w-[230px] sm:w-[260px] rounded-2xl overflow-hidden shadow-2xl will-change-transform"
                            style={{
                                backgroundColor: isDark ? '#0d0d0d' : '#ffffff',
                                border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
                            }}
                        >
                            <div className="relative h-40 sm:h-44 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    draggable={false}
                                    className="w-full h-full object-cover pointer-events-none"
                                    onError={(e) => { e.target.src = '/project-fallback.png'; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                <div className="absolute top-3 right-3 flex gap-2">
                                    {project.stars > 0 && (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-white bg-black/50 backdrop-blur px-2 py-1 rounded-full">
                                            <FaStar className="text-amber-400" /> {project.stars}
                                        </span>
                                    )}
                                    {project.forks > 0 && (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-white bg-black/50 backdrop-blur px-2 py-1 rounded-full">
                                            <FaCodeBranch /> {project.forks}
                                        </span>
                                    )}
                                </div>
                                <span className="absolute bottom-2 left-3 text-[10px] font-bold uppercase tracking-widest text-white/90">
                                    {project.category}
                                </span>
                            </div>
                            <div className="p-4">
                                <h3 className={`text-base font-bold mb-1 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {project.title}
                                </h3>
                                <p className={`text-xs line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center justify-center gap-4 mt-2">
                <button
                    type="button"
                    aria-label="Previous project"
                    onClick={() => step(-1)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 ${isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-black/5 text-gray-800 hover:bg-black/10'}`}
                >
                    ‹
                </button>
                <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Drag · Swipe · Explore
                </span>
                <button
                    type="button"
                    aria-label="Next project"
                    onClick={() => step(1)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 ${isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-black/5 text-gray-800 hover:bg-black/10'}`}
                >
                    ›
                </button>
            </div>
        </div>
    );
};

export default CoverFlow;
