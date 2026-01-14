import React, { useState } from 'react'
import { adminService } from '../../services/admin.service'
import { toast } from 'react-hot-toast'

const Maintenance = () => {
  const [cleanupResult, setCleanupResult] = useState(null)
  const [backupResult, setBackupResult] = useState(null)

  const runCleanup = async () => {
    try {
      const response = await adminService.runCleanup()
      setCleanupResult(response)
      toast.success(response.message || 'Cleanup completed')
    } catch (error) {
      toast.error(error?.error || 'Cleanup failed')
    }
  }

  const createBackup = async () => {
    try {
      const response = await adminService.createBackup()
      setBackupResult(response)
      toast.success(response.message || 'Backup created')
    } catch (error) {
      toast.error(error?.error || 'Backup failed')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Maintenance</h2>
        <p className="text-text-secondary">System cleanup and backups.</p>
      </div>
      <div className="card p-6 space-y-4">
        <button onClick={runCleanup} className="btn-secondary w-full">
          Run Cleanup
        </button>
        {cleanupResult && (
          <div className="text-sm text-text-secondary">
            Cleaned: {JSON.stringify(cleanupResult.cleaned_items)}
          </div>
        )}
        <button onClick={createBackup} className="btn-primary w-full">
          Create Backup
        </button>
        {backupResult && (
          <div className="text-sm text-text-secondary">
            Backup ID: {backupResult.backup_id} • {backupResult.backup_size}
          </div>
        )}
      </div>
    </div>
  )
}

export default Maintenance
