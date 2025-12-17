import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { skills } from '../data/portfolioData';

const Skills: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { isDark } = useTheme();

  // Real technology icons using simple SVG paths
  const getSkillIcon = (skillName: string) => {
    const iconPaths: { [key: string]: string } = {
      'GitHub': 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
      'Docker': 'M2 6h20v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm0 0V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2M7 10h2m3 0h2m3 0h2',
      'Kubernetes': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      'Ansible': 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      'AWS': 'M4.5 16.5c-1.5 0-2.7-1.2-2.7-2.7s1.2-2.7 2.7-2.7c1.5 0 2.7 1.2 2.7 2.7s-1.2 2.7-2.7 2.7zM19.5 16.5c-1.5 0-2.7-1.2-2.7-2.7s1.2-2.7 2.7-2.7c1.5 0 2.7 1.2 2.7 2.7s-1.2 2.7-2.7 2.7z',
      'Terraform': 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      'Jenkins': 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      'Prometheus': 'M3 3v18h18M8 17l4-4 4 4M12 13V7',
      'Grafana': 'M3 3v18h18M8 17l4-4 4 4M12 13V7',
      'Python': 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      'JavaScript': 'M2 3h20v18H2V3zm2 2v14h16V5H4zm4 4h8v2H8V9zm0 4h8v2H8v-2z',
      'Go': 'M7.5 8a4.5 4.5 0 1 1 9 0v1a3 3 0 0 1 0 6H9a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h7.5',
      'React': 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      'Linux': 'M2 3h20v18H2V3zm2 2v14h16V5H4zm4 4h8v2H8V9zm0 4h8v2H8v-2z',
      'SQL': 'M4 19.5A2.5 2.5 0 0 1 1.5 17A2.5 2.5 0 0 1 4 14.5a2.5 2.5 0 0 1 2.5 2.5A2.5 2.5 0 0 1 4 19.5z',
      'Machine Learning': 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      'Flask': 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      'Shell Scripting': 'M4 17l6-6-6-6M12 19h8',
      'ArgoCD': 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      'HTML': 'M2 3h20v18H2V3zm2 2v14h16V5H4zm4 4h8v2H8V9zm0 4h8v2H8v-2z',
      'CSS': 'M2 3h20v18H2V3zm2 2v14h16V5H4zm4 4h8v2H8V9zm0 4h8v2H8v-2z',
      'TIG Stack': 'M3 3v18h18M8 17l4-4 4 4M12 13V7',
      'ELK Stack': 'M3 3v18h18M8 17l4-4 4 4M12 13V7'
    };

    return iconPaths[skillName] || 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5';
  };

  return (
    <section id="skills" className={`py-20 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Skills & Technologies
          </h2>
          <p className={`text-lg ${
            isDark ? 'text-blue-200' : 'text-blue-700'
          }`}>
            Hover over each skill to see proficiency levels and project experience
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6 lg:gap-8">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="relative group"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Skill Icon */}
              <div className={`relative p-4 sm:p-6 rounded-xl transition-all duration-300 ${
                hoveredSkill === skill.name
                  ? 'transform scale-110 z-10'
                  : hoveredSkill && hoveredSkill !== skill.name
                  ? 'opacity-5'
                  : 'opacity-100'
              } ${
                isDark 
                  ? 'bg-slate-800/50 backdrop-blur-sm border border-blue-500/20' 
                  : 'bg-white/50 backdrop-blur-sm border border-blue-200'
              } shadow-lg hover:shadow-xl`}
              style={{
                boxShadow: hoveredSkill === skill.name 
                  ? (isDark 
                      ? '0 0 30px rgba(0, 191, 255, 0.3)' 
                      : '0 0 30px rgba(0, 128, 255, 0.3)')
                  : undefined
              }}>
                
                {/* Minimal Line Icon */}
                <div className={`text-center mb-2 sm:mb-3 ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto flex items-center justify-center">
                    <svg 
                      className="w-full h-full" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={getSkillIcon(skill.name)} />
                    </svg>
                  </div>
                </div>
                
                {/* Skill Name */}
                <h3 className={`text-xs sm:text-sm font-medium text-center ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {skill.name}
                </h3>

                {/* Efficiency Ring */}
                {hoveredSkill === skill.name && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg className="w-24 h-24 sm:w-32 sm:h-32 transform -rotate-90" viewBox="0 0 120 120">
                      {/* Background ring */}
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke={isDark ? '#334155' : '#E2E8F0'}
                        strokeWidth="4"
                      />
                      {/* Progress ring */}
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke={isDark ? '#00BFFF' : '#0080FF'}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 50}`}
                        strokeDashoffset={`${2 * Math.PI * 50 * (1 - skill.proficiency / 100)}`}
                        className="transition-all duration-1000 ease-out"
                        style={{
                          filter: `drop-shadow(0 0 8px ${isDark ? '#00BFFF' : '#0080FF'})`,
                        }}
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Hover Information */}
              {hoveredSkill === skill.name && (
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-20 p-3 sm:p-4 rounded-lg shadow-xl ${
                  isDark 
                    ? 'bg-slate-800/90 text-white backdrop-blur-sm border border-blue-500/30' 
                    : 'bg-white/90 text-slate-900 backdrop-blur-sm border border-blue-200'
                } animate-fadeIn`}
                style={{
                  boxShadow: isDark 
                    ? '0 0 20px rgba(0, 191, 255, 0.2)' 
                    : '0 0 20px rgba(0, 128, 255, 0.2)'
                }}>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm whitespace-nowrap">
                    <div className="font-medium">
                      Proficiency: {skill.proficiency}%
                    </div>
                    <div className={`${
                      isDark ? 'text-blue-200' : 'text-blue-700'
                    }`}>
                      Projects: {skill.projects}
                    </div>
                    {skill.certification && (
                      <div className={`${
                        isDark ? 'text-indigo-300' : 'text-indigo-600'
                      }`}>
                        Certified: {skill.certification}
                      </div>
                    )}
                  </div>
                  
                  {/* Arrow */}
                  <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent ${
                    isDark ? 'border-b-slate-800' : 'border-b-white'
                  }`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Skills;