import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Shield, Zap, Terminal, Users, Music, Gamepad2, Wrench,
  ChevronLeft, Search, Star, MessageSquare, Ban, Clock,
  Volume2, BarChart2, Hash, Bell, Lock, RefreshCw, Gift,
  Swords, Dices, Trophy, Info, Settings, Database
} from "lucide-react";

const INVITE_LINK = "https://discord.com/oauth2/authorize?client_id=1478787233178976342";
const SUPPORT_LINK = "https://discord.gg/kz9udEnvwv";

type Command = {
  name: string;
  description: string;
  usage: string;
  premium?: boolean;
};

type Category = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  commands: Command[];
};

const categories: Category[] = [
  {
    id: "moderation",
    label: "Moderation",
    icon: <Shield className="w-4 h-4" />,
    color: "text-red-400",
    commands: [
      { name: "/ban", description: "Permanently ban a user from the server.", usage: "/ban <user> [reason]" },
      { name: "/unban", description: "Unban a previously banned user.", usage: "/unban <user_id>" },
      { name: "/kick", description: "Kick a member from the server.", usage: "/kick <user> [reason]" },
      { name: "/mute", description: "Mute a member so they cannot send messages.", usage: "/mute <user> <duration> [reason]" },
      { name: "/unmute", description: "Remove a mute from a member.", usage: "/unmute <user>" },
      { name: "/timeout", description: "Put a member in timeout for a specified duration.", usage: "/timeout <user> <duration> [reason]" },
      { name: "/warn", description: "Issue a formal warning to a member.", usage: "/warn <user> <reason>" },
      { name: "/warnings", description: "View all warnings issued to a member.", usage: "/warnings <user>" },
      { name: "/clearwarns", description: "Clear all warnings for a member.", usage: "/clearwarns <user>" },
      { name: "/purge", description: "Bulk delete a number of messages in a channel.", usage: "/purge <amount> [user]" },
      { name: "/slowmode", description: "Set or remove slowmode on a channel.", usage: "/slowmode <seconds>" },
      { name: "/lock", description: "Lock a channel so members cannot send messages.", usage: "/lock [channel]" },
      { name: "/unlock", description: "Unlock a previously locked channel.", usage: "/unlock [channel]" },
      { name: "/softban", description: "Ban and immediately unban a user to purge their messages.", usage: "/softban <user> [reason]" },
      { name: "/massban", description: "Ban multiple users at once by ID.", usage: "/massban <user_ids>", premium: true },
    ],
  },
  {
    id: "automod",
    label: "Automod",
    icon: <Zap className="w-4 h-4" />,
    color: "text-yellow-400",
    commands: [
      { name: "/automod setup", description: "Run the interactive automod configuration wizard.", usage: "/automod setup" },
      { name: "/automod enable", description: "Enable a specific automod rule.", usage: "/automod enable <rule>" },
      { name: "/automod disable", description: "Disable a specific automod rule.", usage: "/automod disable <rule>" },
      { name: "/automod status", description: "View the current automod configuration.", usage: "/automod status" },
      { name: "/filter add", description: "Add a word or phrase to the automod filter.", usage: "/filter add <word>" },
      { name: "/filter remove", description: "Remove a word or phrase from the automod filter.", usage: "/filter remove <word>" },
      { name: "/filter list", description: "View all words in the current filter list.", usage: "/filter list" },
      { name: "/antispam", description: "Configure anti-spam settings for your server.", usage: "/antispam <threshold>" },
      { name: "/antiraid", description: "Configure anti-raid protection mode.", usage: "/antiraid <mode>", premium: true },
      { name: "/caps", description: "Set the percentage of caps that triggers the filter.", usage: "/caps <percent>" },
    ],
  },
  {
    id: "utility",
    label: "Utility",
    icon: <Wrench className="w-4 h-4" />,
    color: "text-blue-400",
    commands: [
      { name: "/setup", description: "Run the full server setup wizard.", usage: "/setup" },
      { name: "/serverinfo", description: "Display detailed information about the server.", usage: "/serverinfo" },
      { name: "/userinfo", description: "Display information about a user.", usage: "/userinfo [user]" },
      { name: "/avatar", description: "Get the avatar of a user in full resolution.", usage: "/avatar [user]" },
      { name: "/roleinfo", description: "View information about a specific role.", usage: "/roleinfo <role>" },
      { name: "/channelinfo", description: "View information about a specific channel.", usage: "/channelinfo [channel]" },
      { name: "/ping", description: "Check Nexus Bot's response time and API latency.", usage: "/ping" },
      { name: "/uptime", description: "See how long Nexus Bot has been running.", usage: "/uptime" },
      { name: "/botinfo", description: "Display stats and information about Nexus Bot.", usage: "/botinfo" },
      { name: "/poll", description: "Create a poll with up to 10 choices.", usage: "/poll <question> <options>" },
      { name: "/remind", description: "Set a personal reminder for a future time.", usage: "/remind <time> <message>" },
      { name: "/timestamp", description: "Generate a Discord timestamp from a date/time.", usage: "/timestamp <datetime>" },
      { name: "/math", description: "Evaluate a mathematical expression.", usage: "/math <expression>" },
      { name: "/invite", description: "Get the invite link for Nexus Bot.", usage: "/invite" },
    ],
  },
  {
    id: "logging",
    label: "Logging",
    icon: <Database className="w-4 h-4" />,
    color: "text-cyan-400",
    commands: [
      { name: "/logs setup", description: "Configure the logging channel for server events.", usage: "/logs setup <channel>" },
      { name: "/logs enable", description: "Enable a specific log event type.", usage: "/logs enable <event>" },
      { name: "/logs disable", description: "Disable a specific log event type.", usage: "/logs disable <event>" },
      { name: "/logs status", description: "View all currently enabled log events.", usage: "/logs status" },
      { name: "/audit", description: "View the recent audit log for the server.", usage: "/audit [user]" },
    ],
  },
  {
    id: "roles",
    label: "Roles",
    icon: <Users className="w-4 h-4" />,
    color: "text-purple-400",
    commands: [
      { name: "/role add", description: "Add a role to a member.", usage: "/role add <user> <role>" },
      { name: "/role remove", description: "Remove a role from a member.", usage: "/role remove <user> <role>" },
      { name: "/role create", description: "Create a new role with custom settings.", usage: "/role create <name> [color]" },
      { name: "/role delete", description: "Delete an existing role.", usage: "/role delete <role>" },
      { name: "/reactionrole add", description: "Add a reaction role to a message.", usage: "/reactionrole add <message_id> <emoji> <role>" },
      { name: "/reactionrole remove", description: "Remove a reaction role from a message.", usage: "/reactionrole remove <message_id> <emoji>" },
      { name: "/reactionrole list", description: "List all active reaction roles.", usage: "/reactionrole list" },
      { name: "/autorole set", description: "Set a role to be auto-assigned to new members.", usage: "/autorole set <role>" },
      { name: "/autorole remove", description: "Remove the auto-assigned role for new members.", usage: "/autorole remove" },
    ],
  },
  {
    id: "tickets",
    label: "Tickets",
    icon: <MessageSquare className="w-4 h-4" />,
    color: "text-green-400",
    commands: [
      { name: "/ticket setup", description: "Set up the ticket system for your server.", usage: "/ticket setup" },
      { name: "/ticket open", description: "Open a new support ticket.", usage: "/ticket open [reason]" },
      { name: "/ticket close", description: "Close the current ticket.", usage: "/ticket close [reason]" },
      { name: "/ticket add", description: "Add a user to the current ticket.", usage: "/ticket add <user>" },
      { name: "/ticket remove", description: "Remove a user from the current ticket.", usage: "/ticket remove <user>" },
      { name: "/ticket transcript", description: "Generate a transcript of the ticket.", usage: "/ticket transcript" },
      { name: "/ticket panel", description: "Send a ticket open panel to a channel.", usage: "/ticket panel [channel]" },
    ],
  },
  {
    id: "fun",
    label: "Fun",
    icon: <Gamepad2 className="w-4 h-4" />,
    color: "text-pink-400",
    commands: [
      { name: "/8ball", description: "Ask the magic 8ball a yes/no question.", usage: "/8ball <question>" },
      { name: "/coinflip", description: "Flip a coin and get heads or tails.", usage: "/coinflip" },
      { name: "/roll", description: "Roll a dice with a custom number of sides.", usage: "/roll [sides]" },
      { name: "/rps", description: "Play rock, paper, scissors against Nexus.", usage: "/rps <choice>" },
      { name: "/trivia", description: "Answer a random trivia question.", usage: "/trivia [category]" },
      { name: "/joke", description: "Get a random joke.", usage: "/joke" },
      { name: "/meme", description: "Get a random meme from Reddit.", usage: "/meme" },
      { name: "/fact", description: "Get a random fun fact.", usage: "/fact" },
      { name: "/quote", description: "Get an inspirational quote.", usage: "/quote" },
      { name: "/ship", description: "Check the compatibility between two users.", usage: "/ship <user1> <user2>" },
      { name: "/battle", description: "Start a battle between two users.", usage: "/battle <user>" },
    ],
  },
  {
    id: "economy",
    label: "Economy",
    icon: <Trophy className="w-4 h-4" />,
    color: "text-orange-400",
    commands: [
      { name: "/balance", description: "Check your or another user's coin balance.", usage: "/balance [user]" },
      { name: "/daily", description: "Claim your daily coin reward.", usage: "/daily" },
      { name: "/weekly", description: "Claim your weekly coin reward.", usage: "/weekly" },
      { name: "/pay", description: "Transfer coins to another user.", usage: "/pay <user> <amount>" },
      { name: "/leaderboard", description: "View the top users by coin balance.", usage: "/leaderboard" },
      { name: "/shop", description: "Browse the server item shop.", usage: "/shop" },
      { name: "/buy", description: "Purchase an item from the shop.", usage: "/buy <item>" },
      { name: "/inventory", description: "View your owned items.", usage: "/inventory [user]" },
      { name: "/gamble", description: "Gamble your coins for a chance to win more.", usage: "/gamble <amount>", premium: true },
    ],
  },
  {
    id: "levels",
    label: "Levels",
    icon: <BarChart2 className="w-4 h-4" />,
    color: "text-violet-400",
    commands: [
      { name: "/rank", description: "View your or another user's current rank and XP.", usage: "/rank [user]" },
      { name: "/leaderboard xp", description: "View the top users by XP on the server.", usage: "/leaderboard xp" },
      { name: "/setxp", description: "Manually set a user's XP amount.", usage: "/setxp <user> <amount>" },
      { name: "/resetxp", description: "Reset a user's XP back to zero.", usage: "/resetxp <user>" },
      { name: "/levelrole add", description: "Add a role reward for reaching a level.", usage: "/levelrole add <level> <role>" },
      { name: "/levelrole remove", description: "Remove a level role reward.", usage: "/levelrole remove <level>" },
      { name: "/levelcard", description: "Customize your personal rank card.", usage: "/levelcard [color]", premium: true },
    ],
  },
  {
    id: "music",
    label: "Music",
    icon: <Music className="w-4 h-4" />,
    color: "text-teal-400",
    commands: [
      { name: "/play", description: "Play a song from YouTube, Spotify, or SoundCloud.", usage: "/play <query>", premium: true },
      { name: "/pause", description: "Pause the currently playing song.", usage: "/pause", premium: true },
      { name: "/resume", description: "Resume the paused song.", usage: "/resume", premium: true },
      { name: "/skip", description: "Skip the current song.", usage: "/skip", premium: true },
      { name: "/stop", description: "Stop playback and clear the queue.", usage: "/stop", premium: true },
      { name: "/queue", description: "View the current music queue.", usage: "/queue", premium: true },
      { name: "/nowplaying", description: "Show the currently playing song.", usage: "/nowplaying", premium: true },
      { name: "/volume", description: "Adjust the playback volume.", usage: "/volume <1-100>", premium: true },
      { name: "/loop", description: "Toggle looping for the current song or queue.", usage: "/loop <song|queue|off>", premium: true },
      { name: "/shuffle", description: "Shuffle the current music queue.", usage: "/shuffle", premium: true },
    ],
  },
];

export default function Commands() {
  const [activeCategory, setActiveCategory] = useState("moderation");
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, []);

  const activeCat = categories.find((c) => c.id === activeCategory)!;

  const filtered = search.trim()
    ? categories.flatMap((cat) =>
        cat.commands
          .filter(
            (cmd) =>
              cmd.name.toLowerCase().includes(search.toLowerCase()) ||
              cmd.description.toLowerCase().includes(search.toLowerCase())
          )
          .map((cmd) => ({ ...cmd, category: cat.label, categoryColor: cat.color }))
      )
    : activeCat.commands.map((cmd) => ({ ...cmd, category: activeCat.label, categoryColor: activeCat.color }));

  const totalCommands = categories.reduce((acc, c) => acc + c.commands.length, 0);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/15 blur-[120px]" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:40px_40px]" />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 py-4">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium" data-testid="link-back-home">
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            </Link>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-3">
              <img src="/nexus-logo.png" alt="Nexus Logo" className="w-7 h-7 rounded-md" />
              <span className="font-bold text-lg text-white tracking-tight">Nexus Bot</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href={SUPPORT_LINK} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white/60 hover:text-white transition-colors hidden sm:block">
              Support
            </a>
            <a href={INVITE_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary hover:bg-primary/90 text-white border-0 rounded-full px-5 font-semibold" data-testid="button-invite">
                Add to Discord
              </Button>
            </a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-wider uppercase mb-6">
            <Terminal className="w-3 h-3" />
            Command Reference
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            All Commands
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {totalCommands} commands across {categories.length} categories. Everything Nexus Bot can do.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search commands..."
            className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-full focus-visible:ring-primary/50 text-base"
            data-testid="input-search-commands"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          {!search && (
            <aside className="lg:w-56 shrink-0">
              <div className="sticky top-24 space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    data-testid={`button-category-${cat.id}`}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      activeCategory === cat.id
                        ? "bg-primary/15 border border-primary/30 text-white"
                        : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={activeCategory === cat.id ? cat.color : "text-white/30 group-hover:text-white/60"}>
                        {cat.icon}
                      </span>
                      {cat.label}
                    </div>
                    <span className={`text-xs font-mono tabular-nums ${activeCategory === cat.id ? "text-primary" : "text-white/20 group-hover:text-white/40"}`}>
                      {cat.commands.length}
                    </span>
                  </button>
                ))}
              </div>
            </aside>
          )}

          {/* Commands List */}
          <main className="flex-1 min-w-0">
            {!search && (
              <div className="flex items-center gap-3 mb-6">
                <span className={activeCat.color}>{activeCat.icon}</span>
                <h2 className="text-xl font-bold text-white">{activeCat.label}</h2>
                <Badge variant="outline" className="border-white/10 text-white/40 font-mono text-xs ml-auto">
                  {activeCat.commands.length} commands
                </Badge>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-24 text-white/30">
                <Search className="w-10 h-10 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No commands found</p>
                <p className="text-sm mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map((cmd, i) => (
                  <div
                    key={i}
                    data-testid={`card-command-${i}`}
                    className="group flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-200"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-white text-sm group-hover:text-primary transition-colors">
                          {cmd.name}
                        </span>
                        {cmd.premium && (
                          <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-[10px] font-bold px-2 py-0 leading-5">
                            <Star className="w-2.5 h-2.5 mr-1 inline" />
                            Premium
                          </Badge>
                        )}
                        {search && (
                          <Badge variant="outline" className="border-white/10 text-white/30 text-[10px] px-2 py-0 leading-5">
                            {(cmd as any).category}
                          </Badge>
                        )}
                      </div>
                      <p className="text-white/50 text-sm mt-1 leading-relaxed">{cmd.description}</p>
                    </div>
                    <div className="shrink-0">
                      <code className="text-xs font-mono text-white/30 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg whitespace-nowrap block sm:inline-block">
                        {cmd.usage}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative z-10 border-t border-white/5 mt-16 py-12 text-center">
        <p className="text-white/50 mb-6 text-sm">Ready to use all {totalCommands} commands in your server?</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={INVITE_LINK} target="_blank" rel="noopener noreferrer">
            <Button className="bg-primary hover:bg-primary/90 text-white border-0 rounded-full px-8 h-11 font-bold" data-testid="button-invite-footer">
              Add Nexus to Discord
            </Button>
          </a>
          <a href={SUPPORT_LINK} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-full px-8 h-11 font-bold" data-testid="button-support-footer">
              Join Support Server
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
