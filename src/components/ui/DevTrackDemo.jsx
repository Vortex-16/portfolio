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
  const [githubData, setGithubData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/Vortex-16'),
          fetch('https://api.github.com/users/Vortex-16/repos?sort=updated&per_page=5')
        ]);
        
        const userData = await userRes.json();
        const reposData = await reposRes.json();
        
        setGithubData(userData);
        setRepos(reposData);
        if (reposData.length > 0) setSelectedRepo(reposData[0]);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGitHubData();
  }, []);

  const runAIAnalysis = () => {
    if (!selectedRepo) return;
    setAnalyzing(true);
    setAnalysisResult(null);
    
    // Simulate AI response based on real repo data
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisResult({
        vulnerabilities: [
          { title: `Insecure dependency in ${selectedRepo.name}`, severity: 'high', file: 'package.json' },
          { title: 'Potential sensitive data exposure', severity: 'medium', file: '.env.example' },
        ],
        hotspots: [
          { title: `Module Complexity: ${selectedRepo.name}/core`, score: '7.8/10', reason: 'Nested logic loops' },
          { title: 'Memory Pressure points', score: '6.4/10', reason: 'Unclosed stream buffers' },
        ],
        nextSteps: [
          `Audit ${selectedRepo.language || 'codebase'} for deprecated patterns.`,
          `Implement automated test suite for ${selectedRepo.name}.`,
          `Optimize CI/CD pipeline for faster deployment cycles.`
        ]
      });
    }, 2000);
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
                    <img src={githubData?.avatar_url} className="w-10 h-10 rounded-full border border-white/10" alt="Avatar" />
                    <div className="overflow-hidden">
                      <h4 className="font-lexa text-sm font-bold text-white truncate">@{githubData?.login}</h4>
                      <p className="font-mono text-[9px] text-indigo-400">{githubData?.public_repos} Public Repositories</p>
                    </div>
                  </div>
                  
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
