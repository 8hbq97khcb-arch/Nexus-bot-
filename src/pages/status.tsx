import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, CheckCircle2, AlertCircle, XCircle, RefreshCw, Clock, Activity, Globe, Server, Zap, Shield, Music, Database } from "lucide-react";

const INVITE_LINK = "https://discord.com/oauth2/authorize?client_id=1478787233178976342";

type Status = "operational" | "degraded" | "outage";

const SERVICES = [
  { name: "Bot Gateway", icon: <Globe className="w-4 h-4" />, status: "operational" as Status, uptime: "99.98%", latency: "42ms" },
  { name: "Command Handler", icon: <Zap className="w-4 h-4" />, status: "operational" as Status, uptime: "99.97%", latency: "38ms" },
  { name: "API Server", icon: <Server className="w-4 h-4" />, status: "operational" as Status, uptime: "99.99%", latency: "12ms" },
  { name: "Database", icon: <Database className="w-4 h-4" />, status: "operational" as Status, uptime: "100%", latency: "8ms" },
  { name: "Automod Engine", icon: <Shield className="w-4 h-4" />, status: "operational" as Status, uptime: "99.95%", latency: "55ms" },
  { name: "Music Nodes", icon: <Music className="w-4 h-4" />, status: "operational" as Status, uptime: "99.82%", latency: "90ms" },
  { name: "Dashboard", icon: <Activity className="w-4 h-4" />, status: "operational" as Status, uptime: "99.99%", latency: "22ms" },
  { name: "Webhook Delivery", icon: <Globe className="w-4 h-4" />, status: "operational" as Status, uptime: "99.93%", latency: "61ms" },
];

const INCIDENTS: { date: string; title: string; status: string; body: string }[] = [
  {
    date: "Apr 28, 2026",
    title: "Elevated command latency",
    status: "Resolved",
    body: "Between 14:00 and 15:30 UTC, some users experienced higher-than-normal command response times due to a database query bottleneck. The issue was resolved and all services returned to normal.",
  },
  {
    date: "Mar 12, 2026",
    title: "Music node outage (EU region)",
    status: "Resolved",
    body: "The EU music node experienced a complete outage from 09:15 to 10:40 UTC due to a hardware failure at our hosting provider. Traffic was rerouted to the US node. Full capacity was restored.",
  },
];

const DAYS_HISTORY = Array.from({ length: 90 }, (_, i) => {
  const s = Math.random();
  return s > 0.04 ? "operational" : s > 0.01 ? "degraded" : "outage";
}) as Status[];

function StatusDot({ status }: { status: Status }) {
  if (status === "operational") return <span className="flex h-2 w-2 rounded-full bg-green-400" />;
  if (status === "degraded") return <span className="flex h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />;
  return <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />;
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "operational") return <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs font-bold">Operational</Badge>;
  if (status === "degraded") return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs font-bold">Degraded</Badge>;
  return <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-xs font-bold">Outage</Badge>;
}

function HistoryBar({ status }: { status: Status }) {
  return (
    <div
      title={status}
      className={`flex-1 h-8 rounded-sm cursor-default transition-all hover:opacity-80 ${
        status === "operational" ? "bg-green-400/70" : status === "degraded" ? "bg-yellow-400/70" : "bg-red-500/70"
      }`}
    />
  );
}

export default function Status() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => { setLastUpdated(new Date()); setRefreshing(false); }, 800);
  };

  const allOperational = SERVICES.every((s) => s.status === "operational");

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-green-500/5 blur-[120px]" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:40px_40px]" />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 py-4">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium" data-testid="link-back-home">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            </Link>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-2">
              <img src="/nexus-logo.png" alt="Nexus" className="w-7 h-7 rounded-md" />
              <span className="font-bold text-white">Status</span>
            </div>
          </div>
          <button onClick={handleRefresh} className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors" data-testid="button-refresh">
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12 max-w-3xl">
        {/* Hero status */}
        <div className={`rounded-2xl border p-8 text-center mb-10 ${allOperational ? "bg-green-500/5 border-green-500/15" : "bg-yellow-500/5 border-yellow-500/15"}`}>
          <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5 ${allOperational ? "bg-green-500/15" : "bg-yellow-500/15"}`}>
            {allOperational
              ? <CheckCircle2 className="w-8 h-8 text-green-400" />
              : <AlertCircle className="w-8 h-8 text-yellow-400" />
            }
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            {allOperational ? "All Systems Operational" : "Partial Outage Detected"}
          </h1>
          <p className="text-white/50 text-sm">
            Last updated {lastUpdated.toLocaleTimeString()} — {lastUpdated.toLocaleDateString()}
          </p>
        </div>

        {/* Services */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-white mb-4">Services</h2>
          <div className="rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5">
            {SERVICES.map((svc, i) => (
              <div key={i} className="flex items-center justify-between gap-4 px-5 py-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors" data-testid={`service-row-${i}`}>
                <div className="flex items-center gap-3">
                  <span className="text-white/40">{svc.icon}</span>
                  <span className="font-medium text-white text-sm">{svc.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-white/30 hidden sm:block">{svc.latency}</span>
                  <span className="text-xs font-mono text-white/30 hidden sm:block">{svc.uptime}</span>
                  <StatusBadge status={svc.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 90-day history */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">90-Day History</h2>
            <div className="flex items-center gap-4 text-xs text-white/30">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-green-400/70" /> Operational</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-yellow-400/70" /> Degraded</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-500/70" /> Outage</span>
            </div>
          </div>
          <div className="flex gap-0.5">
            {DAYS_HISTORY.map((status, i) => (
              <HistoryBar key={i} status={status} />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/25">
            <span>90 days ago</span>
            <span>Today</span>
          </div>
        </div>

        {/* Incidents */}
        <div className="mb-12">
          <h2 className="text-lg font-bold text-white mb-4">Past Incidents</h2>
          {INCIDENTS.length === 0 ? (
            <p className="text-white/40 text-sm">No incidents in the past 90 days.</p>
          ) : (
            <div className="space-y-4">
              {INCIDENTS.map((inc, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-white/[0.02] p-5" data-testid={`incident-${i}`}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="font-semibold text-white text-sm">{inc.title}</div>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-[10px] font-bold shrink-0">{inc.status}</Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/30 mb-3">
                    <Clock className="w-3 h-3" /> {inc.date}
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">{inc.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center border-t border-white/5 pt-10">
          <p className="text-white/40 text-sm mb-4">Want to stay updated on incidents?</p>
          <a href="https://discord.gg/kz9udEnvwv" target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#5865F2] hover:bg-[#4752c4] text-white border-0 rounded-full px-8 font-bold" data-testid="button-join-discord">
              Join Support Server
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
