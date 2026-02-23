import React, { useEffect, useState } from 'react'
import adminService from '../../services/admin.service'
import { toast } from 'react-hot-toast'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await adminService.listTransactions({ page: 1, perPage: 20 })
        setTransactions(response.transactions || [])
      } catch (error) {
        toast.error(error?.error || 'Failed to load transactions')
      }
    }
    fetchTransactions()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Transactions</h2>
        <p className="text-text-secondary">Audit points economy activity.</p>
      </div>
      <div className="card p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-text-secondary">
            <tr>
              <th className="text-left py-2">User</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Type</th>
              <th className="text-left py-2">Description</th>
              <th className="text-left py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t border-card">
                <td className="py-3">{tx.username}</td>
                <td className="py-3">{tx.amount}</td>
                <td className="py-3">{tx.type}</td>
                <td className="py-3">{tx.description}</td>
                <td className="py-3">
                  {tx.created_at ? new Date(tx.created_at).toLocaleString() : '—'}
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-text-secondary">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transactions
