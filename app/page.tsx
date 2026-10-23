"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Users, CloudSun, FileClock, ShieldAlert, Globe } from "lucide-react";
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
      {/* Yuxarı Başlıq və Dil Seçimi Düyməsi */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t.todayAcrossSites}</h1>
        
        <button
          onClick={() => setLang(lang === "az" ? "en" : "az")}
          className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-slate-700 transition"
        >
          <Globe size={16} />
          <span>{lang === "az" ? "AZ 🇦🇿" : "EN 🇬🇧"}</span>
        </button>
      </div>

      {/* KPI Kartları */}
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

      {/* Layihə Tərəqqisi */}
      <Card>
        <h2 className="mb-4 text-xl font-semibold">{t.projectProgress}</h2>
        <div className="space-y-5">
          {projects.map((p) => (
            <div key={p.id} title={`${p.name}: ${p.progress}%`} className="group">
              <div className="mb-1.5 flex justify-between text-sm">
                <span>{p.name}</span>
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
