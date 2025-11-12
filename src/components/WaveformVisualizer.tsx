import { motion } from 'motion/react';

interface WaveformVisualizerProps {
  isActive: boolean;
  color?: string;
}

export function WaveformVisualizer({ isActive, color = '#1E88E5' }: WaveformVisualizerProps) {
  const bars = Array.from({ length: 40 });

  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {bars.map((_, index) => (
        <motion.div
          key={index}
          className="w-1 rounded-full"
          style={{ backgroundColor: color }}
          animate={isActive ? {
            height: [
              Math.random() * 40 + 10,
              Math.random() * 50 + 20,
              Math.random() * 40 + 10
            ]
          } : { height: 4 }}
          transition={{
            duration: 0.3 + Math.random() * 0.3,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
