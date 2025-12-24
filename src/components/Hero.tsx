import React, { useState, useEffect } from 'react';
import { Download, Mail, Phone, Github, Linkedin, Circle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { personalInfo } from '../data/portfolioData';

const Hero: React.FC = () => {
  const [displayedName, setDisplayedName] = useState('');
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');
  const [nameIndex, setNameIndex] = useState(0);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [showNameCursor, setShowNameCursor] = useState(true);
  const [showSubtitleCursor, setShowSubtitleCursor] = useState(false);
  const [nameComplete, setNameComplete] = useState(false);
  const { isDark } = useTheme();

  const name = personalInfo.name;
  const subtitle = personalInfo.description;

  // Blinking cursor for name
  useEffect(() => {
    const interval = setInterval(() => {
      setShowNameCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Blinking cursor for subtitle
  useEffect(() => {
    if (nameComplete) {
      const interval = setInterval(() => {
        setShowSubtitleCursor(prev => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [nameComplete]);

  // Type name character by character
  useEffect(() => {
    if (nameIndex < name.length) {
      const timeout = setTimeout(() => {
        setDisplayedName(name.slice(0, nameIndex + 1));
        setNameIndex(nameIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else if (!nameComplete) {
      setNameComplete(true);
      setShowNameCursor(false);
      setShowSubtitleCursor(true);
    }
  }, [nameIndex, name, nameComplete]);

  // Type subtitle character by character after name is complete
  useEffect(() => {
    if (nameComplete && subtitleIndex < subtitle.length) {
      const timeout = setTimeout(() => {
        setDisplayedSubtitle(subtitle.slice(0, subtitleIndex + 1));
        setSubtitleIndex(subtitleIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [subtitleIndex, subtitle, nameComplete]);

  const handleContactClick = (type: string) => {
    switch (type) {
      case 'email':
        window.open(`mailto:${personalInfo.email}`, '_blank');
        break;
      case 'phone':
        window.open(`tel:${personalInfo.phone}`, '_blank');
        break;
      case 'github':
        window.open(personalInfo.github, '_blank');
        break;
      case 'linkedin':
        window.open(personalInfo.linkedin, '_blank');
        break;
    }
  };

  return (
    <section id="home" className={`min-h-screen flex items-center pt-20 relative overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-30">
        <div className={`w-full h-full ${
          isDark 
            ? 'bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10' 
            : 'bg-gradient-to-br from-blue-200/20 via-indigo-200/20 to-purple-200/20'
        }`} 
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? 'rgba(0, 191, 255, 0.1)' : 'rgba(0, 128, 255, 0.1)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(0, 191, 255, 0.1)' : 'rgba(0, 128, 255, 0.1)'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            {/* Name with Blinking Dot */}
            <div>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-slate-900'
              } break-words`}>
                <span className={`${showNameCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                  style={{ color: isDark ? '#00BFFF' : '#0080FF' }}>
                  •
                </span>
                <span className="ml-2">{displayedName}</span>
              </h1>
              <div className={`text-lg sm:text-xl md:text-2xl ${
                isDark ? 'text-blue-100' : 'text-blue-800'
              } leading-relaxed font-mono`}>
                {displayedSubtitle}
                <span className={`ml-1 ${showSubtitleCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                  style={{ color: isDark ? '#00BFFF' : '#0080FF' }}>
                  _
                </span>
              </div>
            </div>

            {/* Online Status */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Circle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 fill-current animate-pulse" />
                  <Circle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 fill-current absolute top-0 left-0 animate-ping" />
                </div>
                <span className={`text-sm sm:text-lg font-medium ${
                  isDark ? 'text-emerald-300' : 'text-emerald-600'
                }`}>
                  Available for Hire / Freelancing
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={personalInfo.resumeUrl}
                download
                className={`hoverable inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                  isDark
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-400 hover:to-indigo-400'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                } shadow-lg hover:shadow-xl transform hover:scale-105`}
                style={{
                  boxShadow: isDark 
                    ? '0 0 20px rgba(0, 191, 255, 0.3)' 
                    : '0 0 20px rgba(0, 128, 255, 0.3)'
                }}
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </a>

              {/* Contact Icons */}
              <div className="flex justify-center sm:justify-start space-x-4">
                {[
                  { icon: Mail, action: 'email' },
                  { icon: Phone, action: 'phone' },
                  { icon: Github, action: 'github' },
                  { icon: Linkedin, action: 'linkedin' }
                ].map(({ icon: Icon, action }, index) => (
                  <button
                    key={action}
                    onClick={() => handleContactClick(action)}
                    className={`hoverable p-3 rounded-full transition-all duration-300 ${
                      isDark
                        ? 'bg-slate-800/50 text-blue-300 hover:bg-blue-500 hover:text-white backdrop-blur-sm'
                        : 'bg-white/50 text-blue-700 hover:bg-blue-500 hover:text-white backdrop-blur-sm'
                    } shadow-lg hover:shadow-xl transform hover:scale-110`}
                    style={{
                      boxShadow: isDark 
                        ? '0 0 15px rgba(0, 191, 255, 0.2)' 
                        : '0 0 15px rgba(0, 128, 255, 0.2)'
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - 3D Avatar */}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="relative">
              {/* Avatar Container with enhanced glow */}
              <div className={`w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-1 shadow-2xl ${
                isDark
                  ? 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500'
                  : 'bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400'
              }`}
              style={{
                boxShadow: isDark 
                  ? '0 0 60px rgba(0, 191, 255, 0.4), 0 0 100px rgba(99, 102, 241, 0.2)' 
                  : '0 0 60px rgba(0, 128, 255, 0.4), 0 0 100px rgba(79, 70, 229, 0.2)'
              }}>
                <div className={`w-full h-full rounded-full ${
                  isDark ? 'bg-slate-900' : 'bg-white'
                } flex items-center justify-center overflow-hidden`}>
                  {/* Enhanced 3D Avatar */}
                  <div className="relative w-full h-full flex items-center justify-center animate-float">
                    <div className="text-6xl sm:text-8xl md:text-9xl filter drop-shadow-lg">
                      👨‍💻
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced floating rings */}
              <div className="absolute inset-0 rounded-full animate-pulse">
                <div className={`w-full h-full rounded-full border-2 opacity-30 animate-ping ${
                  isDark ? 'border-blue-400' : 'border-blue-500'
                }`}></div>
              </div>
              <div className="absolute inset-0 rounded-full animate-pulse" style={{ animationDelay: '1s' }}>
                <div className={`w-full h-full rounded-full border-2 opacity-20 animate-ping ${
                  isDark ? 'border-indigo-400' : 'border-indigo-500'
                }`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;