import { motion } from "motion/react";
import Scrollytelling from "./components/Scrollytelling";
import { 
  Music, 
  Zap, 
  QrCode, 
  ExternalLink, 
  MessageCircle, 
  Users,
  ChevronRight,
  Monitor,
  Layout,
  TrendingUp
} from "lucide-react";

export default function App() {
  const features = [
    {
      title: "Song Requests",
      description: "Patrons search Spotify and submit requests to your live queue in seconds.",
      icon: <Music className="w-5 h-5 text-purple-400" />
    },
    {
      title: "Tips & Boosts",
      description: "Stripe-powered tipping lets fans rocket their requests to the top.",
      icon: <Zap className="w-5 h-5 text-purple-400" />
    },
    {
      title: "QR Code Access",
      description: "Share your unique code — patrons scan once and start requesting.",
      icon: <QrCode className="w-5 h-5 text-purple-400" />
    },
    {
      title: "Link Promotion",
      description: "Drive traffic to your Spotify, YouTube, or Socials with custom link cards.",
      icon: <ExternalLink className="w-5 h-5 text-purple-400" />
    },
    {
      title: "Social Interaction",
      description: "Chat, reactions, and live feedback from your audience in real-time.",
      icon: <MessageCircle className="w-5 h-5 text-purple-400" />
    },
    {
      title: "Collect Emails",
      description: "Grow your fanbase by collecting fan emails directly through the platform.",
      icon: <Users className="w-5 h-5 text-purple-400" />
    }
  ];

  const steps = [
    {
      id: "01",
      title: "Connect",
      description: "Link your Spotify and Stripe accounts to get started in minutes.",
      icon: <Monitor className="w-6 h-6" />
    },
    {
      id: "02",
      title: "Customize",
      description: "Design your page, set request prices, and launch your VibeQuest.",
      icon: <Layout className="w-6 h-6" />
    },
    {
      id: "03",
      title: "Grow",
      description: "Track earnings, build your fan list, and engage like never before.",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-body overflow-x-hidden">
      {/* Scrollytelling Layer (Fixed Background) */}
      <Scrollytelling frameCount={240} />

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto blur-load">
          <div className="flex items-center gap-1">
            <span 
              className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent"
              style={{ backgroundImage: 'var(--gradient-silver)' }}
            >
              VibeQuest<sup className="text-[10px] ml-0.5 opacity-50">TM</sup>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hidden md:block text-sm font-medium hover:text-purple-400 transition-colors">Log In</a>
            <button className="liquid-glass rounded-full px-6 py-2.5 text-sm font-semibold text-white hover:scale-[1.03] transition-all cursor-pointer">
              Get Started Free
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex flex-col items-center justify-center min-h-[300vh] px-6">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
            {/* dynamic Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-[10px] uppercase tracking-[0.2em] font-bold text-purple-400 mb-8"
            >
              Live DJ Experience Platform
            </motion.div>

            <h1 
              className="animate-fade-rise text-7xl sm:text-8xl md:text-9xl font-black tracking-[-0.04em] leading-[0.85] bg-clip-text text-transparent pb-4"
              style={{ backgroundImage: 'var(--gradient-brand)' }}
            >
              VibeQuest
            </h1>

            <p className="animate-fade-rise-delay text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mt-6 font-medium">
              Real-time song requests, tipping, and crowd interaction for DJs. <br className="hidden sm:block" />
              <span className="text-white/40">Your audience picks the vibe — you control the decks.</span>
            </p>

            <div className="animate-fade-rise-delay-2 flex flex-col sm:flex-row items-center gap-4 mt-12">
              <button 
                className="rounded-full px-10 py-5 text-lg font-bold text-white transition-all transform hover:scale-[1.05] shadow-[0_0_40px_rgba(168,85,247,0.3)]"
                style={{ backgroundImage: 'var(--gradient-cta)' }}
              >
                Get Started Free <ChevronRight className="inline-block ml-1 w-5 h-5" />
              </button>
              <button className="liquid-glass border border-white/10 rounded-full px-10 py-5 text-lg font-bold text-white hover:bg-white/5 transition-all">
                Login
              </button>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section className="relative py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20 px-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Everything your crowd needs</h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">One link, one QR code — full engagement for every show.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="liquid-glass p-8 rounded-3xl group border border-white/5 hover:border-purple-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="relative py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">How it works</h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">Launch your personal VibeQuest in minutes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection Lines (Desktop Only) */}
            <div className="hidden md:block absolute top-[2.25rem] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
            
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full liquid-glass border border-white/10 flex items-center justify-center mb-8 relative font-bold text-purple-400">
                  {step.icon}
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center text-[10px] text-white border-4 border-black">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-white/40 text-base leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Area */}
        <section className="relative py-40 px-6 overflow-hidden">
          <div className="max-w-5xl mx-auto rounded-[3rem] overflow-hidden p-[1px] bg-gradient-to-r from-purple-500/50 to-blue-500/50">
            <div className="bg-black/90 backdrop-blur-3xl rounded-[3rem] px-8 py-20 text-center relative">
              <div className="absolute inset-0 bg-purple-600/10 blur-[120px] rounded-full" />
              <h2 className="text-4xl sm:text-6xl font-black mb-10 relative z-10">Start your VibeQuest <br/>for free today.</h2>
              <button 
                className="relative z-10 rounded-full px-12 py-5 text-xl font-bold text-white transition-all transform hover:scale-[1.1] shadow-[0_0_60px_rgba(168,85,247,0.4)]"
                style={{ backgroundImage: 'var(--gradient-cta)' }}
              >
                Get Started Free
              </button>
            </div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="py-12 border-t border-white/5 text-center px-6">
          <div 
            className="text-xl font-bold tracking-tighter bg-clip-text text-transparent mb-6"
            style={{ backgroundImage: 'var(--gradient-silver)' }}
          >
            VibeQuest
          </div>
          <p className="text-white/20 text-xs tracking-widest uppercase">© 2026 VibeQuest. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
