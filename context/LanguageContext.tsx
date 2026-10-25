'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'az' | 'en' | 'ru';

type Translations = {
  [key in Language]: {
    dashboard: string;
    newDpr: string;
    punchList: string;
    export: string;
    systemTag: string;
    heroTitle: string;
    heroDesc: string;
    activeSites: string;
    workersOnSite: string;
    weather: string;
    weatherStatusAz: string;
    weatherStatusEn: string;
    weatherStatusRu: string;
    pendingDprs: string;
    hseIncidents: string;
    projectProgress: string;
    totalActiveProjects: string;
    behindSchedule: string;
  };
};

export const translations: Translations = {
  az: {
    dashboard: "Panel",
    newDpr: "Yeni DPR Hesabatı",
    punchList: "Qüsurlar Siyahısı",
    export: "İxrac et",
    systemTag: "Tikinti İdarəetmə Sistemi",
    heroTitle: "Sahələrinizdə son vəziyyət və gündəlik hesabatlar",
    heroDesc: "Bütün aktiv obyekt, işçi sayını və təhlükəsizlik statusunu real vaxt rejimində izləyin.",
    activeSites: "Aktiv Sahələr",
    workersOnSite: "Sahədəki İşçilər",
    weather: "Hava Şəraiti",
    weatherStatusAz: "31°C, açıq",
    weatherStatusEn: "31°C, Clear",
    weatherStatusRu: "31°C, Ясно",
    pendingDprs: "Təsdiq Gözləyən DPR-lər",
    hseIncidents: "SƏTƏM Hadisələri",
    projectProgress: "Layihə Tərəqqisi",
    totalActiveProjects: "Ümumi 3 Aktiv Obyekt",
    behindSchedule: "plandan geridə",
  },
  en: {
    dashboard: "Dashboard",
    newDpr: "New DPR Report",
    punchList: "Punch List",
    export: "Export",
    systemTag: "Construction Management System",
    heroTitle: "Site status and daily progress reports",
    heroDesc: "Track all active sites, worker counts, and safety status in real-time.",
    activeSites: "Active Sites",
    workersOnSite: "Workers on Site",
    weather: "Weather",
    weatherStatusAz: "31°C, açıq",
    weatherStatusEn: "31°C, Clear",
    weatherStatusRu: "31°C, Ясно",
    pendingDprs: "Pending DPRs",
    hseIncidents: "HSE Incidents",
    projectProgress: "Project Progress",
    totalActiveProjects: "Total 3 Active Sites",
    behindSchedule: "behind schedule",
  },
  ru: {
    dashboard: "Панель управления",
    newDpr: "Новый отчет DPR",
    punchList: "Дефектная ведомость",
    export: "Экспорт",
    systemTag: "Система Управления Строительством",
    heroTitle: "Текущий статус объектов и ежедневные отчеты",
    heroDesc: "Отслеживайте все активные объекты, количество рабочих и статус безопасности в реальном времени.",
    activeSites: "Активные объекты",
    workersOnSite: "Рабочие на объекте",
    weather: "Погода",
    weatherStatusAz: "31°C, açıq",
    weatherStatusEn: "31°C, Clear",
    weatherStatusRu: "31°C, Ясно",
    pendingDprs: "DPR на утверждении",
    hseIncidents: "Инциденты ОТ и ТБ",
    projectProgress: "Прогресс проектов",
    totalActiveProjects: "Всего 3 активных объекта",
    behindSchedule: "отставание от графика",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations['az'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('az');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
