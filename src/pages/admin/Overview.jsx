import React, { useEffect, useState } from 'react'
import { Trophy, Users, BarChart3, Shield } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import adminService from '../../services/admin.service'
import { toast } from 'react-hot-toast'

const Overview = () => {
  const [overview, setOverview] = useState(null)

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await adminService.getOverview()
        setOverview(response.overview)
      } catch (error) {
        toast.error(error?.error || 'Failed to load overview')
      }
    }

    fetchOverview()
  }, [])

  const stats = overview
    ? [
        {
          title: 'Total Users',
          value: overview.users.total.toLocaleString(),
          change: `${overview.users.active} active`,
          icon: <Users className="text-blue-400" size={24} />,
          color: 'blue'
        },
        {
          title: 'Tournaments',
          value: overview.tournaments.total.toLocaleString(),
          change: `${overview.tournaments.active} active`,
          icon: <Trophy className="text-yellow-400" size={24} />,
          color: 'yellow'
        },
        {
          title: 'Predictions',
          value: overview.predictions.total.toLocaleString(),
          change: `${overview.predictions.pending} pending`,
          icon: <BarChart3 className="text-green-400" size={24} />,
          color: 'green'
        },
        {
          title: 'Points In System',
          value: overview.points.total_in_system.toLocaleString(),
          change: overview.system_status,
          icon: <Shield className="text-purple-400" size={24} />,
          color: 'purple'
        }
      ]
    : []

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">System Overview</h2>
        <p className="text-text-secondary">Latest system health and activity.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  )
}

export default Overview
