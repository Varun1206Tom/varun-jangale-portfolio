import React from 'react';
import { Award, ExternalLink, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { certifications } from '../data/portfolioData';

const Certifications: React.FC = () => {
  const { isDark } = useTheme();

  if (certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className={`py-20 ${isDark ? 'bg-slate-900 via-blue-950 to-indigo-950' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Certifications
          </h2>
          <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Industry-recognized certifications validating my expertise
          </p>
        </div>

        {/* Responsive 4-column grid on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`group p-6 lg:p-8 rounded-xl transition-all duration-300 hover:transform hover:scale-105 ${
                isDark ? 'bg-slate-800' : 'bg-slate-50'
              } shadow-lg hover:shadow-2xl relative`}
            >
              {/* Certificate Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  isDark ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-lg lg:text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {cert.title}
                  </h3>
                  <p className={`${isDark ? 'text-indigo-400' : 'text-indigo-600'} font-medium text-sm lg:text-base`}>
                    {cert.issuer}
                  </p>
                </div>
                <div className={`mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                  isDark ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {cert.year}
                </div>
              </div>

              {/* Skills Validated */}
              <div className="mb-6">
                <h4 className={`text-sm lg:text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Skills Validated:
                </h4>
                <div className="space-y-2">
                  {cert.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center space-x-2">
                      <CheckCircle className={`w-3 h-3 lg:w-4 lg:h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'} flex-shrink-0`} />
                      <span className={`text-xs lg:text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Certificate Button */}
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`hoverable inline-flex items-center justify-center space-x-2 w-full px-4 lg:px-6 py-3 rounded-lg font-medium transition-all duration-300 text-sm lg:text-base ${
                  isDark
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } shadow-md hover:shadow-lg transform hover:scale-105`}
              >
                <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>View Certification</span>
              </a>

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

export default Certifications;