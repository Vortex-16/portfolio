import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../hooks/useTheme';

const InteractiveTerminal = ({ onClose }) => {
  const { isDark } = useTheme();
  const [currentLine, setCurrentLine] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  help     - Show this help message',
      '  about    - Learn about Vikash',
      '  skills   - List technical skills',
      '  projects - Show recent projects',
      '  contact  - Get contact information',
      '  clear    - Clear terminal',
      '  date     - Show current date',
      '  whoami   - Who am I?',
      '  snake    - Play snake game (coming soon!)',
      '  matrix   - Enter the matrix...',
      ''
    ],
    about: () => [
      'About Vikash Gupta:',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'CSE Student at St. Thomas College of Engineering and Technology',
      'Passionate Frontend Developer & Problem Solver',
      '',
      'I love creating innovative web solutions and exploring',
      'new technologies. Always eager to learn and grow!',
      ''
    ],
    skills: () => [
      'Technical Skills:',
      '━━━━━━━━━━━━━━━━━',
      '🌐 Frontend: React, JavaScript, HTML, CSS',
      '🎨 Styling: Tailwind CSS, Bootstrap',
      '🔧 Tools: Git, VS Code, npm',
      '💾 Databases: MongoDB, Firebase',
      '🖥️ Languages: Python, JavaScript',
      '🚀 Frameworks: Node.js, Express.js',
      ''
    ],
    projects: () => [
      'Recent Projects:',
      '━━━━━━━━━━━━━━━━━',
      '🚀 Interactive Portfolio - This very website!',
      '🎮 Snake Game - Built with Canvas API',
      '💻 Terminal Emulator - What you\'re using now',
      '🌟 And many more on GitHub...',
      '',
      'Visit: https://github.com/vikashgupta16',
      ''
    ],
    contact: () => [
      'Contact Information:',
      '━━━━━━━━━━━━━━━━━━━━━',
      '📧 Email: vikashgupta16@example.com',
      '🌐 GitHub: https://github.com/vikashgupta16',
      '💼 LinkedIn: Coming soon...',
      '📱 Portfolio: You\'re already here!',
      '',
      'Feel free to reach out for collaborations!',
      ''
    ],
    date: () => [new Date().toString(), ''],
    whoami: () => ['vikash_gupta', ''],
    clear: () => {
      setHistory([]);
      return [];
    },
    snake: () => [
      '🐍 Snake game is available in the floating menu!',
      'Click the floating action button (🎉) and select Snake Game.',
      ''
    ],
    matrix: () => [
      '🔴 Taking the red pill...',
      'Activating Matrix mode...',
      '01001000 01100101 01101100 01101100 01101111',
      'Wake up, Neo...',
      ''
    ]
  };

  useEffect(() => {
    if (terminalRef.current) {
      gsap.fromTo(terminalRef.current, 
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
      );
    }

    // Auto-focus input and show welcome message
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Welcome message
    if (history.length === 0) {
      setHistory([
        'Welcome to Vikash\'s Interactive Terminal! 🚀',
        'Type "help" to see available commands.',
        ''
      ]);
    }
  }, []);

  const handleCommand = (input) => {
    const trimmedInput = input.trim().toLowerCase();
    const command = commands[trimmedInput];
    
    let output = [];
    if (command) {
      const result = command();
      if (Array.isArray(result)) {
        output = result;
      }
    } else if (trimmedInput === '') {
      output = [''];
    } else {
      output = [`Command not found: ${trimmedInput}`, 'Type "help" for available commands.', ''];
    }

    setHistory(prev => [
      ...prev,
      `$ ${input}`,
      ...output
    ]);

    // Add to command history
    if (trimmedInput && !commandHistory.includes(trimmedInput)) {
      setCommandHistory(prev => [...prev, trimmedInput]);
    }
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(currentLine);
      setCurrentLine('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentLine(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentLine('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentLine(commandHistory[newIndex]);
        }
      }
    }
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="fixed inset-4 z-40 flex items-center justify-center">
      <div 
        ref={terminalRef}
        className={`w-full max-w-4xl h-full max-h-96 rounded-lg shadow-2xl border ${
          isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-900 border-gray-600'
        } overflow-hidden`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-400 text-sm font-mono">vikash@portfolio:~</span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Terminal Content */}
        <div className="h-full flex flex-col">
          {/* Output */}
          <div 
            ref={outputRef}
            className="flex-1 p-4 overflow-y-auto font-mono text-sm"
          >
            {history.map((line, index) => (
              <div 
                key={index} 
                className={`${
                  line.startsWith('$') 
                    ? 'text-green-400' 
                    : line.includes('━') 
                      ? 'text-blue-400' 
                      : 'text-gray-300'
                } leading-relaxed`}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700 flex items-center font-mono text-sm">
            <span className="text-green-400 mr-2">vikash@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentLine}
              onChange={(e) => setCurrentLine(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none caret-green-400"
              placeholder="Type a command..."
              autoComplete="off"
              spellCheck="false"
            />
            <span className="text-green-400 animate-pulse">|</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTerminal;
