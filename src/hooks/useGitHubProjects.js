import { useState, useEffect } from 'react';
import { fetchGitHubProjects } from '../utils/github';
import { projects as localProjects } from '../constants/projects';


export const useGitHubProjects = () => {
  // Start with local data immediately so featured projects show up without delay
  const [projects, setProjects] = useState(localProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        // Keep showing local projects while we fetch live stats
        const data = await fetchGitHubProjects();
        if (isMounted) {
          setProjects(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return { projects, loading, error };
};
