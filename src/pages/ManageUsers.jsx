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
      