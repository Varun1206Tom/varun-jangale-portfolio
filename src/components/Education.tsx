import React from 'react';
import { GraduationCap, MapPin, Calendar, Trophy } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { education } from '../data/portfolioData';

const Education: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section id="education" className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Education
          </h2>
          <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Academic foundation in computer science and applications
          </p>
        </div>

        {/* Side by side layout on desktop */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className={`group p-8 rounded-xl transition-all duration-300 hover:transform hover:scale-105 ${
                isDark ? 'bg-slate-700' : 'bg-white'
              } shadow-lg hover:shadow-2xl relative`}
            >
              <div className="flex items-start space-x-6">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isDark ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  <GraduationCap className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className={`text-xl lg:text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-2`}>
                      {edu.degree}
                    </h3>
                    <p className={`text-lg ${isDark ? 'text-indigo-400' : 'text-indigo-600'} font-medium`}>
                      {edu.institution}
                    </p>
                  </div>
                  
                  <div className="flex flex-col space-y-2 mb-4">
                    <div className={`flex items-center space-x-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <MapPin className="w-4 h-4" />
                      <span>{edu.location}</span>
                    </div>
                    
                    <div className={`flex items-center space-x-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <Calendar className="w-4 h-4" />
                      <span>{edu.year}</span>
                    </div>
                  </div>

                  {/* GPA and Distinction - Only show if available */}
                  {(edu.gpa || edu.distinction) && (
                    <div className="flex flex-col space-y-2">
                      {edu.gpa && (
                        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                          isDark ? 'bg-slate-600' : 'bg-slate-100'
                        }`}>
                          <Trophy className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                          <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            GPA: {edu.gpa}
                          </span>
                        </div>
                      )}
                      
                      {edu.distinction && (
                        <div className={`px-4 py-2 rounded-lg ${
                          isDark ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          <span className="font-medium">{edu.distinction}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isDark ? 'bg-blue-500/10' : 'bg-blue-500/5'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;