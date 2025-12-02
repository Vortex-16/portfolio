import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

const InteractiveTerminal = () => {
  const { isDark } = useTheme();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Vikash\'s Interactive Terminal!' },
    { type: 'output', text: 'Type "help" to see available commands.' },
    { type: 'output', text: '' }
  ]);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

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

    const newHistory = [...history, { type: 'input', text: `$ ${cmd}` }];

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
    <div 
      className={`max-w-4xl mx-auto mb-12 rounded-lg overflow-hidden ${
        isDark ? 'bg-gray-900/90' : 'bg-gray-800/95'
      } backdrop-blur-sm border ${isDark ? 'border-purple-500/30' : 'border-emerald-500/30'} shadow-xl cursor-text`}
      onClick={handleTerminalClick}
    >
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/60 border-b border-gray-700/50">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        <span className="ml-2 text-xs text-gray-400 font-mono">vikash@portfolio ~ Interactive Terminal</span>
      </div>
      
      <div 
        ref={terminalRef}
        className="p-3 h-64 overflow-y-auto font-mono text-xs leading-relaxed"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#4B5563 transparent'
        }}
      >
        {history.map((line, index) => (
          <div key={index} className="mb-0.5">
            {line.type === 'output' && (
              <div className="text-green-400">{line.text}</div>
            )}
            {line.type === 'input' && (
              <div className="text-gray-300">{line.text}</div>
            )}
            {line.type === 'error' && (
              <div className="text-red-400">{line.text}</div>
            )}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center gap-1.5 mt-1">
          <span className="text-cyan-400 flex-shrink-0">vikash@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-green-400 outline-none border-none font-mono"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
          <span className="text-green-400 animate-pulse">▋</span>
        </form>
      </div>
    </div>
  );
};

export default InteractiveTerminal;
