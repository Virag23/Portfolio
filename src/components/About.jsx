import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Eye, Rocket, Trophy } from 'lucide-react';

const SOFT_SKILLS = [
  {
    id: 'leadership',
    title: 'Leadership',
    description: 'Led a 6-member cross-functional team to secure the National Winner position at Smart India Hackathon 2024 within a high-pressure 48-hour timeline. Capable of driving alignment, managing resources, and steering sprints to success.',
    icon: Trophy,
    color: '#ff007f', // pink
    orbitRadius: 100,
    speed: 8
  },
  {
    id: 'teamwork',
    title: 'Teamwork',
    description: 'Collaborated daily with developers, testers, data analysts, data scientists, and cloud architects in multi-disciplinary teams. Committed to thorough code reviews, active agile retrospectives, and robust knowledge sharing.',
    icon: User,
    color: '#00f0ff', // cyan
    orbitRadius: 130,
    speed: 12
  },
  {
    id: 'learning',
    title: 'Quick Learner',
    description: 'Self-driven developer who masters complex libraries, RESTful APIs, and NoSQL modeling protocols swiftly. Successfully engineered a groundwater board game from scratch under hackathon conditions in 48 hours.',
    icon: Rocket,
    color: '#39ff14', // lime
    orbitRadius: 160,
    speed: 16
  }
];

export default function About() {
  const [activeSkill, setActiveSkill] = useState(SOFT_SKILLS[0]);

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-cyber-bg relative border-b border-cyber-purple/15">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple"
          >
            System Kernel: Bio
          </motion.h2>
          <div className="w-20 h-1 bg-cyber-cyan mt-4 rounded-full shadow-neon-cyan" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Summary / Text card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="cyber-glass p-8 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-cyber-purple" />
              <h3 className="text-xl font-bold font-mono text-cyber-cyan mb-4 flex items-center gap-2">
                <span>[SUMMARY_LOG]</span>
              </h3>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-6">
                MERN Stack Developer with hands-on experience building full-stack web applications and contributing to industry-level software projects. Experience working in cross-functional teams using <strong className="text-white">React.js, Node.js, Express.js, and MongoDB</strong> while following Agile development practices, Git workflows, code reviews, and testing processes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-cyber-purple/20 bg-cyber-dark/40 p-4 rounded text-left">
                  <span className="block text-xs font-mono text-cyber-pink font-bold">STATUS</span>
                  <span className="text-sm font-semibold text-white">Interning / Active</span>
                </div>
                <div className="border border-cyber-purple/20 bg-cyber-dark/40 p-4 rounded text-left">
                  <span className="block text-xs font-mono text-cyber-pink font-bold">LOCATION</span>
                  <span className="text-sm font-semibold text-white">Pune, Maharashtra</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Soft Skills Orb Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-center justify-center"
          >
            <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center mb-8">
              
              {/* Central Orb */}
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyber-purple to-cyber-pink relative flex items-center justify-center shadow-[0_0_40px_rgba(255,0,127,0.7)] z-20"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute inset-1 rounded-full bg-cyber-bg flex items-center justify-center">
                  <span className="text-[10px] font-mono text-cyber-cyan font-bold tracking-tighter">CORE</span>
                </div>
              </motion.div>

              {/* Rings for Soft Skills */}
              {SOFT_SKILLS.map((skill) => {
                const IconComponent = skill.icon;
                const isActive = activeSkill.id === skill.id;

                return (
                  <div
                    key={skill.id}
                    onClick={() => setActiveSkill(skill)}
                    onMouseEnter={() => setActiveSkill(skill)}
                    style={{
                      width: `${skill.orbitRadius * 2}px`,
                      height: `${skill.orbitRadius * 2}px`,
                      borderColor: isActive ? skill.color : 'rgba(139, 92, 246, 0.15)',
                    }}
                    className={`absolute rounded-full border border-dashed flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02]`}
                  >
                    {/* Rotating orbiting icon */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        backgroundColor: skill.color,
                        boxShadow: `0 0 10px ${skill.color}`,
                        transformOrigin: `center ${skill.orbitRadius}px`
                      }}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: skill.speed,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-black font-bold origin-[center_100%] absolute -mt-3.5"
                    >
                      <IconComponent className="w-3.5 h-3.5 text-black" />
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Explanatory detail card of the active soft skill */}
            <div className="w-full max-w-md h-36">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkill.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="cyber-glass p-5 rounded-md text-center border-t-2"
                  style={{ borderTopColor: activeSkill.color }}
                >
                  <h4 className="font-bold text-lg text-white mb-2 tracking-wide font-heading">
                    {activeSkill.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 font-mono leading-relaxed">
                    {activeSkill.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
