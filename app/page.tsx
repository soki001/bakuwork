'use client';

import React from 'react';
import { 
  Building2, 
  Users, 
  CloudSun, 
  FileText, 
  ShieldAlert, 
  Plus, 
  Globe 
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white relative overflow-hidden p-6">
      
      {/* BÜTÜN EKRAN ARXA FON ŞƏKLİ */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('/insaat.11.jfif')] bg-cover bg-center z-0" />

      {/* ƏSAS İÇƏRİK */}
      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-slate-800 p-8 shadow-2xl backdrop-blur-md">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none bg-[url('/insaat.11.jfif')] bg-cover bg-center" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                <Building2 className="w-3.5 h-3.5" />
                Tikinti İdarəetmə Sistemi
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Sahələrinizdə son vəziyyət və gündəlik hesabatlar
              </h1>
              <p className="text-slate-400 text-sm max-w-xl">
                Bütün aktiv obyekt, işçi sayını və təhlükəsizlik statusunu real vaxt rejimində izləyin.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-sm font-medium transition-all">
                <Globe className="w-4 h-4 text-slate-400" />
                AZ AZ
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/20">
                <Plus className="w-4 h-4" />
                Yeni DPR Hesabatı
              </button>
            </div>
          </div>
        </div>

        {/* KPI Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">6</div>
              <div className="text-xs text-slate-400 font-medium">Aktiv Sahələr</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">184</div>
              <div className="text-xs text-slate-400 font-medium">Sahədəki İşçilər</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">31°C, açıq</div>
              <div className="text-xs text-slate-400 font-medium">Hava Şəraiti</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">4</div>
              <div className="text-xs text-slate-400 font-medium">Təsdiq Gözləyən DPR-lər</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">1</div>
              <div className="text-xs text-slate-400 font-medium">SƏTƏM Hadisələri</div>
            </div>
          </div>
        </div>

        {/* Layihə Tərəqqisi */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Layihə Tərəqqisi</h2>
            <span className="text-xs text-slate-400 font-medium">Ümumi 3 Aktiv Obyekt</span>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-200 font-medium">Harbor Tower, Block A</span>
                <span className="text-slate-400">72%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '72%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-200 font-medium">Metro Logistics Hub</span>
                <span className="text-amber-400 text-xs">45% · plandan geridə</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-200 font-medium">Riverside Medical Centre</span>
                <span className="text-slate-400">88%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '88%' }} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
