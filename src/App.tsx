import { motion } from "motion/react";
import Scrollytelling from "./components/Scrollytelling";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      {/* Scrollytelling Layer (Fixed Background) */}
      <Scrollytelling frameCount={240} />

      {/* Content Layer (Stays relative/stacked on top of Scrollytelling) */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex row justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-1">
            <span className="text-3xl tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Velorah<sup className="text-xs ml-0.5">®</sup>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-white transition-colors">Home</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Studio</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">About</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Journal</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Reach Us</a>
          </div>

          <button className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03] transition-transform cursor-pointer">
            Begin Journey
          </button>
        </nav>

        {/* Hero Section */}
        <main className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px] max-w-7xl mx-auto min-h-[500vh]">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
            <h1 
              className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Where <em className="not-italic text-muted-foreground">dreams</em> rise <br className="hidden sm:block" />
              <em className="not-italic text-muted-foreground">through the silence.</em>
            </h1>

            <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
              We're designing tools for deep thinkers, bold creators, and quiet rebels. 
              Amid the chaos, we build digital spaces for sharp focus and inspired work.
            </p>

            <button className="animate-fade-rise-delay-2 liquid-glass rounded-full px-14 py-5 text-base text-white mt-12 hover:scale-[1.03] transition-transform cursor-pointer">
              Begin Journey
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

