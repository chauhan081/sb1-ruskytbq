import React, { useState } from 'react';
import { Send, History, User, Settings, Download, Moon, Sun, Bell, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useSettings } from '@/hooks/useSettings';
import { useSupabase } from '@/hooks/useSupabase';
import { api } from '@/services/api';
import { ModelViewer } from '@/components/visualization/model-viewer';

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { settings, updateSettings } = useSettings();
  const { createVisualization, getVisualizations } = useSupabase();
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [visualizationData, setVisualizationData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'ask' | 'history' | 'settings'>('ask');
  const [visualizationHistory, setVisualizationHistory] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !user) return;

    setLoading(true);
    try {
      // Generate visualization using AI
      const response = await api.generateVisualization(question);
      
      // Save to database
      await createVisualization(
        user.id,
        question,
        response.answer,
        response.visualizationData
      );

      setAnswer(response.answer);
      setVisualizationData(response.visualizationData);

      // Refresh history
      const history = await getVisualizations(user.id);
      setVisualizationHistory(history);
    } catch (error) {
      console.error('Error generating visualization:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${settings.darkMode ? 'dark' : ''}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <div className={`${settings.darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl shadow-sm p-6 space-y-6`}>
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${settings.darkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-full flex items-center justify-center`}>
                <User className={`w-6 h-6 ${settings.darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h3 className="font-semibold">{user?.email}</h3>
                <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pro Member</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('ask')}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'ask' 
                      ? settings.darkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-50 text-blue-600'
                      : settings.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Ask Question</span>
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'history'
                      ? settings.darkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-50 text-blue-600'
                      : settings.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <History className="w-4 h-4" />
                  <span>History</span>
                </button>
              </nav>
            </div>

            <div className="border-t pt-4">
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'settings'
                    ? settings.darkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-50 text-blue-600'
                    : settings.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-6">
          {activeTab === 'ask' ? (
            <>
              <div className={`${settings.darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-xl shadow-sm`}>
                <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Type your question here... (e.g., 'How does a quantum computer work?')"
                      className={`w-full h-32 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                        settings.darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      'Processing...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Question
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {answer && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className={`${settings.darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-xl shadow-sm`}>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-semibold">Answer</h3>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                    <p className={settings.darkMode ? 'text-gray-300' : 'text-gray-700'}>{answer}</p>
                  </div>

                  <div className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-sm`}>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-semibold">3D Visualization</h3>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Reset View</Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {visualizationData && <ModelViewer data={visualizationData} />}
                  </div>
                </div>
              )}
            </>
          ) : activeTab === 'history' ? (
            <div className={`${settings.darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-xl shadow-sm`}>
              <h2 className="text-2xl font-bold mb-6">Visualization History</h2>
              <div className="space-y-4">
                {visualizationHistory.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      settings.darkMode 
                        ? 'border-gray-700 hover:bg-gray-700' 
                        : 'hover:bg-gray-50'
                    } transition-colors cursor-pointer`}
                  >
                    <div>
                      <h4 className="font-medium">{item.question}</h4>
                      <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.date}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={`${settings.darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-xl shadow-sm`}>
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              <div className="space-y-6">
                <div className={`flex items-center justify-between p-4 border rounded-lg ${
                  settings.darkMode ? 'border-gray-700' : ''
                }`}>
                  <div className="flex items-center space-x-3">
                    {settings.darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    <div>
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Toggle dark mode theme</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.darkMode}
                      onChange={() => updateSettings({ darkMode: !settings.darkMode })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className={`flex items-center justify-between p-4 border rounded-lg ${
                  settings.darkMode ? 'border-gray-700' : ''
                }`}>
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5" />
                    <div>
                      <h4 className="font-medium">Notifications</h4>
                      <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Enable email notifications</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={() => updateSettings({ notifications: !settings.notifications })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className={`p-4 border rounded-lg ${settings.darkMode ? 'border-gray-700' : ''}`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="w-5 h-5" />
                    <div>
                      <h4 className="font-medium">Privacy</h4>
                      <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Control your visualization privacy</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="privacy"
                        value="private"
                        checked={settings.privacy === 'private'}
                        onChange={(e) => updateSettings({ privacy: e.target.value as 'private' | 'public' })}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Private - Only you can see your visualizations</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="privacy"
                        value="public"
                        checked={settings.privacy === 'public'}
                        onChange={(e) => updateSettings({ privacy: e.target.value as 'private' | 'public' })}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Public - Anyone can see your visualizations</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};