<<<<<<< HEAD
export default function Config() {
  return (
    <div>
      <h1 className="text-xl font-bold text-green-400 mb-4">
        Platform Config
      </h1>

      <div className="bg-zinc-900 p-6 rounded-lg border border-green-500/20">
        <p className="text-gray-400">
          Global application settings.
        </p>
      </div>
    </div>
  );
}
=======
import React, { useEffect, useState } from 'react'
import adminService from '../../services/admin.service'
import { toast } from 'react-hot-toast'

const Config = () => {
  const [config, setConfig] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await adminService.getConfig()
        setConfig(response.config || {})
      } catch (error) {
        toast.error(error?.error || 'Failed to load config')
      }
    }
    fetchConfig()
  }, [])

  const handleChange = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const saveConfig = async () => {
    try {
      setSaving(true)
      const response = await adminService.updateConfig(config)
      if (response.success) {
        toast.success('Config updated')
      } else {
        toast.error(response.error || 'Failed to update config')
      }
    } catch (error) {
      toast.error(error?.error || 'Failed to update config')
    } finally {
      setSaving(false)
    }
  }

  if (!config) {
    return <div className="text-text-secondary">Loading config...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">System Config</h2>
        <p className="text-text-secondary">Update platform settings.</p>
      </div>
      <div className="card p-6 space-y-4">
        {Object.entries(config).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between border-b border-card pb-3">
            <span className="text-sm text-text-secondary">{key}</span>
            {typeof value === 'boolean' ? (
              <button
                onClick={() => handleChange(key, !value)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  value ? 'bg-primary text-black' : 'bg-card text-text-secondary'
                }`}
              >
                {value ? 'Enabled' : 'Disabled'}
              </button>
            ) : (
              <input
                type="text"
                value={value}
                onChange={(event) => handleChange(key, event.target.value)}
                className="input-field w-48 text-right"
              />
            )}
          </div>
        ))}
        <button
          onClick={saveConfig}
          disabled={saving}
          className="btn-primary w-full"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

export default Config
>>>>>>> origin/Giddy
