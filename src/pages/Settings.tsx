import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import { useAuth } from '../contexts/AuthContext'

interface UserSettings {
  notification_preferences: {
    email: boolean
    push: boolean
  }
  ui_preferences: {
    theme: 'light' | 'dark'
    language: string
  }
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    notification_preferences: { email: true, push: true },
    ui_preferences: { theme: 'light', language: 'en' }
  })
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchUserSettings()
    }
  }, [user])

  const fetchUserSettings = async () => {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', user?.id)
      .single()

    if (error) {
      console.error('Error fetching user settings:', error)
    } else if (data) {
      setSettings(data)
    }
  }

  const handleSettingsChange = (
    category: 'notification_preferences' | 'ui_preferences',
    key: string,
    value: any
  ) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [category]: {
        ...prevSettings[category],
        [key]: value
      }
    }))
  }

  const saveSettings = async () => {
    const { error } = await supabase
      .from('user_settings')
      .upsert({ user_id: user?.id, ...settings })

    if (error) {
      console.error('Error saving user settings:', error)
    } else {
      alert('Settings saved successfully!')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notification_preferences.email}
                onChange={(e) => handleSettingsChange('notification_preferences', 'email', e.target.checked)}
                className="mr-2"
              />
              Receive email notifications
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notification_preferences.push}
                onChange={(e) => handleSettingsChange('notification_preferences', 'push', e.target.checked)}
                className="mr-2"
              />
              Receive push notifications
            </label>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4">UI Preferences</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Theme</label>
            <select
              value={settings.ui_preferences.theme}
              onChange={(e) => handleSettingsChange('ui_preferences', 'theme', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Language</label>
            <select
              value={settings.ui_preferences.language}
              onChange={(e) => handleSettingsChange('ui_preferences', 'language', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        <button
          onClick={saveSettings}
          className="mt-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}

export default Settings