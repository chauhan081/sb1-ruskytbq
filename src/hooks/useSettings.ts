import { useState, useEffect } from 'react';

interface Settings {
  darkMode: boolean;
  notifications: boolean;
  privacy: 'private' | 'public';
}

const defaultSettings: Settings = {
  darkMode: false,
  notifications: true,
  privacy: 'private',
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem('userSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    // Apply dark mode to the document
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return {
    settings,
    updateSettings,
  };
}