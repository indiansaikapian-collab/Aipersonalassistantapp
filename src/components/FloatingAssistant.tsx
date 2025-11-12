import { useState } from 'react';
import { motion, useDragControls } from 'motion/react';
import { DeltaLogo } from './DeltaLogo';

interface FloatingAssistantProps {
  onActivate: () => void;
}

export function FloatingAssistant({ onActivate }: FloatingAssistantProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragControls = useDragControls();

  return (
    <motion.button
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.1}
      onDragEnd={(_, info) => {
        setPosition({ x: info.offset.x, y: info.offset.y });
      }}
      onClick={onActivate}
      className="fixed bottom-44 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[#1E88E5] to-[#0D47A1] shadow-lg flex items-center justify-center backdrop-blur-sm z-40"
      style={{ x: position.x, y: position.y }}
      whileTap={{ scale: 0.9 }}
    >
      <DeltaLogo size={28} state="idle" />
    </motion.button>
  );
}