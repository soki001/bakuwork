'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  CloudSun, 
  FileText, 
  ShieldAlert, 
  LayoutDashboard,
  FilePlus,
  ClipboardCheck,
  Download,
  Settings,
  HardHat,
  Save,
  Globe,
  Plus,
  Clock,
  Calendar,
  X,
  UserCheck,
  MessageSquare,
  Send,
  Mic,
  Camera,
  UsersRound,
  Hash
} from 'lucide-react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';

interface DprReport {
  id: string;
  siteName: string;
  type: 'daily' | 'weekly' | 'monthly';
  workerCount: number;
  workDone: string;
  dateTime: string;
  author: string;
}

interface Message {
  id: string;
  sender: string;
  role: string;
  text: string;
  time: string;
  type?: 'text' | 'image' | 'audio';
}

interface ChatGroup {
  id: string;
  name: string;
  type: 'general' | 'group';
  lastMessage: string;
}

function DashboardContent() {
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'dpr' | 'chat' | 'settings'>('dashboard');
  
  // DPR Filter State
  const [dprFilter, setDprFilter] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Şirkət və Ayarlar State-ləri
  const [companyName, setCompanyName] = useState('BuildSync MMC');
  const [companyLogo, setCompanyLogo] = useState('');
  const [saveAlert, setSaveAlert] = useState(false);

  // Cari İstifadəçi Məlumatı (Mesajlarda görünəcək ad)
  const currentUser = 'Şöhrət Məmmədov (Baş Mühəndis)';

  // Chat State-ləri
  const [groups, setGroups] = useState<ChatGroup[]>([
    { id: 'gen', name: 'Ümumi Şirkət Çatı', type: 'general', lastMessage: 'Hər kəsə salam, işlər necə gedir?' },
    { id: 'hvac', name: 'HVAC və Mexanika Qrupu', type: 'group', lastMessage: 'Blok A ventilyasiya boruları gətirildi.' },
    { id: 'hse', name: 'SƏTƏM Təlimatları', type: 'group', lastMessage: 'Sabah səhər təhlükəsizlik yoxlaması olacaq.' }
  ]);
  const [activeChatId, setActiveChatId] = useState('gen');
  const [messageInput, setMessageInput] = useState('');
  
  // Qrup yaratmaq üçün Modal state-i
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  // Söhbət mesajları bazası
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    gen: [
      { id: '1', sender: 'Əli Məmmədov', role: 'Böyük Mühəndis', text: 'Sabahkİ beton tökmə işləri üçün hər şey hazırdır.', time: '14:10' },
      { id: '2', sender: 'Rəşad Quliyev', role: 'Sahə Rəisi', text: 'Aydın oldu, işçilər saat 09:00-da sahədə olacaqlar.', time: '14:15' }
    ],
    hvac: [
      { id: '1', sender: 'Kərim Əhmədov', role: 'MEP Koordinatoru', text: 'Kondisioner xətlərinin çəkilişi yoxlanıldı.', time: '11:30' }
    ],
    hse: [
      { id: '1', sender: 'SƏTƏM Şöbəsi', role: 'Müfəttiş', text: 'Kaska və təhlükəsizlik kəmərlərindən istifadə etməyi unutmayın.', time: '09:00' }
    ]
  });

  // Yeni DPR Form State-ləri
  const [newSiteName, setNewSiteName] = useState('Harbor Tower, Block A');
  const [newWorkerCount, setNewWorkerCount] = useState<number>(45);
  const [newWorkDone, setNewWorkDone] = useState('');
  const [newDateTime, setNewDateTime] = useState('2026-10-25T14:30');
  const [newAuthor, setNewAuthor] = useState('Şöhrət Məmmədov (Baş Mühəndis)');
  const [newType, setNewType] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Nümunə DPR Hesabatları Bazası
  const [reports, setReports] = useState<DprReport[]>([
    {
      id: '1',
      siteName: 'Harbor Tower, Block A',
      type: 'daily',
      workerCount: 48,
      workDone: '14-cü mərtəbədə beton tökmə işləri tamamlandı. Armatur karkaslarının montajı davam edir.',
      dateTime: '2026-10-25 17:45',
      author: 'Əli Məmmədov (Böyük Mühəndis)'
    },
    {
      id: '2',
      siteName: 'Metro Logistics Hub',
      type: 'daily',
      workerCount: 32,
      workDone: 'Bünövrə izolyasiyası işləri aparıldı. Su xətlərinin çəkilişi davam etdirilir.',
      dateTime: '2026-10-25 16:20',
      author: 'Rəşad Quliyev (Sahə Rəisi)'
    },
    {
      id: '3',
      siteName: 'Riverside Medical Centre',
      type: 'weekly',
      workerCount: 85,
      workDone: 'Həftəlik yekun: Bütün MEP (HVAC və santexnika) borulama işlərinin 60%-i tamamlandı.',
      dateTime: '2026-10-24 18:00',
      author: 'Kərim Əhmədov (MEP Koordinatoru)'
    },
    {
      id: '4',
      siteName: 'Harbor Tower, Block A',
      type: 'monthly',
      workerCount: 120,
      workDone: 'Aylıq yekun: 3 Mərtəbə monolit karkas qaldırıldı. Təhlükəsizlik auditindən uğurla keçildi.',
      dateTime: '2026-10-01 10:00',
      author: 'BuildSync MMC Auditi'
    }
  ]);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t.dashboard },
    { id: 'dpr', icon: FilePlus, label: t.dprReports },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'punchList', icon: ClipboardCheck, label: t.punchList },
    { id: 'export', icon: Download, label: t.export },
    { id: 'settings', icon: Settings, label: t.settings },
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 3000);
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = newDateTime.replace('T', ' ');
    const newReport: DprReport = {
      id: Date.now().toString(),
      siteName: newSiteName,
      type: newType,
      workerCount: Number(newWorkerCount),
      workDone: newWorkDone,
      dateTime: formattedDate,
      author: newAuthor || 'Sahə Mühəndisi'
    };
    setReports([newReport, ...reports]);
    setIsModalOpen(false);
    setNewWorkDone('');
  };

  // Mesaj Göndərmə Funksiyası
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: currentUser,
      role: 'Baş Mühəndis',
      text: messageInput,
      time: timeString
    };

    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage]
    }));

    setMessageInput('');
  };

  // Yeni Qrup Yaratma Funksiyası
  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const newId = 'group_' + Date.now();
    const newGroup: ChatGroup = {
      id: newId,
      name: newGroupName,
      type: 'group',
      lastMessage: 'Qrup yaradıldı.'
    };

    setGroups([...groups, newGroup]);
    setMessages(prev => ({ ...prev, [newId]: [] }));
    setActiveChatId(newId);
    setNewGroupName('');
    setIsGroupModalOpen(false);
  };

  const filteredReports = reports.filter(r => r.type === dprFilter);
  const currentChatMessages = messages[activeChatId] || [];
  const activeGroupObj = groups.find(g => g.id === activeChatId);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white relative overflow-hidden flex">
      
      {/* SABİT ARXA FON ŞƏKLİ */}
      <div className="fixed inset-0 opacity-25 pointer-events-none bg-[url('/insaat.11.jfif')] bg-cover bg-center z-0" />

      {/* SOL MENYU (SIDEBAR) */}
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
                    if (['dashboard', 'dpr', 'chat', 'settings'].includes(item.id)) {
                      setActiveTab(item.id as any);
                    } else {
                      alert(`${item.label} bölməsi tezliklə yüklənəcək!`);
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
            <div className="relative overflow-hidden rounded-2xl bg-slate-900/60 border border-slate-800/80 p-8 shadow-2xl backdrop-blur-md">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none bg-[url('/kask11.webp')] bg-cover bg-center" />

              <div className="relative z-10 flex flex-col justify-center space-y-2 pr-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium w-fit">
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
                  <div className="text-2xl font-bold text-white">{reports.length}</div>
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

        {/* TAB 2: CHAT BÖLMƏSİ (CANLI SÖHBƏT VƏ QRUPLAR) */}
        {activeTab === 'chat' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-md h-[calc(100vh-80px)] flex overflow-hidden shadow-2xl">
            
            {/* SOL TƏRƏFDƏKİ SÖHBƏT VƏ QRUPLAR SİYAHISI */}
            <div className="w-80 border-r border-slate-800 bg-slate-950/40 flex flex-col justify-between shrink-0">
              <div>
                <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                  <h2 className="font-bold text-white text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                    İşçi və Qrup Söhbətləri
                  </h2>
                </div>

                <div className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)]">
                  {groups.map((group) => {
                    const isSelected = activeChatId === group.id;
                    return (
                      <button
                        key={group.id}
                        onClick={() => setActiveChatId(group.id)}
                        className={`w-full text-left px-3.5 py-3 rounded-xl transition-all flex items-start gap-3 ${
                          isSelected 
                            ? 'bg-amber-500/10 border border-amber-500/20 text-white font-semibold' 
                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          group.type === 'general' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {group.type === 'general' ? <Hash className="w-4 h-4" /> : <UsersRound className="w-4 h-4" />}
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-sm truncate text-slate-200">{group.name}</div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">{group.lastMessage}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* + QRUP YARAT DÜYMƏSİ */}
              <div className="p-4 border-t border-slate-800 bg-slate-900/40">
                <button
                  onClick={() => setIsGroupModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all shadow-lg shadow-amber-500/20"
                >
                  <Plus className="w-4 h-4" />
                  + Qrup Yarat
                </button>
              </div>
            </div>

            {/* SAĞ TƏRƏF: AKTİV MESAJLAŞMA PƏNCƏRƏSİ */}
            <div className="flex-1 flex flex-col justify-between bg-slate-900/20">
              
              {/* Çat Başlığı */}
              <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    {activeGroupObj?.type === 'general' ? <Hash className="w-4 h-4" /> : <UsersRound className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{activeGroupObj?.name}</h3>
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Aktiv kanal
                    </span>
                  </div>
                </div>
              </div>

              {/* Mesajların Axını */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {currentChatMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs space-y-1">
                    <MessageSquare className="w-8 h-8 opacity-40 mb-1" />
                    <span>Bu kanalda hələ mesaj yoxdur. İlk mesajı siz yazın!</span>
                  </div>
                ) : (
                  currentChatMessages.map((msg) => {
                    const isMyMessage = msg.sender === currentUser;
                    return (
                      <div key={msg.id} className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}>
                        
                        {/* MÜƏLLİF ADI VƏ VƏZİFƏSİ (İşçinin qeydiyyatdakı adı) */}
                        <div className="text-[11px] font-semibold text-amber-400/90 mb-1 px-1 flex items-center gap-1.5">
                          <span>{msg.sender}</span>
                          <span className="text-[10px] text-slate-500 font-normal">({msg.role})</span>
                        </div>

                        <div className={`max-w-md rounded-2xl px-4 py-3 text-sm space-y-1 shadow-md ${
                          isMyMessage 
                            ? 'bg-amber-500 text-slate-950 rounded-tr-none font-medium' 
                            : 'bg-slate-800/80 border border-slate-700/60 text-slate-200 rounded-tl-none'
                        }`}>
                          <p className="leading-relaxed">{msg.text}</p>
                          <div className={`text-[10px] text-right ${isMyMessage ? 'text-slate-800' : 'text-slate-400'}`}>
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* AŞAĞIDAKI MESAJ GÖNDƏRMƏ PANELİ */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center gap-3">
                
                {/* Kamera Düyməsi (Şəkil və ya Video çəkib göndərmək üçün) */}
                <button
                  type="button"
                  onClick={() => alert('Kamera açıldı: Sahədən şəkil və ya video çəkilişi simulyasiyası.')}
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700 shrink-0"
                  title="Şəkil / Video çək"
                >
                  <Camera className="w-5 h-5 text-amber-400" />
                </button>

                {/* Mətn daxiletmə sahəsi */}
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Mesajınızı yazın..."
                  className="flex-1 bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />

                {/* Dinamik Düymə: Xana boşdursa Mikrofon (Səsli mesaj), Doludursa Göndər */}
                {messageInput.trim() === '' ? (
                  <button
                    type="button"
                    onClick={() => alert('Səsli mesaj yazılır... (Simulyasiya)')}
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700 shrink-0"
                    title="Səsli mesaj göndər"
                  >
                    <Mic className="w-5 h-5 text-cyan-400" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-lg shadow-amber-500/20 shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    Göndər
                  </button>
                )}

              </form>

            </div>

          </div>
        )}

        {/* TAB 3: DPR HESABATLARI SƏHİFƏSİ */}
        {activeTab === 'dpr' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">{t.dprTitle}</h1>
                <p className="text-slate-400 text-sm mt-1">{t.dprDesc}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700">
                  <button
                    onClick={() => setDprFilter('daily')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      dprFilter === 'daily'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.daily}
                  </button>
                  <button
                    onClick={() => setDprFilter('weekly')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      dprFilter === 'weekly'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.weekly}
                  </button>
                  <button
                    onClick={() => setDprFilter('monthly')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      dprFilter === 'monthly'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.monthly}
                  </button>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all shadow-lg shadow-amber-500/20"
                >
                  <Plus className="w-4 h-4" />
                  {t.createDpr}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredReports.length === 0 ? (
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-12 text-center text-slate-400 text-sm">
                  Bu kateqoriyada hələ heç bir hesabat yoxdur.
                </div>
              ) : (
                filteredReports.map((report) => (
                  <div 
                    key={report.id}
                    className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md relative space-y-3 hover:border-slate-700 transition-all"
                  >
                    <div className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{report.dateTime}</span>
                    </div>

                    <div className="pr-36">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-amber-500" />
                        {report.siteName}
                      </h3>
                      <span className="text-xs text-slate-400 block mt-0.5">
                        {t.workersOnSite}: <strong className="text-slate-200">{report.workerCount} nəfər</strong> • Məsul şəxs: <strong className="text-amber-400/90">{report.author}</strong>
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 bg-slate-800/40 p-4 rounded-xl border border-slate-800/60 leading-relaxed">
                      {report.workDone}
                    </p>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* TAB 4: AYARLAR (SETTINGS) SƏHİFƏSİ */}
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

      {/* MODAL: YENİ DPR HESABATI DAXİL ETİLMƏSİ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in duration-200">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FilePlus className="w-5 h-5 text-amber-500" />
                {t.createDpr}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 block">
                  Hesabat Tipi
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as 'daily' | 'weekly' | 'monthly')}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="daily">{t.daily}</option>
                  <option value="weekly">{t.weekly}</option>
                  <option value="monthly">{t.monthly}</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 block">
                    {t.siteName}
                  </label>
                  <input
                    type="text"
                    value={newSiteName}
                    onChange={(e) => setNewSiteName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 block">
                    {t.workerCount}
                  </label>
                  <input
                    type="number"
                    value={newWorkerCount}
                    onChange={(e) => setNewWorkerCount(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                    Məsul Şəxs
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    Tarix və Saat
                  </label>
                  <input
                    type="datetime-local"
                    value={newDateTime}
                    onChange={(e) => setNewDateTime(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 block">
                  {t.workDone}
                </label>
                <textarea
                  rows={4}
                  value={newWorkDone}
                  onChange={(e) => setNewWorkDone(e.target.value)}
                  placeholder="Görülən işlərin təsviri..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/20"
                >
                  {t.saveReport}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL: YENİ QRUP YARATMAK (CHAT) */}
      {isGroupModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <UsersRound className="w-5 h-5 text-amber-500" />
                Yeni Qrup və ya Kanal Yarat
              </h3>
              <button 
                onClick={() => setIsGroupModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 block">
                  Qrupun Adı / Mövzusu
                </label>
                <input
                  type="text"
                  placeholder="Məs: Blok B Ustalar, Yanğından Mühafizə və s."
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsGroupModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
                >
                  Vazkeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/20"
                >
                  Qrup Yarat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
