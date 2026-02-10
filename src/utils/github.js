const GITHUB_USERNAME = 'Vortex-16';

export const fetchGitHubProjects = async () => {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub projects');
    }
    const data = await response.json();

    // Filter out forks if desired, or keep them. 
    // Here we map them to our internal project structure.
    return data.map(repo => {
      const name = repo.name;
      const lowerName = name.toLowerCase();
      let category = "Personal"; // Default

      // Categorization Logic based on User's List
      const groupProjects = [
        "punarchakra", "nep_path", "codigo", "codigo v3", "truered", "verdescan",
        "chain torque", "aerovista", "prashikashan", "docusage", "codebattle arena",
        "gdg leaderboard website"
      ];

      const assignments = [
        "innovationlab", "stcet", "python-calculator", "python calculator",
        "student data managemet python", "ktj", "ktj-ass"
      ];

      const youtube = [
        "c & python & shardha maam dsa", "shardha maam dsa"
      ];

      if (groupProjects.some(p => lowerName.includes(p))) {
        category = "Group/Hackathon";
      } else if (assignments.some(p => lowerName.includes(p))) {
        category = "Assignment";
      } else if (youtube.some(p => lowerName.includes(p))) {
        category = "YouTube";
      }

      return {
        id: repo.id,
        title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '), // Clean up title
        description: repo.description,
        image: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`, // Auto-generate social preview image
        category: category,
        techStack: [repo.language].filter(Boolean), // Use primary language, or fetch languages API for more
        demo: repo.homepage,
        github: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at
      };
    });
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
};
