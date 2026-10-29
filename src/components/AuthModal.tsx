import React, { useState } from 'react';
import { useCoupon } from '../context/CouponContext';
import { X, Lock, User as UserIcon, Mail, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, login, register, switchDemoUser } = useCoupon();
  const [isLoginTab, setIsLoginTab] = useState(true);
  
  // Sign in state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Register state
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [emailID, setEmailID] = useState('');
  const [campusLocation, setCampusLocation] = useState('Tower B, 3rd Floor');
  const [regPassword, setRegPassword] = useState('');

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
      setAuthModalOpen(false);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regUsername.trim()) {
      register({
        username: regUsername.trim(),
        firstname: firstname.trim() || 'New',
        lastname: lastname.trim() || 'Member',
        emailID: emailID.trim() || `${regUsername}@techcorp.internal`,
        campusLocation: campusLocation.trim() || 'Main Tower',
      });
      setAuthModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={() => setAuthModalOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#19222d] text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#febd69] text-[#19222d] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-white">Closed Community Access</h3>
              <p className="text-xs text-slate-400">CouponMaatran Peer Network</p>
            </div>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => setIsLoginTab(true)}
            className={`flex-1 py-3 text-xs font-bold transition-colors ${
              isLoginTab ? 'bg-white text-[#19222d] border-b-2 border-amber-500 font-black' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLoginTab(false)}
            className={`flex-1 py-3 text-xs font-bold transition-colors ${
              !isLoginTab ? 'bg-white text-[#19222d] border-b-2 border-amber-500 font-black' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Create Campus Account
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Quick Demo Switchers */}
          <div className="mb-5 bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5">
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1.5">
              ⚡ 1-Click Demo Profiles (For Testing):
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => { switchDemoUser('jaswanth_k'); setAuthModalOpen(false); }}
                className="px-2 py-1.5 bg-white border border-amber-300 rounded-lg text-[11px] font-semibold text-slate-800 hover:bg-amber-100/60 text-center transition-colors shadow-2xs"
              >
                Jaswanth (4.9⭐)
              </button>
              <button
                type="button"
                onClick={() => { switchDemoUser('priya_sharma'); setAuthModalOpen(false); }}
                className="px-2 py-1.5 bg-white border border-amber-300 rounded-lg text-[11px] font-semibold text-slate-800 hover:bg-amber-100/60 text-center transition-colors shadow-2xs"
              >
                Priya (4.8⭐)
              </button>
              <button
                type="button"
                onClick={() => { switchDemoUser('arun_v'); setAuthModalOpen(false); }}
                className="px-2 py-1.5 bg-white border border-amber-300 rounded-lg text-[11px] font-semibold text-slate-800 hover:bg-amber-100/60 text-center transition-colors shadow-2xs"
              >
                Arun (5.0⭐)
              </button>
            </div>
          </div>

          {isLoginTab ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Username or Corporate ID
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. jaswanth_k or priya_sharma"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#febd69] hover:bg-[#f3a43d] text-[#19222d] font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Sign In to Campus Board</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="Jaswanth"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Kumar"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="jaswanth_k"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Corporate Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={emailID}
                    onChange={(e) => setEmailID(e.target.value)}
                    placeholder="name@techcorp.internal"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Campus Desk / Building</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={campusLocation}
                    onChange={(e) => setCampusLocation(e.target.value)}
                    placeholder="Tower B, 4th Floor - Tech"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#febd69] hover:bg-[#f3a43d] text-[#19222d] font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Register Teammate Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

