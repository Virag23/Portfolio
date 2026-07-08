import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Code, Cloud, Cpu, Sparkles } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    id: 'frontend',
    title: 'Frontend Dev',
    icon: Layout,
    color: '#ff007f', // pink
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'Bootstrap', level: 80 }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Dev',
    icon: Server,
    color: '#00f0ff', // cyan
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 80 }
    ]
  },
  {
    id: 'database',
    title: 'Database',
    icon: Database,
    color: '#8b5cf6', // purple
    skills: [
      { name: 'MongoDB', level: 85 }
    ]
  },
  {
    id: 'languages',
    title: 'Languages',
    icon: Code,
    color: '#39ff14', // lime
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'C Language', level: 75 }
    ]
  },
  {
    id: 'cloud-tools',
    title: 'Cloud & Tools',
    icon: Cloud,
    color: '#a855f7', // violet/purple
    skills: [
      { name: 'AWS S3', level: 75 },
      { name: 'Git & GitHub', level: 85 },
      { name: 'Postman', level: 80 },
      { name: 'VS Code', level: 90 },
      { name: 'Cloudinary', level: 75 },
      { name: 'Agile Dev', level: 80 }
    ]
  },
  {
    id: 'ai-tools',
    title: 'AI Assistants',
    icon: Cpu,
    color: '#ff007f', // pink
    skills: [
      { name: 'Antigravity', level: 95 },
      { name: 'ChatGPT', level: 90 },
      { name: 'Gemini', level: 90 },
      { name: 'Copilot', level: 85 },
      { name: 'Codex', level: 90 }
    ]
  }
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend');
  const currentCategory = SKILL_CATEGORIES.find(cat => cat.id === activeTab);

  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-cyber-bg relative border-b border-cyber-purple/15">
      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-cyan"
          >
            Technical Stack Matrix
          </motion.h2>
          <div className="w-20 h-1 bg-cyber-pink mt-4 rounded-full shadow-neon-pink" />
        </div>

        {/* Categories Tab Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Tabs Navigation (Left) */}
          <div className="md:col-span-4 space-y-3">
            {SKILL_CATEGORIES.map((category) => {
              const IconComp = category.icon;
              const isActive = category.id === activeTab;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  style={{
                    borderColor: isActive ? category.color : 'rgba(139, 92, 246, 0.15)',
                    boxShadow: isActive ? `0 0 15px ${category.color}40` : 'none',
                    backgroundColor: isActive ? 'rgba(8, 5, 30, 0.8)' : 'rgba(8, 5, 30, 0.3)'
                  }}
                  className={`w-full text-left p-4 rounded-lg border flex items-center justify-between transition-all duration-300 group`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp
                      style={{ color: isActive ? category.color : '#a855f7' }}
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                    />
                    <span
                      style={{ color: isActive ? '#fff' : '#9ca3af' }}
                      className="font-semibold text-sm sm:text-base tracking-wide"
                    >
                      {category.title}
                    </span>
                  </div>
                  {isActive && (
                    <span
                      style={{ backgroundColor: category.color }}
                      className="w-2 h-2 rounded-full animate-ping"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed Skill Progress Bars (Right) */}
          <div className="md:col-span-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="cyber-glass p-8 rounded-lg relative overflow-hidden h-full min-h-[350px]"
            >
              <div
                className="absolute top-0 left-0 w-full h-1"
                style={{ backgroundColor: currentCategory.color }}
              />

              <h3 className="text-xl font-bold font-heading text-white mb-8 flex items-center gap-2">
                <Sparkles className="w-5 h-5" style={{ color: currentCategory.color }} />
                <span>{currentCategory.title} Capabilities</span>
              </h3>

              <div className="space-y-6">
                {currentCategory.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-mono text-gray-200 font-semibold">{skill.name}</span>
                      <span className="font-mono" style={{ color: currentCategory.color }}>{skill.level}%</span>
                    </div>
                    {/* Glowing progress container */}
                    <div className="w-full h-3 bg-cyber-bg rounded-full overflow-hidden border border-cyber-purple/10 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                          backgroundColor: currentCategory.color,
                          boxShadow: `0 0 10px ${currentCategory.color}`
                        }}
                        className="h-full rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
