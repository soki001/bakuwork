"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ClipboardList, ListChecks, Printer, HardHat } from "lucide-react";
const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dpr", label: "New DPR", icon: ClipboardList },
  { href: "/punch-list", label: "Punch list", icon: ListChecks },
  { href: "/dpr/print", label: "Export", icon: Printer },
];
export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="min-h-screen md:pl-60 print:pl-0">
      <aside className="fixed inset-x-0 bottom-0 z-20 flex border-t border-slate-800 bg-slate-950 md:inset-y-0 md:right-auto md:w-60 md:flex-col md:gap-1 md:border-r md:border-t-0 md:p-4 print:hidden">
        <div className="mb-6 hidden items-center gap-2 font-display text-2xl font-bold md:flex">
          <HardHat className="text-amber-500" />build<span className="text-amber-500">sync</span>
        </div>
        {nav.map((n) => (
          <Link key={n.href} href={n.href}
            className={`flex flex-1 flex-col items-center gap-1 p-2.5 text-xs md:flex-none md:flex-row md:gap-3 md:rounded-lg md:px-3 md:text-sm ${path === n.href ? "text-amber-400 md:bg-slate-800" : "text-slate-400 hover:text-slate-100"}`}>
            <n.icon size={18} />{n.label}
          </Link>
        ))}
      </aside>
      <main className="mx-auto max-w-6xl p-4 pb-24 md:p-8 print:p-0">{children}</main>
    </div>
  );
}
