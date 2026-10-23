import "./globals.css";
import { Barlow, Barlow_Condensed } from "next/font/google";
import Shell from "@/components/shell";
const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display" });
export const metadata = { title: "buildsync", description: "Construction management and daily progress reports" };
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${body.variable} ${display.variable}`}>
      <body className="font-sans"><Shell>{children}</Shell></body>
    </html>
  );
}
