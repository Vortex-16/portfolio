import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SwiperCarousel from './ui/SwiperCarousel';
import { fetchGitHubProjects, fetchGitHubStats } from '../utils/github';
import { useTheme } from '../hooks/useTheme';
import { FaGithub, FaCode, FaRocket, FaStar } from 'react-icons/fa';

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
      
      // Fetch projects and stats in parallel
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
    // Only run animations after data is loaded
    if (loading) return;

    const ctx = gsap.context(() => {
      // Header animations
      gsap.from(headerRef.current.querySelectorAll('.header-line'), {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
      });

      // Stats counter animation - runs after data is loaded
      const stats = statsRef.current?.querySelectorAll('.stat-number');
      if (stats) {
        stats.forEach((stat) => {
          const target = parseInt(stat.getAttribute('data-target'));
          if (isNaN(target)) return;
          
          gsap.fromTo(stat, 
            {
              textContent: 0,
            },
            {
              textContent: target,
              duration: 2,
              ease: 'power1.out',
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
              },
              onUpdate: function() {
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
    <section ref={sectionRef} className="min-h-screen py-20 relative z-10">
      <div className="container mx-auto px-6 relative z-20 max-w-7xl">
        {/* Enhanced Header Section */}
        <div ref={headerRef} className="text-center mb-20">
          {/* Decorative elements */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0">
            <div className={`w-1 h-20 ${
              isDark ? 'bg-gradient-to-b from-transparent via-purple-500 to-transparent' 
              : 'bg-gradient-to-b from-transparent via-emerald-500 to-transparent'
            }`} />
          </div>

          {/* Small badge */}
          <div className="header-line mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border"
            style={{
              background: isDark 
                ? 'rgba(168, 85, 247, 0.1)' 
                : 'rgba(5, 150, 105, 0.1)',
              borderColor: isDark 
                ? 'rgba(168, 85, 247, 0.3)' 
                : 'rgba(5, 150, 105, 0.3)',
            }}
          >
            <FaRocket className={isDark ? 'text-purple-400' : 'text-emerald-600'} />
            <span className={`text-sm font-semibold ${
              isDark ? 'text-purple-300' : 'text-emerald-700'
            }`}>
              My Work
            </span>
          </div>

          {/* Main Title */}
          <h2 className={`header-line font-lexa text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Featured{' '}
            <span className={`${
              isDark 
                ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600' 
                : 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-700'
            } bg-clip-text text-transparent`}>
              Projects
            </span>
          </h2>

          {/* Description */}
          <p className={`header-line font-monorama text-base md:text-lg max-w-3xl mx-auto mb-10 md:mb-12 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            A collection of projects that showcase my skills in web development, 
            algorithms, and problem-solving. Each project represents a step in my journey 
            as a developer.
          </p>

          {/* Stats Section */}
          <div ref={statsRef} className="header-line grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto">
            <div className={`p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-md border ${
              isDark 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white/50 border-emerald-200/50'
            }`}>
              <FaCode className={`text-2xl md:text-4xl mb-2 md:mb-3 mx-auto ${
                isDark ? 'text-purple-400' : 'text-emerald-600'
              }`} />
              <div className={`font-monorama text-xl md:text-3xl font-bold mb-1 ${
                isDark ? 'text-purple-400' : 'text-emerald-600'
              }`}>
                <span className="stat-number" data-target={projects.length > 0 ? projects.length : 5}>0</span>+
              </div>
              <div className={`font-monorama text-[10px] md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Projects Built
              </div>
            </div>

            <div className={`p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-md border ${
              isDark 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white/50 border-emerald-200/50'
            }`}>
              <FaGithub className={`text-2xl md:text-4xl mb-2 md:mb-3 mx-auto ${
                isDark ? 'text-purple-400' : 'text-emerald-600'
              }`} />
              <div className={`font-monorama text-xl md:text-3xl font-bold mb-1 ${
                isDark ? 'text-purple-400' : 'text-emerald-600'
              }`}>
                <span className="stat-number" data-target={githubStats.totalRepos}>0</span>
              </div>
              <div className={`font-monorama text-[10px] md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                GitHub Repos
              </div>
            </div>

            <div className={`p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-md border ${
              isDark 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white/50 border-emerald-200/50'
            }`}>
              <FaStar className={`text-2xl md:text-4xl mb-2 md:mb-3 mx-auto ${
                isDark ? 'text-purple-400' : 'text-emerald-600'
              }`} />
              <div className={`font-monorama text-xl md:text-3xl font-bold mb-1 ${
                isDark ? 'text-purple-400' : 'text-emerald-600'
              }`}>
                <span className="stat-number" data-target={githubStats.totalStars}>0</span>+
              </div>
              <div className={`font-monorama text-[10px] md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                GitHub Stars
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className={`inline-flex items-center gap-3 px-6 py-3 backdrop-blur-md rounded-full border ${
              isDark 
                ? 'bg-white/10 border-white/20 text-white/80' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              <div className={`w-4 h-4 border-2 ${
                isDark ? 'border-white/30 border-t-white' : 'border-emerald-300 border-t-emerald-600'
              } rounded-full animate-spin`} />
              <span>Loading projects from GitHub...</span>
            </div>
          </div>
        )}

        {/* Projects Carousel */}
        {!loading && projects.length > 0 && (
          <div>
            <SwiperCarousel projects={projects} />
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className={`text-xl font-semibold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>No projects found</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Projects will be loaded from GitHub when available.
            </p>
          </div>
        )}

        {/* GitHub Link */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/Vortex-16"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-4 backdrop-blur-md border rounded-full transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <FaGithub className="text-2xl" />
            <span className="font-semibold">View All Projects on GitHub</span>
          </a>
        </div>

        {/* Skills showcase */}
        <div className="mt-20 text-center">
          <h3 className={`text-2xl font-bold mb-8 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'React', 'JavaScript', 'HTML/CSS', 'Node.js', 'Python', 
              'MongoDB', 'Express.js', 'Tailwind CSS', 'Git', 
              'VS Code', 'Firebase', 'API Integration'
            ].map((tech, index) => (
              <div
                key={tech}
                className={`tech-badge px-6 py-3 backdrop-blur-md border rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 ${
                  isDark 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white/70 border-emerald-200 text-gray-700'
                }`}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${0.1 * index}s both`,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
