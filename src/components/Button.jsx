import React from 'react';

const Button = ({ children , variant = 'primary', className = "", ...props }) => {
  const baseStyle = "px-4 py-2 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-primary text-black hover:bg-green-400 shadow-lg shadow-green-900/20",
    outline: "bg-transparent border border-gray-700 text-white hover:bg-gray-800",
    ghost: "text-muted hover:text-white"
  }
}