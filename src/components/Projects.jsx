import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Gamepad2, Sparkles, Award } from 'lucide-react';
import FleetDocsDashboard from './FleetDocsDashboard';

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-cyber-bg relative border-b border-cyber-purple/15">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink"
          >
            Engineering Portfolio
          </motion.h2>
          <div className="w-20 h-1 bg-cyber-purple mt-4 rounded-full shadow-neon-purple" />
        </div>

        {/* Project 1: FleetDocs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Details Column */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 text-left space-y-6"
          >
            <div className="flex items-center gap-2">
              <span className="p-2 rounded bg-cyber-pink/10 border border-cyber-pink/30 text-cyber-pink shadow-neon-pink">
                <Layers className="w-5 h-5" />
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">FleetDocs</h3>
            </div>
            
            <p className="text-sm font-mono text-cyber-pink uppercase font-bold tracking-widest">
              Fleet & Driver Management SaaS Platform
            </p>

            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Addressed transport industry inefficiencies by replacing manual paper records with a centralized digital logs system, boosting operational visibility and lowering administration overheads.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-gray-400 font-mono">
              <li className="flex items-start gap-2">
                <span className="text-cyber-pink mt-0.5">▪</span>
                <span>Manages trucks, drivers, trips, expenses, and compliance in one unified pane.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber-pink mt-0.5">▪</span>
                <span>Optimized efficiency via live tracking, automated compliance monitors, and status warnings.</span>
              </li>
            </ul>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'AWS S3', 'Brevo Mail'].map((tech) => (
                <span key={tech} className="bg-cyber-dark border border-cyber-purple/20 text-cyber-purple text-xs px-2.5 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Interactive Widget Column */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <FleetDocsDashboard />
          </motion.div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyber-purple/20 to-transparent" />

        {/* Project 2: Groundwater Game */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 lg:order-2"
          >
            <div className="cyber-glass p-8 rounded-xl border border-cyber-cyan/25 w-full max-w-md mx-auto shadow-neon-cyan relative overflow-hidden text-center space-y-6">
              <div className="absolute inset-0 bg-cyber-bg/40 pointer-events-none" />
              
              <div className="relative z-10 space-y-2">
                <span className="block text-[10px] font-mono text-cyber-cyan tracking-widest uppercase">REGISTRY NODE: HACKATHON_WIN</span>
                <h4 className="text-xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-lime text-glow-cyan">
                  SMART INDIA HACKATHON 2024
                </h4>
              </div>

              <div className="relative z-10 w-24 h-24 mx-auto rounded-full bg-cyber-cyan/10 border border-cyber-cyan/35 flex items-center justify-center text-cyber-cyan shadow-neon-cyan">
                <Award className="w-12 h-12 animate-pulse" />
              </div>

              <div className="relative z-10 space-y-3">
                <span className="inline-block bg-cyber-lime/10 border border-cyber-lime/30 text-cyber-lime font-mono text-xs font-bold px-3 py-1 rounded-full shadow-neon-lime">
                  1st Place Winner (National Level)
                </span>
                <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed">
                  Awarded by the Ministry of Education, Government of India. Led a 6-member cross-functional engineering team to construct and finalize the award-winning groundwater concept within an intensive 48-hour sprint.
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-cyber-purple/10 flex justify-around text-xs font-mono text-gray-500">
                <div>
                  <span className="block text-[10px] text-cyber-pink">DURATION</span>
                  <span className="text-white font-semibold">48 Hours</span>
                </div>
                <div className="w-px h-8 bg-cyber-purple/20" />
                <div>
                  <span className="block text-[10px] text-cyber-pink">TEAM CAPACITY</span>
                  <span className="text-white font-semibold">6 Members</span>
                </div>
              </div>
            </div>
          </motion.div>


          {/* Details Column */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 text-left space-y-6 lg:order-1"
          >
            <div className="flex items-center gap-2">
              <span className="p-2 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan shadow-neon-cyan animate-pulse">
                <Gamepad2 className="w-5 h-5" />
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">Groundwater Conservation Game</h3>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyber-lime/40 bg-cyber-lime/5 text-cyber-lime text-xs font-mono font-bold tracking-wide shadow-neon-lime">
              <Award className="w-3.5 h-3.5" />
              <span>Smart India Hackathon 2024 WINNER</span>
            </div>

            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Developed an educational Snakes and Ladders video game to teach groundwater conservation. Led a 6-member team to secure the National Winner position under high-intensity 48-hour hackathon conditions.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-gray-400 font-mono">
              <li className="flex items-start gap-2">
                <span className="text-cyber-cyan mt-0.5">▪</span>
                <span>Incorporated dynamic quiz layers to turn snake traps into educational triggers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber-cyan mt-0.5">▪</span>
                <span>Designed state management algorithms to handle player pawn animations and coordinates.</span>
              </li>
            </ul>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
                <span key={tech} className="bg-cyber-dark border border-cyber-purple/20 text-cyber-purple text-xs px-2.5 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
