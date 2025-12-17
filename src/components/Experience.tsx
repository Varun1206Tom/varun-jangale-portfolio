import React from 'react';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { experience } from '../data/portfolioData';

const Experience: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section id="experience" className={`py-20 ${isDark ? 'bg-slate-900 via-blue-950 to-indigo-950' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Experience
          </h2>
          <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            My professional journey in React JS development and web technologies
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${isDark ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
            
            {experience.map((job, index) => (
              <div key={index} className="relative flex items-start mb-12">
                {/* Timeline Dot */}
                <div className={`w-4 h-4 rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-400'} border-4 ${isDark ? 'border-slate-900' : 'border-white'} z-10`}></div>
                
                {/* Content */}
                <div className="ml-8 flex-1">
                  <div className={`p-8 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-slate-50'} shadow-lg`}>
                    {/* Job Header */}
                    <div className="mb-6">
                      <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-2`}>
                        {job.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className={`text-lg font-medium ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                          {job.company}
                        </div>
                        
                        <div className={`flex items-center space-x-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        
                        <div className={`flex items-center space-x-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          <Calendar className="w-4 h-4" />
                          <span>{job.period}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Achievements */}
                    <div className="space-y-3">
                      {job.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-start space-x-3">
                          <ChevronRight className={`w-5 h-5 mt-0.5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'} flex-shrink-0`} />
                          <span className={`${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;