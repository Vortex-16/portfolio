import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import {
  FaPlay, FaTrophy, FaClock, FaCode, FaChevronRight,
  FaBolt, FaRobot, FaUser, FaCheckCircle, FaTimesCircle,
} from 'react-icons/fa';

/* ── Problem statement ── */
const PROBLEM = {
  title: 'Two Sum',
  difficulty: 'Easy',
  statement: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
  example: `Input:  nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
// nums[0] + nums[1] = 2 + 7 = 9`,
};

/* ── Vikash's solution (typed live) ── */
const VIKASH_CODE = `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
}`;

/* ── Opponent's solution (typed slightly slower, wrong approach) ── */
const OPPONENT_CODE = `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  // O(n²) brute force...
  return [];
}`;

const TOTAL_SECONDS = 180; // 3 minutes

const CodeBattleDemo = () => {
  const { isDark } = useTheme();
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [vikashCode, setVikashCode] = useState('');
  const [opponentCode, setOpponentCode] = useState('');
  const [vikashDone, setVikashDone] = useState(false);
  const [opponentDone, setOpponentDone] = useState(false);
  const timerRef = useRef(null);
  const vikRef = useRef(null);
  const oppRef = useRef(null);

  /* ── Start battle ── */
  const start = () => { setStarted(true); setFinished(false); setTimeLeft(TOTAL_SECONDS); setVikashCode(''); setOpponentCode(''); setVikashDone(false); setOpponentDone(false); };

  /* ── Timer ── */
  useEffect(() => {
    if (!started || finished) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); setFinished(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [started, finished]);

  /* ── Type Vikash code (fast — 28ms/char) ── */
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setVikashCode(VIKASH_CODE.slice(0, i));
      if (i >= VIKASH_CODE.length) {
        clearInterval(t);
        setVikashDone(true);
        // Vikash wins — stop timer
        setTimeout(() => { clearInterval(timerRef.current); setFinished(true); }, 600);
      }
    }, 28);
    return () => clearInterval(t);
  }, [started]);

  /* ── Type opponent code (slower — 50ms/char, delayed 2s) ── */
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const delay = setTimeout(() => {
      const t = setInterval(() => {
        i++;
        setOpponentCode(OPPONENT_CODE.slice(0, i));
        if (i >= OPPONENT_CODE.length) { clearInterval(t); setOpponentDone(true); }
      }, 50);
      return () => clearInterval(t);
    }, 2000);
    return () => clearTimeout(delay);
  }, [started]);

  /* ── Auto-scroll editors ── */
  useEffect(() => { if (vikRef.current) vikRef.current.scrollTop = vikRef.current.scrollHeight; }, [vikashCode]);
  useEffect(() => { if (oppRef.current) oppRef.current.scrollTop = oppRef.current.scrollHeight; }, [opponentCode]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  const bg = isDark ? 'bg-[#0d0d0d]' : 'bg-[#0a0a0a]';
  const panel = 'bg-[#111] border border-white/8';
  const header = 'bg-[#1a1a1a] border-b border-white/8';

  return (
    <div className={`w-full rounded-2xl overflow-hidden ${bg} border border-white/10 shadow-2xl`}>

      {/* ── Top bar ── */}
      <div className={`${header} px-5 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="font-mono text-xs text-gray-500">CodeBattle Arena — Live Match</span>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-2 font-mono text-sm font-bold px-3 py-1 rounded-md ${timeLeft < 30 ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-green-400'}`}>
          <FaClock size={11} />
          {minutes}:{seconds}
        </div>

        {/* Difficulty badge */}
        <span className="font-mono text-[10px] px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/30">
          {PROBLEM.difficulty}
        </span>
      </div>

      {!started ? (
        /* ── Pre-start: Problem Statement ── */
        <div className="p-6 space-y-5">
          <div>
            <h3 className="font-lexa text-2xl font-bold text-white mb-1">{PROBLEM.title}</h3>
            <p className="font-mono text-sm text-gray-400 leading-relaxed whitespace-pre-line">{PROBLEM.statement}</p>
          </div>
          <div className="bg-[#111] rounded-lg p-4 border border-white/8 font-mono text-xs text-gray-300 leading-relaxed whitespace-pre">
            {PROBLEM.example}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={start}
              id="codebattle-start-btn"
              className="flex items-center gap-2 px-6 py-2.5 bg-green-500 hover:bg-green-400 active:scale-95 text-black font-bold font-mono text-sm rounded-lg transition-all duration-200"
            >
              <FaPlay size={12} /> Start Battle
            </button>
            <div className="flex items-center gap-2 font-mono text-xs text-gray-600">
              <FaRobot size={12} className="text-red-400" />
              <span>vs AI_Opponent</span>
            </div>
          </div>
        </div>
      ) : (
        /* ── Battle View ── */
        <div className="flex flex-col">
          {/* Player headers */}
          <div className="grid grid-cols-2 border-b border-white/8">
            {/* Vikash */}
            <div className="flex items-center gap-3 px-4 py-2.5 border-r border-white/8">
              <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center">
                <FaUser size={10} className="text-purple-400" />
              </div>
              <span className="font-mono text-xs font-bold text-white">vikash</span>
              {vikashDone && <FaCheckCircle className="text-green-400 ml-auto" size={14} />}
            </div>
            {/* Opponent */}
            <div className="flex items-center gap-3 px-4 py-2.5">
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                <FaRobot size={10} className="text-red-400" />
              </div>
              <span className="font-mono text-xs font-bold text-gray-400">AI_Opponent</span>
              {opponentDone && !vikashDone && <FaCheckCircle className="text-orange-400 ml-auto" size={14} />}
            </div>
          </div>

          {/* Editors */}
          <div className="grid grid-cols-2" style={{ minHeight: 240 }}>
            {/* Vikash editor */}
            <div className="border-r border-white/8">
              <pre
                ref={vikRef}
                className="font-mono text-xs text-green-300 p-4 overflow-auto leading-relaxed"
                style={{ minHeight: 240, maxHeight: 300, background: 'transparent' }}
              >
                {vikashCode}
                {started && !vikashDone && <span className="animate-pulse text-white">▌</span>}
              </pre>
            </div>
            {/* Opponent editor */}
            <div>
              <pre
                ref={oppRef}
                className="font-mono text-xs text-orange-300 p-4 overflow-auto leading-relaxed"
                style={{ minHeight: 240, maxHeight: 300, background: 'transparent' }}
              >
                {opponentCode}
                {started && !opponentDone && opponentCode.length > 0 && <span className="animate-pulse text-white">▌</span>}
              </pre>
            </div>
          </div>

          {/* Progress bars */}
          <div className="grid grid-cols-2 border-t border-white/8">
            <div className="px-4 py-2 border-r border-white/8">
              <div className="flex items-center justify-between font-mono text-[10px] text-gray-600 mb-1">
                <span>Progress</span>
                <span>{Math.round((vikashCode.length / VIKASH_CODE.length) * 100)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 rounded-full transition-all" style={{ width: `${(vikashCode.length / VIKASH_CODE.length) * 100}%` }} />
              </div>
            </div>
            <div className="px-4 py-2">
              <div className="flex items-center justify-between font-mono text-[10px] text-gray-600 mb-1">
                <span>Progress</span>
                <span>{Math.round((opponentCode.length / OPPONENT_CODE.length) * 100)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-orange-400 rounded-full transition-all" style={{ width: `${(opponentCode.length / OPPONENT_CODE.length) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Winner overlay */}
          {finished && vikashDone && (
            <div className="relative border-t border-white/8 bg-gradient-to-r from-green-500/10 to-purple-500/10 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaTrophy className="text-yellow-400" size={24} />
                <div>
                  <div className="font-lexa text-lg font-bold text-white">Vikash Wins!</div>
                  <div className="font-mono text-xs text-gray-400">O(n) HashMap solution — beats 98% of submissions</div>
                </div>
              </div>
              <button
                onClick={start}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-mono text-xs rounded-lg transition-all border border-white/20"
              >
                <FaBolt size={10} /> Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeBattleDemo;
