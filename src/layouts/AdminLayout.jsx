import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'

const AdminLayout = () => {
  const handleAdminLogout = () => {
    console.log('[ADMIN LOGOUT] clearing tokens and redirecting')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('token')
    sessionStorage.removeItem('accessToken')
    window.location.href = '/admin/login'
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 p-6">
        <div className="flex items-center justify-end mb-4">
          <button
            type="button"
            onClick={handleAdminLogout}
            className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
