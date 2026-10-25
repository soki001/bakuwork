"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  CloudSun,
  FileClock,
  ShieldAlert,
  Globe,
  PlusCircle,
  HardHat,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui";
import { projects } from "@/lib/data";
import { translations } from "@/lib/translations";

export default function Dashboard() {
  const [lang, setLang] = useState<"az" | "en">("az");
  const t = translations[lang];

  const kpis = [
    { l: t.activeSites, v: "6", i: Building2, c: "text-amber-400" },
    { l: t.workersOnSite, v: "184", i: Users, c: "text-emerald-400" },
    { l: t.weather, v: "31°C, açıq", i: CloudSun, c: "text-sky-400" },
    { l: t.dprAwaitingApproval, v: "4", i: FileClock, c: "text-amber-400" },
    { l: t.safetyIncidents, v: "1", i: ShieldAlert, c: "text-red-400" },
  ];

  return (
    <div className="space-y-6">
      {/* 🚀 1. İnşaat Karşılama Banneri (Hero Section) */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950/40 p-6 md:p-8 border border-slate-800 shadow-xl"
      >
        {/* Arxa plan inşaat silueti overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('/insaat.11.jfif')] bg-cover bg-center" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
              <HardHat size={14} />
              <span>Tikinti İdarəetmə Sistemi</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Sahələrinizdə son vəziyyət və gündəlik hesabatlar
            </h1>
            <p className="text-sm text-slate-400">
              Bütün aktiv obyekti, işçi sayını və təhlükəsizlik statusunu real vaxt rejimində izləyin.
            </p>
          </div>

          {/* Sürətli Əməliyyat Düymələri və Dil Keçidi */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setLang(lang === "az" ? "en" : "az")}
              className="flex items-center gap-2 rounded-xl bg-slate-800/80 backdrop-blur px-3 py-2 text-xs font-medium text-slate-200 border border-slate-700 hover:bg-slate-700 transition"
            >
              <Globe size={15} />
              <span>{lang === "az" ? "AZ 🇦🇿" : "EN 🇬🇧"}</span>
            </button>

            <a
              href="/dpr"
              className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
            >
              <PlusCircle size={16} />
              <span>Yeni DPR Hesabatı</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* 📊 2. KPI Kartları */}
      <div>
        <h2 className="text-lg font-semibold text-slate-200 mb-3">{t.todayAcrossSites}</h2>
        <motion.div
          className="grid grid-cols-2 gap-3 lg:grid-cols-5"
          initial="h"
          animate="s"
          variants={{ s: { transition: { staggerChildren: 0.07 } } }}
        >
          {kpis.map((k) => (
            <motion.div key={k.l} variants={{ h: { opacity: 0, y: 10 }, s: { opacity: 1, y: 0 } }}>
              <Card>
                <k.i className={k.c} size={20} />
                <div className="mt-3 text-xl font-semibold">{k.v}</div>
                <div className="text-xs text-slate-400">{k.l}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 🏗️ 3. Layihə Tərəqqisi */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t.projectProgress}</h2>
          <span className="text-xs text-slate-400">Ümumi 3 Aktiv Obyekt</span>
        </div>
        <div className="space-y-5">
          {projects.map((p) => (
            <div key={p.id} title={`${p.name}: ${p.progress}%`} className="group">
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-medium text-slate-200">{p.name}</span>
                <span className="text-slate-400">
                  {p.progress}%{p.delayed && ` · ${t.behindPlan}`}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  className={`h-full rounded-full transition group-hover:brightness-125 ${
                    p.delayed ? "bg-amber-500" : "bg-emerald-500"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${p.progress}%` }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
