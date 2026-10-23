"use client";
import { Printer, HardHat } from "lucide-react";
import { Button } from "@/components/ui";
import { sampleDpr as d, punch } from "@/lib/data";
const th = "border border-slate-300 bg-slate-100 p-2 text-left font-semibold text-slate-800";
const td = "border border-slate-300 p-2";
export default function PrintDpr() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between print:hidden">
        <h1 className="text-3xl font-bold">Export DPR</h1>
        <Button onClick={() => window.print()}><Printer size={16} /> Print or save as PDF</Button>
      </div>
      <article className="rounded-xl bg-white p-6 text-sm text-slate-900 md:p-10 print:rounded-none print:p-0">
        <header className="flex items-center justify-between border-b-4 border-amber-500 pb-3">
          <div className="flex items-center gap-2 font-display text-3xl font-bold"><HardHat className="text-amber-500" />build<span className="text-amber-500">sync</span></div>
          <div className="text-right"><div className="font-semibold">Daily Progress Report</div><div>{d.date}</div></div>
        </header>
        <dl className="my-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[["Project", d.project], ["Contractor", d.contractor], ["Weather", d.weather], ["Progress", `${d.pct}%`]].map(([k, v]) => <div key={k}><dt className="text-slate-500">{k}</dt><dd className="font-semibold">{v}</dd></div>)}
        </dl>
        <table className="mb-4 w-full border-collapse"><thead><tr><th className={th}>Workforce</th><th className={th}>Headcount</th><th className={th}>Hours</th></tr></thead>
          <tbody>{d.workforce.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i} className={td}>{c}</td>)}</tr>)}</tbody></table>
        <table className="mb-4 w-full border-collapse"><thead><tr><th className={th}>Material</th><th className={th}>Used today</th></tr></thead>
          <tbody>{d.materials.map((r) => <tr key={r[0]}><td className={td}>{r[0]}</td><td className={td}>{r[1]}</td></tr>)}</tbody></table>
        <h3 className="mb-1 font-display text-lg font-semibold">Work accomplished</h3><p className="mb-4">{d.work}</p>
        <h3 className="mb-1 font-display text-lg font-semibold">Open punch items</h3>
        <ul className="mb-4 list-disc pl-5">{punch.filter((p) => p.status !== "Resolved").map((p) => <li key={p.id}>{p.id} · {p.location}: {p.issue} ({p.severity})</li>)}</ul>
        <h3 className="mb-2 font-display text-lg font-semibold">Site photos</h3>
        <div className="mb-6 grid grid-cols-3 gap-3 break-inside-avoid">
          {d.photos.map((c) => <figure key={c}><div className="aspect-video rounded bg-gradient-to-br from-slate-300 to-slate-200" /><figcaption className="mt-1 text-xs text-slate-600">{c}</figcaption></figure>)}
        </div>
        <footer className="flex justify-between border-t border-slate-300 pt-3"><span>Signed: <i className="font-display text-xl">{d.signer.split(",")[0]}</i></span><span>{d.signer}</span></footer>
      </article>
    </div>
  );
}
