import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Trophy, Swords, BarChart3, Users, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: Trophy, label: 'Predict', path: '/predict' },
    { icon: Swords, label: 'Clash', path: '/tournaments' },
    { icon: BarChart3, label: 'Rank', path: '/leaderboard' },
    { icon: Users, label: 'Admin', path: '/admin' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-border flex flex-col hidden md:flex z-50">
      {/* Logo */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-green-500/20">
          <BarChart3 className="text-black w-5 h-5" />
        </div>
        <span className="font-bold text-xl text-white tracking-tight">ScoreSense</span>
      </div>

    {/* Nav Links */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-primary text-black font-bold shadow-lg shadow-primary/20' 
                  : 'text-muted hover:bg-gray-800/50 hover:text-white'
              }`
            }
            >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      