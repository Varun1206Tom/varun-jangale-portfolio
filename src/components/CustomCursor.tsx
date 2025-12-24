import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const [innerPosition, setInnerPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [outerPosition, setOuterPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { isDark } = useTheme();
  
  const animationFrameRef = useRef<number>();
  const targetPositionRef = useRef<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update inner dot immediately
      setInnerPosition({ x: e.clientX, y: e.clientY });
      
      // Store target position for outer circle
      targetPositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && typeof target.matches === 'function' && 
          target.matches('button, a, [role="button"], .hoverable, input, textarea')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Spring animation for outer circle
  useEffect(() => {
    // const animateOuterCircle = () => {
    //   setOuterPosition(current => {
    //     const target = targetPositionRef.current;
    //     const dx = target.x - current.x;
    //     const dy = target.y - current.y;
        
    //     // Spring physics with easing
    //     const spring = 0.15;
    //     const friction = 0.8;
        
    //     return {
    //       x: current.x + dx * spring,
    //       y: current.y + dy * spring
    //     };
    //   });
      
    //   animationFrameRef.current = requestAnimationFrame(animateOuterCircle);
    // };

    // animateOuterCircle();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  const accentColor = isDark ? '#00BFFF' : '#0080FF'; // Deep sky blue
  const secondaryColor = isDark ? '#6366F1' : '#4F46E5'; // Indigo

  return (
    <>
      {/* Outer Circle (Halo) with spring delay */}
      <div
        className="fixed pointer-events-none z-50 rounded-full transition-all duration-200 ease-out"
        style={{
          left: outerPosition.x - 20,
          top: outerPosition.y - 20,
          width: 40,
          height: 40,
          border: `2px solid ${accentColor}`,
          backgroundColor: isHovering 
            ? `${accentColor}20` 
            : 'transparent',
          boxShadow: `0 0 20px ${accentColor}40`,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          opacity: 0.8,
        }}
      />

      {/* Inner Dot (Main cursor) - follows mouse instantly */}
      <div
        className="fixed pointer-events-none z-50 rounded-full"
        style={{
          left: innerPosition.x - 4,
          top: innerPosition.y - 4,
          width: 8,
          height: 8,
          backgroundColor: accentColor,
          boxShadow: `0 0 15px ${accentColor}`,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          transition: 'transform 0.2s ease-out',
        }}
      />

      {/* Ripple effect on hover */}
      {isHovering && (
        <>
          <div
            className="fixed pointer-events-none z-40 rounded-full animate-ping"
            style={{
              left: innerPosition.x - 30,
              top: innerPosition.y - 30,
              width: 60,
              height: 60,
              border: `1px solid ${accentColor}`,
              opacity: 0.6,
            }}
          />
          <div
            className="fixed pointer-events-none z-40 rounded-full animate-pulse"
            style={{
              left: innerPosition.x - 25,
              top: innerPosition.y - 25,
              width: 50,
              height: 50,
              border: `1px solid ${secondaryColor}`,
              opacity: 0.4,
            }}
          />
        </>
      )}
    </>
  );
};

export default CustomCursor;