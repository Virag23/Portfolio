import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, CornerDownLeft } from 'lucide-react';

export default function CommandPalette({ onGlitchTrigger }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { text: 'SYSTEM: Virag Cyber-Shell [v1.0.4] active.', type: 'info' },
    { text: 'Type "/help" for list of commands.', type: 'success' }
  ]);
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  // Key listener for summoning
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const cleanedCmd = cmd.trim().toLowerCase();
    let response = [];

    if (cleanedCmd === '') return;

    response.push({ text: `virag-shell$ ${cmd}`, type: 'user' });

    switch (cleanedCmd) {
      case 'help':
      case '/help':
        response.push({ text: 'Available commands:', type: 'info' });
        response.push({ text: '  /skills     - Display tech stacks and skills', type: 'info' });
        response.push({ text: '  /projects   - Scroll to & display projects', type: 'info' });
        response.push({ text: '  /resume     - Download Virag\'s resume', type: 'info' });
        response.push({ text: '  /experience - Show employment and internship logs', type: 'info' });
        response.push({ text: '  /contact    - Scroll to contact details', type: 'info' });
        response.push({ text: '  /sudo hack  - Trigger security override glitch simulation', type: 'warning' });
        response.push({ text: '  /clear      - Clear terminal history', type: 'info' });
        break;
      case 'skills':
      case '/skills':
        response.push({ text: 'Loading Tech Stack Core...', type: 'info' });
        response.push({ text: '  Frontend: React.js, HTML5, CSS3, Bootstrap, Tailwind CSS', type: 'success' });
        response.push({ text: '  Backend: Node.js, Express.js', type: 'success' });
        response.push({ text: '  Database: MongoDB', type: 'success' });
        response.push({ text: '  AI Tools: Antigravity, ChatGPT, Gemini, Copilot, Cursor', type: 'success' });
        break;
      case 'projects':
      case '/projects':
        response.push({ text: 'Navigating to projects matrix...', type: 'success' });
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'resume':
      case '/resume':
        response.push({ text: 'Initiating download of Virag_Nandgaonkar.pdf...', type: 'success' });
        const link = document.createElement('a');
        link.href = '/Virag_Nandgaonkar.pdf';
        link.download = 'Virag_Nandgaonkar.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      case 'experience':
      case '/experience':
        response.push({ text: 'Internship Log:', type: 'info' });
        response.push({ text: '  - Junior Software Developer Intern @ Cravita Technologies (Jan 2026 - Present)', type: 'success' });
        break;
      case 'contact':
      case '/contact':
        response.push({ text: 'Navigating to secure contact node...', type: 'success' });
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'sudo hack':
      case '/sudo hack':
        response.push({ text: 'SECURITY BREACH INITIALIZED. OVERWRITE DETECTED.', type: 'danger' });
        setIsOpen(false);
        setTimeout(() => {
          onGlitchTrigger();
        }, 200);
        break;
      case 'clear':
      case '/clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response.push({ text: `command not found: "${cmd}". Type "/help" for list.`, type: 'error' });
    }

    setHistory((prev) => [...prev, ...response]);
    setInput('');
  };

  return (
    <>
      {/* Floating summons button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-cyber-dark/80 backdrop-blur-md border border-cyber-purple/40 hover:border-cyber-cyan text-cyber-cyan hover:text-white px-4 py-3 rounded-full flex items-center gap-2 shadow-neon-cyan transition-all text-sm font-semibold"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <Terminal className="w-5 h-5 animate-pulse text-cyber-cyan" />
        <span>Cyber Shell</span>
        <kbd className="bg-cyber-purple/20 text-xs px-2 py-0.5 rounded border border-cyber-purple/50 hidden md:inline">
          /
        </kbd>
      </motion.button>

      {/* Terminal Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl h-[400px] bg-cyber-dark border border-cyber-cyan/30 rounded-lg shadow-neon-cyan flex flex-col overflow-hidden relative"
            >
              {/* Terminal header bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-cyber-dark border-b border-cyber-cyan/15 text-xs text-cyber-cyan">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyber-pink" />
                  <span className="w-2.5 h-2.5 rounded-full bg-cyber-purple" />
                  <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan" />
                  <span className="ml-2 font-mono">virag@cyber-shell: ~</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-cyber-pink transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable command output */}
              <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-2 select-text">
                {history.map((log, index) => (
                  <div
                    key={index}
                    className={`
                      ${log.type === 'user' ? 'text-white' : ''}
                      ${log.type === 'info' ? 'text-cyber-purple' : ''}
                      ${log.type === 'success' ? 'text-cyber-lime' : ''}
                      ${log.type === 'warning' ? 'text-amber-400' : ''}
                      ${log.type === 'error' ? 'text-cyber-pink' : ''}
                      ${log.type === 'danger' ? 'text-red-500 font-bold animate-pulse' : ''}
                    `}
                  >
                    {log.text}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Console command input */}
              <div className="p-3 border-t border-cyber-cyan/15 bg-black/40 flex items-center gap-2">
                <span className="font-mono text-cyber-pink font-bold">virag-shell$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCommand(input);
                    }
                  }}
                  placeholder='Type "/help" or "/skills"...'
                  className="flex-1 bg-transparent border-none outline-none font-mono text-white placeholder-cyber-purple/50 focus:ring-0 text-sm"
                />
                <button
                  onClick={() => handleCommand(input)}
                  className="bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all p-1.5 rounded"
                >
                  <CornerDownLeft className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
