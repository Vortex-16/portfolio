import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCards } from 'swiper/modules';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

const SwiperCarousel = ({ projects = [] }) => {
  const { isDark } = useTheme();

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className={isDark ? 'text-white/60' : 'text-emerald-700'}>No projects to display</p>
      </div>
    );
  }

  return (
    <div className="projects-carousel-wrapper">
      {/* Main Carousel Section */}
      <Swiper
        modules={[Autoplay, Pagination, EffectCards]}
        effect="cards"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        cardsEffect={{
          perSlideOffset: 8,
          perSlideRotate: 2,
          rotate: true,
          slideShadows: false,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        speed={600}
        className="projects-swiper"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={project.id || index}>
            <div
              className={`project-card rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col ${isDark
                  ? 'bg-gradient-to-br from-purple-900/90 via-violet-900/80 to-purple-800/90 border border-purple-500/30'
                  : 'bg-gradient-to-br from-emerald-800/95 via-emerald-700/90 to-emerald-800/95 border border-emerald-400/40'
                }`}
            >
              {/* Project Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  onError={(e) => {
                    e.target.src = '/AlphaTemplateProjectImage.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Stats Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {project.stars > 0 && (
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-white text-xs font-medium">
                      <FaStar className="text-yellow-400" />
                      <span>{project.stars}</span>
                    </div>
                  )}
                  {project.forks > 0 && (
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-white text-xs font-medium">
                      <FaCodeBranch className="text-blue-400" />
                      <span>{project.forks}</span>
                    </div>
                  )}
                </div>

                {/* Project Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-white/85 text-sm leading-relaxed mb-5 flex-1 line-clamp-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full ${isDark
                          ? 'bg-purple-500/25 text-purple-200 border border-purple-400/30'
                          : 'bg-emerald-500/25 text-emerald-100 border border-emerald-400/30'
                        }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-3 py-1.5 bg-white/15 text-white/80 text-xs font-medium rounded-full border border-white/20">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${isDark
                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                      }`}
                  >
                    <FaGithub className="text-lg" />
                    <span>View Code</span>
                  </a>

                  {project.live && project.live !== '#' && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white/15 hover:bg-white/25 text-white py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-white/25"
                    >
                      <FaExternalLinkAlt />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Carousel Styles */}
      <style>{`
        .projects-carousel-wrapper {
          width: 100%;
          max-width: 420px;
          margin: 0 auto;
          padding: 20px 0;
        }
        
        .projects-swiper {
          width: 100%;
          padding: 30px 10px 60px 10px;
          overflow: visible;
        }
        
        .projects-swiper .swiper-slide {
          height: auto;
          min-height: 520px;
        }
        
        .project-card {
          height: 100%;
          min-height: 520px;
        }
        
        /* Pagination Styles */
        .projects-swiper .swiper-pagination {
          bottom: 15px !important;
        }
        
        .projects-swiper .swiper-pagination-bullet {
          background: ${isDark ? 'rgba(168, 85, 247, 0.5)' : 'rgba(5, 150, 105, 0.5)'};
          opacity: 1;
          width: 10px;
          height: 10px;
          margin: 0 6px !important;
          transition: all 0.3s ease;
        }
        
        .projects-swiper .swiper-pagination-bullet-active {
          background: ${isDark ? '#a855f7' : '#059669'};
          transform: scale(1.4);
        }
        
        /* Line clamp utilities */
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default SwiperCarousel;
