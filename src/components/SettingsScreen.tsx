import { useState } from 'react';
import { ArrowLeft, User, Volume2, Mic, Eye, Shield, Bell, Zap, Info, ChevronRight, ExternalLink, Github, LogOut, CheckCircle2, XCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import type { Screen } from '../App';

interface SettingsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [ttsVoiceExpanded, setTtsVoiceExpanded] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('neural-female');
  const [wakeWordEnabled, setWakeWordEnabled] = useState(true);
  const [picovoiceKeyExpanded, setPicovoiceKeyExpanded] = useState(false);
  const [visionMode, setVisionMode] = useState<'xml' | 'screenshot'>('xml');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [taskAlerts, setTaskAlerts] = useState(true);
  const [triggerAlerts, setTriggerAlerts] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);

  const permissions = [
    { name: 'Accessibility Service', granted: true },
    { name: 'Microphone', granted: true },
    { name: 'Display Overlay', granted: false },
    { name: 'Notifications', granted: true },
    { name: 'Default Assistant Role', granted: false }
  ];

  const voices = [
    { id: 'standard-female', name: 'Standard Female', description: 'Clear, professional' },
    { id: 'standard-male', name: 'Standard Male', description: 'Clear, professional' },
    { id: 'neural-female', name: 'Neural Female', description: 'Natural-sounding' },
    { id: 'neural-male', name: 'Neural Male', description: 'Natural-sounding' },
    { id: 'studio-female', name: 'Studio Female', description: 'Premium quality' },
    { id: 'studio-male', name: 'Studio Male', description: 'Premium quality' }
  ];

  return (
    <div className="fixed inset-0 flex flex-col bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 safe-top pb-4 px-6">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('dashboard')}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <span className="text-gray-900 text-xl">Settings</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto mobile-scroll pb-24">
        {/* User Profile Section */}
        <Card className="mx-6 mt-6 p-6 bg-white rounded-3xl shadow-sm border-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E88E5] to-[#0D47A1] flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <input
                type="text"
                defaultValue="Lake User"
                className="text-gray-900 text-lg bg-transparent border-none outline-none mb-1"
              />
              <input
                type="email"
                defaultValue="user@example.com"
                className="text-gray-500 text-sm bg-transparent border-none outline-none"
              />
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full rounded-2xl text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </Card>

        {/* Voice & Audio Settings */}
        <div className="px-6 mt-8">
          <h3 className="text-gray-500 text-xs uppercase tracking-wider mb-3">Voice & Audio</h3>
          
          {/* TTS Voice Settings */}
          <Card className="bg-white rounded-2xl shadow-sm border-0 mb-3">
            <Collapsible open={ttsVoiceExpanded} onOpenChange={setTtsVoiceExpanded}>
              <CollapsibleTrigger asChild>
                <button className="w-full p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <p className="text-gray-900">TTS Voice Settings</p>
                      <p className="text-gray-500 text-sm">
                        {voices.find(v => v.id === selectedVoice)?.name}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${ttsVoiceExpanded ? 'rotate-90' : ''}`} />
                </button>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="px-4 pb-4 space-y-2">
                  {voices.map((voice) => (
                    <button
                      key={voice.id}
                      onClick={() => setSelectedVoice(voice.id)}
                      className={`w-full p-3 rounded-xl text-left transition-colors ${
                        selectedVoice === voice.id
                          ? 'bg-blue-50 border-2 border-[#1E88E5]'
                          : 'bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`${selectedVoice === voice.id ? 'text-[#1E88E5]' : 'text-gray-900'}`}>
                            {voice.name}
                          </p>
                          <p className="text-gray-500 text-sm">{voice.description}</p>
                        </div>
                        {selectedVoice === voice.id && (
                          <CheckCircle2 className="w-5 h-5 text-[#1E88E5]" />
                        )}
                      </div>
                    </button>
                  ))}
                  <Button className="w-full mt-2 bg-[#1E88E5] hover:bg-[#1565C0] rounded-2xl">
                    Test Selected Voice
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Wake Word Settings */}
          <Card className="bg-white rounded-2xl shadow-sm border-0 mb-3">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Mic className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-gray-900">Enable Wake Word</p>
                    <p className="text-gray-500 text-sm">
                      {wakeWordEnabled ? 'Say "Hey Lake" to activate' : 'Wake word disabled'}
                    </p>
                  </div>
                </div>
                <Switch checked={wakeWordEnabled} onCheckedChange={setWakeWordEnabled} />
              </div>

              {wakeWordEnabled && (
                <Collapsible open={picovoiceKeyExpanded} onOpenChange={setPicovoiceKeyExpanded}>
                  <CollapsibleTrigger asChild>
                    <button className="w-full p-3 bg-gray-50 rounded-xl text-left flex items-center justify-between mb-2">
                      <span className="text-gray-700 text-sm">Wake Word Engine: Porcupine</span>
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${picovoiceKeyExpanded ? 'rotate-90' : ''}`} />
                    </button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="p-3 bg-gray-50 rounded-xl mb-2">
                      <label className="text-gray-700 text-sm mb-2 block">Picovoice Access Key</label>
                      <input
                        type="password"
                        placeholder="Enter your Picovoice key..."
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-sm"
                      />
                      <a
                        href="https://console.picovoice.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1E88E5] text-sm underline flex items-center gap-1 mt-2"
                      >
                        Get Picovoice Key
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          </Card>

          {/* STT Engine */}
          <Card className="bg-white rounded-2xl shadow-sm border-0">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mic className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-gray-900">STT Engine</p>
                  <p className="text-gray-500 text-sm">Google STT</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </div>

        {/* Vision Mode */}
        <div className="px-6 mt-8">
          <h3 className="text-gray-500 text-xs uppercase tracking-wider mb-3">Vision Mode</h3>
          
          <Card className="bg-white rounded-2xl shadow-sm border-0">
            <div className="p-4 space-y-3">
              <button
                onClick={() => setVisionMode('xml')}
                className={`w-full p-4 rounded-xl text-left transition-colors ${
                  visionMode === 'xml'
                    ? 'bg-blue-50 border-2 border-[#1E88E5]'
                    : 'bg-gray-50 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-gray-600" />
                    <span className={visionMode === 'xml' ? 'text-[#1E88E5]' : 'text-gray-900'}>
                      XML Mode
                    </span>
                  </div>
                  {visionMode === 'xml' && <CheckCircle2 className="w-5 h-5 text-[#1E88E5]" />}
                </div>
                <p className="text-gray-500 text-sm">Faster, uses less resources</p>
              </button>

              <button
                onClick={() => setVisionMode('screenshot')}
                className={`w-full p-4 rounded-xl text-left transition-colors ${
                  visionMode === 'screenshot'
                    ? 'bg-blue-50 border-2 border-[#1E88E5]'
                    : 'bg-gray-50 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-gray-600" />
                    <span className={visionMode === 'screenshot' ? 'text-[#1E88E5]' : 'text-gray-900'}>
                      Screenshot Mode
                    </span>
                  </div>
                  {visionMode === 'screenshot' && <CheckCircle2 className="w-5 h-5 text-[#1E88E5]" />}
                </div>
                <p className="text-gray-500 text-sm">More accurate, higher resource usage</p>
              </button>
            </div>
          </Card>
        </div>

        {/* Permissions */}
        <div className="px-6 mt-8">
          <h3 className="text-gray-500 text-xs uppercase tracking-wider mb-3">Permissions</h3>
          
          <Card className="bg-white rounded-2xl shadow-sm border-0 mb-3">
            <div className="p-4">
              {permissions.map((permission, index) => (
                <div key={permission.name}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      {permission.granted ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="text-gray-900">{permission.name}</span>
                    </div>
                    <span className={`text-sm ${permission.granted ? 'text-green-600' : 'text-red-600'}`}>
                      {permission.granted ? 'Granted' : 'Not Granted'}
                    </span>
                  </div>
                  {index < permissions.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </Card>

          <Button
            onClick={() => onNavigate('permissions')}
            className="w-full mb-2 bg-[#1E88E5] hover:bg-[#1565C0] rounded-2xl"
          >
            Manage Permissions
          </Button>

          <button className="w-full text-[#1E88E5] text-sm underline">
            Why are these permissions needed?
          </button>
        </div>

        {/* Notifications */}
        <div className="px-6 mt-8">
          <h3 className="text-gray-500 text-xs uppercase tracking-wider mb-3">Notifications</h3>
          
          <Card className="bg-white rounded-2xl shadow-sm border-0">
            <div className="p-4">
              {[
                { label: 'Push notifications', value: pushNotifications, onChange: setPushNotifications },
                { label: 'Task completion alerts', value: taskAlerts, onChange: setTaskAlerts },
                { label: 'Trigger execution alerts', value: triggerAlerts, onChange: setTriggerAlerts },
                { label: 'Sound', value: sound, onChange: setSound },
                { label: 'Vibration', value: vibration, onChange: setVibration }
              ].map((setting, index, arr) => (
                <div key={setting.label}>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-900">{setting.label}</span>
                    <Switch checked={setting.value} onCheckedChange={setting.onChange} />
                  </div>
                  {index < arr.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Advanced */}
        <div className="px-6 mt-8">
          <h3 className="text-gray-500 text-xs uppercase tracking-wider mb-3">Advanced</h3>
          
          <Card className="bg-white rounded-2xl shadow-sm border-0">
            <button className="w-full p-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Battery Optimization Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="w-full p-4 flex items-center justify-between border-b border-gray-100">
              <span className="text-gray-900">Clear cache</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="w-full p-4 flex items-center justify-between border-b border-gray-100">
              <span className="text-gray-900">Clear conversation history</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="w-full p-4 flex items-center justify-between">
              <span className="text-red-600">Reset app data</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Card>
        </div>

        {/* About */}
        <div className="px-6 mt-8 mb-8">
          <h3 className="text-gray-500 text-xs uppercase tracking-wider mb-3">About</h3>
          
          <Card className="bg-white rounded-2xl shadow-sm border-0">
            <div className="p-4 flex items-center justify-between border-b border-gray-100">
              <span className="text-gray-900">App version</span>
              <span className="text-gray-500">v1.0.0</span>
            </div>
            
            <button className="w-full p-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">View source code on Github</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </button>
            
            <button className="w-full p-4 flex items-center justify-between border-b border-gray-100">
              <span className="text-gray-900">Privacy Policy</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="w-full p-4 flex items-center justify-between border-b border-gray-100">
              <span className="text-gray-900">Terms of Service</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="w-full p-4 flex items-center justify-between">
              <span className="text-gray-900">Licenses</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
