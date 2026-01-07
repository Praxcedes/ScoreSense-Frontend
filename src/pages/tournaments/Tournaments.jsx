import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Trophy,
  Users,
  Calendar,
  Award,
  Target,
  DollarSign,
  Clock,
  ChevronRight,
  Crown,
  Star,
  TrendingUp,
  Zap,
  Shield,
  Gift,
  BarChart3,
  Filter,
  Search
} from 'lucide-react'
import TournamentCard from '../../components/tournaments/TournamentCard'
import LeaderboardTable from '../../components/tournaments/LeaderboardTable'

const Tournaments = () => {
  const [activeTab, setActiveTab] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'featured', name: 'Featured' },
    { id: 'ongoing', name: 'Ongoing' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'completed', name: 'Completed' },
    { id: 'my', name: 'My Tournaments' }
  ]

  const tournaments = {
    featured: [
      {
        id: 1,
        name: 'Premier League Predictor',
        sport: 'Football',
        participants: 1250,
        prizePool: 25000,
        entryFee: 100,
        startDate: 'Today',
        endDate: '30 days',
        status: 'ongoing',
        featured: true,
        difficulty: 'Medium',
        icon: '🏆',
        color: 'yellow'
      },
      {
        id: 2,
        name: 'UFC Championship',
        sport: 'MMA',
        participants: 842,
        prizePool: 15000,
        entryFee: 50,
        startDate: 'Tomorrow',
        endDate: '14 days',
        status: 'upcoming',
        featured: true,
        difficulty: 'Hard',
        icon: '🥊',
        color: 'red'
      }
    ],
    ongoing: [
      {
        id: 3,
        name: 'Weekly Football Challenge',
        sport: 'Football',
        participants: 543,
        prizePool: 5000,
        entryFee: 25,
        startDate: '2 days ago',
        endDate: '5 days',
        status: 'ongoing',
        featured: false,
        difficulty: 'Easy',
        icon: '⚽',
        color: 'green'
      },
      {
        id: 4,
        name: 'Basketball Shootout',
        sport: 'Basketball',
        participants: 321,
        prizePool: 3000,
        entryFee: 20,
        startDate: '1 week ago',
        endDate: '3 days',
        status: 'ongoing',
        featured: false,
        difficulty: 'Medium',
        icon: '🏀',
        color: 'orange'
      }
    ]
  }

  const stats = [
    {
      title: 'Active Tournaments',
      value: '8',
      change: '+2',
      icon: <Trophy className="text-yellow-400" />,
      color: 'yellow'
    },
    {
      title: 'Total Participants',
      value: '3.2K',
      change: '+12%',
      icon: <Users className="text-green-400" />,
      color: 'green'
    },
    {
      title: 'Prize Pool',
      value: '45K PTS',
      change: '+8%',
      icon: <DollarSign className="text-purple-400" />,
      color: 'purple'
    },
    {
      title: 'My Wins',
      value: '2,450',
      change: '+15%',
      icon: <Award className="text-blue-400" />,
      color: 'blue'
    }
  ]

  const leaderboard = [
    { rank: 1, name: 'PredictorPro', points: 12450, wins: 42, accuracy: 89, change: '+2' },
    { rank: 2, name: 'JumaAnalytics', points: 11200, wins: 38, accuracy: 87, change: '+1' },
    { rank: 3, name: 'SportsWizard', points: 9850, wins: 35, accuracy: 84, change: '+3' },
    { rank: 4, name: 'BetMaster', points: 8760, wins: 32, accuracy: 82, change: '-1' },
    { rank: 5, name: 'ProPredictor', points: 7650, wins: 29, accuracy: 80, change: '+2' },
    { rank: 6, name: 'You', points: 2450, wins: 12, accuracy: 68, change: '+5' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Tournaments</h1>
          <p className="text-text-secondary mt-2">
            Compete with predictors worldwide and win big prizes
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-primary flex items-center space-x-2">
            <Zap size={18} />
            <span>Create Tournament</span>
          </button>
          <button className="btn-secondary">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-dashboard">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.color === 'yellow' ? 'bg-yellow-500/20' :
                                      stat.color === 'green' ? 'bg-green-500/20' :
                                      stat.color === 'purple' ? 'bg-purple-500/20' :
                                      'bg-blue-500/20'} rounded-xl`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-medium ${
                stat.change?.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
            <p className="text-text-secondary text-sm mt-1">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Search and Tabs */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
              <input
                type="text"
                placeholder="Search tournaments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1 bg-card p-1 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center space-x-2">
              <Trophy size={20} className="text-yellow-400" />
              <span>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Tournaments</span>
            </h3>

            {(tournaments[activeTab] || tournaments.featured).map((tournament, index) => (
              <TournamentCard key={tournament.id} tournament={tournament} index={index} />
            ))}
          </div>

          {/* Create Tournament Card */}
          <div className="card p-8 text-center mt-8">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Create Your Tournament</h3>
            <p className="text-text-secondary mb-6">
              Start a private tournament and compete with friends
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="btn-secondary">Quick Start</button>
              <button className="btn-secondary">Custom Rules</button>
              <button className="btn-primary">Premium Tournament</button>
            </div>
          </div>
        </div>

        {/* Right Column - Leaderboard & Info */}
        <div className="space-y-6">
          {/* Global Leaderboard */}
          <div className="card p-6">
            <h3 className="font-bold mb-4 flex items-center space-x-2">
              <Crown size={20} className="text-yellow-400" />
              <span>Global Leaderboard</span>
            </h3>
            <LeaderboardTable leaderboard={leaderboard} />
            <button className="w-full mt-4 py-2 text-primary hover:text-primary/80 text-sm font-medium">
              View Full Leaderboard →
            </button>
          </div>

          {/* Tournament Rules */}
          <div className="card p-6">
            <h3 className="font-bold mb-4 flex items-center space-x-2">
              <Shield size={20} />
              <span>Tournament Rules</span>
            </h3>
            <div className="space-y-3">
              {[
                'Minimum 10 participants required',
                'Entry fee returned if tournament cancelled',
                'Prizes distributed within 24 hours',
                'Fair play enforced - no cheating',
                'Decisions by tournament admin are final'
              ].map((rule, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span className="text-sm">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card p-6">
            <h3 className="font-bold mb-4">Tournament Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Avg. Participants</span>
                <span className="font-bold">342</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Avg. Prize Pool</span>
                <span className="font-bold">8,240 PTS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Success Rate</span>
                <span className="font-bold text-green-400">89%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">My ROI</span>
                <span className="font-bold text-primary">+245%</span>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="card p-6">
            <h3 className="font-bold mb-4 flex items-center space-x-2">
              <Calendar size={20} />
              <span>Upcoming Events</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Champions League Final', date: 'Tomorrow', icon: '🏆' },
                { name: 'NBA Playoffs', date: '2 days', icon: '🏀' },
                { name: 'Grand Slam Tennis', date: '3 days', icon: '🎾' }
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-card rounded-xl">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{event.icon}</span>
                    <div>
                      <p className="font-medium">{event.name}</p>
                      <p className="text-sm text-text-secondary">{event.date}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-text-secondary" size={16} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tournament Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="card p-6">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
            <Star className="text-yellow-400" size={24} />
          </div>
          <h4 className="font-bold mb-2">Strategy Tips</h4>
          <p className="text-text-secondary text-sm">
            Focus on tournaments matching your expertise. Higher entry fees often mean tougher competition.
          </p>
        </div>
        <div className="card p-6">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="text-green-400" size={24} />
          </div>
          <h4 className="font-bold mb-2">Growth Path</h4>
          <p className="text-text-secondary text-sm">
            Start with smaller tournaments to build confidence before entering high-stakes competitions.
          </p>
        </div>
        <div className="card p-6">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
            <Gift className="text-purple-400" size={24} />
          </div>
          <h4 className="font-bold mb-2">Bonus Rewards</h4>
          <p className="text-text-secondary text-sm">
            Top performers receive exclusive rewards, premium features, and special recognition.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Tournaments