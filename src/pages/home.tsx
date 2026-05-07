import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Shield, Zap, Terminal, Activity, Server, Users, ArrowRight, CheckCircle2, MessageSquare, Globe, Menu, X } from "lucide-react";
import { Link } from "wouter";

const INVITE_LINK = "https://discord.com/oauth2/authorize?client_id=1478787233178976342";
const SUPPORT_LINK = "https://discord.gg/kz9udEnvwv";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative text-foreground font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-30 mix-blend-screen" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:40px_40px]" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px]" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3' : 'py-5 bg-transparent'}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/nexus-logo.png" alt="Nexus Logo" className="w-8 h-8 rounded-md" />
            <span className="font-bold text-xl tracking-tight text-white">Nexus Bot</span>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-white/70">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#stats" className="hover:text-white transition-colors">Stats</a>
            <a href="#commands" className="hover:text-white transition-colors">Commands</a>
            <Link href="/commands" className="hover:text-white transition-colors">All Cmds</Link>
            <Link href="/status" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Status</Link>
          </div>
          <div className="flex items-center gap-3">
            <a href={SUPPORT_LINK} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white/70 hover:text-white transition-colors hidden lg:block">
              Support
            </a>
            <a href={INVITE_LINK} target="_blank" rel="noopener noreferrer" className="hidden sm:block">
              <Button className="bg-primary hover:bg-primary/90 text-white glow-primary border-0 rounded-full px-6 font-semibold shadow-xl transition-all duration-300 hover:scale-105">
                Add to Discord
              </Button>
            </a>
            <button className="md:hidden text-white/70 hover:text-white p-1" onClick={() => setMobileOpen(!mobileOpen)} data-testid="button-mobile-menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden glass-panel border-t border-white/10 px-6 py-5 space-y-4 text-sm font-medium">
            <a href="#features" onClick={() => setMobileOpen(false)} className="block text-white/70 hover:text-white transition-colors">Features</a>
            <a href="#commands" onClick={() => setMobileOpen(false)} className="block text-white/70 hover:text-white transition-colors">Commands</a>
            <Link href="/commands" onClick={() => setMobileOpen(false)} className="block text-white/70 hover:text-white transition-colors">All Commands</Link>
            <Link href="/status" onClick={() => setMobileOpen(false)} className="block text-white/70 hover:text-white transition-colors">Status</Link>
            <a href={SUPPORT_LINK} target="_blank" rel="noopener noreferrer" className="block text-white/70 hover:text-white transition-colors">Support Server</a>
            <a href={INVITE_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-primary text-white border-0 rounded-full font-semibold mt-2">Add to Discord</Button>
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-20 md:pt-52 md:pb-32 container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono tracking-wider font-semibold uppercase">Built by Axon Devs</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white max-w-5xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 leading-tight">
          The ultimate <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary text-glow">command center</span>
        </h1>
        
        <p className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          Nexus is a powerful, versatile Discord bot that keeps communities connected, protected, and running smoothly. The last bot you will ever need.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <a href={INVITE_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="h-14 px-8 text-lg bg-white text-background hover:bg-white/90 rounded-full w-full sm:w-auto font-bold transition-transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Invite Nexus
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <a href={SUPPORT_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto font-bold border-white/10 hover:bg-white/5 backdrop-blur-sm transition-transform hover:scale-105">
              Join Community
            </Button>
          </a>
        </div>
      </section>

      {/* Community Trust Section */}
      <section className="relative z-10 py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-8">Trusted by active communities</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-bold text-xl"><Globe className="w-6 h-6" /> Global Gaming</div>
            <div className="flex items-center gap-2 font-bold text-xl"><MessageSquare className="w-6 h-6" /> Dev Lounge</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Activity className="w-6 h-6" /> Creators Network</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Shield className="w-6 h-6" /> Secure Hub</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24 container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Engineered for dominance</h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">Everything you need to build, scale, and secure your Discord server in one elegant package.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Ironclad Security",
              description: "Advanced anti-raid, intelligent automod, and comprehensive logging. Sleep well knowing your server is protected.",
              icon: <Shield className="w-8 h-8 text-secondary" />,
              image: "/feature-shield.png"
            },
            {
              title: "Limitless Automation",
              description: "Create intricate custom commands, reaction roles, and automated workflows without writing a single line of code.",
              icon: <Zap className="w-8 h-8 text-primary" />,
              image: "/feature-nodes.png"
            },
            {
              title: "Deep Analytics",
              description: "Understand your community with rich data, activity tracking, and beautiful dashboard insights.",
              icon: <Activity className="w-8 h-8 text-accent" />,
              image: "/feature-dash.png"
            }
          ].map((feature, i) => (
            <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/[0.07] transition-all duration-500 overflow-hidden group hover:shadow-[0_0_30px_rgba(138,43,226,0.15)] hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="h-48 w-full bg-background/50 relative flex items-center justify-center overflow-hidden border-b border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                  {feature.image ? (
                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-white/5 animate-pulse" />
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-4 bg-white/5 w-14 h-14 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Setup Steps Section */}
      <section id="setup" className="relative z-10 py-24 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">Online in 60 seconds</h2>
            <div className="space-y-12">
              {[
                { step: "01", title: "Invite to Server", desc: "Click the invite button and authorize Nexus with standard permissions. No unnecessary access required." },
                { step: "02", title: "Run Setup Command", desc: "Type /setup in your designated admin channel. Nexus will instantly configure basic roles and logging." },
                { step: "03", title: "Customize & Scale", desc: "Use the interactive dashboard or command line to tweak automod, create custom commands, and launch your community." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 text-5xl font-black text-white/10 group-hover:text-primary/40 transition-colors font-mono mt-1">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-white/60 text-lg">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a href={INVITE_LINK} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 rounded-full px-8 h-12 font-bold transition-all">
                  Start Step 01 <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative z-10 py-24 border-y border-white/5 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
            {[
              { value: "99.99%", label: "Uptime", icon: <Server className="w-6 h-6 mx-auto mb-3 text-primary" /> },
              { value: "0ms", label: "Latency Feel", icon: <Zap className="w-6 h-6 mx-auto mb-3 text-secondary" /> },
              { value: "24/7", label: "Support", icon: <Users className="w-6 h-6 mx-auto mb-3 text-accent" /> },
              { value: "1M+", label: "Commands Run", icon: <Terminal className="w-6 h-6 mx-auto mb-3 text-primary" /> }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-colors group">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-black text-white mb-2 font-mono group-hover:text-glow transition-all">{stat.value}</div>
                <div className="text-sm text-white/50 uppercase tracking-widest font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Preview Section */}
      <section id="commands" className="relative z-10 py-32 container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold border border-secondary/20">
              <Terminal className="w-4 h-4" /> Developer First
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Lightning fast execution</h2>
            <p className="text-lg text-white/60">
              Execute complex operations with simple slash commands. Nexus is built on a high-performance framework ensuring instant responses, every single time.
            </p>
            <ul className="space-y-4 mt-8">
              {[
                "Setup — One-click server configuration",
                "Automod — Configure intelligent filters",
                "Analytics — Generate server growth reports"
              ].map((cmd, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-white/80">{cmd}</span>
                </li>
              ))}
            </ul>
            <div className="pt-6 flex flex-col sm:flex-row gap-4 items-start">
              <Link href="/commands">
                <Button size="lg" className="h-12 px-7 bg-primary hover:bg-primary/90 text-white border-0 rounded-full font-bold transition-all hover:scale-105 glow-primary" data-testid="button-view-all-commands">
                  View All Commands <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href={SUPPORT_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-12 text-primary font-semibold hover:text-primary/80 transition-colors group">
                Join support server <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            {/* Glow effect behind terminal */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <div className="rounded-xl border border-white/10 bg-[#0a0a0f] shadow-2xl overflow-hidden relative z-10">
              <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/5 backdrop-blur-sm">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto text-xs font-mono text-white/40">nexus-bot-cli</div>
              </div>
              <div className="p-6 font-mono text-sm text-white/80 space-y-4">
                <div className="flex gap-3">
                  <span className="text-primary font-bold">~</span>
                  <span className="text-white">/nexus server info</span>
                </div>
                <div className="pl-6 text-white/60 border-l border-white/10 my-2 py-2 space-y-1">
                  <div className="text-secondary font-semibold">Nexus Intelligence Report</div>
                  <div>Gathering telemetry...</div>
                  <div className="text-green-400">Successfully connected to gateway</div>
                  <br/>
                  <div>Members Online: <span className="text-white font-bold">1,432</span></div>
                  <div>Messages Today: <span className="text-white font-bold">12,504</span></div>
                  <div>Security Status: <span className="text-green-400 font-bold">Secured</span></div>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary font-bold">~</span>
                  <span className="text-white animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 mt-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-8 border border-primary/30 glow-primary">
            <Zap className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-glow">Ready to elevate your server?</h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Join thousands of communities already powered by Nexus Bot. Setup takes less than two minutes. Completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={INVITE_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-16 px-10 text-xl bg-primary hover:bg-primary/90 text-white glow-primary border-0 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                Authorize Nexus Now
              </Button>
            </a>
            <a href={SUPPORT_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="ghost" className="h-16 px-10 text-xl hover:bg-white/5 rounded-full font-bold transition-all">
                Talk to the Devs
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-background/90 backdrop-blur-xl pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <img src="/nexus-logo.png" alt="Nexus Logo" className="w-8 h-8 rounded-md" />
                <span className="font-bold text-2xl text-white tracking-tight">Nexus Bot</span>
              </div>
              <p className="text-white/50 max-w-xs">
                The ultimate command center for Discord communities. Built for scale, engineered for dominance.
              </p>
            </div>
            
            <div className="flex gap-12 text-center md:text-left">
              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-white/50 hover:text-primary transition-colors text-sm">Features</a></li>
                  <li><a href="#commands" className="text-white/50 hover:text-primary transition-colors text-sm">Commands</a></li>
                  <li><a href={INVITE_LINK} className="text-white/50 hover:text-primary transition-colors text-sm">Add to Discord</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Connect</h4>
                <ul className="space-y-2">
                  <li><a href={SUPPORT_LINK} className="text-white/50 hover:text-primary transition-colors text-sm">Support Server</a></li>
                  <li><a href="#" className="text-white/50 hover:text-primary transition-colors text-sm">Axon Devs</a></li>
                  <li><a href="#" className="text-white/50 hover:text-primary transition-colors text-sm">Twitter</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
            <div>
              &copy; {new Date().getFullYear()} Axon Devs. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
