import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const { isDark } = useTheme();

  const aboutText = `I'm a Front-End Developer with 2+ years of experience specializing in React.js and Angular 14, building scalable, responsive, and high-performance web applications. I have extensive experience in developing admin panels, e-commerce platforms, and client-facing portals.

My expertise spans across React.js, Angular 14, Material UI, CoreUI, Bootstrap, HTML5, CSS3, SCSS, and JavaScript (ES6+). I have hands-on experience in API integration, real-time features using Socket.IO, payment gateways (CC Avenue, Razorpay, Cashfree), Google Maps API integration, and performance optimization. I'm a strong collaborator using Git to deliver clean, maintainable, and user-focused UI/UX solutions.`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => observer.disconnect();
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect when section becomes visible
  useEffect(() => {
    if (isVisible && currentIndex < aboutText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(aboutText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, currentIndex, aboutText]);

  return (
    <section id="about" className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            About Me
          </h2>
          
          <div className="space-y-6">
            <div className={`text-lg md:text-xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'} text-left max-w-3xl mx-auto`}>
              <div className="font-mono">
                {displayedText.split('\n').map((line, index) => (
                  <p key={index} className="mb-4">
                    {line}
                    {index === displayedText.split('\n').length - 1 && currentIndex >= aboutText.length && (
                      <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                        _
                      </span>
                    )}
                  </p>
                ))}
                {currentIndex < aboutText.length && (
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                    _
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-white'} shadow-lg`}>
                <div className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-2`}>
                  2+
                </div>
                <div className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Years Experience
                </div>
              </div>
              
              <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-white'} shadow-lg`}>
                <div className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-2`}>
                  25+
                </div>
                <div className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Projects Completed
                </div>
              </div>
              
              <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-white'} shadow-lg`}>
                <div className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-2`}>
                  4
                </div>
                <div className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Certifications
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;