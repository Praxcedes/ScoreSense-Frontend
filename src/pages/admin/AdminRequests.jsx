import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, ShieldAlert } from 'lucide-react'
import adminService from '../../services/admin.service'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'

const AdminRequests = () => {
  const { user } = useAuth()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchRequests = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await adminService.getAdminRequests()
      setRequests(response.requests || [])
    } catch (err) {
      const message = err?.error || err?.message || 'Failed to load admin requests'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleApprove = async (userId) => {
    try {
      await adminService.approveAdminRequest(userId)
      toast.success('Admin request approved')
      fetchRequests()
    } catch (err) {
      toast.error(err?.error || err?.message || 'Failed to approve request')
    }
  }

  const handleDeny = async (userId) => {
    try {
      await adminService.denyAdminRequest(userId)
      toast.success('Admin request denied')
      fetchRequests()
    } catch (err) {
      toast.error(err?.error || err?.message || 'Failed to deny request')
    }
  }

  if (user?.role !== 'superadmin') {
    return (
      <div className="card p-6">
        <div className="flex items-center space-x-3 text-yellow-400">
          <ShieldAlert size={20} />
          <span>Only superadmins can review admin requests.</span>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="card p-6">
        <div className="h-6 bg-surface-soft rounded w-48 animate-pulse"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card p-6 text-red-400">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Requests</h1>
        <button onClick={fetchRequests} className="btn-secondary">
          Refresh
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="card p-8 text-center text-text-secondary">
          No pending admin requests.
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="font-semibold">{request.username}</div>
                <div className="text-sm text-text-secondary">{request.email}</div>
                <div className="text-xs text-text-secondary mt-1">
                  Requested: {request.admin_requested_at || '—'}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleApprove(request.id)}
                  className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition flex items-center space-x-2"
                >
                  <Check size={16} />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleDeny(request.id)}
                  className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition flex items-center space-x-2"
                >
                  <X size={16} />
                  <span>Deny</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminRequests
