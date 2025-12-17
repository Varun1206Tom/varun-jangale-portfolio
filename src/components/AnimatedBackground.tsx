import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Helper function for rounded rectangles with individual corner radii
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number | number[]
) {
  const radii = Array.isArray(radius) ? radius : [radius, radius, radius, radius];
  
  ctx.beginPath();
  ctx.moveTo(x + radii[0], y);
  ctx.lineTo(x + width - radii[1], y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radii[1]);
  ctx.lineTo(x + width, y + height - radii[2]);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radii[2], y + height);
  ctx.lineTo(x + radii[3], y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radii[3]);
  ctx.lineTo(x, y + radii[0]);
  ctx.quadraticCurveTo(x, y, x + radii[0], y);
  ctx.closePath();
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Web development and React-inspired elements
    const networkNodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      type: 'react' | 'component' | 'hook' | 'state' | 'context' | 'router';
      opacity: number;
      pulsePhase: number;
      connections: number[];
    }> = [];

    const gridLines: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      opacity: number;
      flow: number;
    }> = [];

    // Create network topology nodes
    const nodeTypes: Array<'react' | 'component' | 'hook' | 'state' | 'context' | 'router'> = [
      'react', 'component', 'hook', 'state', 'context', 'router'
    ];

    for (let i = 0; i < 25; i++) {
      const type = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
      networkNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        size: Math.random() * 15 + 10,
        type,
        opacity: Math.random() * 0.3 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: []
      });
    }

    // Create grid infrastructure lines
    const gridSpacing = 80;
    for (let x = 0; x < canvas.width; x += gridSpacing) {
      gridLines.push({
        x1: x,
        y1: 0,
        x2: x,
        y2: canvas.height,
        opacity: Math.random() * 0.1 + 0.02,
        flow: Math.random() * 0.01
      });
    }
    for (let y = 0; y < canvas.height; y += gridSpacing) {
      gridLines.push({
        x1: 0,
        y1: y,
        x2: canvas.width,
        y2: y,
        opacity: Math.random() * 0.1 + 0.02,
        flow: Math.random() * 0.01
      });
    }

    // Establish connections between nearby nodes
    networkNodes.forEach((node, i) => {
      networkNodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          if (distance < 150 && node.connections.length < 3) {
            node.connections.push(j);
          }
        }
      });
    });

    let animationId: number;
    let time = 0;

    const primaryColor = isDark ? '#00BFFF' : '#0080FF'; // Deep sky blue
    const secondaryColor = isDark ? '#6366F1' : '#4F46E5'; // Indigo
    const accentColor = isDark ? '#10B981' : '#059669'; // Emerald

    const drawReactLogo = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save();
      // React logo inspired design
      const rings = 3;
      const centerX = x;
      const centerY = y;
      const maxRadius = size / 2;
      
      for (let i = 0; i < rings; i++) {
        const radius = maxRadius * (i + 1) / rings;
        ctx.strokeStyle = `rgba(97, 218, 251, ${0.3 + (i * 0.2)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        
        // Draw React logo segments
        for (let j = 0; j < 3; j++) {
          const angle = (j * (Math.PI * 2)) / 3;
          const x1 = centerX + Math.cos(angle) * radius * 0.8;
          const y1 = centerY + Math.sin(angle) * radius * 0.8;
          const cp1x = centerX + Math.cos(angle + 0.3) * radius * 1.2;
          const cp1y = centerY + Math.sin(angle + 0.3) * radius * 1.2;
          const cp2x = centerX + Math.cos(angle + 0.6) * radius * 1.2;
          const cp2y = centerY + Math.sin(angle + 0.6) * radius * 1.2;
          const x2 = centerX + Math.cos(angle + 0.9) * radius * 0.8;
          const y2 = centerY + Math.sin(angle + 0.9) * radius * 0.8;
          
          if (j === 0) {
            ctx.moveTo(x1, y1);
          } else {
            ctx.lineTo(x1, y1);
          }
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
        }
        ctx.closePath();
        ctx.stroke();
      }
      
      // Center dot
      ctx.fillStyle = 'rgba(97, 218, 251, 0.8)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const drawComponent = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save();
      
      // Component box
      const width = size * 1.2;
      const height = size * 0.8;
      const cornerRadius = 4;
      
      // Shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetY = 2;
      
      // Component body
      ctx.fillStyle = secondaryColor + '40';
      ctx.strokeStyle = secondaryColor + '80';
      ctx.lineWidth = 1.5;
      
      // Rounded rectangle
      roundRect(ctx, x - width/2, y - height/2, width, height, cornerRadius);
      ctx.fill();
      ctx.stroke();
      
      // Component header
      ctx.fillStyle = secondaryColor + '60';
      roundRect(
        ctx, 
        x - width/2 + 2, 
        y - height/2 + 2, 
        width - 4, 
        height * 0.2, 
        [cornerRadius, cornerRadius, 0, 0]
      );
      ctx.fill();
      
      // Component content (placeholder)
      ctx.fillStyle = secondaryColor + '30';
      for (let i = 0; i < 3; i++) {
        const lineY = y - height/2 + height * 0.4 + i * (height * 0.15);
        roundRect(
          ctx,
          x - width/2 + 10,
          lineY,
          width * (0.7 - i * 0.1),
          height * 0.08,
          2
        );
        ctx.fill();
      }
      
      ctx.restore();
      
      // Helper function for rounded rectangles with individual corner radii
      function roundRect(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        radius: number | number[]
      ) {
        const radii = Array.isArray(radius) ? radius : [radius, radius, radius, radius];
        
        ctx.beginPath();
        ctx.moveTo(x + radii[0], y);
        ctx.lineTo(x + width - radii[1], y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radii[1]);
        ctx.lineTo(x + width, y + height - radii[2]);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radii[2], y + height);
        ctx.lineTo(x + radii[3], y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radii[3]);
        ctx.lineTo(x, y + radii[0]);
        ctx.quadraticCurveTo(x, y, x + radii[0], y);
        ctx.closePath();
      }
    };

    const drawHook = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save();
      
      // Hook curve
      ctx.strokeStyle = accentColor + 'AA';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      // Draw a hook shape (similar to React's useHook symbol)
      const hookSize = size * 0.8;
      const startAngle = -Math.PI * 0.7;
      const endAngle = Math.PI * 0.2;
      
      // Outer curve
      ctx.arc(x, y, hookSize, startAngle, endAngle);
      
      // Arrow head
      const arrowX = x + Math.cos(endAngle) * hookSize;
      const arrowY = y + Math.sin(endAngle) * hookSize;
      const arrowSize = size * 0.2;
      
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(
        arrowX + Math.cos(endAngle - Math.PI * 0.8) * arrowSize,
        arrowY + Math.sin(endAngle - Math.PI * 0.8) * arrowSize
      );
      
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(
        arrowX + Math.cos(endAngle + Math.PI * 0.8) * arrowSize,
        arrowY + Math.sin(endAngle + Math.PI * 0.8) * arrowSize
      );
      
      ctx.stroke();
      
      // Add "use" text for hooks
      ctx.fillStyle = accentColor + 'DD';
      ctx.font = `bold ${size * 0.3}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('use', x, y);
      
      ctx.restore();
    };

    const drawState = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save();
      
      // State atom representation
      const radius = size * 0.4;
      const electronCount = 3;
      const electronRadius = size * 0.1;
      const orbitRadius = size * 0.7;
      
      // Draw nucleus
      ctx.fillStyle = primaryColor + 'AA';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw electron orbits
      ctx.strokeStyle = primaryColor + '40';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < electronCount; i++) {
        const angle = (Date.now() * 0.001 + i * Math.PI * 2 / electronCount) % (Math.PI * 2);
        const ex = x + Math.cos(angle) * orbitRadius;
        const ey = y + Math.sin(angle) * orbitRadius;
        
        // Orbit path
        ctx.beginPath();
        ctx.arc(x, y, orbitRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Electron
        ctx.fillStyle = primaryColor + 'DD';
        ctx.beginPath();
        ctx.arc(ex, ey, electronRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Plus sign for state updates
      const plusSize = size * 0.2;
      ctx.fillStyle = primaryColor + 'FF';
      
      // Horizontal line
      ctx.fillRect(x - plusSize, y - plusSize/2, plusSize * 2, plusSize);
      // Vertical line
      ctx.fillRect(x - plusSize/2, y - plusSize, plusSize, plusSize * 2);
      
      ctx.restore();
    };

    const drawContext = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save();
      
      // Context provider/consumer visualization
      const outerRadius = size * 0.5;
      const innerRadius = size * 0.3;
      const angle = (Date.now() * 0.0005) % (Math.PI * 2);
      
      // Outer circle (provider)
      ctx.strokeStyle = secondaryColor + 'AA';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, outerRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Inner circle (consumer)
      ctx.beginPath();
      ctx.arc(x, y, innerRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Connection lines (data flow)
      for (let i = 0; i < 3; i++) {
        const a = angle + (i * Math.PI * 2 / 3);
        const x1 = x + Math.cos(a) * innerRadius;
        const y1 = y + Math.sin(a) * innerRadius;
        const x2 = x + Math.cos(a) * outerRadius;
        const y2 = y + Math.sin(a) * outerRadius;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Arrow head
        const arrowSize = size * 0.08;
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(
          x2 - Math.cos(a - 0.3) * arrowSize,
          y2 - Math.sin(a - 0.3) * arrowSize
        );
        ctx.lineTo(
          x2 - Math.cos(a + 0.3) * arrowSize,
          y2 - Math.sin(a + 0.3) * arrowSize
        );
        ctx.closePath();
        ctx.fillStyle = secondaryColor + 'DD';
        ctx.fill();
      }
      
      // Context label
      ctx.fillStyle = secondaryColor + 'DD';
      ctx.font = `bold ${size * 0.2}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ctx', x, y);
      
      ctx.restore();
    };

    const drawRouter = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save();
      
      // Router visualization (like React Router)
      const width = size * 1.1;
      const height = size * 0.7;
      const cornerRadius = 4;
      
      // Router body
      ctx.fillStyle = accentColor + '20';
      ctx.strokeStyle = accentColor + 'AA';
      ctx.lineWidth = 1.5;
      
      // Rounded rectangle for router
      roundRect(ctx, x - width/2, y - height/2, width, height, cornerRadius);
      ctx.fill();
      ctx.stroke();
      
      // Router details
      const portCount = 4;
      const portSize = height * 0.15;
      const portSpacing = height / (portCount + 1);
      
      // Draw ports on left
      for (let i = 0; i < portCount; i++) {
        const portY = y - height/2 + (i + 1) * portSpacing;
        
        // Port connection point
        ctx.fillStyle = accentColor + 'DD';
        ctx.beginPath();
        ctx.arc(x - width/2 - portSize/2, portY, portSize/3, 0, Math.PI * 2);
        ctx.fill();
        
        // Port line
        ctx.strokeStyle = accentColor + '80';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - width/2, portY);
        ctx.lineTo(x - width/2 + portSize, portY);
        ctx.stroke();
      }
      
      // Draw routes
      const routeCount = 3;
      const routeSpacing = width * 0.2;
      
      for (let i = 0; i < routeCount; i++) {
        const routeX = x - width/2 + portSize + (i + 0.5) * routeSpacing;
        const routeY = y - height/4 + (i % 2) * (height/2);
        
        // Route line
        ctx.strokeStyle = accentColor + '80';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x - width/2 + portSize, y - height/2 + portSpacing * (i + 1));
        
        // Curved path to destination
        const cp1x = x - width/2 + portSize + routeSpacing * 0.3;
        const cp1y = y - height/2 + portSpacing * (i + 1);
        const cp2x = routeX - routeSpacing * 0.3;
        const cp2y = routeY;
        
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, routeX, routeY);
        ctx.stroke();
        
        // Route label
        ctx.fillStyle = accentColor + 'DD';
        ctx.font = `bold ${size * 0.15}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`/route-${i+1}`, routeX, routeY - size * 0.2);
      }
      
      // Router label
      ctx.fillStyle = accentColor + 'DD';
      ctx.font = `bold ${size * 0.18}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Router', x, y + height/3);
      
      // Using the roundRect function defined at the top level
      
      ctx.restore();
    };

    const drawConnections = () => {
      networkNodes.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
          const connectedNode = networkNodes[connectionIndex];
          if (connectedNode) {
            ctx.save();
            ctx.globalAlpha = 0.1;
            ctx.strokeStyle = primaryColor;
            ctx.lineWidth = 1;
            
            // Data flow along connection
            const flowProgress = (time * 0.001) % 1;
            const flowX = node.x + (connectedNode.x - node.x) * flowProgress;
            const flowY = node.y + (connectedNode.y - node.y) * flowProgress;
            
            // Connection line
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connectedNode.x, connectedNode.y);
            ctx.stroke();
            
            // Data packet
            ctx.beginPath();
            ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
            ctx.fillStyle = accentColor + '80';
            ctx.fill();
            
            ctx.restore();
          }
        });
      });
    };

    const drawGrid = () => {
      gridLines.forEach(line => {
        ctx.save();
        ctx.globalAlpha = line.opacity;
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 0.5;
        
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
        
        ctx.restore();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      // Draw infrastructure grid
      drawGrid();

      // Draw network connections
      drawConnections();

      // Update and draw network nodes
      networkNodes.forEach(node => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Pulse effect
        const pulseSize = node.size * (1 + Math.sin(node.pulsePhase) * 0.1);
        ctx.globalAlpha = node.opacity * 0.7;
        
        // Different shapes based on node type
        switch(node.type) {
          case 'react':
            drawReactLogo(ctx, node.x, node.y, pulseSize);
            break;
          case 'component':
            drawComponent(ctx, node.x, node.y, pulseSize);
            break;
          case 'hook':
            drawHook(ctx, node.x, node.y, pulseSize);
            break;
          case 'state':
            drawState(ctx, node.x, node.y, pulseSize);
            break;
          case 'context':
            drawContext(ctx, node.x, node.y, pulseSize);
            break;
          case 'router':
            drawRouter(ctx, node.x, node.y, pulseSize);
            break;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
};

export default AnimatedBackground;