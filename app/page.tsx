"use client";
import { motion } from "framer-motion";
import { Building2, Users, CloudSun, FileClock, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui";
import { projects } from "@/lib/data";
const kpis = [
  { l: "Active sites", v: "6", i: Building2, c: "text-amber-400" },
  { l: "Workers on site today", v: "184", i: Users, c: "text-emerald-400" },
  { l: "Weather", v: "31°C, clear", i: CloudSun, c: "text-sky-400" },
  { l: "DPRs awaiting approval", v: "4", i: FileClock, c: "text-amber-400" },
  { l: "Safety incidents", v: "1", i: ShieldAlert, c: "text-red-400" },
];
export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Today across your sites</h1>
      <motion.div className="grid grid-cols-2 gap-3 lg:grid-cols-5" initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.07 } } }}>
        {kpis.map((k) => (
          <motion.div key={k.l} variants={{ h: { opacity: 0, y: 10 }, s: { opacity: 1, y: 0 } }}>
            <Card><k.i className={k.c} size={20} /><div className="mt-3 text-xl font-semibold">{k.v}</div><div className="text-xs text-slate-400">{k.l}</div></Card>
          </motion.div>
        ))}
      </motion.div>
      <Card>
        <h2 className="mb-4 text-xl font-semibold">Project progress</h2>
        <div className="space-y-5">
          {projects.map((p) => (
            <div key={p.id} title={`${p.name}: ${p.progress}% complete`} className="group">
              <div className="mb-1.5 flex justify-between text-sm"><span>{p.name}</span><span className="text-slate-400">{p.progress}%{p.delayed && " · behind plan"}</span></div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <motion.div className={`h-full rounded-full transition group-hover:brightness-125 ${p.delayed ? "bg-amber-500" : "bg-emerald-500"}`} initial={{ width: 0 }} animate={{ width: `${p.progress}%` }} transition={{ duration: 0.9, ease: "easeOut" }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
