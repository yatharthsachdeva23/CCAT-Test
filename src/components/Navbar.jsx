import React from 'react';
import { Brain, Clock, ShieldCheck, Sparkles, Trophy, BarChart3, Zap } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, attemptsCount = 0, bestScore = 0 }) {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo / Branding */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-emerald-400 p-[2px] shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Brain className="w-5 h-5 text-sky-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                CCAT Master
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                PRO PREP
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">50 Qs • 15 Mins • Strict Forward Only</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'dashboard'
                ? 'bg-slate-800 text-sky-400 shadow-inner border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('tests')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'tests'
                ? 'bg-slate-800 text-sky-400 shadow-inner border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Test Suite (1–30)</span>
          </button>

          <button
            onClick={() => setActiveTab('ultrafast')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'ultrafast'
                ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 shadow-inner'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="flex items-center gap-1.5">
              <span>Ultra Fast</span>
              <span className="text-[10px] uppercase font-black px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                1-Min
              </span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('coach')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'coach'
                ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-purple-300 border border-purple-500/40 shadow-inner'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI Coach</span>
          </button>
        </nav>

        {/* Quick Stats Pill */}
        <div className="hidden md:flex items-center gap-3 text-xs border-l border-slate-800 pl-4">
          <div className="flex items-center gap-1.5 text-slate-300 bg-slate-800/60 px-2.5 py-1.5 rounded-lg border border-slate-700/50">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Best: <strong className="text-white">{bestScore}/50</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300 bg-slate-800/60 px-2.5 py-1.5 rounded-lg border border-slate-700/50">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Attempts: <strong className="text-white">{attemptsCount}</strong></span>
          </div>
        </div>

      </div>
    </header>
  );
}
