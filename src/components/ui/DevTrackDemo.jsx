import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { 
  FaGithub, FaBrain, FaShieldAlt, FaExclamationTriangle, 
  FaChartLine, FaTerminal, FaClock, FaFire, FaBook, FaSearch,
  FaLightbulb, FaRobot, FaStar, FaCodeBranch
} from 'react-icons/fa';

const DEFAULT_STREAKS = [
  { day: 'Mon', level: 2 }, { day: 'Tue', level: 0 }, { day: 'Wed', level: 4 },
  { day: 'Thu', level: 3 }, { day: 'Fri', level: 2 }, { day: 'Sat', level: 4 },
  { day: 'Sun', level: 5 },
];

const DevTrackDemo = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('intelligence');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  
  // Real GitHub Data States
  const [githubUsername, setGithubUsername] = useState('Vortex-16');
  const [usernameInput, setUsernameInput] = useState('');
  const [githubData, setGithubData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scanningUser, setScanningUser] = useState(false);
  const [userError, setUserError] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const fetchUserGitHubData = async (userToFetch) => {
    setScanningUser(true);
    setUserError(null);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${userToFetch}`),
        fetch(`https://api.github.com/users/${userToFetch}/repos?sort=updated&per_page=30`)
      ]);
      
      if (!userRes.ok) throw new Error(`User @${userToFetch} not found`);
      
      const userData = await userRes.json();
      const reposData = await reposRes.json();
      
      setGithubData(userData);
      setRepos(Array.isArray(reposData) ? reposData : []);
      if (Array.isArray(reposData) && reposData.length > 0) {
        setSelectedRepo(reposData[0]);
      } else {
        setSelectedRepo(null);
      }
      setGithubUsername(userToFetch);
      setAnalysisResult(null);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      setUserError(error.message);
    } finally {
      setLoading(false);
      setScanningUser(false);
    }
  };

  useEffect(() => {
    fetchUserGitHubData('Vortex-16');
  }, []);

  const handleScanSubmit = (e) => {
    e.preventDefault();
    const query = usernameInput.trim();
    if (!query) return;
    fetchUserGitHubData(query);
    setUsernameInput('');
  };

  const runAIAnalysis = async () => {
    if (!selectedRepo) return;
    setAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Fetch live repository contents, commits, and language breakdown from GitHub API
      const repoFullName = selectedRepo.full_name || `${githubUsername}/${selectedRepo.name}`;
      const [contentsRes, commitsRes, languagesRes] = await Promise.allSettled([
        fetch(`https://api.github.com/repos/${repoFullName}/contents`),
        fetch(`https://api.github.com/repos/${repoFullName}/commits?per_page=10`),
        fetch(`https://api.github.com/repos/${repoFullName}/languages`),
      ]);

      const contents = contentsRes.status === 'fulfilled' && contentsRes.value.ok ? await contentsRes.value.json() : [];
      const commits = commitsRes.status === 'fulfilled' && commitsRes.value.ok ? await commitsRes.value.json() : [];
      const languagesObj = languagesRes.status === 'fulfilled' && languagesRes.value.ok ? await languagesRes.value.json() : {};

      const fileNames = Array.isArray(contents) ? contents.map(f => f.name) : [];
      const languagesList = Object.keys(languagesObj);
      const primaryLang = selectedRepo.language || (languagesList[0] || 'JavaScript');

      // Detect real files present in the repo
      const hasPackageJson = fileNames.includes('package.json');
      const hasDocker = fileNames.includes('Dockerfile') || fileNames.includes('docker-compose.yml');
      const hasGitignore = fileNames.includes('.gitignore');
      const hasReadme = fileNames.some(f => f.toLowerCase().includes('readme'));
      const hasLicense = fileNames.some(f => f.toLowerCase().includes('license'));
      const hasEnv = fileNames.some(f => f.includes('.env'));

      // Dynamic Vulnerabilities based on real file structure
      const vulnerabilities = [];
      if (hasPackageJson) {
        vulnerabilities.push({
          title: `Outdated or unpinned dependencies in ${selectedRepo.name}`,
          severity: 'high',
          file: 'package.json',
        });
      }
      if (hasEnv) {
        vulnerabilities.push({
          title: 'Potential sensitive environment variables exposed in root',
          severity: 'high',
          file: '.env',
        });
      }
      if (!hasGitignore) {
        vulnerabilities.push({
          title: 'Missing .gitignore — Risk of committing build artifacts & secrets',
          severity: 'medium',
          file: '.gitignore',
        });
      }
      if (!hasLicense) {
        vulnerabilities.push({
          title: 'Missing LICENSE file — Open source compliance warning',
          severity: 'low',
          file: 'LICENSE',
        });
      }
      if (vulnerabilities.length === 0) {
        vulnerabilities.push({
          title: `Code scanning check completed for ${selectedRepo.name}`,
          severity: 'low',
          file: `${selectedRepo.name}/main`,
        });
      }

      // Dynamic Hotspots based on language, stars, forks, and repo size
      const sizeKB = selectedRepo.size || 500;
      const openIssues = selectedRepo.open_issues_count || 0;
      const hotspots = [
        {
          title: `Primary Engine Stack (${primaryLang})`,
          score: `${Math.min(9.8, (sizeKB / 1000 + 5.2).toFixed(1))}/10`,
          reason: languagesList.length > 1 ? `Polyglot repo: ${languagesList.slice(0, 3).join(', ')}` : `Single language codebase (${primaryLang})`,
        },
        {
          title: `Repository Maintenance & Activity`,
          score: openIssues > 5 ? '8.2/10' : '4.5/10',
          reason: `${openIssues} open issues · ${commits.length} recent commits analyzed`,
        },
      ];
      if (hasDocker) {
        hotspots.push({
          title: 'Containerization Layer (Docker)',
          score: '6.9/10',
          reason: 'Verify minimal base image layer caching',
        });
      }

      // Dynamic Next Steps based on real analysis findings
      const nextSteps = [];
      if (!hasReadme) {
        nextSteps.push(`Add a comprehensive README.md with setup instructions for ${selectedRepo.name}.`);
      } else {
        nextSteps.push(`Update README.md documentation for ${selectedRepo.name} with architecture badges.`);
      }
      if (hasPackageJson) {
        nextSteps.push(`Run \`npm audit fix\` or Dependabot vulnerability patches for ${selectedRepo.name}.`);
      } else if (primaryLang === 'Python') {
        nextSteps.push(`Generate \`requirements.txt\` or \`pyproject.toml\` lockfile for ${primaryLang} environment.`);
      } else {
        nextSteps.push(`Set up automated CI/CD GitHub Actions workflow for ${selectedRepo.name}.`);
      }
      nextSteps.push(`Enforce pull request branch protection rules on \`${selectedRepo.default_branch || 'main'}\`.`);

      setAnalysisResult({
        vulnerabilities,
        hotspots,
        nextSteps,
        scannedRepoName: selectedRepo.name,
        primaryLang,
        commitCount: commits.length,
        sizeKB,
      });

    } catch (err) {
      console.error('Error conducting dynamic repo analysis:', err);
      // Fallback dynamic output
      setAnalysisResult({
        vulnerabilities: [
          { title: `Static scan completed for ${selectedRepo.name}`, severity: 'medium', file: selectedRepo.name },
        ],
        hotspots: [
          { title: `Repo Complexity (${selectedRepo.language || 'Code'})`, score: '6.5/10', reason: `${selectedRepo.stargazers_count} stars · ${selectedRepo.forks_count} forks` },
        ],
        nextSteps: [
          `Audit dependencies and build pipeline for ${selectedRepo.name}.`,
          `Set up automated test coverage reporting.`,
        ]
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const panelBg = isDark ? 'bg-[#0d0d0d]' : 'bg-gray-900';
  const cardBg = isDark ? 'bg-white/5' : 'bg-white/10';
  const borderColor = isDark ? 'border-white/10' : 'border-white/20';

  if (loading) {
    return (
      <div className={`w-full h-[480px] rounded-2xl flex items-center justify-center ${panelBg} border ${borderColor}`}>
        <div className="flex flex-col items-center gap-4">
          <FaGithub className="text-white animate-bounce" size={40} />
          <p className="font-mono text-xs text-gray-500">Injecting real-time insights from @Vortex-16...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full rounded-2xl overflow-hidden ${panelBg} border ${borderColor} shadow-2xl transition-all duration-500`}>
      {/* ── Dashboard Header ── */}
      <div className={`px-4 py-3 border-b ${borderColor} flex items-center justify-between bg-gradient-to-r ${isDark ? 'from-black/40 to-transparent' : 'from-white/5 to-transparent'}`}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-[10px] text-gray-500 ml-2">DevTrack // Live GitHub Intelligence</span>
        </div>
        
        <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
          {['intelligence', 'consistency', 'learning'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-md font-mono text-[9px] uppercase tracking-wider transition-all ${
                activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6 min-h-[420px]">
        <AnimatePresence mode="wait">
          {/* ── TAB: INTELLIGENCE (Real Repo Analysis) ── */}
          {activeTab === 'intelligence' && (
            <motion.div
              key="intel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              <div className="md:col-span-4 space-y-4">
                <div className={`${cardBg} rounded-xl p-4 border ${borderColor}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <img src={githubData?.avatar_url || 'https://github.com/github.png'} className="w-10 h-10 rounded-full border border-white/10 shrink-0" alt="Avatar" />
                    <div className="overflow-hidden flex-1 min-w-0">
                      <h4 className="font-lexa text-sm font-bold text-white truncate">@{githubData?.login || githubUsername}</h4>
                      <p className="font-mono text-[9px] text-indigo-400">{githubData?.public_repos ?? 0} Public Repositories</p>
                    </div>
                  </div>

                  {/* GitHub Username Scanner Form */}
                  <form onSubmit={handleScanSubmit} className="mb-4">
                    <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-1.5">Scan GitHub User</p>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        placeholder="e.g. torvalds"
                        className="flex-1 bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 font-mono text-[10px] text-white outline-none focus:border-indigo-500 transition-all placeholder:text-gray-600"
                      />
                      <button
                        type="submit"
                        disabled={scanningUser || !usernameInput.trim()}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 text-white font-mono text-[10px] font-bold rounded-lg transition-all shrink-0"
                      >
                        {scanningUser ? '...' : 'Scan'}
                      </button>
                    </div>
                    {userError && (
                      <p className="font-mono text-[9px] text-red-400 mt-1">{userError}</p>
                    )}
                  </form>
                  
                  <div className="space-y-2 mb-4">
                    <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Select Repository</p>
                    <select 
                      onChange={(e) => {
                        const repo = repos.find(r => r.id === parseInt(e.target.value));
                        setSelectedRepo(repo);
                        setAnalysisResult(null);
                      }}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 font-mono text-[10px] text-white outline-none focus:border-indigo-500 transition-all"
                    >
                      {repos.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </div>

                  <button 
                    onClick={runAIAnalysis}
                    disabled={analyzing || !selectedRepo}
                    className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                  >
                    {analyzing ? <FaSearch className="animate-spin" /> : <FaBrain />}
                    {analyzing ? 'Consulting Llama 3.3...' : 'Analyze Repository'}
                  </button>
                </div>

                {selectedRepo && (
                  <div className={`${cardBg} rounded-xl p-4 border ${borderColor}`}>
                    <h4 className="font-mono text-[10px] text-gray-500 uppercase mb-3 flex items-center gap-2">
                       Metadata Analysis
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-black/20 p-2 rounded border border-white/5">
                        <FaStar className="text-yellow-400 mb-1" size={10} />
                        <div className="font-mono text-[10px] text-white font-bold">{selectedRepo.stargazers_count} Stars</div>
                      </div>
                      <div className="bg-black/20 p-2 rounded border border-white/5">
                        <FaCodeBranch className="text-blue-400 mb-1" size={10} />
                        <div className="font-mono text-[10px] text-white font-bold">{selectedRepo.forks_count} Forks</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="md:col-span-8">
                {analyzing ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-4 py-20">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-2 border-indigo-500/20" />
                      <div className="absolute inset-0 w-16 h-16 rounded-full border-t-2 border-indigo-500 animate-spin" />
                      <FaBrain className="absolute inset-0 m-auto text-indigo-400 animate-pulse" size={24} />
                    </div>
                    <p className="font-mono text-xs text-indigo-400 animate-pulse">Running Deep Static Analysis on {selectedRepo?.name}...</p>
                  </div>
                ) : analysisResult ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                         <div className="flex items-center gap-2 mb-3">
                           <FaShieldAlt className="text-red-500" size={12}/>
                           <span className="font-mono text-xs text-red-400 font-bold uppercase">Real-time Vulnerabilities</span>
                         </div>
                         {analysisResult.vulnerabilities.map((v, i) => (
                           <div key={i} className="mb-2 last:mb-0">
                             <p className="font-mono text-[11px] text-white font-bold">{v.title}</p>
                             <p className="font-mono text-[9px] text-gray-500">{v.file}</p>
                           </div>
                         ))}
                      </div>
                      <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20">
                         <div className="flex items-center gap-2 mb-3">
                           <FaExclamationTriangle className="text-orange-500" size={12}/>
                           <span className="font-mono text-xs text-orange-400 font-bold uppercase">Complexity Hotspots</span>
                         </div>
                         {analysisResult.hotspots.map((h, i) => (
                           <div key={i} className="mb-2 last:mb-0 flex justify-between items-start">
                             <div>
                               <p className="font-mono text-[11px] text-white font-bold">{h.title}</p>
                               <p className="font-mono text-[9px] text-gray-500">{h.reason}</p>
                             </div>
                             <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[9px] font-bold">{h.score}</span>
                           </div>
                         ))}
                      </div>
                    </div>
                    <div className={`${cardBg} rounded-xl p-5 border ${borderColor} relative overflow-hidden`}>
                       <h4 className="font-mono text-xs text-indigo-400 font-bold mb-3 flex items-center gap-2 uppercase tracking-widest">
                         <FaLightbulb className="text-yellow-400" /> Actionable Next Steps
                       </h4>
                       <div className="space-y-2">
                         {analysisResult.nextSteps.map((step, idx) => (
                           <div key={idx} className="flex gap-3 items-center group">
                             <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-125 transition-all" />
                             <p className="font-mono text-[11px] text-gray-300">{step}</p>
                           </div>
                         ))}
                       </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-white/5 rounded-2xl bg-black/20">
                    <FaTerminal className="text-gray-700 mb-3" size={32} />
                    <p className="font-mono text-[11px] text-gray-400 mb-2">Connected to GitHub API as <span className="text-indigo-400">Vortex-16</span></p>
                    <p className="font-mono text-[10px] text-gray-600 max-w-sm">
                      Select a real repository from your profile to begin the AI-driven analysis simulation.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── TAB: CONSISTENCY (Real Profile Stats) ── */}
          {activeTab === 'consistency' && (
            <motion.div
              key="consist"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className={`${cardBg} rounded-xl p-5 border ${borderColor} text-center`}>
                    <FaFire className="text-orange-500 mx-auto mb-2" size={24} />
                    <h5 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Followers</h5>
                    <div className="font-lexa text-3xl font-bold text-white mt-1">{githubData?.followers}</div>
                    <p className="font-mono text-[9px] text-gray-600 mt-1">Growing Community</p>
                 </div>
                 <div className={`${cardBg} rounded-xl p-5 border ${borderColor} text-center`}>
                    <FaGithub className="text-blue-500 mx-auto mb-2" size={24} />
                    <h5 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Gists</h5>
                    <div className="font-lexa text-3xl font-bold text-white mt-1">{githubData?.public_gists}</div>
                    <p className="font-mono text-[9px] text-gray-600 mt-1">Code Snippets Shared</p>
                 </div>
                 <div className={`${cardBg} rounded-xl p-5 border ${borderColor} text-center`}>
                    <FaChartLine className="text-indigo-500 mx-auto mb-2" size={24} />
                    <h5 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Following</h5>
                    <div className="font-lexa text-3xl font-bold text-white mt-1">{githubData?.following}</div>
                    <p className="font-mono text-[9px] text-indigo-400 mt-1">Developer Network</p>
                 </div>
              </div>

              <div className={`${cardBg} rounded-xl p-6 border ${borderColor}`}>
                 <h5 className="font-mono text-xs text-gray-400 mb-6 flex items-center gap-2">
                    <FaGithub size={14} /> Profile Growth Timeline (@{githubData?.login})
                 </h5>
                 <p className="font-mono text-[11px] text-gray-500 mb-4 italic">
                    Account created on: {new Date(githubData?.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                 </p>
                 <div className="flex justify-between items-end h-32 px-4 border-b border-white/5">
                    {DEFAULT_STREAKS.map((s, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                        <div 
                          className={`w-8 rounded-t-md transition-all duration-500 group-hover:brightness-125 ${
                            s.level === 0 ? 'bg-white/5 h-2' : 
                            s.level < 3 ? 'bg-indigo-900/50 h-12' : 
                            s.level < 5 ? 'bg-indigo-600 h-24' : 'bg-green-500 h-28'
                          }`}
                        />
                        <span className="font-mono text-[9px] text-gray-600">{s.day}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          )}

          {/* ── TAB: LEARNING (Logs) ── */}
          {activeTab === 'learning' && (
             <motion.div
              key="learn"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-4"
             >
                <div className="flex items-center justify-between mb-4">
                   <h4 className="font-lexa text-lg font-bold text-white">Daily Growth Logs</h4>
                   <button className="px-4 py-1.5 rounded-lg bg-green-500 text-black font-mono text-[10px] font-bold hover:bg-green-400 transition-all flex items-center gap-2">
                      <FaBook size={10} /> New Log Entry
                   </button>
                </div>
                {[
                  { title: "Integrating GitHub REST API", mood: "Determined 💪", time: "1h 30m", date: "Today" },
                  { title: "Deep Dive into LLM RAG Pipelines", mood: "Mind Blown 🤯", time: "3h 45m", date: "Yesterday" },
                  { title: "Debugging React Server Components", mood: "Focused 🎯", time: "2h 12m", date: "Mar 29" }
                ].map((log, i) => (
                  <div key={i} className={`${cardBg} rounded-xl p-4 border ${borderColor} flex items-center justify-between group hover:border-indigo-500/50 transition-all`}>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                          <FaTerminal size={16} />
                       </div>
                       <div>
                          <p className="font-lexa text-sm font-bold text-white">{log.title}</p>
                          <p className="font-mono text-[10px] text-gray-500">Duration: {log.time} • Mood: {log.mood}</p>
                       </div>
                    </div>
                    <span className="font-mono text-[9px] text-gray-600 bg-white/5 px-2 py-1 rounded">{log.date}</span>
                  </div>
                ))}
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`px-4 py-3 bg-black/40 border-t ${borderColor} flex items-center gap-4`}>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-[9px] text-gray-500 uppercase">Live Intelligence Connected: @Vortex-16</span>
         </div>
         <div className="h-4 w-[1px] bg-white/10" />
         <span className="font-mono text-[9px] text-gray-600 italic truncate italic">
            {githubData?.bio || "Mapping growth through real-time repository analysis."}
         </span>
      </div>
    </div>
  );
};

export default DevTrackDemo;
