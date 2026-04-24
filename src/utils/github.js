import { projects as localProjects } from '../data/projects';

const GITHUB_USERNAME = 'Vortex-16';

/**
 * Fetches all repositories from GitHub and merges them with the local projects.js data.
 * This allows for automatic updates when new repos are added on GitHub while
 * preserving rich metadata (descriptions, custom images) for highlighted projects.
 */
export const fetchGitHubProjects = async () => {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json', // Required for topics
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub projects');
    }

    const githubRepos = await response.json();

    // Map categories based on GitHub topics or name patterns
    const getCategory = (repo) => {
      const topics = repo.topics || [];
      const name = repo.name.toLowerCase();

      if (topics.includes('portfolio-client') || name.includes('client')) return "Client Work";
      if (topics.includes('portfolio-hackathon')) return "Hackathon";
      if (topics.includes('portfolio-group') || topics.includes('group')) return "Group";
      if (topics.includes('portfolio-assignment') || name.includes('assign') || name.includes('ktj')) return "Assignment";
      if (topics.includes('portfolio-youtube') || name.includes('yt-')) return "YouTube";
      
      return "Personal"; // Default
    };

    // Keep track of which local projects have been matched to avoid duplicates
    const matchedLocalIds = new Set();

    const mergedProjects = githubRepos
      .filter(repo => !repo.fork) // Usually, we only want our own projects
      .map(repo => {
        // Find if we have local rich metadata for this repo - use exact match on repo name
        const localMatch = localProjects.find(p => {
          if (!p.github || matchedLocalIds.has(p.id)) return false;
          
          // Extract repo name from URL: https://github.com/user/repo-name
          const repoNameFromUrl = p.github.split('/').pop().toLowerCase();
          return repoNameFromUrl === repo.name.toLowerCase();
        });

        if (localMatch) {
          matchedLocalIds.add(localMatch.id);
          // Merge: GitHub provides live stats, Local provides rich content
          return {
            ...localMatch,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            updatedAt: repo.updated_at,
            // Only override if local values are missing
            description: localMatch.description || repo.description,
            demo: localMatch.demo || repo.homepage,
          };
        }

        // New project found on GitHub but not in localProjects
        return {
          id: `gh-${repo.id}`,
          title: repo.name.replace(/-/g, ' ').replace(/_/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          description: repo.description || "No description provided.",
          image: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
          category: getCategory(repo),
          techStack: repo.language ? [repo.language] : [],
          demo: repo.homepage,
          github: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.updated_at,
          featured: false
        };
      });

    // Also include local projects that might not be on GitHub (if any)
    const orphans = localProjects.filter(p => !matchedLocalIds.has(p.id));

    // Final merge and deduplicate by ID just in case
    const allProjects = [...mergedProjects, ...orphans];
    const uniqueProjects = Array.from(new Map(allProjects.map(p => [p.id, p])).values());

    return uniqueProjects.sort((a, b) => {
      // Sort by featured first, then by date/id
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
    });

  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return localProjects; // Fallback to local data on error
  }
};
