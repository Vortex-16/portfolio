import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { FaTerminal, FaLinux, FaFolderOpen, FaCodeBranch, FaHourglassHalf, FaClock } from 'react-icons/fa';

const PoshPrompt = ({ dir = 'portfolio', branch = 'main', executionTime = '0ms', time }) => {
  return (
    <div className="flex flex-wrap items-center gap-y-1 select-none font-mono text-[11px] leading-none my-1">
      {/* Segment 1: User / OS Info */}
      <div className="flex items-center bg-[#0d9488] text-white pl-2.5 pr-1.5 py-1 rounded-l-md h-6">
        <FaLinux className="mr-1 text-[13px]" />
        <span className="font-bold">vikash</span>
      </div>
      {/* Arrow 1 -> 2 */}
      <div className="h-6 bg-[#ec4899]">
        <svg className="h-full w-2.5 text-[#0d9488] fill-current" viewBox="0 0 10 20" preserveAspectRatio="none">
          <path d="M0 0 L10 10 L0 20 Z" />
        </svg>
      </div>

      {/* Segment 2: Directory */}
      <div className="flex items-center bg-[#ec4899] text-white px-2 py-1 h-6">
        <FaFolderOpen className="mr-1 text-[11px]" />
        <span>{dir}</span>
      </div>
      {/* Arrow 2 -> 3 */}
      <div className="h-6 bg-[#f59e0b]">
        <svg className="h-full w-2.5 text-[#ec4899] fill-current" viewBox="0 0 10 20" preserveAspectRatio="none">
          <path d="M0 0 L10 10 L0 20 Z" />
        </svg>
      </div>

      {/* Segment 3: Git Branch */}
      <div className="flex items-center bg-[#f59e0b] text-slate-900 px-2 py-1 h-6 font-bold">
        <FaCodeBranch className="mr-1 text-[12px]" />
        <span>{branch}</span>
      </div>
      {/* Arrow 3 -> 4 */}
      <div className="h-6 bg-[#8b5cf6]">
        <svg className="h-full w-2.5 text-[#f59e0b] fill-current" viewBox="0 0 10 20" preserveAspectRatio="none">
          <path d="M0 0 L10 10 L0 20 Z" />
        </svg>
      </div>

      {/* Segment 4: Exec Time */}
      <div className="flex items-center bg-[#8b5cf6] text-white px-2 py-1 h-6">
        <FaHourglassHalf className="mr-1 text-[10px]" />
        <span>{executionTime}</span>
      </div>
      {/* Arrow 4 -> 5 */}
      <div className="h-6 bg-[#06b6d4]">
        <svg className="h-full w-2.5 text-[#8b5cf6] fill-current" viewBox="0 0 10 20" preserveAspectRatio="none">
          <path d="M0 0 L10 10 L0 20 Z" />
        </svg>
      </div>

      {/* Segment 5: Time */}
      <div className="flex items-center bg-[#06b6d4] text-slate-950 px-2.5 py-1 rounded-r-md h-6 font-medium">
        <FaClock className="mr-1 text-[11px]" />
        <span>{time}</span>
      </div>
      {/* Arrow 5 -> End */}
      <div className="h-6">
        <svg className="h-full w-2.5 text-[#06b6d4] fill-current" viewBox="0 0 10 20" preserveAspectRatio="none">
          <path d="M0 0 L10 10 L0 20 Z" />
        </svg>
      </div>
    </div>
  );
};

const PoshInputPrefix = () => (
  <div className="flex items-center gap-1.5 select-none font-mono text-[13px] h-5">
    {/* <span className="text-yellow-400 font-bold"></span> */}
    <span className="text-[#f43f5e] font-semibold">Vortex</span>
    <span className="text-[#06b6d4] font-bold">&gt;&gt;</span>
  </div>
);


const InteractiveTerminal = () => {
  const { isDark } = useTheme();
  const [input, setInput] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Vikash\'s Interactive Terminal!' },
    { type: 'output', text: 'Type "help" to see available commands.' },
    { type: 'output', text: '' }
  ]);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      setTimeStr(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const commands = {
    help: {
      output: [
        'Available commands:',
        '  about    - Learn about me',
        '  skills   - Technical skills',
        '  projects - My projects',
        '  education- Education info',
        '  contact  - Contact details',
        '  os       - OS journey',
        '  clear    - Clear terminal',
        '  whoami   - Quick info'
      ]
    },
    about: {
      output: [
        'Hi! I\'m Vikash Gupta',
        'Full Stack Developer & CSE student at STCET.',
        'Building modern web apps & exploring OS development.',
        'Currently learning Linux internals with EndeavourOS!'
      ]
    },
    skills: {
      output: [
        'Technical Skills:',
        '  Languages: C, Java, JavaScript, Python',
        '  Frontend: React, Tailwind CSS, Framer Motion',
        '  Backend: Node.js, Express',
        '  OS: Linux (EndeavourOS), System Programming'
      ]
    },
    projects: {
      output: [
        'My Projects:',
        '  • Portfolio Website (React + Tailwind)',
        '  • OS Development Journey',
        '  • Full Stack Applications',
        'Visit /projects for details!'
      ]
    },
    education: {
      output: [
        'Education:',
        '  🎓 Computer Science Engineering',
        '  📍 STCET (St. Thomas College of Engineering and Technology)',
        '  📚 Algorithms, Data Structures, System Design'
      ]
    },
    contact: {
      output: [
        'Contact Information:',
        '  📧 Email: Available on /contact page',
        '  🔗 GitHub: Check out my projects',
        '  💼 LinkedIn: Let\'s connect!',
        'Visit /contact for more!'
      ]
    },
    os: {
      output: [
        'My OS Journey:',
        '  🐧 Daily: EndeavourOS (Arch-based)',
        '  📖 Learning: Linux kernel, system programming',
        '  🎯 Goal: Build microkernel-based OS'
      ]
    },
    whoami: {
      output: [
        'vikash',
        'Full Stack Dev | OS Enthusiast | Problem Solver'
      ]
    },
    clear: {
      output: []
    }
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === '') {
      return;
    }

    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const cmdTime = `${hours}:${minutes} ${ampm}`;

    const newHistory = [...history, { type: 'input', text: cmd, time: cmdTime }];

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd].output;
      const outputHistory = output.map(line => ({ type: 'output', text: line }));
      setHistory([...newHistory, ...outputHistory, { type: 'output', text: '' }]);
    } else {
      setHistory([
        ...newHistory,
        { type: 'error', text: `Command not found: ${cmd}` },
        { type: 'output', text: 'Type "help" for available commands.' },
        { type: 'output', text: '' }
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative max-w-4xl mx-auto mb-12 group" onClick={handleTerminalClick}>
      {/* Ambient glow behind the glass */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-1.5 rounded-[1.75rem] blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 ${isDark
          ? 'bg-gradient-to-r from-blue-600/40 via-cyan-500/20 to-emerald-500/30'
          : 'bg-gradient-to-r from-emerald-500/30 via-cyan-500/20 to-blue-500/30'
          }`}
      />

      {/* Glass terminal window */}
      <div className={`relative rounded-2xl overflow-hidden border ${isDark ? 'border-white/10 bg-[#080d1a]/40 ring-black/40' : 'border-black/10 bg-white/20 ring-white/20'
        } shadow-2xl backdrop-blur-2xl cursor-text ring-1`}>
        {/* Title bar */}
        <div className={`flex items-center px-4 py-2.5 border-b ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'
          }`}>
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className={`flex items-center gap-2 mx-auto text-xs font-mono ${isDark ? 'text-gray-300/80' : 'text-gray-700/80'
            }`}>
            <FaTerminal className={isDark ? 'text-cyan-400' : 'text-cyan-600'} size={12} />
            <span>vikash@linux: ~</span>
          </div>
          <span className={`text-[10px] font-mono tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>zsh</span>
        </div>

        {/* Terminal body */}
        <div
          ref={terminalRef}
          className="p-4 h-72 overflow-y-auto font-mono text-[13px] leading-relaxed"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: isDark ? '#334155 transparent' : '#cbd5e1 transparent',
            background: isDark
              ? 'radial-gradient(120% 80% at 0% 0%, rgba(56,189,248,0.06), transparent 60%)'
              : 'radial-gradient(120% 80% at 0% 0%, rgba(5,150,105,0.03), transparent 60%)',
          }}
        >
          {history.map((line, index) => (
            <div key={index} className="mb-3">
              {line.type === 'output' && (
                <div className={`whitespace-pre-wrap ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>{line.text}</div>
              )}
              {line.type === 'input' && (
                <div className="mt-1">
                  <div className="flex flex-wrap items-center">
                    <PoshPrompt time={line.time || '10:15 AM'} />
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <PoshInputPrefix />
                    <span className={isDark ? 'text-emerald-300 ml-1' : 'text-emerald-700 ml-1'}>{line.text}</span>
                  </div>
                </div>
              )}
              {line.type === 'error' && (
                <div className="text-red-400">{line.text}</div>
              )}
            </div>
          ))}

          {/* Live prompt */}
          <form onSubmit={handleSubmit} className="mt-1">
            <div className="flex flex-wrap items-center">
              <PoshPrompt time={timeStr} />
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <PoshInputPrefix />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`flex-1 ml-1 bg-transparent outline-none border-none font-mono ${isDark
                  ? 'text-emerald-300 caret-emerald-300'
                  : 'text-emerald-700 caret-emerald-700'
                  }`}
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTerminal;
