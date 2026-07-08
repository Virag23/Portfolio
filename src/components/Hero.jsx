import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowDown, ShieldAlert, Sparkles } from 'lucide-react';

const ROLES = [
  "MERN Stack Developer",
  "Smart India Hackathon '24 Winner",
  "Full-Stack Web Architect",
  "Agile Team Collaborator"
];

export default function Hero({ onSummonShell }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentFullRole = ROLES[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedRole(prev => prev.slice(0, -1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setDisplayedRole(currentFullRole.slice(0, displayedRole.length + 1));
      }, 100);
    }

    if (!isDeleting && displayedRole === currentFullRole) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayedRole === '') {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-6 md:px-12 overflow-hidden border-b border-cyber-purple/15">
      {/* Neo Grid overlay */}
      <div className="cyber-grid" />

      {/* Floating particles */}
      <div className="bg-particle w-72 h-72 bg-cyber-pink top-10 left-10 animate-float-slow" />
      <div className="bg-particle w-80 h-80 bg-cyber-cyan bottom-10 right-10 animate-float-medium" />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">

        {/* Bio Text Column */}
        <div className="md:col-span-7 text-left space-y-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-pink/30 bg-cyber-pink/5 text-cyber-pink text-xs font-semibold uppercase tracking-widest shadow-neon-pink"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Developer Core Online</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-extrabold font-heading text-white leading-tight tracking-tighter"
          >
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-cyan glitch-text text-glow-pink" data-text="Virag Nandgaonkar">
              Virag Nandgaonkar
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="h-10 text-xl md:text-2xl font-mono text-cyber-cyan"
          >
            <span>&gt; {displayedRole}</span>
            <span className="animate-pulse">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gray-300 max-w-lg leading-relaxed text-base md:text-lg"
          >
            Full-stack web engineer crafting digital tools. Specializing in React, Node.js, and Express.js, with a knack for building smart solutions. Let's make something crazy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a
              href="#projects"
              className="bg-gradient-to-r from-cyber-pink to-cyber-purple hover:from-cyber-purple hover:to-cyber-cyan text-white px-8 py-3.5 rounded-md font-bold transition-all duration-300 shadow-neon-pink flex items-center gap-2 hover:scale-[1.03]"
            >
              <span>Explore Matrix</span>
              <ArrowDown className="w-4 h-4" />
            </a>
            <button
              onClick={onSummonShell}
              className="bg-transparent border border-cyber-cyan/40 hover:border-cyber-cyan hover:bg-cyber-cyan/10 text-cyber-cyan hover:text-white px-8 py-3.5 rounded-md font-bold transition-all duration-300 shadow-neon-cyan flex items-center gap-2 hover:scale-[1.03]"
            >
              <Terminal className="w-4 h-4" />
              <span>Shell Console</span>
            </button>
          </motion.div>
        </div>

        {/* Profile Image Avatar Column */}
        <div className="md:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 80, delay: 0.3 }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 group cursor-pointer"
          >
            {/* Holographic Glowing Frames */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyber-pink/40 animate-spin-slow group-hover:border-cyber-pink transition-colors" />
            <div className="absolute inset-2 rounded-full border border-cyber-cyan/30 animate-spin-[20s] linear infinite group-hover:border-cyber-cyan transition-colors" />

            <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-cyber-purple/50 bg-cyber-dark/80 shadow-neon-purple flex items-center justify-center">
              <img
                src={`${import.meta.env.BASE_URL}Virag.png`}
                alt="Virag Nandgaonkar"
                className="w-full h-full object-cover grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop';
                }}
              />

              {/* High-tech Scanning CRT Lines */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/10 to-transparent animate-pulse pointer-events-none" />
            </div>

            {/* Glowing bottom badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-cyber-dark border border-cyber-cyan px-3 py-1 rounded-md text-[10px] font-mono text-cyber-cyan uppercase tracking-widest shadow-neon-cyan flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping" />
              <span>Node Core Dev</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
