import type { Metadata } from "next";
import { Hanken_Grotesk, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LocalEdge — Investment Intelligence",
  description:
    "AI-powered investment intelligence. Discover, translate, and prioritize financial signals from local-language sources worldwide — before the rest of the market.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-ink font-sans text-content antialiased">
        <div className="app-atmosphere" aria-hidden />
        <Sidebar />
        <div className="lg:pl-[248px]">
          <Topbar />
          <main className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
