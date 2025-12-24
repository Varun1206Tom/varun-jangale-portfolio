import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import CustomCursor from './components/CustomCursor';
import AnimatedBackground from './components/AnimatedBackground';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Education from './components/Education';
import Blog from './components/Blog';
import Contact from './components/Contact';
import { useTheme } from './contexts/ThemeContext';

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`} style={{ fontFamily: 'Verdana, sans-serif' }}>
      <CustomCursor />
      <AnimatedBackground />
      <Preloader isLoading={isLoading} />
      
      {!isLoading && (
        <>
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Certifications />
            <Experience />
            <Education />
            <Blog />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;