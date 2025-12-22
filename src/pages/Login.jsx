import React from 'react';
import Button from '../../components/common/Button';

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-surface border border-border p-8 rounded-3xl shadow-2xl shadow-green-900/10">
            <h1 className="text-3xl font-bold text-white text-center mb-2">Create Analyst Account</h1>
            <p className="text-muted text-center text-sm mb-8">Analyze matches. Earn virtual points. <span className="text-white font-bold">No real money involved.</span></p>
            <form className="space-y-4">
                <div>
                    <label className="text-xs font-bold uppercase text-muted mb-1 block">Username</label>
                    <input type="text" placeholder="Choose a username" className="w-full bg-background border border-border p-3 rounded-xl text-white focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                    <label className="text-xs font-bold uppercase text-muted mb-1 block">Email Address</label>
                    <input type="email" placeholder="analyst@example.com" className="w-full bg-background border border-border p-3 rounded-xl text-white focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div>
                    <label className="text-xs font-bold uppercase text-muted mb-1 block">Password</label>
                    <input type="password" placeholder="Create a strong password" className="w-full bg-background border border-border p-3 rounded-xl text-white focus:border-primary focus:outline-none transition-colors" />
                </div>
                <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded-md border border-gray-600 group-hover:border-primary flex items-center justify-center transition-colors"></div>
                        <span className="text-sm text-gray-400">I confirm I am <span className="text-white font-bold">over 18 years of age</span>.</span>
                    </label>
                </div>
                <Button className="w-full mt-6 py-4 text-base">Create Account →</Button>
            </form>
            <p className="text-center text-muted text-sm mt-6">
                Already have an analyst account? <a href="#" className="text-primary font-bold hover:underline">Log in</a>
            </p>
        </div>
    </div>
    );
};
export default Login;