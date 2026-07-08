import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldAlert, Cpu } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shellOpen, setShellOpen] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);

  // Mouse Coordinates for Interactive Pointer Glow
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device is mobile/touch-screen
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      if (!isMobile) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  const triggerGlitchScreen = () => {
    setShowGlitch(true);
    setTimeout(() => {
      setShowGlitch(false);
    }, 3200);
  };



  return (
    <div className="min-h-screen relative bg-cyber-bg text-gray-100 overflow-x-hidden selection:bg-cyber-pink selection:text-white font-body">

      {/* Retro scanline overlay */}
      <div className="scanlines" />

      {/* Cyber Interactive Cursor (Desktop only) */}
      {!isMobile && (
        <motion.div
          className="fixed w-6 h-6 rounded-full border border-cyber-cyan pointer-events-none z-[9999] shadow-neon-cyan"
          animate={{
            x: mousePos.x - 12,
            y: mousePos.y - 12,
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 20, mass: 0.2 }}
        />
      )}

      {/* Sticky Header Navbar */}
      <header className="sticky top-0 z-40 bg-cyber-bg/75 backdrop-blur-md border-b border-cyber-purple/15">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-heading font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink to-cyber-cyan hover:scale-105 transition-transform duration-200">
            VN.SYS
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-mono font-semibold">
            {['about', 'skills', 'projects', 'experience', 'education', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-gray-400 hover:text-cyber-cyan transition-colors uppercase relative group py-2"
              >
                <span>{item}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-pink transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-cyber-cyan transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-cyber-dark/95 border-b border-cyber-purple/15 text-sm font-mono text-center"
            >
              <nav className="flex flex-col py-4 gap-4">
                {['about', 'skills', 'projects', 'experience', 'education', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-300 hover:text-cyber-pink transition-colors uppercase py-1"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Pages Frame */}
      <main>
        <Hero onSummonShell={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: '/' }))} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-cyber-purple/15 bg-black/40 text-center text-xs font-mono text-gray-500 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            Virag Nandgaonkar. All system nodes verified.
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/Virag23" target="_blank" rel="noreferrer" className="hover:text-cyber-cyan transition-colors">GITHUB</a>
            <a href="https://www.linkedin.com/in/virag-nandgaonkar" target="_blank" rel="noreferrer" className="hover:text-cyber-pink transition-colors">LINKEDIN</a>
          </div>
        </div>
      </footer>

      {/* Keyboard summoned command console shell */}
      <CommandPalette
        onGlitchTrigger={triggerGlitchScreen}
      />

      {/* Full-screen Simulated Glitch/Hack Screen */}
      <AnimatePresence>
        {showGlitch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black text-red-500 font-mono flex flex-col items-center justify-center p-6 select-none overflow-hidden"
          >
            {/* Rapid falling digital code visual simulation */}
            <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden text-left text-xs break-all leading-none space-y-1">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="whitespace-nowrap select-none">
                  {Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)}
                </div>
              ))}
            </div>

            <div className="space-y-6 text-center max-w-lg z-10 border-2 border-red-500 p-8 rounded bg-black shadow-[0_0_30px_#ef4444]">
              <div className="flex justify-center">
                <ShieldAlert className="w-16 h-16 text-red-500 animate-pulse" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-widest text-red-500 uppercase animate-bounce">
                OVERWRITE DETECTED
              </h1>
              <div className="h-0.5 bg-red-500 w-full animate-pulse" />

              <div className="text-left text-xs sm:text-sm space-y-2 text-red-400">
                <p>&gt;&gt; bypass_security_auth = TRUE</p>
                <p>&gt;&gt; injecting_mern_payload_frequencies... DONE</p>
                <p>&gt;&gt; mounting_drive_assets: Virag_Nandgaonkar.pdf ... OK</p>
                <p>&gt;&gt; establishing_port_handshake: Solapur & Nagpur ... OK</p>
                <p>&gt;&gt; executing SIH-winner.bin ... READY</p>
              </div>

              <div className="h-0.5 bg-red-500 w-full animate-pulse" />
              <div className="flex items-center justify-center gap-2 text-xs text-red-500 font-bold uppercase tracking-widest animate-pulse">
                <Cpu className="w-4 h-4" />
                <span>Virag Admin Shell Bypass Success</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
