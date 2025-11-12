import { useState } from 'react';
import { ArrowLeft, Clock, Bell, Battery, Power, Check, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { toast } from 'sonner@2.0.3';
import { DeltaLogo } from './DeltaLogo';
import type { Screen } from '../App';

interface CreateTriggerScreenProps {
  onNavigate: (screen: Screen) => void;
}

type TriggerType = 'time' | 'notification' | 'charging' | 'boot';

const triggerTypes = [
  { id: 'time', icon: Clock, label: 'Time-based', description: 'Schedule for specific times' },
  { id: 'notification', icon: Bell, label: 'Notification-based', description: 'When you receive a notification' },
  { id: 'charging', icon: Battery, label: 'Charging', description: 'When phone starts/stops charging' },
  { id: 'boot', icon: Power, label: 'Boot', description: 'When device restarts' }
];

export function CreateTriggerScreen({ onNavigate }: CreateTriggerScreenProps) {
  const [selectedType, setSelectedType] = useState<TriggerType>('time');
  const [triggerName, setTriggerName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [timeValue, setTimeValue] = useState('07:00');
  const [repeatOption, setRepeatOption] = useState('daily');
  const [chargingAction, setChargingAction] = useState('start');

  const handleSave = () => {
    if (!triggerName.trim() || !taskDescription.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Trigger created successfully!');
    setTimeout(() => {
      onNavigate('triggers');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 safe-top pb-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('triggers')}>
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <span className="text-gray-900 text-xl">Create Trigger</span>
          </div>
          <button
            onClick={handleSave}
            className="text-[#1E88E5]"
          >
            Save
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto mobile-scroll px-6 py-6 pb-24">
        {/* Section 1: Trigger Type */}
        <div className="mb-8">
          <Label className="text-gray-900 text-lg mb-4 block">Choose Trigger Type</Label>
          <div className="grid grid-cols-2 gap-3">
            {triggerTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id as TriggerType)}
                  className={`relative p-4 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? 'border-[#1E88E5] bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#1E88E5] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <Icon className={`w-8 h-8 mb-2 ${isSelected ? 'text-[#1E88E5]' : 'text-gray-600'}`} />
                  <h3 className={`text-sm mb-1 ${isSelected ? 'text-[#1E88E5]' : 'text-gray-900'}`}>
                    {type.label}
                  </h3>
                  <p className="text-xs text-gray-500">{type.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Configure Trigger */}
        <div className="mb-8">
          <Label className="text-gray-900 text-lg mb-4 block">Configure Trigger</Label>
          
          {selectedType === 'time' && (
            <Card className="p-4 bg-white rounded-2xl border-0 shadow-sm space-y-4">
              <div>
                <Label className="text-gray-700 mb-2 block">Time</Label>
                <Input
                  type="time"
                  value={timeValue}
                  onChange={(e) => setTimeValue(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              
              <div>
                <Label className="text-gray-700 mb-2 block">Repeat</Label>
                <RadioGroup value={repeatOption} onValueChange={setRepeatOption}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily" className="text-gray-700">Daily</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="weekdays" id="weekdays" />
                    <Label htmlFor="weekdays" className="text-gray-700">Weekdays</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="weekends" id="weekends" />
                    <Label htmlFor="weekends" className="text-gray-700">Weekends</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom" className="text-gray-700">Custom</Label>
                  </div>
                </RadioGroup>
              </div>

              {repeatOption === 'custom' && (
                <div className="flex gap-2">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                    <button
                      key={index}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 text-gray-700 hover:border-[#1E88E5] hover:bg-blue-50"
                    >
                      {day}
                    </button>
                  ))}
                </div>
              )}
            </Card>
          )}

          {selectedType === 'notification' && (
            <Card className="p-4 bg-white rounded-2xl border-0 shadow-sm space-y-4">
              <div>
                <Label className="text-gray-700 mb-2 block">App</Label>
                <select className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]">
                  <option>WhatsApp</option>
                  <option>Messenger</option>
                  <option>Gmail</option>
                  <option>All Apps</option>
                </select>
              </div>
              
              <div>
                <Label className="text-gray-700 mb-2 block">Keyword Filter (Optional)</Label>
                <Input
                  placeholder="Contains text..."
                  className="rounded-xl"
                />
              </div>
            </Card>
          )}

          {selectedType === 'charging' && (
            <Card className="p-4 bg-white rounded-2xl border-0 shadow-sm">
              <RadioGroup value={chargingAction} onValueChange={setChargingAction}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="start" id="start" />
                  <Label htmlFor="start" className="text-gray-700">Starts charging</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stop" id="stop" />
                  <Label htmlFor="stop" className="text-gray-700">Stops charging</Label>
                </div>
              </RadioGroup>
            </Card>
          )}

          {selectedType === 'boot' && (
            <Card className="p-4 bg-white rounded-2xl border-0 shadow-sm">
              <Label className="text-gray-700 mb-2 block">Delay after boot (seconds)</Label>
              <Input
                type="number"
                defaultValue="10"
                className="rounded-xl"
              />
            </Card>
          )}
        </div>

        {/* Section 3: Task to Execute */}
        <div className="mb-8">
          <Label className="text-gray-900 text-lg mb-4 block">What should Lake do?</Label>
          <Card className="p-4 bg-white rounded-2xl border-0 shadow-sm">
            <div className="relative">
              <Textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Example: Read my notifications aloud, Open Spotify and play music"
                className="min-h-[120px] rounded-xl resize-none"
              />
              <button className="absolute bottom-3 right-3 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <DeltaLogo size={16} state="idle" />
              </button>
            </div>
            <button className="text-[#1E88E5] text-sm mt-2">
              View example tasks
            </button>
          </Card>
        </div>

        {/* Section 4: Trigger Name */}
        <div className="mb-8">
          <Label className="text-gray-900 text-lg mb-4 block">Trigger Name</Label>
          <Input
            value={triggerName}
            onChange={(e) => setTriggerName(e.target.value)}
            placeholder="Morning Briefing"
            className="rounded-xl"
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-12 rounded-3xl border-2 border-gray-300"
          >
            Test Trigger
          </Button>
          
          <Button
            onClick={handleSave}
            className="w-full h-12 bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] hover:opacity-90 text-white rounded-3xl"
          >
            Save Trigger
          </Button>
        </div>
      </div>
    </div>
  );
}