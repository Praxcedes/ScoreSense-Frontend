import React, { useEffect, useState } from 'react'
import adminService from '../../services/admin.service'
import { toast } from 'react-hot-toast'

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([])

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await adminService.listTournaments({ page: 1, perPage: 20 })
        setTournaments(response.tournaments || [])
      } catch (error) {
        toast.error(error?.error || 'Failed to load tournaments')
      }
    }
    fetchTournaments()
  }, [])

  const cancelTournament = async (id) => {
    try {
      const response = await adminService.cancelTournament(id)
      if (response.success) {
        setTournaments((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'cancelled' } : t)))
        toast.success('Tournament cancelled')
      } else {
        toast.error(response.error || 'Failed to cancel tournament')
      }
    } catch (error) {
      toast.error(error?.error || 'Failed to cancel tournament')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Tournaments</h2>
        <p className="text-text-secondary">Manage active and completed tournaments.</p>
      </div>
      <div className="card p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-text-secondary">
            <tr>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Entry</th>
              <th className="text-left py-2">Prize</th>
              <th className="text-left py-2">Players</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map((tournament) => (
              <tr key={tournament.id} className="border-t border-card">
                <td className="py-3">{tournament.name}</td>
                <td className="py-3 capitalize">{tournament.status}</td>
                <td className="py-3">{tournament.entry_fee}</td>
                <td className="py-3">{tournament.prize_pool}</td>
                <td className="py-3">{tournament.player_count}</td>
                <td className="py-3">
                  <button
                    onClick={() => cancelTournament(tournament.id)}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
            {tournaments.length === 0 && (
              <tr>
                <td colSpan="6" className="py-6 text-center text-text-secondary">
                  No tournaments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Tournaments
