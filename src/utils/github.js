// GitHub API utility functions
const GITHUB_USERNAME = 'vikashgupta16';
const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Map of project names to image paths
 * This allows us to match GitHub repos with custom project images
 */
const PROJECT_IMAGES = {
  // Main projects
  'portfolio': '/VikashPort.jpeg',
  'Vikashgupta16': '/Portfolio.jpeg',
  'vikashgupta16': '/Portfolio.jpeg',
  'vikash-gupta': '/Portfolio.jpeg',
  'portfolio-website': '/AlphaTemplateProjectImage.png',
  'alphachat': '/AlphaChat.png',
  'alpha-chat': '/AlphaChat.png',
  'chat-app': '/AlphaChat.png',
  'alpha-coders': '/alpha.png',
  'alpha': '/alpha.png',
  'alphacoders': '/alpha.png',
  'pragti-path': '/PragtiPath.jpg',
  'pragtipath': '/PragtiPath.jpg',
  
  'hospital-child-care': '/MaaJankDrAmrit.png',
  'maa-janki-hospital': '/MaaJankDrAmrit.png',
  'maa-janki': '/MaaJankDrAmrit.png',
  
  'python': 'Python.png',
  'Python': 'Python.png',
  
  'c': '/STCET.png',
  'java': '/java.png',
  'JAVA': '/java.png',
  'algorithm-visualizer': '/KTJ3.png',
  'ktj': '/KTJ3.png',
  'visualizer': '/KTJ3.png',
  'ktj3': '/KTJ3.png',
  'ktj-3': '/KTJ3.png',
  
};

/**
 * Get the best matching image for a project based on name and description
 */
const getProjectImage = (repoName, description = '', language = '') => {
  const name = repoName.toLowerCase();
  
  // Check exact matches first
  if (PROJECT_IMAGES[name]) {
    return PROJECT_IMAGES[name];
  }
  
  // Check for partial matches in the name
  for (const [key, image] of Object.entries(PROJECT_IMAGES)) {
    if (name.includes(key) || key.includes(name)) {
      return image;
    }
  }
  
  // Check description for keywords
  const desc = description.toLowerCase();
  if (desc.includes('chat') || desc.includes('messaging')) return '/AlphaChat.png';
  if (desc.includes('weather') || desc.includes('forecast')) return '/AIMS.png';
  if (desc.includes('task') || desc.includes('todo') || desc.includes('management')) return '/CODIGO.png';
  if (desc.includes('ecommerce') || desc.includes('shop') || desc.includes('store')) return '/STCET.png';
  if (desc.includes('portfolio') || desc.includes('personal')) return '/AlphaTemplateProjectImage.png';
  if (desc.includes('education') || desc.includes('learning')) return '/PragtiPath.jpg';
  if (desc.includes('algorithm') || desc.includes('visualizer')) return '/KTJ3.png';
  
  // Language-based fallbacks
  if (language === 'JavaScript' || language === 'TypeScript') return '/alpha.png';
  if (language === 'Python') return '/CODIGO.png';
  if (language === 'Java') return '/KTJ3.png';
  
  // Default fallback
  return '/AlphaTemplateProjectImage.png';
};

export const fetchGitHubProjects = async () => {
  // Return your specific custom projects
  return [
    {
      id: 1,
      title: 'Alpha Chat',
      description: 'A modern real-time chat application with room support, file sharing, and user presence indicators built with modern web technologies.',
      github: 'https://github.com/vikashgupta16/alpha-chat',
      live: 'https://alpha-chats.vercel.app/',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      stars: 2,
      forks: 8,
      image: '/AlphaChat.png',
    },
    {
      id: 2,
      title: 'Alpha Coders',
      description: 'A comprehensive coding platform for developers with project templates, code snippets, and collaborative features for learning and development.',
      github: 'https://github.com/vikashgupta16/alpha-coders',
      live: 'https://alpha-coders.vercel.app/',
      technologies: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS'],
      stars: 2,
      forks: 12,
      image: '/alpha.png',
    },
    {
      id: 3,
      title: 'STCET',
      description: 'St. Thomas College of Engineering and Technology project with comprehensive features for educational management and student portal.',
      github: 'https://github.com/vikashgupta16/stcet-project',
      live: 'https://stcet-demo.vercel.app/',
      technologies: ['React', 'Node.js', 'Express', 'MySQL'],
      stars: 3,
      forks: 2,
      image: '/STCET.png',
    },
    {
      id: 4,
      title: 'Maa Janki Hospital',
      description: 'A healthcare management system for hospitals and child care centers, providing features like appointment scheduling, patient management, and more.',
      github: 'https://github.com/vikashgupta16/Maa-Janki-Hospital-Dr.-Amrit-',
      live: 'https://maa-janki-hospital-dr-amrit.vercel.app/',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      stars: 0,
      forks: 0,
      image: '/MaaJankDrAmrit.png',
    },
    {
      id: 5,
      title: 'Pragti Path',
      description: 'An educational platform designed to help students track their learning progress and access quality educational resources with interactive features.',
      github: 'https://github.com/vikashgupta16/PragatiPath',
      live: 'https://pragti-path.vercel.app/',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      stars: 0,
      forks: 0,
      image: '/PragtiPath.jpg',
    },
    {
      id: 6,
      title: 'KTJ Assignment 4',
      description: 'Advanced algorithm visualization and implementation project demonstrating complex data structures and algorithm analysis.',
      github: 'https://github.com/vikashgupta16/ktj-ass-4',
      live: 'https://ktj-assignment-4.vercel.app/',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Canvas'],
      stars: 8,
      forks: 3,
      image: '/KTJ3.png',
    },
    {
      id: 7,
      title: 'Java Projects',
      description: 'Collection of Java programming projects including OOP concepts, data structures, and enterprise applications with comprehensive examples.',
      github: 'https://github.com/vikashgupta16/java-projects',
      live: null,
      technologies: ['Java', 'Spring Boot', 'Maven', 'JUnit'],
      stars: 25,
      forks: 12,
      image: '/java.png',
    },
    {
      id: 8,
      title: 'DSA Collection',
      description: 'Comprehensive Data Structures and Algorithms implementation in multiple programming languages with detailed explanations and examples.',
      github: 'https://github.com/vikashgupta16/dsa-collection',
      live: null,
      technologies: ['C++', 'Java', 'Python', 'JavaScript'],
      stars: 35,
      forks: 18,
      image: '/CODIGO.png',
    },
    {
      id: 9,
      title: 'Python Projects',
      description: 'Python programming projects ranging from basic syntax and logic building to advanced data analysis and machine learning implementations.',
      github: 'https://github.com/vikashgupta16/python-projects',
      live: null,
      technologies: ['Python', 'Django', 'Flask', 'NumPy'],
      stars: 22,
      forks: 10,
      image: '/Python.png',
    }
  ];
};

export const getFallbackProjects = () => {
  return [
    {
      id: 1,
      title: 'Alpha Chat',
      description: 'A modern real-time chat application with room support, file sharing, and user presence indicators built with modern web technologies.',
      github: 'https://github.com/vikashgupta16/alpha-chat',
      live: 'https://alpha-chats.vercel.app/',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      stars: 20,
      forks: 8,
      image: '/AlphaChat.png',
    },
    {
      id: 2,
      title: 'Alpha Coders',
      description: 'A comprehensive coding platform for developers with project templates, code snippets, and collaborative features.',
      github: 'https://github.com/vikashgupta16/alpha-coders',
      live: 'https://alpha-coders.vercel.app/',
      technologies: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS'],
      stars: 25,
      forks: 12,
      image: '/alpha.png',
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React and Tailwind CSS featuring dark/light mode and smooth animations.',
      github: 'https://github.com/vikashgupta16/portfolio',
      live: '#',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'JavaScript'],
      stars: 15,
      forks: 5,
      image: '/Portfolio.jpeg',
    },
    {
      id: 4,
      title: 'Pragti Path',
      description: 'An educational platform designed to help students track their learning progress and access quality educational resources.',
      github: 'https://github.com/vikashgupta16/PragatiPath',
      live: null,
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      stars: 18,
      forks: 7,
      image: '/PragtiPath.jpg',
    },{
      id: 5,
      title: 'Hospital & Child Care',
      description: 'A healthcare management system for hospitals and child care centers, providing features like appointment scheduling, patient management, and more.',
      github: 'https://github.com/vikashgupta16/Maa-Janki-Hospital-Dr.-Amrit-',
      live: 'https://maa-janki-hospital-dr-amrit.vercel.app/',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      stars: 0,
      forks: 0,
      image: '/MaaJankDrAmrit.png',
    }
    
  ];
};
