import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { DeltaLogo } from './DeltaLogo';
import { WaveformVisualizer } from './WaveformVisualizer';
import type { AssistantState } from '../App';

interface VoiceInteractionOverlayProps {
  state: AssistantState;
  onClose: () => void;
  onStateChange: (state: AssistantState) => void;
}

const stateMessages = {
  idle: 'Tap to speak',
  listening: 'Listening...',
  processing: 'Processing your request...',
  responding: 'Lake is responding...',
  executing: 'Executing task...',
  error: 'Something went wrong'
};

const stateColors = {
  idle: '#1E88E5',
  listening: '#4CAF50',
  processing: '#9C27B0',
  responding: '#00BCD4',
  executing: '#FF9800',
  error: '#FF6B6B'
};

export function VoiceInteractionOverlay({ state, onClose, onStateChange }: VoiceInteractionOverlayProps) {
  const [transcript, setTranscript] = useState('');
  const [showClarification, setShowClarification] = useState(false);
  const [clarificationAnswer, setClarificationAnswer] = useState('');

  useEffect(() => {
    // Simulate voice interaction states
    if (state === 'listening') {
      const timeout = setTimeout(() => {
        setTranscript('Open Spotify and play my favorite music');
        onStateChange('processing');
      }, 2000);
      return () => clearTimeout(timeout);
    } else if (state === 'processing') {
      const timeout = setTimeout(() => {
        onStateChange('responding');
      }, 1500);
      return () => clearTimeout(timeout);
    } else if (state === 'responding') {
      const timeout = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [state, onStateChange, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-12 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {!showClarification ? (
        <>
          {/* Waveform Visualization */}
          <div className="relative mb-8">
            {/* Circular container */}
            <div className="w-48 h-48 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center relative overflow-hidden">
              {/* Animated background pulse */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: stateColors[state] }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.1, 1]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              
              {/* Delta Logo or Waveform */}
              {state === 'listening' || state === 'responding' ? (
                <div className="relative z-10 w-full px-4">
                  <WaveformVisualizer isActive={true} color={stateColors[state]} />
                </div>
              ) : (
                <DeltaLogo size={80} state={state} animated />
              )}
            </div>
          </div>

          {/* Status Text */}
          <motion.p
            key={state}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-xl mb-8"
          >
            {stateMessages[state]}
          </motion.p>

          {/* Transcription Card */}
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md"
            >
              <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20">
                <p className="text-white text-center">{transcript}</p>
              </Card>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="absolute bottom-12 left-6 right-6 space-y-3">
            {state === 'listening' && (
              <Button
                onClick={() => {
                  onStateChange('processing');
                }}
                className="w-full h-14 bg-white text-gray-900 hover:bg-white/90 rounded-3xl"
              >
                Submit
              </Button>
            )}
            
            {(state === 'processing' || state === 'responding') && (
              <Button
                onClick={onClose}
                className="w-full h-14 bg-red-500 hover:bg-red-600 text-white rounded-3xl"
              >
                Stop
              </Button>
            )}
            
            <button
              onClick={onClose}
              className="w-full text-white/70 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        /* Clarification Mode */
        <div className="w-full max-w-md">
          <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 mb-6">
            <h3 className="text-white text-lg mb-2">Lake needs clarification</h3>
            <p className="text-white/80">Which playlist would you like to play?</p>
          </Card>

          <Card className="p-4 bg-white rounded-2xl mb-4">
            <input
              type="text"
              value={clarificationAnswer}
              onChange={(e) => setClarificationAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full bg-transparent border-none outline-none text-gray-900"
            />
          </Card>

          <p className="text-white/70 text-center text-sm mb-4">Or use voice input</p>
          
          <button className="w-12 h-12 mx-auto mb-6 rounded-full bg-[#1E88E5] flex items-center justify-center">
            <DeltaLogo size={24} state="idle" />
          </button>

          <div className="space-y-3">
            <Button
              onClick={() => setShowClarification(false)}
              className="w-full h-12 bg-white text-gray-900 hover:bg-white/90 rounded-3xl"
            >
              Submit Answer
            </Button>
            
            <button
              onClick={onClose}
              className="w-full text-white/70 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
