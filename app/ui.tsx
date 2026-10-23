import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from "react";
// shadcn-style primitives; swap for `npx shadcn@latest add button card badge input` if preferred
export const Card = ({ className, ...p }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-xl border border-slate-800 bg-slate-900/70 p-4 print:border-slate-300 print:bg-white", className)} {...p} />
);
const v = {
  primary: "bg-amber-500 text-slate-950 hover:bg-amber-400",
  ok: "bg-emerald-500 text-slate-950 hover:bg-emerald-400",
  ghost: "border border-slate-700 hover:bg-slate-800",
};
export const Button = ({ variant = "primary", className, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof v }) => (
  <button className={cn("inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:opacity-40", v[variant], className)} {...p} />
);
const tones = { amber: "bg-amber-500/15 text-amber-400", emerald: "bg-emerald-500/15 text-emerald-400", red: "bg-red-500/15 text-red-400", slate: "bg-slate-500/20 text-slate-300" };
export const Badge = ({ tone = "slate", className, ...p }: HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof tones }) => (
  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone], className)} {...p} />
);
export const Input = ({ className, ...p }: InputHTMLAttributes<HTMLInputElement>) => (
  <input className={cn("w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm outline-none focus:border-amber-500", className)} {...p} />
);
