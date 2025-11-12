import { useState } from 'react';
import { motion } from 'motion/react';
import { Mic, MessageSquare, Clock, Brain, Settings, CheckCircle2, AlertTriangle, History, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { DeltaLogo } from './DeltaLogo';
import { WaveformVisualizer } from './WaveformVisualizer';
import type { Screen, AssistantState } from '../App';

interface MainDashboardProps {
  onNavigate: (screen: Screen) => void;
  assistantState: AssistantState;
  onVoiceActivation: () => void;
}

const stateLabels = {
  idle: 'Ready',
  listening: 'Listening...',
  processing: 'Processing...',
  responding: 'Responding...',
  executing: 'Executing...',
  error: 'Error'
};

const stateColors = {
  idle: 'bg-blue-100 text-blue-700',
  listening: 'bg-green-100 text-green-700',
  processing: 'bg-purple-100 text-purple-700',
  responding: 'bg-cyan-100 text-cyan-700',
  executing: 'bg-orange-100 text-orange-700',
  error: 'bg-red-100 text-red-700'
};

export function MainDashboard({ onNavigate, assistantState, onVoiceActivation }: MainDashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'triggers' | 'memories' | 'settings'>('home');
  const [isRecording, setIsRecording] = useState(false);

  const mockStats = {
    tasksCompleted: 24,
    activeTriggers: 3,
    memoriesStored: 12,
    recentConversations: 8
  };

  const mockRecentActivity = [
    { id: 1, task: 'Opened Spotify and played music', status: 'success', time: '2 min ago' },
    { id: 2, task: 'Read notifications aloud', status: 'success', time: '1 hour ago' },
    { id: 3, task: 'Set alarm for 7:00 AM', status: 'success', time: '3 hours ago' }
  ];

  const handleMicPress = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      onVoiceActivation();
    }
  };

  const handleTabClick = (tab: 'home' | 'triggers' | 'memories' | 'settings') => {
    setActiveTab(tab);
    if (tab !== 'home') {
      onNavigate(tab as Screen);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-[#F5F7FA]">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] pt-12 safe-top pb-6 px-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <DeltaLogo size={48} state={assistantState} animated />
            <div>
              <h1 className="text-white text-2xl">Hey, Lake Here</h1>
              <Badge className={`mt-1 ${stateColors[assistantState]}`}>
                {stateLabels[assistantState]}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto mobile-scroll px-6 pt-6 pb-24">
        {/* Voice Input Card */}
        <Card className="p-6 mb-6 bg-white rounded-3xl shadow-md border-0">
          <div className="flex flex-col items-center">
            {/* Centered Logo instead of mic button */}
            <div className="mb-4">
              <DeltaLogo size={96} state={assistantState} animated />
            </div>
            
            <p className="text-gray-600 mb-4">Tap the floating assistant or use voice commands</p>
            
            {isRecording && (
              <div className="w-full">
                <WaveformVisualizer isActive={isRecording} />
              </div>
            )}
            
            <div className="w-full mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="+ Ask Lake"
                  className="w-full px-4 py-3 pr-12 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5">
                    <DeltaLogo size={20} state="idle" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-white rounded-2xl shadow-sm border-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Tasks Today</p>
                <p className="text-2xl text-gray-900">{mockStats.tasksCompleted}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-2xl shadow-sm border-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Active Triggers</p>
                <p className="text-2xl text-gray-900">{mockStats.activeTriggers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-2xl shadow-sm border-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Memories</p>
                <p className="text-2xl text-gray-900">{mockStats.memoriesStored}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-2xl shadow-sm border-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Conversations</p>
                <p className="text-2xl text-gray-900">{mockStats.recentConversations}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 bg-white rounded-3xl shadow-md border-0 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-gray-900">Moments</h2>
            <button 
              onClick={() => onNavigate('moments')}
              className="text-[#1E88E5] text-sm"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {mockRecentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">{activity.task}</p>
                  <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Permission Warning (if needed) */}
        <Card className="p-4 bg-amber-50 rounded-2xl border border-amber-200 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-amber-900 text-sm">Permissions: Not All Granted</p>
              <Button 
                onClick={() => onNavigate('permissions')}
                className="mt-2 h-8 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs"
              >
                Manage Permissions
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 pb-safe safe-bottom">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <NavButton
            icon={TrendingUp}
            label="Home"
            active={activeTab === 'home'}
            onClick={() => handleTabClick('home')}
          />
          <NavButton
            icon={Clock}
            label="Triggers"
            active={activeTab === 'triggers'}
            onClick={() => handleTabClick('triggers')}
          />
          <NavButton
            icon={Brain}
            label="Memories"
            active={activeTab === 'memories'}
            onClick={() => handleTabClick('memories')}
          />
          <NavButton
            icon={Settings}
            label="Settings"
            active={activeTab === 'settings'}
            onClick={() => handleTabClick('settings')}
          />
        </div>
      </div>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavButton({ icon: Icon, label, active, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 py-2 relative"
    >
      <Icon className={`w-6 h-6 ${active ? 'text-[#1E88E5]' : 'text-gray-400'}`} />
      <span className={`text-xs ${active ? 'text-[#1E88E5]' : 'text-gray-400'}`}>
        {label}
      </span>
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-[#1E88E5] to-[#00BCD4] rounded-full"
        />
      )}
    </button>
  );
}