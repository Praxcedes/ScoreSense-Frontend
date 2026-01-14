import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserPlus, User, Mail, Lock, Eye, EyeOff, Trophy } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const parseFieldErrors = (message) => {
    if (!message) return {}
    const nextErrors = {}
    if (message.startsWith('Missing required field:')) {
      const field = message.split(':')[1]?.trim()
      if (field) {
        nextErrors[field] = message
      }
    }
    if (message.toLowerCase().includes('username')) {
      nextErrors.username = message
    }
    if (message.toLowerCase().includes('email')) {
      nextErrors.email = message
    }
    if (message.toLowerCase().includes('password')) {
      nextErrors.password = message
    }
    return nextErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setFieldErrors({})

    if (formData.password !== formData.confirmPassword) {
      setFieldErrors({ confirmPassword: 'Passwords do not match' })
      return
    }

    if (formData.password.length < 8) {
      setFieldErrors({ password: 'Password must be at least 8 characters long' })
      return
    }

    setLoading(true)

    try {
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      })

      if (result.success) {
        navigate('/dashboard')
      } else {
        const message = result.error || 'Registration failed'
        const parsed = parseFieldErrors(message)
        if (Object.keys(parsed).length) {
          setFieldErrors(parsed)
        } else {
          setError(message)
        }
      }
    } catch (err) {
      const message = err?.response?.data?.error || err.message || 'An unexpected error occurred'
      const parsed = parseFieldErrors(message)
      if (Object.keys(parsed).length) {
        setFieldErrors(parsed)
      } else {
        setError(message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-green-400 rounded-2xl mb-4">
            <Trophy className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
            Join ScoreSense Africa
          </h1>
          <p className="text-text-secondary mt-2">Start predicting and winning</p>
        </div>

        {/* Register Card */}
        <div className="card p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-text-secondary mt-2">Sign up to get started</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="input-field w-full pl-10"
                  placeholder="Choose a username"
                  required
                />
              </div>
              {fieldErrors.username && (
                <p className="text-xs text-red-400 mt-2">{fieldErrors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field w-full pl-10"
                  placeholder="you@example.com"
                  required
                />
              </div>
              {fieldErrors.email && (
                <p className="text-xs text-red-400 mt-2">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-field w-full pl-10 pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-text-secondary mt-2">Minimum 8 characters</p>
              {fieldErrors.password && (
                <p className="text-xs text-red-400 mt-2">{fieldErrors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="input-field w-full pl-10 pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="text-xs text-red-400 mt-2">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            <label className="flex items-start">
              <input type="checkbox" className="mt-1 rounded bg-card border-card text-primary focus:ring-primary" />
              <span className="ml-2 text-sm text-text-secondary">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:text-primary/80">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:text-primary/80">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
              <div className="text-primary text-sm">✓</div>
            </div>
            <span className="text-sm text-text-secondary">Live sports predictions</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
              <div className="text-primary text-sm">✓</div>
            </div>
            <span className="text-sm text-text-secondary">Real-time analytics</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
              <div className="text-primary text-sm">✓</div>
            </div>
            <span className="text-sm text-text-secondary">Community of predictors</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Register

