import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Trophy,
  Zap,
  BarChart3,
  Users,
  Play,
  ArrowRight,
  Shield,
  Target,
  TrendingUp,
  Award
} from 'lucide-react'

const DemoWelcome = () => {
  const navigate = useNavigate()

  const features = [
    { icon: <Trophy />, title: 'Live Predictions', desc: 'Make predictions on live matches', color: 'primary' },
    { icon: <BarChart3 />, title: 'Advanced Analytics', desc: 'Deep insights and statistics', color: 'blue' },
    { icon: <Users />, title: 'Community', desc: 'Connect with fellow predictors', color: 'green' },
    { icon: <Zap />, title: 'Real-time', desc: 'Live scores and updates', color: 'yellow' },
    { icon: <Target />, title: 'Accuracy Tracking', desc: 'Monitor your prediction success', color: 'purple' },
    { icon: <Award />, title: 'Leaderboards', desc: 'Compete with top predictors', color: 'orange' }
  ]

  const stats = [
    { value: '1.2K', label: 'Active Users', color: 'text-primary' },
    { value: '89%', label: 'Accuracy Rate', color: 'text-green-400' },
    { value: '2450', label: 'Demo Points', color: 'text-yellow-400' },
    { value: '#42', label: 'Global Rank', color: 'text-purple-400' }
  ]

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-400 rounded-xl flex items-center justify-center">
                <Trophy className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                  ScoreSense Africa
                </h1>
                <p className="text-text-secondary text-sm">Demo Environment</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Shield className="text-green-400" size={20} />
              <span className="text-sm text-text-secondary">Safe Demo Environment</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Experience{' '}
              <span className="bg-gradient-to-r from-primary via-green-400 to-blue-400 bg-clip-text text-transparent">
                Sports Analytics
              </span>{' '}
              Reimagined
            </h1>
            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              Explore our premium sports prediction platform with complete mock data.
              No login required - just click and experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2 group"
              >
                <Play size={20} />
                <span>Launch Demo</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                View Features
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-text-secondary">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className={`w-12 h-12 bg-${feature.color}-500/20 rounded-xl flex items-center justify-center mb-4`}>
                  <div className={`text-${feature.color}-500`}>{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-text-secondary">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Demo Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto card p-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Play className="text-white" size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Fully Interactive Demo</h2>
              <p className="text-text-secondary mb-6">
                You're logged in as <span className="text-primary font-semibold">Juma_Predictor</span> with 2,450 points.
                All features are fully functional with mock data.
              </p>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Make predictions on live and upcoming matches</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Track performance with advanced analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Engage with the community forum</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>All data resets on page refresh (demo mode)</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/dashboard')}
                className="w-full btn-primary mt-8 py-4 text-lg"
              >
                Start Exploring the Demo
              </button>
            </div>
          </motion.div>

          {/* Footer Note */}
          <div className="text-center mt-12">
            <p className="text-text-secondary text-sm">
              This is a demonstration environment. All data is simulated and resets on refresh.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-text-secondary">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Mock Data Mode</span>
              <span>•</span>
              <span className="text-green-400">Ready to Explore</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoWelcome