"use client";
import { useRef } from "react";
export default function Signature({ onChange }: { onChange: (dataUrl: string) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const ctx = () => ref.current!.getContext("2d")!;
  const xy = (e: React.PointerEvent): [number, number] => {
    const c = ref.current!, b = c.getBoundingClientRect();
    return [((e.clientX - b.left) * c.width) / b.width, ((e.clientY - b.top) * c.height) / b.height];
  };
  return (
    <div>
      <canvas ref={ref} width={600} height={160} className="w-full touch-none rounded-lg border border-slate-700 bg-slate-950"
        onPointerDown={(e) => { drawing.current = true; const c = ctx(); c.strokeStyle = "#fbbf24"; c.lineWidth = 2.5; c.lineCap = "round"; c.beginPath(); c.moveTo(...xy(e)); }}
        onPointerMove={(e) => { if (!drawing.current) return; const c = ctx(); c.lineTo(...xy(e)); c.stroke(); }}
        onPointerUp={() => { drawing.current = false; onChange(ref.current!.toDataURL()); }} />
      <button type="button" className="mt-2 text-xs text-slate-400 underline"
        onClick={() => { ctx().clearRect(0, 0, 600, 160); onChange(""); }}>Clear signature</button>
    </div>
  );
}
