
import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import { useAuth } from '../hooks/useAuth'

const AdminLayout = () => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-background text-white flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 border-b border-card bg-surface">
          <div>
            <h1 className="text-xl font-bold">Admin Console</h1>
            <p className="text-sm text-text-secondary">System management & oversight</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-text-secondary">
              {user?.email || 'Admin'}
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-card border border-card rounded-lg hover:bg-hover transition"
            >
              Log out
            </button>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}


