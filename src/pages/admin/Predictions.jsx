import React, { useEffect, useState } from 'react'
import adminService from '../../services/admin.service'
import { toast } from 'react-hot-toast'

const Predictions = () => {
  const [predictions, setPredictions] = useState([])

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await adminService.listPredictions({ page: 1, perPage: 20 })
        setPredictions(response.predictions || [])
      } catch (error) {
        toast.error(error?.error || 'Failed to load predictions')
      }
    }
    fetchPredictions()
  }, [])

  const resolvePrediction = async (id, outcome) => {
    try {
      const response = await adminService.resolvePrediction(id, outcome)
      if (response.success) {
        setPredictions((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: outcome } : p))
        )
        toast.success(`Prediction marked ${outcome}`)
      } else {
        toast.error(response.error || 'Failed to resolve prediction')
      }
    } catch (error) {
      toast.error(error?.error || 'Failed to resolve prediction')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Predictions</h2>
        <p className="text-text-secondary">Resolve pending predictions and review outcomes.</p>
      </div>
      <div className="card p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-text-secondary">
            <tr>
              <th className="text-left py-2">Match</th>
              <th className="text-left py-2">User</th>
              <th className="text-left py-2">Stake</th>
              <th className="text-left py-2">Winnings</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((prediction) => (
              <tr key={prediction.id} className="border-t border-card">
                <td className="py-3">{prediction.match_name || prediction.match_id}</td>
                <td className="py-3">{prediction.username}</td>
                <td className="py-3">{prediction.stake_amount}</td>
                <td className="py-3">{prediction.potential_winnings}</td>
                <td className="py-3 capitalize">{prediction.status}</td>
                <td className="py-3 flex gap-2">
                  <button
                    onClick={() => resolvePrediction(prediction.id, 'won')}
                    className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg"
                  >
                    Mark Won
                  </button>
                  <button
                    onClick={() => resolvePrediction(prediction.id, 'lost')}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg"
                  >
                    Mark Lost
                  </button>
                </td>
              </tr>
            ))}
            {predictions.length === 0 && (
              <tr>
                <td colSpan="6" className="py-6 text-center text-text-secondary">
                  No predictions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Predictions
