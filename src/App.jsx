import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/dashboard/Home';
import Predict from './pages/dashboard/Predict';
import ManageUsers from './pages/admin/ManageUsers';
import Login from './pages/auth/Login';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Protected Routes */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/admin" element={<ManageUsers />} />
            