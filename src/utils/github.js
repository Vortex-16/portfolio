// GitHub API utility functions
const GITHUB_USERNAME = 'vikashgupta16';
const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Map of project names to image paths
 * This allows us to match GitHub repos with custom project images
 */
const PROJECT_IMAGES = {
  'portfolio': '/AlphaTemplateProjectImage.png',
  'portfolio-website': '/AlphaTemplateProjectImage.png',
  'alphachat': '/AlphaChat.png',
  'alpha-chat': '/AlphaChat.png',
  'chat-app': '/AlphaChat.png',
  'alpha-coders': '/alpha.png',
  'alpha': '/alpha.png',
  'pragti-path': '/PragtiPath.jpg',
  'pragtipath': '/PragtiPath.jpg',
  'task-manager': '/CODIGO.png',
  'weather-dashboard': '/AIMS.png',
  'ecommerce-platform': '/STCET.png',
  'algorithm-visualizer': '/KTJ3.png',
  'ktj': '/KTJ3.png',
  // Add more mappings as needed based on your actual project names
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
      .map(repo => ({
        id: repo.id,
        title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: repo.description,
        github: repo.html_url,
        live: repo.homepage || null,
        technologies: repo.language ? [repo.language] : [],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        // Try to match the repo name with our image mapping, fallback to a default
        image: PROJECT_IMAGES[repo.name.toLowerCase()] || '/AlphaTemplateProjectImage.png',
        created: repo.created_at,
        updated: repo.updated_at,
      }))
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
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
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
      image: '/AlphaTemplateProjectImage.png',
    },
    {
      id: 4,
      title: 'Pragti Path',
      description: 'An educational platform designed to help students track their learning progress and access quality educational resources.',
      github: 'https://github.com/vikashgupta16/pragti-path',
      live: null,
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      stars: 18,
      forks: 7,
      image: '/PragtiPath.jpg',
    },
    
  ];
};
