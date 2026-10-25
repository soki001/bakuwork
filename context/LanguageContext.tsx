'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'az' | 'en' | 'ru';

type Translations = {
  [key in Language]: {
    dashboard: string;
    dprReports: string;
    punchList: string;
    export: string;
    settings: string;
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
    settingsTitle: string;
    settingsDesc: string;
    companyInfo: string;
    companyName: string;
    selectLanguage: string;
    saveChanges: string;
    saveSuccess: string;
    dprTitle: string;
    dprDesc: string;
    daily: string;
    weekly: string;
    monthly: string;
    createDpr: string;
    selectDateTime: string;
    siteName: string;
    workerCount: string;
    workDone: string;
    cancel: string;
    saveReport: string;
  };
};

export const translations: Translations = {
  az: {
    dashboard: "Panel",
    dprReports: "DPR Hesabatları",
    punchList: "Qüsurlar Siyahısı",
    export: "İxrac et",
    settings: "Ayarlar",
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
    settingsTitle: "Sistem və Şirkət Ayarları",
    settingsDesc: "Şirkət məlumatlarınızı, panel parametrlərini və sistem dilini buradan idarə edin.",
    companyInfo: "Şirkət Profil Məlumatları",
    companyName: "Şirkətin Adı",
    selectLanguage: "Sistem Dili",
    saveChanges: "Dəyişiklikləri Yadda Saxla",
    saveSuccess: "Ayarlar uğurla yadda saxlanıldı!",
    dprTitle: "DPR Hesabatları İdarəetməsi",
    dprDesc: "Gündəlik, həftəlik və aylıq sahə hesabatlarını izləyin və yenilərini əlavə edin.",
    daily: "Günlük",
    weekly: "Həftəlik",
    monthly: "Aylıq",
    createDpr: "Yeni DPR Hesabatı",
    selectDateTime: "Tarix və Saat Seçimi",
    siteName: "Obyekt / Sahə Adı",
    workerCount: "İşçi Sayı",
    workDone: "Görülən İşlərin Təsviri",
    cancel: "Ləğv et",
    saveReport: "Hesabatı Əlavə Et"
  },
  en: {
    dashboard: "Dashboard",
    dprReports: "DPR Reports",
    punchList: "Punch List",
    export: "Export",
    settings: "Settings",
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
    settingsTitle: "System & Company Settings",
    settingsDesc: "Manage your company details, dashboard options, and system language here.",
    companyInfo: "Company Profile Info",
    companyName: "Company Name",
    selectLanguage: "System Language",
    saveChanges: "Save Changes",
    saveSuccess: "Settings saved successfully!",
    dprTitle: "DPR Reports Management",
    dprDesc: "Monitor daily, weekly, and monthly site reports and create new entries.",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    createDpr: "New DPR Report",
    selectDateTime: "Date & Time Selection",
    siteName: "Site / Project Name",
    workerCount: "Worker Count",
    workDone: "Work Executed Description",
    cancel: "Cancel",
    saveReport: "Save Report"
  },
  ru: {
    dashboard: "Панель управления",
    dprReports: "Отчеты DPR",
    punchList: "Дефектная ведомость",
    export: "Экспорт",
    settings: "Настройки",
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
    settingsTitle: "Настройки Системы и Компании",
    settingsDesc: "Управляйте данными компании, параметрами панели и языком системы отсюда.",
    companyInfo: "Профиль Компании",
    companyName: "Название Компании",
    selectLanguage: "Язык Системы",
    saveChanges: "Сохранить изменения",
    saveSuccess: "Настройки успешно сохранены!",
    dprTitle: "Управление отчетами DPR",
    dprDesc: "Просматривайте ежедневные, еженедельные и ежемесячные отчеты и добавляйте новые.",
    daily: "Ежедневный",
    weekly: "Еженедельный",
    monthly: "Ежемесячный",
    createDpr: "Новый отчет DPR",
    selectDateTime: "Выбор даты и времени",
    siteName: "Название объекта",
    workerCount: "Количество рабочих",
    workDone: "Описание выполненных работ",
    cancel: "Отмена",
    saveReport: "Сохранить отчет"
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
