'use client';

import './globals.css';
import { 
  LayoutDashboard, 
  FilePlus, 
  ClipboardCheck, 
  Download, 
  Settings, 
  HardHat 
} from 'lucide-react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import React, { useState } from 'react';

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState<'dashboard' | 'settings'>('dashboard');

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex">
      
      {/* TAM SOL KÖK PANEL (SIDEBAR) - ARTIQ NƏZARƏTİMİZDƏDİR */}
      <aside className="w-64 bg-slate-900/95 border-r border-slate-800 min-h-screen p-4 flex flex-col justify-between backdrop-blur-md shrink-0 z-30">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 px-3 py-4 mb-6">
            <HardHat className="w-8 h-8 text-amber-500" />
            <span className="font-bold text-xl tracking-wider text-white">
              build<span className="text-amber-500">sync</span>
            </span>
          </div>

          {/* Menyu Elementləri */}
          <nav className="space-y-1.5">
            <a
              href="/"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all bg-amber-500/10 text-amber-400 border border-amber-500/20"
            >
              <LayoutDashboard className="w-4 h-4" />
              {t.dashboard}
            </a>

            <button
              onClick={() => alert('Yeni DPR Hesabatı formu tezliklə əlavə olunacaq!')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
            >
              <FilePlus className="w-4 h-4" />
              {t.newDpr}
            </button>

            <button
              onClick={() => alert('Qüsurlar Siyahısı bölməsi hazırlanır.')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
            >
              <ClipboardCheck className="w-4 h-4" />
              {t.punchList}
            </button>

            <button
              onClick={() => alert('Hesabatların ixracı funksionallığı aktivləşdirilir.')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
            >
              <Download className="w-4 h-4" />
              {t.export}
            </button>

            {/* AYARLAR DÜYMƏSİ - İNDİ SOL PANELDƏ TAM GÖRÜNÜR */}
            <a
              href="/settings"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
            >
              <Settings className="w-4 h-4" />
              {t.settings}
            </a>
          </nav>
        </div>

        <div className="px-3 py-2 text-xs text-slate-500 font-medium">
          v1.0.0 SaaS Pro
        </div>
      </aside>

      {/* ƏSAS İÇƏRİK BÖLGƏSİ */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body className="bg-[#0b0f19] text-white">
        <LanguageProvider>
          <RootLayoutContent>
            {children}
          </RootLayoutContent>
        </LanguageProvider>
      </body>
    </html>
  );
}
