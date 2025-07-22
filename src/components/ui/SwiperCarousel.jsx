import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

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
    <div className="w-full max-w-7xl mx-auto px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          el: '.swiper-pagination-custom',
        }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 15,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        className="mySwiper pb-16"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={project.id}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`backdrop-blur-md border rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 h-[500px] flex flex-col group ${
                isDark 
                  ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                  : 'bg-emerald-900/80 border-emerald-700/40 hover:bg-emerald-800/90'
              }`}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = '/AlphaTemplateProjectImage.png';
                    console.log(`Failed to load image for ${project.title}: ${project.image}`);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Stats Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {project.stars > 0 && (
                    <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-white text-xs">
                      <FaStar className="text-yellow-400" />
                      <span>{project.stars}</span>
                    </div>
                  )}
                  {project.forks > 0 && (
                    <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-white text-xs">
                      <FaCodeBranch className="text-blue-400" />
                      <span>{project.forks}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className={`text-xl font-bold mb-3 line-clamp-1 ${
                  isDark ? 'text-white' : 'text-emerald-50'
                }`}>
                  {project.title}
                </h3>
                
                <p className={`text-sm mb-4 flex-1 line-clamp-3 ${
                  isDark ? 'text-white/80' : 'text-emerald-200'
                }`}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 text-xs rounded-full border ${
                        isDark 
                          ? 'bg-purple-500/20 text-purple-100 border-purple-400/30'
                          : 'bg-emerald-500/20 text-emerald-100 border-emerald-400/30'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-white/10 text-white/70 text-xs rounded-full border border-white/20">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium backdrop-blur-sm ${
                      isDark 
                        ? 'bg-purple-600/80 hover:bg-purple-600 text-white'
                        : 'bg-emerald-600/80 hover:bg-emerald-600 text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub />
                    <span>Code</span>
                  </motion.a>
                  
                  {project.live && project.live !== '#' && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium backdrop-blur-sm border border-white/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt />
                      <span>Live</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <div className={`swiper-button-prev-custom absolute left-4 top-1/2 z-10 w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 ${
          isDark 
            ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            : 'bg-emerald-900/80 border-emerald-700/40 text-emerald-50 hover:bg-emerald-800/90'
        }`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
          </svg>
        </div>
        
        <div className={`swiper-button-next-custom absolute right-4 top-1/2 z-10 w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 ${
          isDark 
            ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            : 'bg-emerald-900/80 border-emerald-700/40 text-emerald-50 hover:bg-emerald-800/90'
        }`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </div>
      </Swiper>

      {/* Custom Pagination */}
      <div className="swiper-pagination-custom mt-8 flex justify-center"></div>

      {/* Custom Styles */}
      <style jsx>{`
        .mySwiper .swiper-slide {
          height: auto;
        }
        
        .mySwiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 0.7;
          width: 12px;
          height: 12px;
          margin: 0 4px;
        }
        
        .mySwiper .swiper-pagination-bullet-active {
          background: ${isDark ? '#a855f7' : '#059669'};
          opacity: 1;
          transform: scale(1.2);
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default SwiperCarousel;
