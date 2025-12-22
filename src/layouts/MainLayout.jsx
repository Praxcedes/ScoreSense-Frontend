import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';

const MainLayout = () => {
  return (
    <div className="flex bg-background min-h-screen text-white font-sans">
      <Sidebar />
      