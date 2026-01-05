import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Award,
  Trophy,
  TrendingUp,
  Edit,
  Camera,
  Shield,
  Bell,
  Globe
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { usePoints } from '../../hooks/usePoints'
import Avatar from '../../components/common/Avatar'
import ProgressChart from '../../components/charts/ProgressChart'

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const { points } = usePoints()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    favoriteTeam: user?.favoriteTeam || ''
  })

  const stats = [
    { label: 'Total Points', value: points.toLocaleString(), icon: <Trophy />, color: 'yellow' },
    { label: 'Win Rate', value: '68.4%', icon: <TrendingUp />, color: 'green' },
    { label: 'Rank', value: '#42', icon: <Award />, color: 'purple' },
    { label: 'Member Since', value: '2023', icon: <Calendar />, color: 'blue' }
  ]

  const achievements = [
    { id: 1, name: 'Perfect Week', description: '7 consecutive winning days', unlocked: true },
    { id: 2, name: 'Risk Taker', description: '10 high-stakes predictions', unlocked: true },
    { id: 3, name: 'Analyst Pro', description: '50 detailed analyses posted', unlocked: false },
    { id: 4, name: 'Community Leader', description: '100 helpful comments', unlocked: true }
  ]

  const handleSave = async () => {
    await updateProfile(formData)
    setIsEditing(false)
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
              <Avatar size="xlarge" />
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
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
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Favorite Team
                    </label>
                    <input
                      type="text"
                      value={formData.favoriteTeam}
                      onChange={(e) => setFormData({ ...formData, favoriteTeam: e.target.value })}
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
                <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Achievements & Settings */}
        <div className="space-y-6">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <h2 className="text-xl font-bold mb-6">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-xl border ${
                    achievement.unlocked
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-card border-card'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{achievement.name}</p>
                      <p className="text-sm text-text-secondary">{achievement.description}</p>
                    </div>
                    {achievement.unlocked ? (
                      <Award className="text-yellow-400" size={20} />
                    ) : (
                      <div className="w-5 h-5 border-2 border-text-secondary rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h2 className="text-xl font-bold mb-6">Quick Settings</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 hover:bg-hover rounded-xl transition-colors">
                <div className="flex items-center space-x-3">
                  <Bell className="text-text-secondary" size={20} />
                  <span>Notifications</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 hover:bg-hover rounded-xl transition-colors">
                <div className="flex items-center space-x-3">
                  <Shield className="text-text-secondary" size={20} />
                  <span>Privacy</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 hover:bg-hover rounded-xl transition-colors">
                <div className="flex items-center space-x-3">
                  <Globe className="text-text-secondary" size={20} />
                  <span>Language</span>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h3 className="font-bold mb-4">Level Progress</h3>
            <ProgressChart progress={65} />
            <div className="flex items-center justify-between mt-4 text-sm text-text-secondary">
              <span>Level 7</span>
              <span>65% to next level</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Profile