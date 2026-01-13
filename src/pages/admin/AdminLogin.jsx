import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Mail, Lock, Key } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const AdminLogin = () => {
  const { loginAdmin } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    adminSecret: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    const result = await loginAdmin(formData.email, formData.password, formData.adminSecret)
    setLoading(false)

    if (result.success) {
      navigate('/admin')
    } else {
      setError(result.error || 'Admin login failed')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
            <Shield className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-text-secondary text-sm">Restricted access</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-2">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="email"
                className="input-field w-full pl-10"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="password"
                className="input-field w-full pl-10"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">Admin Secret</label>
            <div className="relative">
              <Key size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="password"
                className="input-field w-full pl-10"
                value={formData.adminSecret}
                onChange={(e) => setFormData({ ...formData, adminSecret: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
