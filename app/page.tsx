'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  CloudSun, 
  FileText, 
  ShieldAlert, 
  Plus, 
  LayoutDashboard,
  FilePlus,
  ClipboardCheck,
  Download,
  Settings,
  HardHat,
  Save,
  Globe,
  Image as ImageIcon
} from 'lucide-react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';

function DashboardContent() {
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings'>('dashboard');
  
  // Şirkət və Ayarlar State-ləri (Tamamilə ayrı)
  const [companyName, setCompanyName] = useState('BuildSync MMC');
  const [companyLogo, setCompanyLogo] = useState('');
  const [saveAlert, setSaveAlert] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t.dashboard },
    { id: 'newDpr', icon: FilePlus, label: t.newDpr },
    { id: 'punchList', icon: ClipboardCheck, label: t.punchList },
    { id: 'export', icon: Download, label: t.export },
    { id: 'settings', icon: Settings, label: t.settings },
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white relative overflow-hidden flex">
      
      {/* SABİT ARXA FON ŞƏKLİ */}
      <div className="fixed inset-0 opacity-25 pointer-events-none bg-[url('/insaat.11.jfif')] bg-cover bg-center z-0" />

      {/* TƏK VƏ MÜKƏMMƏL SOL MENYU (SIDEBAR) */}
      <aside className="w-64 bg-slate-900/90 border-r border-slate-800 min-h-screen p-4 flex flex-col justify-between backdrop-blur-md relative z-20 shrink-0">
        <div>
          <div className="flex items-center gap-3 px-3 py-4 mb-6">
            <HardHat className="w-8 h-8 text-amber-500" />
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-wider text-white leading-none">
                build<span className="text-amber-500">sync</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium truncate max-w-[130px] mt-1">
                {companyName}
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'dashboard' || item.id === 'settings') {
                      setActiveTab(item.id as 'dashboard' | 'settings');
                    } else {
                      alert(`${item.label} bölməsi tezliklə aktiv olacaq!`);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold' 
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-3 py-2 text-xs text-slate-500 font-medium">
          v1.0.0 SaaS Pro
        </div>
      </aside>

      {/* ƏSAS İÇƏRİK SAHƏSİ */}
      <main className="flex-1 p-6 relative z-10 overflow-y-auto max-w-7xl mx-auto space-y-6">
        
        {/* TAB 1: DASHBOARD (ƏSAS PANEL) */}
        {activeTab === 'dashboard' && (
          <>
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-slate-800/80 p-8 shadow-2xl backdrop-blur-md">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none bg-[url('/kask11.webp')] bg-cover bg-center" />

              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                    <Building2 className="w-3.5 h-3.5" />
                    {t.systemTag} • {companyName}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                    {t.heroTitle}
                  </h1>
                  <p className="text-slate-300 text-sm max-w-xl">
                    {t.heroDesc}
                  </p>
                </div>

                <div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/20">
                    <Plus className="w-4 h-4" />
                    {t.newDpr}
                  </button>
                </div>
              </div>
            </div>

            {/* KPI Kartları */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">6</div>
                  <div className="text-xs text-slate-400 font-medium">{t.activeSites}</div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">184</div>
                  <div className="text-xs text-slate-400 font-medium">{t.workersOnSite}</div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <CloudSun className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {language === 'az' ? t.weatherStatusAz : language === 'en' ? t.weatherStatusEn : t.weatherStatusRu}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">{t.weather}</div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">4</div>
                  <div className="text-xs text-slate-400 font-medium">{t.pendingDprs}</div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">1</div>
                  <div className="text-xs text-slate-400 font-medium">{t.hseIncidents}</div>
                </div>
              </div>
            </div>

            {/* Layihə Tərəqqisi */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white">{t.projectProgress}</h2>
                <span className="text-xs text-slate-400 font-medium">{t.totalActiveProjects}</span>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-200 font-medium">Harbor Tower, Block A</span>
                    <span className="text-slate-400">72%</span>
                  </div>
                  <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '72%' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-200 font-medium">Metro Logistics Hub</span>
                    <span className="text-amber-400 text-xs">45% · {t.behindSchedule}</span>
                  </div>
                  <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-200 font-medium">Riverside Medical Centre</span>
                    <span className="text-slate-400">88%</span>
                  </div>
                  <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: AYARLAR (SETTINGS) SƏHİFƏSİ - MÜSTƏQİL BLOKLAR */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-4xl">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
              <h1 className="text-2xl font-bold text-white">{t.settingsTitle}</h1>
              <p className="text-slate-400 text-sm mt-1">{t.settingsDesc}</p>
            </div>

            {saveAlert && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl text-sm font-medium">
                {t.saveSuccess}
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6">
              
              {/* BLOK 1: ŞİRKƏT PROFİLİ VƏ LOGO (Tamamilə Ayrı) */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-amber-400 font-semibold text-sm">
                  <Building2 className="w-4 h-4" />
                  Şirkət Məlumatları və Brendinq
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300 block">
                      {t.companyName}
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300 block">
                      Şirkət Loqosu (Şəkil Linki və ya Adı)
                    </label>
                    <input
                      type="text"
                      placeholder="Məs: /logo.png"
                      value={companyLogo}
                      onChange={(e) => setCompanyLogo(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* BLOK 2: SİSTEM DİLİ SEÇİMİ (Tamamilə Müstəqil) */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-amber-400 font-semibold text-sm">
                  <Globe className="w-4 h-4" />
                  İnterfeys Dili / System Language
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setLanguage('az')}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                      language === 'az'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-bold'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    🇦🇿 Azərbaycan dili
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                      language === 'en'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-bold'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('ru')}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                      language === 'ru'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-bold'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    🇷🇺 Русский
                  </button>
                </div>
              </div>

              {/* Yadda Saxla Düyməsi */}
              <div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/20"
                >
                  <Save className="w-4 h-4" />
                  {t.saveChanges}
                </button>
              </div>

            </form>
          </div>
        )}

      </main>
    </div>
  );
}

export default function Page() {
  return (
    <LanguageProvider>
      <DashboardContent />
    </LanguageProvider>
  );
}
