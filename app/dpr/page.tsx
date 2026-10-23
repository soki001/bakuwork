"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Upload } from "lucide-react";
import { Button, Card, Input } from "@/components/ui";
import Signature from "@/components/signature";
import { supabase } from "@/lib/supabase";
import { projects, trades, materials } from "@/lib/data";
const steps = ["Site info", "Workforce", "Materials", "Work done", "Photos", "Sign-off"];
type Photo = { file: File; caption: string };
export default function DprForm() {
  const [s, setS] = useState(0);
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({
    project: projects[0].name, date: new Date().toISOString().slice(0, 10), contractor: "", weather: "Clear",
    workers: Object.fromEntries(trades.map((t) => [t, { qty: 0, hrs: 0 }])) as Record<string, { qty: number; hrs: number }>,
    mat: Object.fromEntries(materials.map((m) => [m.n, 0])) as Record<string, number>,
    work: "", pct: 0, photos: [] as Photo[], sig: "", signer: "",
  });
  const set = (k: string, v: unknown) => setF((o) => ({ ...o, [k]: v }));
  const label = "mb-1 block text-sm text-slate-400";

  async function submit() {
    if (supabase) {
      const photos = [];
      for (const p of f.photos) {
        const path = `${Date.now()}-${p.file.name}`;
        await supabase.storage.from("dpr-photos").upload(path, p.file);
        photos.push({ path, caption: p.caption });
      }
      await supabase.from("dprs").insert({ project: f.project, report_date: f.date, contractor: f.contractor, weather: f.weather, workforce: f.workers, materials: f.mat, work_done: f.work, progress_pct: f.pct, photos, signature: f.sig, signer: f.signer });
    }
    setSent(true);
  }
  if (sent) return (
    <Card className="mx-auto mt-10 max-w-md text-center">
      <Check className="mx-auto text-emerald-400" size={36} />
      <h2 className="mt-3 text-2xl font-semibold">DPR submitted</h2>
      <p className="mt-1 text-sm text-slate-400">{supabase ? "Saved to Supabase." : "Demo mode: add Supabase keys to save reports."}</p>
      <Button className="mt-4" onClick={() => { setSent(false); setS(0); }}>Start another report</Button>
    </Card>
  );

  const panes = [
    <div key="0" className="grid gap-4 sm:grid-cols-2">
      <div><label className={label}>Project</label>
        <select className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm" value={f.project} onChange={(e) => set("project", e.target.value)}>{projects.map((p) => <option key={p.id}>{p.name}</option>)}</select></div>
      <div><label className={label}>Date</label><Input type="date" value={f.date} onChange={(e) => set("date", e.target.value)} /></div>
      <div><label className={label}>Contractor / subcontractor</label><Input value={f.contractor} onChange={(e) => set("contractor", e.target.value)} placeholder="Apex Structures LLC" /></div>
      <div><label className={label}>Weather</label><Input value={f.weather} onChange={(e) => set("weather", e.target.value)} /></div>
    </div>,
    <div key="1" className="space-y-3">
      {trades.map((t) => (
        <div key={t} className="grid grid-cols-[1fr_5rem_5rem] items-center gap-2">
          <span className="text-sm">{t}</span>
          {(["qty", "hrs"] as const).map((k) => (
            <Input key={k} type="number" min={0} placeholder={k === "qty" ? "Qty" : "Hours"} value={f.workers[t][k] || ""}
              onChange={(e) => set("workers", { ...f.workers, [t]: { ...f.workers[t], [k]: +e.target.value } })} />
          ))}
        </div>
      ))}
    </div>,
    <div key="2" className="grid gap-4 sm:grid-cols-2">
      {materials.map((m) => (
        <div key={m.n}><label className={label}>{m.n} used today ({m.u})</label>
          <Input type="number" min={0} value={f.mat[m.n] || ""} onChange={(e) => set("mat", { ...f.mat, [m.n]: +e.target.value })} /></div>
      ))}
    </div>,
    <div key="3" className="space-y-4">
      <div><label className={label}>Tasks completed today</label>
        <textarea rows={6} className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm outline-none focus:border-amber-500" value={f.work} onChange={(e) => set("work", e.target.value)} /></div>
      <div><label className={label}>Overall progress: {f.pct}%</label>
        <input type="range" className="w-full accent-emerald-500" value={f.pct} onChange={(e) => set("pct", +e.target.value)} /></div>
    </div>,
    <div key="4" className="space-y-3">
      <label onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); set("photos", [...f.photos, ...Array.from(e.dataTransfer.files).map((file) => ({ file, caption: "" }))]); }}
        className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-slate-700 p-8 text-sm text-slate-400 hover:border-amber-500">
        <Upload /> Drop site photos here or tap to choose
        <input type="file" accept="image/*" multiple hidden onChange={(e) => set("photos", [...f.photos, ...Array.from(e.target.files ?? []).map((file) => ({ file, caption: "" }))])} />
      </label>
      {f.photos.map((p, i) => (
        <div key={i} className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={URL.createObjectURL(p.file)} alt="" className="h-14 w-14 rounded-lg object-cover" />
          <Input placeholder="Caption" value={p.caption} onChange={(e) => set("photos", f.photos.map((q, j) => (j === i ? { ...q, caption: e.target.value } : q)))} />
        </div>
      ))}
    </div>,
    <div key="5" className="space-y-4">
      <div><label className={label}>Inspector / project manager</label><Input value={f.signer} onChange={(e) => set("signer", e.target.value)} placeholder="Full name and role" /></div>
      <div><label className={label}>Signature</label><Signature onChange={(d) => set("sig", d)} /></div>
    </div>,
  ];
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <h1 className="text-3xl font-bold">Daily progress report</h1>
      <div className="flex gap-1.5">{steps.map((n, i) => <div key={n} className={`h-1.5 flex-1 rounded-full ${i <= s ? "bg-amber-500" : "bg-slate-800"}`} />)}</div>
      <p className="text-sm text-slate-400">Step {s + 1} of {steps.length}: {steps[s]}</p>
      <Card>
        <AnimatePresence mode="wait">
          <motion.div key={s} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.18 }}>{panes[s]}</motion.div>
        </AnimatePresence>
      </Card>
      <div className="flex justify-between">
        <Button variant="ghost" disabled={s === 0} onClick={() => setS(s - 1)}>Back</Button>
        {s < steps.length - 1 ? <Button onClick={() => setS(s + 1)}>Next</Button> : <Button variant="ok" disabled={!f.sig || !f.signer} onClick={submit}>Submit DPR</Button>}
      </div>
    </div>
  );
}
