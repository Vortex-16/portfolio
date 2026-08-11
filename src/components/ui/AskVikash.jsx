import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import {
  FaComments, FaTimes, FaPaperPlane, FaRobot,
  FaChevronDown, FaCode, FaLaptopCode,
} from 'react-icons/fa';
import { AI_KB_ENTRIES } from '../../constants/aiKnowledge';

/* ── Knowledge base matcher ── */
const SUGGESTIONS = [
  'Who is Vikash?',
  'What is his tech stack?',
  'Tell me about DevTrack & Arynox',
  'What are his achievements?',
  'Is he open for internships?',
];

function findAnswer(query) {
  const q = query.toLowerCase();
  for (const entry of AI_KB_ENTRIES) {
    if (entry.keys.some((k) => q.includes(k))) return entry.answer;
  }
  return `I'm Vikash's Portfolio AI Assistant! You can ask me about his tech stack, major projects (DevTrack, Arynox, CodeBattle, TrustED), education at STCET, achievements (Google Solution Challenge Top 106, SIH), or internship availability!`;
}

const AskVikash = () => {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: `Hi! I'm here to tell you all about Vikash. Ask me anything — projects, skills, availability...` },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    setMessages((prev) => [...prev, { from: 'user', text: msg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { from: 'bot', text: findAnswer(msg) }]);
    }, 800 + Math.random() * 400);
  };

  const onKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  const bubbleBg = isDark
    ? 'bg-[#0f0f0f] border border-white/10'
    : 'bg-white border border-black/10';
  const headerBg = isDark ? 'bg-[#111] border-b border-white/10' : 'bg-gray-50 border-b border-black/5';

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        id="ask-vikash-btn"
        onClick={() => setOpen((o) => !o)}
        title="Ask about Vikash"
        className={`fixed bottom-24 right-5 z-[900] w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-90 backdrop-blur-xl border ${
          open
            ? isDark ? 'bg-white/20 border-white/30 text-white' : 'bg-white/40 border-black/10 text-gray-900'
            : isDark ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 hover:bg-emerald-500/20'
        }`}
        style={open ? {} : { boxShadow: isDark ? '0 0 20px rgba(255,255,255,0.1)' : '0 0 20px rgba(5,150,105,0.15)' }}
      >
        {open ? <FaTimes size={16} /> : <FaComments size={16} />}
      </button>

      {/* ── Chat Panel ── */}
      {open && (
        <div
          className={`fixed bottom-40 right-4 z-[900] w-80 sm:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden ${bubbleBg}`}
          style={{ maxHeight: '70vh' }}
        >
          {/* Header */}
          <div className={`${headerBg} px-4 py-3 flex items-center gap-3 shrink-0`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-purple-500/30' : 'bg-indigo-100'}`}>
              <FaRobot size={14} className={isDark ? 'text-purple-400' : 'text-indigo-600'} />
            </div>
            <div>
              <div className={`font-mono text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Ask about Vikash</div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                Online
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: 'none' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`rounded-2xl px-3 py-2 max-w-[85%] font-mono text-xs leading-relaxed whitespace-pre-wrap ${
                    m.from === 'user'
                      ? isDark ? 'bg-purple-600 text-white' : 'bg-indigo-600 text-white'
                      : isDark ? 'bg-white/8 text-gray-200 border border-white/8' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className={`rounded-2xl px-4 py-3 font-mono text-xs ${isDark ? 'bg-white/8 text-gray-400 border border-white/8' : 'bg-gray-100 text-gray-500'}`}>
                  <span className="inline-flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length < 3 && (
            <div className={`px-3 pb-2 flex flex-wrap gap-1.5 shrink-0 border-t ${isDark ? 'border-white/8' : 'border-black/5'} pt-2`}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className={`text-[10px] font-mono px-2 py-1 rounded-full border transition-all active:scale-95 ${
                    isDark ? 'border-white/15 text-gray-400 hover:text-white hover:border-white/30' : 'border-black/10 text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className={`px-3 pb-3 pt-2 shrink-0 border-t ${isDark ? 'border-white/8' : 'border-black/5'}`}>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Ask me anything..."
                className={`flex-1 rounded-xl px-3 py-2 font-mono text-xs outline-none transition-all ${
                  isDark
                    ? 'bg-white/8 text-white placeholder-gray-600 border border-white/10 focus:border-purple-500/50'
                    : 'bg-gray-100 text-gray-900 placeholder-gray-400 border border-black/5 focus:border-indigo-400/50'
                }`}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim()}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90 disabled:opacity-30 ${
                  isDark ? 'bg-purple-600 hover:bg-purple-500 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                <FaPaperPlane size={12} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AskVikash;
