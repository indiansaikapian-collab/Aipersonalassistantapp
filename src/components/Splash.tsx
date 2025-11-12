import { motion } from 'motion/react';
import { DeltaLogo } from './DeltaLogo';

export function Splash() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#1E88E5] via-[#1565C0] to-[#0D47A1] flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <DeltaLogo size={120} state="idle" animated />
      </motion.div>
      
      <motion.h1
        className="text-white mt-8 text-4xl tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Lake
      </motion.h1>
      
      <motion.p
        className="text-white/80 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Your Intelligent Assistant
      </motion.p>
      
      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
      </motion.div>
    </div>
  );
}
