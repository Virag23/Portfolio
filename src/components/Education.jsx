import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const EDUCATION_DATA = [
  {
    degree: 'B.Tech, Electronics & Telecommunication',
    school: 'Walchand Institute of Technology, Solapur',
    timeline: 'Nov 2022 – Jun 2026',
    score: '8.74 CGPA',
    scorePercent: 87.4, // representing out of 10
    color: '#00f0ff', // cyan
    details: 'Acquired core competencies in signal processing, embed systems, computer architecture, and software engineering. Excelled in analytical algorithms.'
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    school: 'Major Hemant Jakate Institute of Science & Commerce',
    timeline: 'Jun 2021 – Jun 2022',
    score: '73.0%',
    scorePercent: 73.0,
    color: '#ff007f', // pink
    details: 'Focused on Science curriculum (Physics, Chemistry, Mathematics). Developed foundation in logical reasoning and programming basics.'
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    school: 'Sanskar Vidya Sagar, Nagpur',
    timeline: 'Jun 2019 – Jun 2020',
    score: '72.6%',
    scorePercent: 72.6,
    color: '#39ff14', // lime
    details: 'Active in science fairs, sports events, and regional quiz challenges. Developed analytical thinking and structured problem-solving skills.'
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 md:px-12 bg-cyber-bg relative border-b border-cyber-purple/15">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink"
          >
            Academic Node Log
          </motion.h2>
          <div className="w-20 h-1 bg-cyber-pink mt-4 rounded-full shadow-neon-pink" />
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDUCATION_DATA.map((edu, idx) => {
            // Visual circle calculation
            const radius = 30;
            const strokeDashoffset = 2 * Math.PI * radius - (2 * Math.PI * radius * edu.scorePercent) / 100;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="cyber-glass p-6 sm:p-8 rounded-lg relative overflow-hidden flex flex-col justify-between"
                style={{ borderTop: `3px solid ${edu.color}` }}
              >
                <div className="space-y-4">
                  {/* Circle score gauge & icon */}
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-cyber-dark/60 rounded border border-cyber-purple/20 text-cyber-purple">
                      <GraduationCap className="w-5 h-5" />
                    </div>

                    {/* Radial score gauge */}
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          className="stroke-cyber-purple/10 fill-transparent"
                          strokeWidth="4"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          stroke={edu.color}
                          className="fill-transparent transition-all duration-1000"
                          strokeWidth="4"
                          strokeDasharray={2 * Math.PI * radius}
                          strokeDashoffset={strokeDashoffset}
                        />
                      </svg>
                      <span className="absolute text-[10px] font-mono font-bold text-white leading-none">
                        {edu.score.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Header info */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white text-left font-heading leading-snug">
                      {edu.degree}
                    </h3>
                    <h4 className="text-xs font-mono text-cyber-cyan text-left mt-1">
                      {edu.school}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-400 text-left leading-relaxed">
                    {edu.details}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-cyber-purple/10 flex justify-between items-center text-[10px] font-mono text-gray-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>TIMELINE</span>
                  </span>
                  <span className="text-cyber-pink font-semibold">{edu.timeline}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
