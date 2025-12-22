import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Search, Filter, Download, MoreVertical, ShieldCheck } from 'lucide-react';

const ManageUsers = () => {
  const users = [
    { id: '#USR-8921', name: 'Kevin Mwangi', email: 'kevin.m@example.com', points: '2,450', region: 'Nairobi', status: 'Active', color: 'text-green-400 bg-green-400/10 border-green-400/20' },
    { id: '#USR-8922', name: 'John Doe', email: 'johndoe88@gmail.com', points: '850', region: 'Mombasa', status: 'Pending', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
    { id: '#USR-8924', name: 'David Kamau', email: 'david.k99@yahoo.com', points: '0', region: 'Nakuru', status: 'Suspended', color: 'text-red-400 bg-red-400/10 border-red-400/20' },
  ];

return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-muted mt-1">Manage platform users and permissions.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline"><Download size={18} /> Logs</Button>
          <Button><ShieldCheck size={18} /> Create User</Button>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
          <input type="text" placeholder="Search users..." className="w-full bg-surface border border-border text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary placeholder-gray-600"/>
        </div>
        <Button variant="outline">Filter <Filter size={14}/></Button>
      </div>

      <div className="bg-surface rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-900/50 text-xs uppercase text-muted font-bold">
            <tr>
              <th className="p-5">User ID</th>
              <th className="p-5">User</th>
              <th className="p-5">Points</th>
              <th className="p-5">Region</th>
              <th className="p-5">Status</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
            </thead>
          <tbody className="divide-y divide-gray-800 text-sm">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-800/30 transition-colors text-white group">
                <td className="p-5 font-mono text-primary font-medium">{user.id}</td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-muted border border-gray-700">
                      {user.name.charAt(0)}
                      </div>
                    <div>
                      <p className="font-bold">{user.name}</p>
                      <p className="text-xs text-muted">{user.email}</p>
                    </div>
                  </div>
                  