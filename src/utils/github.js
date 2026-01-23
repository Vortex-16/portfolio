// GitHub API utility functions
const GITHUB_USERNAME = 'Vortex-16';
const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Fetch GitHub user statistics
 * Returns total repos, stars, and followers
 */
export const fetchGitHubStats = async () => {
  try {
    // Fetch user data
    const userResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);

    if (!userResponse.ok) {
      console.warn('Failed to fetch GitHub user data');
      return {
        totalRepos: 47,
        totalStars: 40,
        followers: 25,
      };
    }

    const userData = await userResponse.json();

    // Fetch all repositories to count stars
    const reposResponse = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
    );

    let totalStars = 0;

    if (reposResponse.ok) {
      const repos = await reposResponse.json();
      totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
    }

    return {
      totalRepos: userData.public_repos || 47,
      totalStars: totalStars || 40,
      followers: userData.followers || 25,
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    // Return default values if API fails
    return {
      totalRepos: 47,
      totalStars: 40,
      followers: 25,
    };
  }
};

/**
 * Fetch real stars and forks for a repository
 */
const fetchRepoStats = async (repoPath) => {
  try {
    // repoPath should be like "Vortex-16/Alpha-Chats"
    const response = await fetch(`${GITHUB_API_BASE}/repos/${repoPath}`);

    if (response.ok) {
      const data = await response.json();
      return {
        stars: data.stargazers_count || 0,
        forks: data.forks_count || 0,
      };
    }
  } catch (error) {
    console.error(`Error fetching stats for ${repoPath}:`, error);
  }

  return { stars: 0, forks: 0 };
};

/**
 * Extract repo path from GitHub URL
 */
const getRepoPathFromUrl = (githubUrl) => {
  try {
    const match = githubUrl.match(/github\.com\/([^/]+\/[^/]+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

// Project definitions with metadata
const PROJECT_DEFINITIONS = [
  {
    id: 1,
    title: 'DevTrack',
    description: 'A comprehensive developer productivity dashboard for tracking coding activities, GitHub contributions, and project progress with real-time analytics.',
    github: 'https://github.com/Vortex-16/DevTrack',
    live: 'https://devtrack-pwkj.onrender.com/',
    technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
    image: '/DevTrack.png',
  },
  {
    id: 2,
    title: 'Alpha Chat',
    description: 'A modern real-time chat application with room support, file sharing, and user presence indicators built with modern web technologies.',
    github: 'https://github.com/Vortex-16/Alpha-Chats',
    live: 'https://alpha-chats.vercel.app/',
    technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    image: '/AlphaChat.png',
  },
  {
    id: 3,
    title: 'Alpha Coders',
    description: 'A comprehensive coding platform for developers with project templates, code snippets, and collaborative features for learning and development.',
    github: 'https://github.com/Vortex-16/alpha-coders',
    live: 'https://alpha-coders.vercel.app/',
    technologies: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS'],
    image: '/alpha.png',
  },
  {
    id: 4,
    title: 'STCET',
    description: 'St. Thomas College of Engineering and Technology project with comprehensive features for educational management and student portal.',
    github: 'https://github.com/Vortex-16/STCET',
    live: 'https://stcet-demo.vercel.app/',
    technologies: ['React', 'Node.js', 'Express', 'MySQL'],
    image: '/STCET.png',
  },
  {
    id: 5,
    title: 'Maa Janki Hospital',
    description: 'A healthcare management system for hospitals and child care centers, providing features like appointment scheduling, patient management, and more.',
    github: 'https://github.com/Vortex-16/Maa-Janki-Hospital-Dr.-Amrit-',
    live: 'https://maa-janki-hospital-dr-amrit.vercel.app/',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: '/MaaJankDrAmrit.png',
  },
  {
    id: 6,
    title: 'Pragti Path',
    description: 'An educational platform designed to help students track their learning progress and access quality educational resources with interactive features.',
    github: 'https://github.com/Vortex-16/PragatiPath',
    live: 'https://pragti-path.vercel.app/',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: '/PragtiPath.jpg',
  },
  {
    id: 7,
    title: 'KTJ Assignment 4',
    description: 'Advanced algorithm visualization and implementation project demonstrating complex data structures and algorithm analysis.',
    github: 'https://github.com/Vortex-16/KTJ-ASS4',
    live: 'https://ktj-assignment-4.vercel.app/',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Canvas'],
    image: '/KTJ3.png',
  },
  {
    id: 8,
    title: 'Java Projects',
    description: 'Collection of Java programming projects including OOP concepts, data structures, and enterprise applications with comprehensive examples.',
    github: 'https://github.com/Vortex-16/Shradha-Ma-am-DSA-',
    live: null,
    technologies: ['Java'],
    image: '/java.png',
  },
  {
    id: 9,
    title: 'DSA Collection',
    description: 'Comprehensive Data Structures and Algorithms implementation in multiple programming languages with detailed explanations and examples.',
    github: 'https://github.com/Vortex-16/Shradha-Ma-am-DSA-',
    live: null,
    technologies: ['C++', 'Java', 'Python', 'JavaScript'],
    image: '/CODIGO.png',
  },
  {
    id: 10,
    title: 'Python Projects',
    description: 'Python programming projects ranging from basic syntax and logic building to advanced data analysis and machine learning implementations.',
    github: 'https://github.com/Vortex-16/Python',
    live: null,
    technologies: ['Python', 'Django', 'Flask', 'NumPy'],
    image: '/Python.png',
  }
];

/**
 * Fetch all projects with real GitHub stats
 */
export const fetchGitHubProjects = async () => {
  try {
    // Fetch stats for all projects in parallel
    const projectsWithStats = await Promise.all(
      PROJECT_DEFINITIONS.map(async (project) => {
        const repoPath = getRepoPathFromUrl(project.github);

        if (repoPath) {
          const stats = await fetchRepoStats(repoPath);
          return {
            ...project,
            stars: stats.stars,
            forks: stats.forks,
          };
        }

        return {
          ...project,
          stars: 0,
          forks: 0,
        };
      })
    );

    return projectsWithStats;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    // Return projects with default stats on error
    return PROJECT_DEFINITIONS.map(project => ({
      ...project,
      stars: 0,
      forks: 0,
    }));
  }
};

export const getFallbackProjects = () => {
  return PROJECT_DEFINITIONS.map(project => ({
    ...project,
    stars: 0,
    forks: 0,
  }));
};
