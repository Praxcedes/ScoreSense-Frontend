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

  