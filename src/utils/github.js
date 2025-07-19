import { title } from "framer-motion/client";

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
  'portfolio-website': '/AlphaTemplateProjectImage.png',
  'alphachat': '/AlphaChat.png',
  'alpha-chat': '/AlphaChat.png',
  'chat-app': '/AlphaChat.png',
  'alpha-coders': '/alpha.png',
  'alpha': '/alpha.png',
  'alphacoders': '/alpha.png',
  'pragti-path': '/PragtiPath.jpg',
  'pragtipath': '/PragtiPath.jpg',
  'task-manager': '/CODIGO.png',
  'todo': '/CODIGO.png',
  'hospital-child-care': '/MaaJankDrAmrit.png',
  'maa-janki-hospital': '/MaaJankDrAmrit.png',
  'maa-janki': '/MaaJankDrAmrit.png',
  

  'c': '/STCET.png',
  'algorithm-visualizer': '/KTJ3.png',
  'ktj': '/KTJ3.png',
  'visualizer': '/KTJ3.png',
  // Additional mappings for common project types
  'blog': '/KTJ.jpeg',
  'cms': '/KTJ2.jpeg',
  'social': '/alpha.png',
  'dashboard': '/AIMS.png',
  'landing': '/AlphaTemplateProjectImage.png',
  'template': '/AlphaTemplateProjectImage.png',
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
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub projects');
    }
    
    const repos = await response.json();
    
    // Transform GitHub repo data to our project format
    const projects = repos
      .filter(repo => !repo.fork && repo.description) // Filter out forks and repos without description
      .map(repo => {
        const projectImage = getProjectImage(repo.name, repo.description, repo.language);
        console.log(`Project: ${repo.name} -> Image: ${projectImage}`);
        
        return {
          id: repo.id,
          title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          description: repo.description,
          github: repo.html_url,
          live: repo.homepage || null,
          technologies: repo.language ? [repo.language] : [],
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          image: projectImage,
          created: repo.created_at,
          updated: repo.updated_at,
        };
      })
      .slice(0, 7); //No of projects
    
    return projects;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    
    // Return fallback projects if API fails
    return getFallbackProjects();
  }
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
