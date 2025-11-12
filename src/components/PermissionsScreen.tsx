import { ArrowLeft, Shield, Mic, Layers, Bell, Home, AppWindow, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { Screen } from '../App';

interface PermissionsScreenProps {
  onNavigate: (screen: Screen) => void;
}

const permissions = [
  {
    id: 'accessibility',
    icon: Shield,
    name: 'Accessibility Service',
    granted: true,
    description: 'Lake needs accessibility permission to control your device, read screen content, and automate tasks on your behalf.',
    why: [
      'Control and interact with apps on your device',
      'Read screen content to understand context',
      'Perform automated actions like opening apps and clicking buttons',
      'Execute complex multi-step tasks'
    ],
    privacy: 'Lake only accesses screen content when you give a command. No data is collected or stored without your knowledge.'
  },
  {
    id: 'microphone',
    icon: Mic,
    name: 'Microphone',
    granted: true,
    description: 'Required for voice commands, wake word detection, and speech recognition.',
    why: [
      'Listen to your voice commands',
      'Detect the "Hey Lake" wake word',
      'Convert speech to text for processing',
      'Enable hands-free operation'
    ],
    privacy: 'Audio is only recorded when you activate Lake. Voice data is processed securely and not stored permanently.'
  },
  {
    id: 'overlay',
    icon: Layers,
    name: 'Display Overlay',
    granted: false,
    description: 'Allows Lake to show floating buttons and visual feedback over other apps.',
    why: [
      'Display the floating assistant button',
      'Show voice interaction interface',
      'Provide visual feedback during task execution',
      'Enable quick access from any screen'
    ],
    privacy: 'Overlay permissions are only used to display Lake\'s UI elements. No screen content is captured.'
  },
  {
    id: 'notifications',
    icon: Bell,
    name: 'Notifications',
    granted: true,
    description: 'Enables Lake to send you alerts about task completion, trigger execution, and important updates.',
    why: [
      'Notify you when tasks are completed',
      'Alert you about trigger execution',
      'Provide status updates',
      'Send important app notifications'
    ],
    privacy: 'Notifications contain only information about Lake\'s activities. You can customize notification settings.'
  },
  {
    id: 'assistant',
    icon: Home,
    name: 'Default Assistant',
    granted: false,
    description: 'Allows Lake to respond when you press and hold the home button or say "OK Google".',
    why: [
      'Quick activation via home button',
      'Replace default assistant',
      'Faster access to Lake features',
      'System-level voice commands'
    ],
    privacy: 'Setting Lake as default assistant doesn\'t change how your data is handled.'
  },
  {
    id: 'apps',
    icon: AppWindow,
    name: 'App Management',
    granted: true,
    description: 'Enables Lake to open apps, view installed apps, and manage app-related tasks.',
    why: [
      'Open and switch between apps',
      'View list of installed applications',
      'Execute app-specific commands',
      'Faster app control and automation'
    ],
    privacy: 'Lake only accesses app information when needed for your requests. No app data is collected.'
  }
];

export function PermissionsScreen({ onNavigate }: PermissionsScreenProps) {
  return (
    <div className="fixed inset-0 flex flex-col bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 safe-top pb-4 px-6">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('settings')}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <span className="text-gray-900 text-xl">Permissions Explained</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        <div className="space-y-6">
          {permissions.map((permission) => {
            const Icon = permission.icon;
            
            return (
              <Card key={permission.id} className="p-6 bg-white rounded-3xl shadow-sm border-0">
                {/* Icon & Title */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E88E5] to-[#0D47A1] flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 text-lg">{permission.name}</h3>
                      {permission.granted ? (
                        <Badge className="mt-1 bg-green-100 text-green-700">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Granted
                        </Badge>
                      ) : (
                        <Badge className="mt-1 bg-gray-100 text-gray-700">
                          Not Granted
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4">
                  {permission.description}
                </p>

                {/* Why Lake needs this */}
                <div className="mb-4">
                  <h4 className="text-gray-900 mb-3">Why Lake needs this:</h4>
                  <ul className="space-y-2">
                    {permission.why.map((reason, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Privacy Note */}
                <div className="bg-blue-50 p-4 rounded-2xl mb-4">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-blue-900 text-sm mb-1">Privacy & Security</h5>
                      <p className="text-blue-700 text-sm">{permission.privacy}</p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                {!permission.granted && (
                  <Button className="w-full h-12 bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] hover:opacity-90 text-white rounded-3xl">
                    Grant Permission
                  </Button>
                )}

                {permission.granted && permission.id === 'accessibility' && (
                  <div className="bg-green-50 p-3 rounded-2xl text-center">
                    <p className="text-green-700 text-sm">
                      ✓ This permission is active and working
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Footer Note */}
        <Card className="p-4 bg-gray-50 rounded-2xl border-0 mt-6 mb-6">
          <p className="text-gray-600 text-sm text-center mb-2">
            All permissions are optional but recommended for the best experience
          </p>
          <p className="text-gray-500 text-sm text-center">
            You can revoke permissions anytime in Settings
          </p>
        </Card>
      </div>
    </div>
  );
}
