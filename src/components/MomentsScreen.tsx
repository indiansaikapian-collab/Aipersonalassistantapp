import { useState } from 'react';
import { ArrowLeft, Filter, CheckCircle2, XCircle, Clock, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { motion, AnimatePresence } from 'motion/react';
import type { Screen } from '../App';

interface MomentsScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Moment {
  id: number;
  task: string;
  status: 'success' | 'failed' | 'pending';
  startTime: string;
  completedTime?: string;
  error?: string;
  details?: string;
}

const statusConfig = {
  success: {
    icon: CheckCircle2,
    label: 'Completed',
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700'
  },
  failed: {
    icon: XCircle,
    label: 'Failed',
    color: 'text-red-500',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700'
  },
  pending: {
    icon: Clock,
    label: 'In Progress',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700'
  }
};

export function MomentsScreen({ onNavigate }: MomentsScreenProps) {
  const [filter, setFilter] = useState<'all' | 'success' | 'failed'>('all');
  const [expandedMoments, setExpandedMoments] = useState<Set<number>>(new Set());

  const [moments, setMoments] = useState<Moment[]>([
    {
      id: 1,
      task: 'Opened Spotify and played "Chill Vibes" playlist',
      status: 'success',
      startTime: '2:30 PM',
      completedTime: '2:31 PM',
      details: 'Successfully launched Spotify app and started playing the requested playlist'
    },
    {
      id: 2,
      task: 'Read notifications aloud',
      status: 'success',
      startTime: '1:15 PM',
      completedTime: '1:16 PM'
    },
    {
      id: 3,
      task: 'Set alarm for 7:00 AM tomorrow',
      status: 'success',
      startTime: '12:45 PM',
      completedTime: '12:45 PM'
    },
    {
      id: 4,
      task: 'Open Calculator app',
      status: 'failed',
      startTime: '11:30 AM',
      error: 'App not found on device',
      details: 'Could not locate Calculator app. Please check if the app is installed.'
    },
    {
      id: 5,
      task: 'Send WhatsApp message to John',
      status: 'success',
      startTime: '10:20 AM',
      completedTime: '10:21 AM'
    },
    {
      id: 6,
      task: 'Get weather forecast',
      status: 'success',
      startTime: '9:00 AM',
      completedTime: '9:01 AM'
    }
  ]);

  const filteredMoments = filter === 'all'
    ? moments
    : moments.filter(m => m.status === filter);

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedMoments);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedMoments(newExpanded);
  };

  const handleDelete = (id: number) => {
    setMoments(moments.filter(m => m.id !== id));
  };

  const groupedMoments = {
    today: filteredMoments.slice(0, 3),
    yesterday: filteredMoments.slice(3, 5),
    older: filteredMoments.slice(5)
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
            <span className="text-gray-900 text-xl">Moments</span>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100">
                <Filter className="w-4 h-4 text-gray-700" />
                <span className="text-sm text-gray-700">Filter</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
              <SheetHeader>
                <SheetTitle>Filter Moments</SheetTitle>
              </SheetHeader>
              <div className="space-y-2 mt-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`w-full p-3 rounded-2xl text-left ${
                    filter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  All tasks
                </button>
                <button
                  onClick={() => setFilter('success')}
                  className={`w-full p-3 rounded-2xl text-left ${
                    filter === 'success' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Completed only
                </button>
                <button
                  onClick={() => setFilter('failed')}
                  className={`w-full p-3 rounded-2xl text-left ${
                    filter === 'failed' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Failed only
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {filteredMoments.length > 0 ? (
          <div className="space-y-6">
            {/* Today */}
            {groupedMoments.today.length > 0 && (
              <div>
                <h3 className="text-gray-500 text-sm mb-3">Today</h3>
                <div className="space-y-3">
                  {groupedMoments.today.map((moment) => (
                    <MomentCard
                      key={moment.id}
                      moment={moment}
                      isExpanded={expandedMoments.has(moment.id)}
                      onToggleExpand={() => toggleExpanded(moment.id)}
                      onDelete={() => handleDelete(moment.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Yesterday */}
            {groupedMoments.yesterday.length > 0 && (
              <div>
                <h3 className="text-gray-500 text-sm mb-3">Yesterday</h3>
                <div className="space-y-3">
                  {groupedMoments.yesterday.map((moment) => (
                    <MomentCard
                      key={moment.id}
                      moment={moment}
                      isExpanded={expandedMoments.has(moment.id)}
                      onToggleExpand={() => toggleExpanded(moment.id)}
                      onDelete={() => handleDelete(moment.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Older */}
            {groupedMoments.older.length > 0 && (
              <div>
                <h3 className="text-gray-500 text-sm mb-3">Older</h3>
                <div className="space-y-3">
                  {groupedMoments.older.map((moment) => (
                    <MomentCard
                      key={moment.id}
                      moment={moment}
                      isExpanded={expandedMoments.has(moment.id)}
                      onToggleExpand={() => toggleExpanded(moment.id)}
                      onDelete={() => handleDelete(moment.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Clock className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-gray-900 text-lg mb-2">No Activity Yet</h3>
            <p className="text-gray-500">Your task history will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MomentCard({ 
  moment, 
  isExpanded, 
  onToggleExpand, 
  onDelete 
}: { 
  moment: Moment; 
  isExpanded: boolean; 
  onToggleExpand: () => void;
  onDelete: () => void;
}) {
  const config = statusConfig[moment.status];
  const Icon = config.icon;

  return (
    <motion.div layout>
      <Card className="p-4 bg-white rounded-2xl shadow-sm border-0 overflow-hidden">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${config.color}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-gray-900 mb-1">{moment.task}</p>
            
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${config.bgColor} ${config.textColor}`}>
                {config.label}
              </Badge>
              <span className="text-gray-400 text-xs">Started at {moment.startTime}</span>
            </div>
            
            {moment.completedTime && (
              <p className="text-gray-400 text-xs">Completed at {moment.completedTime}</p>
            )}
            
            {moment.error && !isExpanded && (
              <p className="text-red-600 text-sm mt-1">{moment.error}</p>
            )}

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 pt-3 border-t border-gray-100"
                >
                  {moment.details && (
                    <p className="text-gray-600 text-sm mb-3">{moment.details}</p>
                  )}
                  {moment.error && (
                    <div className="bg-red-50 p-3 rounded-xl mb-3">
                      <p className="text-red-700 text-sm">{moment.error}</p>
                    </div>
                  )}
                  <Button
                    onClick={onDelete}
                    variant="outline"
                    className="h-8 text-xs rounded-full text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={onToggleExpand}
            className="text-gray-400 hover:text-gray-600"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
