"use client"

import React, { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import SmoothScrollProvider from "../components/premium/providers/SmoothScrollProvider"
import { ShieldCheck, AlertCircle } from "lucide-react"

const STATUS_JSON_URL = "https://api.warnode.in/status.json";
const MAX_AGE_HOURS = 9;
const REFRESH_MS = 60000;

interface NodeData {
  node: string;
  status: string;
  last_seen: number;
}

function timeAgo(epochSeconds: number) {
  const diff = Math.max(0, Math.floor(Date.now() / 1000) - epochSeconds);
  if (diff < 60) return "just now";
  const m = Math.floor(diff / 60);
  if (m < 60) return m + "m ago";
  const h = Math.floor(m / 60);
  if (h < 24) return h + "h ago";
  const d = Math.floor(h / 24);
  return d + "d ago";
}

export default function BackupStatusClient() {
  const [data, setData] = useState<{ nodes: NodeData[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());

  const loadData = async () => {
    if (typeof window !== "undefined" && window.location.protocol === "https:" && STATUS_JSON_URL.startsWith("http://")) {
      setError("This page is on HTTPS but STATUS_JSON_URL is plain HTTP. Please update the endpoint.");
      return;
    }
    try {
      const res = await fetch(STATUS_JSON_URL + "?t=" + Date.now(), { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const json = await res.json();
      setData(json);
      setLastFetchTime(Date.now());
      setError(null);
    } catch (err: any) {
      setError("Couldn't load status (" + err.message + "). Check STATUS_JSON_URL.");
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, REFRESH_MS);
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearInterval(interval);
      clearInterval(tick);
    };
  }, []);

  const nodes = data?.nodes || [];
  const total = nodes.length;
  const healthyNodes = nodes.filter(n => {
    const ageH = (Date.now() / 1000 - n.last_seen) / 3600;
    return n.status === "ok" && ageH < MAX_AGE_HOURS;
  });
  const healthy = healthyNodes.length;
  const allHealthy = healthy === total && total > 0;
  const pct = total > 0 ? (healthy / total) * 100 : 0;

  const secsAgo = lastFetchTime ? Math.floor((now - lastFetchTime) / 1000) : 0;
  const untilNext = Math.max(0, Math.round(REFRESH_MS / 1000) - secsAgo);
  const agoText = secsAgo < 1 ? "just now" : secsAgo + "s ago";

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-[#05060a] text-white">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="premium-aurora absolute inset-0 opacity-80" />
          <div className="premium-noise absolute inset-0 opacity-[0.04]" />
        </div>
        
        <Navbar />
        
        <main className="pt-32 pb-20 px-4 sm:px-6 relative z-10 max-w-4xl mx-auto min-h-[80vh]">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <h1 className="orbitron-font font-bold text-2xl sm:text-3xl text-white mb-2">
                War<span className="text-[#3b82f6]">Nodes</span> Backup Status
              </h1>
              <p className="font-mono text-sm text-gray-400 uppercase tracking-wider">Monitor fleet backup health</p>
            </div>
            <div className="flex items-center gap-2 font-mono text-sm text-gray-400 border border-white/10 px-3 py-1.5 rounded-full premium-glass">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" style={{ boxShadow: '0 0 10px rgba(16,185,129,0.6)' }}></span>
              LIVE
            </div>
          </header>

          <div className="premium-glass border border-white/10 rounded-2xl p-6 sm:p-10 mb-8 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 pointer-events-none opacity-20 premium-grid"></div>
            
            <div className="font-mono text-xs tracking-widest uppercase text-gray-400 mb-4 relative z-10">Backup Health</div>
            
            <div className="font-sans text-5xl sm:text-6xl font-bold tracking-tight text-white flex items-baseline gap-3 relative z-10">
              {healthy} <span className="text-2xl sm:text-3xl font-medium text-gray-500">/ {total || '—'}</span>
            </div>
            
            <div className="mt-4 text-sm sm:text-base text-gray-400 relative z-10">
              {total > 0 ? (
                allHealthy ? (
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    All nodes <b className="text-white font-semibold">backed up</b> on schedule
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    {total - healthy} node(s) — backup overdue
                  </span>
                )
              ) : (
                <span>Loading backup status...</span>
              )}
            </div>
            
            <div className="mt-6 h-1.5 rounded-full bg-white/5 flex overflow-hidden relative z-10">
              <div 
                className={`h-full transition-all duration-700 ease-out ${allHealthy || total === 0 ? 'bg-gradient-to-r from-[#3b82f6] to-emerald-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-gradient-to-r from-red-500 to-rose-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`} 
                style={{ width: `${pct}%` }}
              ></div>
            </div>
          </div>

          <div className="font-mono text-xs tracking-widest uppercase text-gray-400 mb-4 ml-1">Nodes — Last Backup</div>

          {error && (
            <div className="text-center p-10 text-red-500 font-mono text-sm bg-red-500/10 rounded-xl border border-red-500/20">
              {error}
            </div>
          )}

          {!error && total === 0 && (
            <div className="text-center p-12 text-gray-500 font-mono text-sm premium-glass border border-white/5 rounded-xl">
              No backup data reporting yet.
            </div>
          )}

          {!error && total > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[...nodes].sort((a,b) => a.node.localeCompare(b.node)).map(n => {
                const ageH = (Date.now()/1000 - n.last_seen) / 3600;
                const ok = n.status === "ok" && ageH < MAX_AGE_HOURS;
                
                return (
                  <div key={n.node} className="premium-glass border border-white/10 hover:border-[#3b82f6]/40 transition-all duration-300 rounded-xl p-4 flex items-center justify-between gap-4 group">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${ok ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`}></span>
                      <span className="font-semibold text-sm text-gray-200 truncate">{n.node}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-xs text-gray-500 hidden sm:inline-block">backed up {timeAgo(n.last_seen)}</span>
                      <span className={`font-mono text-[10px] tracking-wide uppercase px-2 py-1 rounded shrink-0 border ${ok ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                        {ok ? 'Up to date' : 'Overdue'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-16 text-center font-mono text-xs text-gray-500">
            Updated {agoText} · next refresh in {untilNext}s
          </div>
        </main>
        
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}
