import { motion } from 'motion/react';
import type { AssistantState } from '../App';
import lakeIcon from 'figma:asset/ec17cf90777f27f44b2fe543487e5a0319c6e0a6.png';

interface DeltaLogoProps {
  size?: number;
  state?: AssistantState;
  animated?: boolean;
}

const stateColors = {
  idle: '#1E88E5',
  listening: '#4CAF50',
  processing: '#9C27B0',
  responding: '#00BCD4',
  executing: '#FF9800',
  error: '#FF6B6B'
};

// CSS filter values to approximate each state color
const stateFilters = {
  idle: 'none', // Default blue - matches the original image
  listening: 'hue-rotate(80deg) saturate(1.2) brightness(1.1)', // Green
  processing: 'hue-rotate(240deg) saturate(1.3) brightness(0.9)', // Purple
  responding: 'hue-rotate(10deg) saturate(1.3) brightness(1.1)', // Cyan
  executing: 'hue-rotate(30deg) saturate(1.5) brightness(1.2)', // Orange
  error: 'hue-rotate(330deg) saturate(1.3) brightness(1.1)' // Red
};

export function DeltaLogo({ size = 48, state = 'idle', animated = false }: DeltaLogoProps) {
  const color = stateColors[state];
  const filter = stateFilters[state];
  
  const animations = {
    idle: {},
    listening: {
      scale: [1, 1.1, 1],
      transition: { repeat: Infinity, duration: 1.5 }
    },
    processing: {
      rotate: 360,
      transition: { repeat: Infinity, duration: 2, ease: "linear" }
    },
    responding: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: { repeat: Infinity, duration: 1 }
    },
    executing: {
      rotate: [0, 10, -10, 0],
      transition: { repeat: Infinity, duration: 1.5 }
    },
    error: {
      x: [-2, 2, -2, 2, 0],
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      animate={animated ? animations[state] : {}}
    >
      {/* Glow effect */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          style={{ backgroundColor: color }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
      
      {/* Lake wave logo */}
      <motion.img
        src={lakeIcon}
        alt="Lake Assistant"
        className="relative z-10 object-contain"
        style={{ 
          width: size, 
          height: size,
          filter: filter
        }}
      />
      
      {/* Overlay glow for animated states */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ 
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            pointerEvents: 'none'
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
    </motion.div>
  );
}
