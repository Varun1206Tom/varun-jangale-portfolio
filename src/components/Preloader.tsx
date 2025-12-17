import React from 'react';

interface PreloaderProps {
  isLoading: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="relative">
        {/* Enhanced Infinity Symbol Loader */}
        <div className="infinity-loader">
          <div className="infinity-path"></div>
          <div className="infinity-dot"></div>
          <div className="infinity-glow"></div>
        </div>
        
        {/* Loading Text with typewriter effect */}
        <div className="mt-8 text-center">
          <p className="text-cyan-300 text-lg font-bold animate-pulse">
            Initializing Portfolio...
          </p>
          <div className="mt-2 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .infinity-loader {
          width: 100px;
          height: 50px;
          position: relative;
          margin: 0 auto;
        }

        .infinity-path {
          width: 100%;
          height: 100%;
          position: absolute;
          border: 3px solid transparent;
          border-radius: 50px;
          background: linear-gradient(45deg, #00D4FF, #A855F7, #10B981) padding-box,
                      linear-gradient(45deg, #00D4FF, #A855F7, #10B981) border-box;
          animation: infinityRotate 3s linear infinite;
          filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.5));
        }

        .infinity-path::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 24px;
          height: 24px;
          background: linear-gradient(45deg, #00D4FF, #A855F7);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.7);
          animation: innerPulse 2s ease-in-out infinite;
        }

        .infinity-dot {
          width: 14px;
          height: 14px;
          background: radial-gradient(circle, #FFFFFF, #00D4FF);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          animation: infinityMove 3s linear infinite;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
          filter: drop-shadow(0 0 5px rgba(0, 212, 255, 0.8));
        }

        .infinity-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.1), transparent);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: glowPulse 2s ease-in-out infinite;
        }

        @keyframes infinityRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes infinityMove {
          0% { left: 0; transform: translateY(-50%); }
          25% { left: 50%; transform: translateY(-50%) translateX(-50%); }
          50% { left: 100%; transform: translateY(-50%) translateX(-100%); }
          75% { left: 50%; transform: translateY(-50%) translateX(-50%); }
          100% { left: 0; transform: translateY(-50%); }
        }

        @keyframes innerPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;