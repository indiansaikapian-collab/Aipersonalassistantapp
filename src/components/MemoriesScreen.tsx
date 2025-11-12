import { useState } from 'react';
import { ArrowLeft, Search, Brain, Plus, Edit2, Trash2, Shield, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import type { Screen } from '../App';

interface MemoriesScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Memory {
  id: number;
  content: string;
  timestamp: string;
  category: 'personal' | 'work' | 'preferences';
}

const categoryColors = {
  personal: 'bg-purple-100 text-purple-700',
  work: 'bg-blue-100 text-blue-700',
  preferences: 'bg-green-100 text-green-700'
};

export function MemoriesScreen({ onNavigate }: MemoriesScreenProps) {
  const [showInfo, setShowInfo] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMemory, setNewMemory] = useState('');
  const [newCategory, setNewCategory] = useState<'personal' | 'work' | 'preferences'>('personal');
  
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: 1,
      content: "I'm allergic to peanuts",
      timestamp: 'Added 2 days ago',
      category: 'personal'
    },
    {
      id: 2,
      content: "My favorite playlist is 'Chill Vibes'",
      timestamp: 'Added 5 days ago',
      category: 'preferences'
    },
    {
      id: 3,
      content: "Team meeting every Monday at 9 AM",
      timestamp: 'Added 1 week ago',
      category: 'work'
    },
    {
      id: 4,
      content: "I prefer temperature in Celsius",
      timestamp: 'Added 2 weeks ago',
      category: 'preferences'
    }
  ]);

  const filteredMemories = memories.filter(memory =>
    memory.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMemory = () => {
    if (!newMemory.trim()) {
      toast.error('Please enter a memory');
      return;
    }

    const memory: Memory = {
      id: Date.now(),
      content: newMemory,
      timestamp: 'Just now',
      category: newCategory
    };

    setMemories([memory, ...memories]);
    setNewMemory('');
    setShowAddDialog(false);
    toast.success('Memory saved!');
  };

  const handleDeleteMemory = (id: number) => {
    setMemories(memories.filter(m => m.id !== id));
    toast.success('Memory deleted');
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 safe-top pb-4 px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('dashboard')}>
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <span className="text-gray-900 text-xl">My Memories</span>
          </div>
          <button>
            <Search className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memories..."
            className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {/* Privacy Info Card */}
        {showInfo && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Card className="p-4 bg-blue-50 border-blue-200 rounded-2xl mb-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-blue-900 mb-1">How Lake Remembers</h3>
                    <p className="text-blue-700 text-sm mb-2">
                      Lake stores information you want it to remember to provide better, personalized assistance. Your memories are private and secure.
                    </p>
                    <div className="flex gap-2">
                      <button className="text-blue-600 text-sm underline">
                        Learn More
                      </button>
                      <button
                        onClick={() => setShowInfo(false)}
                        className="text-blue-600 text-sm underline"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Memories List */}
        {filteredMemories.length > 0 ? (
          <div className="space-y-3">
            {filteredMemories.map((memory) => (
              <motion.div
                key={memory.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="p-4 bg-white rounded-2xl shadow-sm border-0">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={`${categoryColors[memory.category]} capitalize`}>
                      {memory.category}
                    </Badge>
                    <div className="flex gap-2">
                      <button className="text-gray-400 hover:text-blue-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMemory(memory.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-900 mb-2">{memory.content}</p>
                  <p className="text-gray-400 text-sm">{memory.timestamp}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : searchQuery ? (
          /* No Results */
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-gray-900 text-lg mb-2">No results found</h3>
            <p className="text-gray-500">Try a different search term</p>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <Brain className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-gray-900 text-lg mb-2">No Memories Yet</h3>
            <p className="text-gray-500 mb-6 px-8">
              Lake will remember things you tell it to remember
            </p>
            <p className="text-gray-400 text-sm px-8">
              Example: Try saying "Remember that I'm allergic to peanuts"
            </p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setShowAddDialog(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-[#1E88E5] to-[#0D47A1] rounded-full shadow-lg flex items-center justify-center"
        whileTap={{ scale: 0.9 }}
      >
        <Plus className="w-6 h-6 text-white" />
      </motion.button>

      {/* Add Memory Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="w-[90%] rounded-3xl">
          <DialogHeader>
            <DialogTitle>Add New Memory</DialogTitle>
            <DialogDescription>
              Tell Lake something you want it to remember for future conversations.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Textarea
              value={newMemory}
              onChange={(e) => setNewMemory(e.target.value)}
              placeholder="What should Lake remember?"
              className="min-h-[120px] rounded-2xl resize-none"
            />
            
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Category (Optional)</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="preferences">Preferences</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowAddDialog(false)}
                variant="outline"
                className="flex-1 rounded-2xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddMemory}
                className="flex-1 bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] hover:opacity-90 rounded-2xl"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}