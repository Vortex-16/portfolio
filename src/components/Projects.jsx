import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SwiperCarousel from './ui/SwiperCarousel';
import { fetchGitHubProjects, fetchGitHubStats } from '../utils/github';
import { useTheme } from '../hooks/useTheme';
import { FaGithub, FaCode, FaRocket, FaStar, FaArrowRight } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [githubStats, setGithubStats] = useState({
    totalRepos: 47,
    totalStars: 40,
    followers: 25,
  });
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const [projectData, statsData] = await Promise.all([
        fetchGitHubProjects(),
        fetchGitHubStats(),
      ]);

      setProjects(projectData);
      setGithubStats(statsData);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Header animations
      gsap.from(headerRef.current.querySelectorAll('.header-line'), {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // Stats counter animation
      const stats = statsRef.current?.querySelectorAll('.stat-number');
      if (stats) {
        stats.forEach((stat) => {
          const target = parseInt(stat.getAttribute('data-target'));
          if (isNaN(target)) return;

          gsap.fromTo(stat,
            { textContent: 0 },
            {
              textContent: target,
              duration: 2,
              ease: 'power1.out',
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                once: true,
              },
              onUpdate: function () {
                stat.textContent = Math.ceil(stat.textContent);
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, githubStats, projects]);

  return (
    <section ref={sectionRef} className="min-h-screen py-16 md:py-24 relative z-10">
      {/* Add left padding for desktop sidebar */}
      <div className="container mx-auto px-6 lg:pl-20 relative z-20 max-w-7xl">

        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-16">
          {/* Decorative Line */}
          <div className="header-line flex justify-center mb-8">
            <div className={`w-px h-16 ${isDark
                ? 'bg-gradient-to-b from-transparent via-purple-500 to-purple-500/30'
                : 'bg-gradient-to-b from-transparent via-emerald-500 to-emerald-500/30'
              }`} />
          </div>

          {/* Badge */}
          <div
            className={`header-line inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-md mb-8 ${isDark
                ? 'bg-purple-500/15 border border-purple-400/30 text-purple-300'
                : 'bg-emerald-500/15 border border-emerald-400/30 text-emerald-700'
              }`}
          >
            <FaRocket className="text-sm" />
            <span className="text-sm font-semibold tracking-wide">MY WORK</span>
          </div>

          {/* Title */}
          <h2 className={`header-line font-lexa text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'
            }`}>
            Featured{' '}
            <span className={`${isDark
                ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600'
                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600'
              } bg-clip-text text-transparent`}>
              Projects
            </span>
          </h2>

          {/* Description */}
          <p className={`header-line font-monorama text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
            A showcase of my web development projects, from full-stack applications
            to creative experiments. Each represents a milestone in my coding journey.
          </p>

          {/* Stats Cards */}
          <div ref={statsRef} className="header-line grid grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto">
            {[
              { icon: FaCode, label: 'Projects Built', value: projects.length > 0 ? projects.length : 5, suffix: '+' },
              { icon: FaGithub, label: 'GitHub Repos', value: githubStats.totalRepos, suffix: '' },
              { icon: FaStar, label: 'GitHub Stars', value: githubStats.totalStars, suffix: '+' },
            ].map((stat, index) => (
              <div
                key={index}
                className={`p-4 md:p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-[1.02] ${isDark
                    ? 'bg-white/5 border-white/10 hover:bg-white/10'
                    : 'bg-white/60 border-emerald-200/50 hover:bg-white/80'
                  }`}
              >
                <stat.icon className={`text-2xl md:text-3xl mb-3 mx-auto ${isDark ? 'text-purple-400' : 'text-emerald-600'
                  }`} />
                <div className={`font-monorama text-2xl md:text-3xl font-bold mb-1 ${isDark ? 'text-purple-400' : 'text-emerald-600'
                  }`}>
                  <span className="stat-number" data-target={stat.value}>0</span>{stat.suffix}
                </div>
                <div className={`font-monorama text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className={`inline-flex items-center gap-3 px-6 py-4 backdrop-blur-md rounded-2xl border ${isDark
                ? 'bg-white/10 border-white/20 text-white/80'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}>
              <div className={`w-5 h-5 border-2 rounded-full animate-spin ${isDark ? 'border-white/30 border-t-white' : 'border-emerald-300 border-t-emerald-600'
                }`} />
              <span className="font-medium">Loading projects from GitHub...</span>
            </div>
          </div>
        )}

        {/* Projects Carousel */}
        {!loading && projects.length > 0 && (
          <div className="mb-16">
            <SwiperCarousel projects={projects} />
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📁</div>
            <h3 className={`text-2xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'
              }`}>
              No projects found
            </h3>
            <p className={`max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Projects will be loaded from GitHub when available.
            </p>
          </div>
        )}

        {/* GitHub CTA */}
        <div className="text-center mt-8 mb-16">
          <a
            href="https://github.com/Vortex-16"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-4 backdrop-blur-md border rounded-2xl font-semibold transition-all duration-300 hover:scale-105 group ${isDark
                ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
              }`}
          >
            <FaGithub className="text-2xl" />
            <span>View All Projects on GitHub</span>
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Technologies Section */}
        <div className="text-center">
          <h3 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'
            }`}>
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python',
              'MongoDB', 'Express.js', 'Tailwind CSS', 'Git',
              'Firebase', 'Next.js', 'PostgreSQL'
            ].map((tech, index) => (
              <div
                key={tech}
                className={`px-5 py-2.5 backdrop-blur-md border rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 cursor-default ${isDark
                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    : 'bg-white/70 border-emerald-200 text-gray-700 hover:bg-emerald-50'
                  }`}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${0.05 * index}s both`,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fade in animation keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
