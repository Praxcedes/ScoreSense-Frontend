import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, MapPin, Trophy, TrendingUp, Edit, Camera } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { usePoints } from '../../hooks/usePoints'
import Avatar from '../../components/common/Avatar'
import ProgressChart from '../../components/charts/ProgressChart'

const Profile = () => {
  const { user, updateProfile, uploadAvatar } = useAuth()
  const { points } = usePoints()
  const fileInputRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || user?.avatar || '')
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || ''
  })

  useEffect(() => {
    setAvatarPreview(user?.avatarUrl || user?.avatar || '')
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      bio: user?.bio || '',
      location: user?.location || ''
    })
  }, [user])

  const winRateValue = user?.winRate ?? user?.stats?.winRate
  const rankValue = user?.rank ?? user?.stats?.rank
  const memberSinceValue = user?.memberSince || (user?.created_at ? new Date(user.created_at).getFullYear() : null)
  const levelProgress = Number.isFinite(user?.levelProgress) ? user.levelProgress : 0
  const levelLabel = user?.level ? `Level ${user.level}` : 'Level —'
  const achievements = Array.isArray(user?.achievements) ? user.achievements : []

  const stats = [
    { label: 'Total Points', value: points.toLocaleString(), icon: <Trophy />, color: 'yellow' },
    { label: 'Win Rate', value: winRateValue ? `${winRateValue}%` : '—', icon: <TrendingUp />, color: 'green' },
    { label: 'Rank', value: rankValue ? `#${rankValue}` : '—', icon: <User />, color: 'purple' },
    { label: 'Member Since', value: memberSinceValue || '—', icon: <Calendar />, color: 'blue' }
  ]

  const handleSave = async () => {
    const normalize = (value) => {
      const trimmed = value?.trim()
      return trimmed ? trimmed : null
    }

    const nextPayload = {}
    const nextUsername = normalize(formData.username)
    const nextBio = normalize(formData.bio)
    const nextLocation = normalize(formData.location)

    if (nextUsername && nextUsername !== user?.username) {
      nextPayload.username = nextUsername
    }
    if (nextBio !== (user?.bio ?? null)) {
      nextPayload.bio = nextBio
    }
    if (nextLocation !== (user?.location ?? null)) {
      nextPayload.location = nextLocation
    }

    if (Object.keys(nextPayload).length === 0) {
      setIsEditing(false)
      return
    }

    const result = await updateProfile(nextPayload)
    if (result?.success) {
      setIsEditing(false)
    }
  }

  const handleAvatarSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return

    const result = await uploadAvatar(file)
    if (result?.success && result.avatarUrl) {
      setAvatarPreview(result.avatarUrl)
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/20"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar size="xlarge" alt={user?.username} src={avatarPreview} />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <button
                type="button"
                onClick={handleAvatarSelect}
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <Camera size={20} />
              </button>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{user?.username}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-text-secondary" />
                  <span className="text-text-secondary">{user?.email}</span>
                </div>
                {user?.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-text-secondary" />
                    <span className="text-text-secondary">{user.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-primary mt-4 md:mt-0"
          >
            <Edit size={18} className="mr-2" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            {isEditing ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-6">Edit Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="input-field w-full h-32"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="input-field w-full"
                    />
                  </div>
                </div>
                <div className="flex space-x-4 pt-4">
                  <button onClick={handleSave} className="btn-primary">
                    Save Changes
                  </button>
                  <button onClick={() => setIsEditing(false)} className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="text-text-secondary" size={20} />
                    <div>
                      <p className="text-sm text-text-secondary">Username</p>
                      <p className="font-medium">{user?.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="text-text-secondary" size={20} />
                    <div>
                      <p className="text-sm text-text-secondary">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                  </div>
                  {user?.bio && (
                    <div className="flex items-start space-x-3">
                      <User className="text-text-secondary mt-1" size={20} />
                      <div>
                        <p className="text-sm text-text-secondary">Bio</p>
                        <p className="font-medium">{user.bio}</p>
                      </div>
                    </div>
                  )}
                  {user?.location && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="text-text-secondary" size={20} />
                      <div>
                        <p className="text-sm text-text-secondary">Location</p>
                        <p className="font-medium">{user.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-4 text-center"
              >
                <div className={`w-12 h-12 ${stat.color === 'yellow' ? 'bg-yellow-500/20' :
                                           stat.color === 'green' ? 'bg-green-500/20' :
                                           stat.color === 'purple' ? 'bg-purple-500/20' :
                                           'bg-blue-500/20'} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <h3 className="font-bold mb-4">Level Progress</h3>
            <ProgressChart progress={levelProgress} />
            <div className="flex items-center justify-between mt-4 text-sm text-text-secondary">
              <span>{levelLabel}</span>
              <span>{levelProgress}% to next level</span>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h3 className="font-bold mb-4">Recent Achievements</h3>
            {achievements.length === 0 ? (
              <div className="text-sm text-text-secondary">No achievements yet.</div>
            ) : (
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`p-3 rounded-xl border ${
                    achievement.unlocked
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-card border-card'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{achievement.name}</p>
                        <p className="text-sm text-text-secondary">{achievement.description}</p>
                      </div>
                      {achievement.unlocked ? (
                        <Trophy className="text-yellow-400" size={20} />
                      ) : (
                        <div className="w-5 h-5 border-2 border-text-secondary rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Profile
