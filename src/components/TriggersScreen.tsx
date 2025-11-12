import { useState } from 'react';
import { ArrowLeft, Plus, Clock, Bell, Battery, Power, Info, Edit2, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import type { Screen } from '../App';

interface TriggersScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Trigger {
  id: number;
  name: string;
  type: 'time' | 'notification' | 'charging' | 'boot';
  condition: string;
  task: string;
  enabled: boolean;
}

const triggerIcons = {
  time: Clock,
  notification: Bell,
  charging: Battery,
  boot: Power
};

export function TriggersScreen({ onNavigate }: TriggersScreenProps) {
  const [showInfo, setShowInfo] = useState(true);
  const [triggers, setTriggers] = useState<Trigger[]>([
    {
      id: 1,
      name: 'Morning Briefing',
      type: 'time',
      condition: 'Daily at 7:00 AM',
      task: 'Read my notifications aloud and tell me the weather',
      enabled: true
    },
    {
      id: 2,
      name: 'Spotify Auto-play',
      type: 'charging',
      condition: 'When phone starts charging',
      task: 'Open Spotify and play my Discover Weekly',
      enabled: true
    },
    {
      id: 3,
      name: 'WhatsApp Reader',
      type: 'notification',
      condition: 'When WhatsApp notification received',
      task: 'Read the message aloud',
      enabled: false
    }
  ]);

  const toggleTrigger = (id: number) => {
    setTriggers(triggers.map(t => 
      t.id === id ? { ...t, enabled: !t.enabled } : t
    ));
  };

  const deleteTrigger = (id: number) => {
    setTriggers(triggers.filter(t => t.id !== id));
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 safe-top pb-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('dashboard')}>
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <span className="text-gray-900 text-xl">Triggers</span>
          </div>
          <button onClick={() => setShowInfo(!showInfo)}>
            <Info className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto mobile-scroll px-6 py-6 pb-24">
        {/* Info Card */}
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="p-4 bg-blue-50 border-blue-200 rounded-2xl mb-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-blue-900 mb-1">Automate Your Tasks</h3>
                  <p className="text-blue-700 text-sm mb-2">
                    Create triggers to execute tasks automatically based on time, notifications, or device events.
                  </p>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="text-blue-600 text-sm underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Triggers List */}
        {triggers.length > 0 ? (
          <div className="space-y-3">
            {triggers.map((trigger) => {
              const Icon = triggerIcons[trigger.type];
              return (
                <motion.div
                  key={trigger.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Card className="p-4 bg-white rounded-2xl shadow-sm border-0">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        trigger.enabled ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${trigger.enabled ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="text-gray-900">{trigger.name}</h3>
                          <Switch
                            checked={trigger.enabled}
                            onCheckedChange={() => toggleTrigger(trigger.id)}
                          />
                        </div>
                        
                        <p className="text-gray-500 text-sm mb-2">{trigger.condition}</p>
                        
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {trigger.task}
                        </p>
                        
                        <div className="flex gap-2">
                          <Button
                            onClick={() => onNavigate('create-trigger')}
                            variant="outline"
                            className="h-8 text-xs rounded-full"
                          >
                            <Edit2 className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => deleteTrigger(trigger.id)}
                            variant="outline"
                            className="h-8 text-xs rounded-full text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Clock className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-gray-900 text-lg mb-2">No Triggers Yet</h3>
            <p className="text-gray-500 mb-6">Create your first automated task</p>
            <Button
              onClick={() => onNavigate('create-trigger')}
              className="bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] hover:opacity-90 rounded-3xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Trigger
            </Button>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => onNavigate('create-trigger')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-[#1E88E5] to-[#0D47A1] rounded-full shadow-lg flex items-center justify-center"
        whileTap={{ scale: 0.9 }}
      >
        <Plus className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
}
