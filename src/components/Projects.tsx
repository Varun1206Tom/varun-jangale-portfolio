import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { projects } from '../data/portfolioData';

const Projects: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section id="projects" className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Featured Projects
          </h2>
          <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Some of my recent React JS and web development projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group p-8 rounded-xl transition-all duration-300 hover:transform hover:scale-105 ${
                isDark ? 'bg-slate-700' : 'bg-white'
              } shadow-lg hover:shadow-2xl`}
            >
              <div className="space-y-6">
                {/* Project Title */}
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {project.description}
                </p>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDark
                          ? 'bg-indigo-900 text-indigo-200'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hoverable inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isDark
                        ? 'bg-slate-600 text-white hover:bg-slate-500'
                        : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                    } shadow-md hover:shadow-lg`}
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </a>
                  
                  {project.demoUrl && project.demoUrl !== "#" ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hoverable inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        isDark
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      } shadow-md hover:shadow-lg`}
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
                  ) : null}
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

export default Projects;