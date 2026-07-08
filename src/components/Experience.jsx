import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Award } from 'lucide-react';

const TIMELINE_DATA = [
  {
    type: 'work',
    role: 'Junior Software Developer Intern',
    company: 'Cravita Technologies India Private Limited',
    duration: 'Jan 2026 – Present',
    details: [
      'Working on a real-time industry-level web application using React.js, Node.js, Express.js, and MongoDB.',
      'Collaborating with developers, testers, data analysts, data scientists, and cloud engineers in a cross-functional team.',
      'Following industry-standard Git and GitHub workflows, including pull requests, code reviews, and version control.',
      'Participating in feature development, testing, bug fixing, and delivering tasks within project deadlines.'
    ]
  },
  {
    type: 'cert',
    role: 'MERN Stack Certification',
    company: 'Fortune Cloud Technologies Private Limited, Pune',
    duration: 'Certified Graduate',
    details: [
      'Developed hands-on expertise in building responsive full-stack applications using React.js, Node.js, and Express.js.',
      'Mastered NoSQL database management by designing complex MongoDB data structures and integrating RESTful APIs.'
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 bg-cyber-bg relative border-b border-cyber-purple/15">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink"
          >
            Chronology Registry
          </motion.h2>
          <div className="w-20 h-1 bg-cyber-cyan mt-4 rounded-full shadow-neon-cyan" />
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-dashed border-cyber-purple/30 ml-4 md:ml-32 space-y-12">
          
          {TIMELINE_DATA.map((item, idx) => {
            const IconComp = item.type === 'work' ? Briefcase : Award;
            return (
              <div key={idx} className="relative pl-8 md:pl-12">
                
                {/* Timeline Node Orb */}
                <span className="absolute -left-[17px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-cyber-dark border border-cyber-cyan shadow-neon-cyan text-cyber-cyan">
                  <IconComp className="w-4 h-4" />
                </span>

                {/* Left Side Floating Duration Tag (Hidden on mobile) */}
                <div className="hidden md:block absolute -left-48 top-2 w-36 text-right font-mono text-xs text-cyber-pink font-bold">
                  <span className="flex items-center justify-end gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.duration}</span>
                  </span>
                </div>

                {/* Card details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="cyber-glass p-6 sm:p-8 rounded-lg relative hover:scale-[1.01] transition-transform duration-300"
                >
                  {/* Mobile duration indicator */}
                  <div className="md:hidden flex items-center gap-1 text-cyber-pink font-mono text-xs font-bold mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.duration}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white font-heading">{item.role}</h3>
                  <h4 className="text-sm font-mono text-cyber-cyan mt-1 mb-4">{item.company}</h4>
                  
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
                    {item.details.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-cyber-purple mt-1 shrink-0">▪</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
