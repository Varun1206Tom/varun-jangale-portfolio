import React, { useRef } from 'react';
import { ExternalLink, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { blogs } from '../data/portfolioData';

const Blog: React.FC = () => {
  const { isDark } = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'medium':
        return isDark ? 'bg-emerald-900 text-emerald-200' : 'bg-emerald-100 text-emerald-800';
      case 'linkedin':
        return isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800';
      case 'dev.to':
        return isDark ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800';
      default:
        return isDark ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800';
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section id="blog" className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Blog & Articles
          </h2>
          <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Sharing knowledge and insights about React JS, web development, and modern JavaScript
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all duration-300 ${
              isDark
                ? 'bg-slate-700 text-white hover:bg-blue-600'
                : 'bg-white text-slate-800 hover:bg-blue-500 hover:text-white'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all duration-300 ${
              isDark
                ? 'bg-slate-700 text-white hover:bg-blue-600'
                : 'bg-white text-slate-800 hover:bg-blue-500 hover:text-white'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Horizontal Scrolling Blog Cards */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide px-12 py-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            {blogs.map((blog, index) => (
              <div
                key={index}
                className={`group flex-shrink-0 w-80 p-8 rounded-xl transition-all duration-300 hover:transform hover:scale-105 ${
                  isDark ? 'bg-slate-700' : 'bg-white'
                } shadow-lg hover:shadow-2xl relative`}
              >
                {/* Blog Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                  }`}>
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPlatformColor(blog.platform)}`}>
                    {blog.platform}
                  </div>
                </div>

                {/* Blog Content */}
                <div className="space-y-4">
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {blog.title}
                  </h3>

                  <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'} leading-relaxed line-clamp-3`}>
                    {blog.snippet}
                  </p>

                  {/* Read More Button */}
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hoverable inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isDark
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    } shadow-md hover:shadow-lg transform hover:scale-105`}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Read More</span>
                  </a>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDark ? 'bg-blue-500/10' : 'bg-blue-500/5'
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Blog;