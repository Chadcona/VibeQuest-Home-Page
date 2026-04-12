import { motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Disc3,
  Headphones,
  Mail,
  MapPin,
  Mic2,
  PartyPopper,
  Phone,
  Sparkles,
  Star,
  Users,
  Waves,
  Music2,
  Tent,
} from 'lucide-react';
import Scrollytelling from './components/Scrollytelling';
import MeshBackground from './components/MeshBackground';

gsap.registerPlugin(ScrollTrigger);

type ServicePackage = 'essentials' | 'signature' | 'premium';
type Addon = 'ceremony' | 'uplighting' | 'mc' | 'wireless-mics' | 'extra-hour';

type BookingFormState = {
  eventDate: string;
  eventType: string;
  venueName: string;
  venueCity: string;
  guestCount: number;
  servicePackage: ServicePackage;
  addons: Addon[];
  isReturningClient: boolean;
  previousYearRate: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes: string;
};

type AvailabilityDraft = {
  draft: boolean;
  review_required: boolean;
  isAvailable: boolean;
  demand: 'high' | 'normal';
  seasonBand: string;
  note: string;
  alternateSuggestions: string[];
};

type EstimateDraft = {
  draft: boolean;
  review_required: boolean;
  seasonBand: string;
  range: { min: number; max: number; currency: string };
  breakdown: {
    baseRate: number;
    addonTotal: number;
    seasonalMultiplier: number;
    guestMultiplier: number;
    returningSuggestedRate: number | null;
  };
  messaging: string;
};

const API_URL =
  (import.meta.env.VITE_BOOKING_API_URL as string | undefined) ||
  (import.meta.env.VITE_API_URL as string | undefined) ||
  'http://localhost:4000';

const initialForm: BookingFormState = {
  eventDate: '',
  eventType: 'Wedding',
  venueName: '',
  venueCity: 'Fernie',
  guestCount: 120,
  servicePackage: 'signature',
  addons: [],
  isReturningClient: false,
  previousYearRate: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  notes: '',
};

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'DJ Services' },
  { id: 'rentals', label: 'Equipment Rentals' },
  { id: 'vibequest', label: 'VibeQuest' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'booking', label: 'Contact / Booking' },
];

function toIsoDate(date: string) {
  return new Date(`${date}T00:00:00.000Z`).toISOString();
}

function sectionScroll(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingFormState>(initialForm);
  const [availability, setAvailability] = useState<AvailabilityDraft | null>(null);
  const [estimate, setEstimate] = useState<EstimateDraft | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadingEstimate, setLoadingEstimate] = useState(false);
  const [error, setError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      gsap.to(glowRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    if (headlineRef.current && heroRef.current) {
      gsap.fromTo(
        headlineRef.current,
        { scale: 1, opacity: 1 },
        {
          scale: 2.5,
          opacity: 0.12,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '44% top',
            scrub: true,
          },
        }
      );
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const recentEvents = useMemo(
    () => [
      { venue: 'Fernie Alpine Resort', type: 'Winter Après', crowd: '220+' },
      { venue: 'Lizard Creek Lodge', type: 'Wedding', crowd: '150+' },
      { venue: 'Bridge Bistro', type: 'Private Party', crowd: '90+' },
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        quote:
          'Flawless mix control all night and the room stayed full from first dance to last call.',
        name: 'K. McLeod',
        event: 'Wedding, Fernie',
      },
      {
        quote:
          'The request flow through VibeQuest made guests feel part of the set without disrupting vibe.',
        name: 'J. Rivera',
        event: 'Corporate Event, Elk Valley',
      },
      {
        quote:
          'Professional setup, fast communication, and incredible crowd reads.',
        name: 'S. Patel',
        event: 'Birthday Event, Sparwood',
      },
    ],
    []
  );

  const clips = useMemo(
    () => [
      { title: 'Dance Floor Lift-Off', length: '00:24', tag: 'Crowd Energy' },
      { title: 'First Dance Transition', length: '00:18', tag: 'Wedding Flow' },
      { title: 'Peak-Hour Request Run', length: '00:31', tag: 'VibeQuest Live' },
    ],
    []
  );

  async function fetchAvailabilityPreview() {
    if (!form.eventDate) return;
    const res = await fetch(`${API_URL}/api/booking/availability-preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventDate: toIsoDate(form.eventDate),
        venueCity: form.venueCity,
        eventType: form.eventType,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Availability preview failed');
    setAvailability(data);
  }

  async function fetchEstimatePreview() {
    if (!form.eventDate) return;
    setLoadingEstimate(true);
    try {
      const res = await fetch(`${API_URL}/api/booking/estimate-preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventDate: toIsoDate(form.eventDate),
          eventType: form.eventType,
          guestCount: Number(form.guestCount),
          servicePackage: form.servicePackage,
          addons: form.addons,
          isReturningClient: form.isReturningClient,
          previousYearRate: form.previousYearRate ? Number(form.previousYearRate) : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Estimate preview failed');
      setEstimate(data);
    } finally {
      setLoadingEstimate(false);
    }
  }

  async function submitInquiry() {
    setSubmitting(true);
    setError('');
    setSubmitSuccess('');

    try {
      const res = await fetch(`${API_URL}/api/booking/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventDate: toIsoDate(form.eventDate),
          eventType: form.eventType,
          venueName: form.venueName,
          venueCity: form.venueCity,
          guestCount: Number(form.guestCount),
          servicePackage: form.servicePackage,
          addons: form.addons,
          contactName: form.contactName,
          contactEmail: form.contactEmail,
          contactPhone: form.contactPhone,
          notes: form.notes,
          isReturningClient: form.isReturningClient,
          previousYearRate: form.previousYearRate ? Number(form.previousYearRate) : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not submit inquiry');

      setSubmitSuccess(
        `Inquiry submitted. Draft estimate: $${data.estimate.min} - $${data.estimate.max} ${
          data.estimate.currency || 'CAD'
        }. Final quote will be manually reviewed.`
      );
      setForm(initialForm);
      setEstimate(null);
      setAvailability(null);
      setStep(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  }

  function toggleAddon(addon: Addon) {
    setForm((prev) => ({
      ...prev,
      addons: prev.addons.includes(addon)
        ? prev.addons.filter((a) => a !== addon)
        : [...prev.addons, addon],
    }));
  }

  async function onNextStep() {
    setError('');
    if (step === 1) {
      if (!form.eventDate || !form.venueCity || !form.eventType || !form.guestCount) {
        setError('Please complete all event basics before continuing.');
        return;
      }
      try {
        await fetchAvailabilityPreview();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load availability preview.');
        return;
      }
    }

    if (step === 3) {
      if (!form.contactName || !form.contactEmail) {
        setError('Please add contact name and email before previewing your estimate.');
        return;
      }
      try {
        await fetchEstimatePreview();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load estimate preview.');
        return;
      }
    }

    setStep((prev) => Math.min(prev + 1, 4));
  }

  function onPrevStep() {
    setError('');
    setStep((prev) => Math.max(prev - 1, 1));
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/25 font-body overflow-x-hidden">
      <MeshBackground />
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[560px] h-[560px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[5]"
        style={{ background: 'radial-gradient(circle, rgba(24,168,173,0.13) 0%, transparent 70%)' }}
      />
      <Scrollytelling frameCount={240} />

      <div className="relative z-10">
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b1117]/75 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-5">
            <button onClick={() => sectionScroll('home')} className="text-left cursor-pointer">
              <p className="text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-brand)' }}>
                DJ Cona
              </p>
              <p className="text-[11px] tracking-[0.2em] uppercase text-foreground/60">Fernie • BC</p>
            </button>
            <div className="hidden lg:flex items-center gap-4 text-sm">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => sectionScroll(item.id)}
                  className="text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => sectionScroll('booking')}
              className="rounded-full px-5 py-2.5 text-sm font-bold text-black bg-accent hover:scale-[1.03] transition-transform cursor-pointer"
            >
              Check Date
            </button>
          </div>
        </nav>

        <section id="home" ref={heroRef} className="min-h-[220vh] px-6">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-1.5 rounded-full border border-accent/35 bg-accent/10 text-[10px] uppercase tracking-[0.2em] font-bold text-accent mb-8"
            >
              Cinematic DJ Performance + Event Intelligence
            </motion.div>

            <h1
              ref={headlineRef}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.05em] leading-[0.84] text-transparent bg-clip-text"
              style={{ backgroundImage: 'var(--gradient-brand)' }}
            >
              DJ Cona
            </h1>

            <p className="mt-7 max-w-3xl text-lg sm:text-xl text-foreground/78">
              25 years behind the decks in Fernie. Weddings, private events, and high-energy rooms with clean execution,
              crowd-first sequencing, and live request control through VibeQuest.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => sectionScroll('booking')}
                className="rounded-full px-10 py-4 text-base font-extrabold text-black bg-accent shadow-[0_0_50px_rgba(24,168,173,0.35)] hover:scale-[1.06] transition-transform cursor-pointer"
              >
                Build My Event Quote <ChevronRight className="inline-block ml-1 w-5 h-5" />
              </button>
              <button
                onClick={() => sectionScroll('reviews')}
                className="rounded-full px-8 py-4 text-base font-bold border border-white/20 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Watch Event Proof
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">
              {recentEvents.map((event) => (
                <div key={event.venue} className="glass-card rounded-2xl p-4 text-left">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/55">{event.type}</p>
                  <p className="font-semibold mt-1">{event.venue}</p>
                  <p className="text-sm text-foreground/65 mt-1">{event.crowd} guests</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-8">
            <article className="glass-card rounded-3xl p-8">
              <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">About</p>
              <h2 className="text-4xl font-black mt-3">Built for dance floors that need precision.</h2>
              <p className="mt-5 text-foreground/75 leading-relaxed">
                DJ Cona blends open-format energy, deep catalog control, and event pacing built from two decades of live rooms.
                Every set is engineered around your timeline, venue acoustics, and crowd profile.
              </p>
            </article>
            <article className="glass-card rounded-3xl p-8">
              <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Core Promise</p>
              <ul className="mt-4 space-y-3 text-foreground/80">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Timeline-safe event transitions</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Smart crowd reads + adaptable sets</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Professional audio + lighting options</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Human-reviewed pricing and planning</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="services" className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-4xl sm:text-5xl font-black">DJ Services</h2>
          <p className="text-foreground/65 mt-3">Three service tracks matched to event complexity and room energy.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="glass-card rounded-3xl p-7">
              <PartyPopper className="w-7 h-7 text-accent" />
              <h3 className="text-2xl font-bold mt-5">Essentials</h3>
              <p className="mt-3 text-foreground/70">Clean setup, polished open-format set, and managed request flow.</p>
            </div>
            <div className="glass-card rounded-3xl p-7 border border-accent/40">
              <Sparkles className="w-7 h-7 text-accent" />
              <h3 className="text-2xl font-bold mt-5">Signature</h3>
              <p className="mt-3 text-foreground/70">Enhanced programming, MC support options, and deeper floor engagement.</p>
            </div>
            <div className="glass-card rounded-3xl p-7">
              <Disc3 className="w-7 h-7 text-accent" />
              <h3 className="text-2xl font-bold mt-5">Premium</h3>
              <p className="mt-3 text-foreground/70">Full-event direction with advanced transitions and expanded production polish.</p>
            </div>
          </div>
        </section>

        <section id="rentals" className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-4xl sm:text-5xl font-black">Equipment Rentals</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            <div className="glass-card rounded-2xl p-6">
              <Waves className="w-6 h-6 text-accent" />
              <p className="font-bold mt-4">PA + Sub Package</p>
              <p className="text-foreground/65 text-sm mt-2">Venue-calibrated sound for indoor and outdoor events.</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <Tent className="w-6 h-6 text-accent" />
              <p className="font-bold mt-4">Wireless Mic Kit</p>
              <p className="text-foreground/65 text-sm mt-2">Ceremony speeches, emcee control, and formal moments.</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <Music2 className="w-6 h-6 text-accent" />
              <p className="font-bold mt-4">Ambient Lighting</p>
              <p className="text-foreground/65 text-sm mt-2">Uplighting presets to match venue color story and energy arc.</p>
            </div>
          </div>
        </section>

        <section id="vibequest" className="max-w-7xl mx-auto px-6 py-20">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/55">VibeQuest Integration</p>
            <h2 className="text-4xl sm:text-5xl font-black mt-4">Audience interaction without killing momentum.</h2>
            <p className="text-foreground/72 mt-4 max-w-3xl">
              Guests scan once, submit requests, and boost songs live. The queue stays organized so you keep command of flow,
              while guests feel heard in real time.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <div className="chip"><Users className="w-4 h-4" /> Live request moderation</div>
              <div className="chip"><Headphones className="w-4 h-4" /> Tip + boost prioritization</div>
              <div className="chip"><Mic2 className="w-4 h-4" /> Venue-specific QR onboarding</div>
            </div>
          </div>
        </section>

        <section id="reviews" className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-4xl sm:text-5xl font-black">Reviews + Event Clips</h2>
          <p className="text-foreground/65 mt-3">Social proof from live rooms, not stock promises.</p>

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <article key={t.name + t.event} className="glass-card rounded-2xl p-6">
                <Star className="w-5 h-5 text-accent" />
                <p className="mt-4 text-foreground/80 leading-relaxed">"{t.quote}"</p>
                <p className="mt-5 font-semibold">{t.name}</p>
                <p className="text-sm text-foreground/55">{t.event}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {clips.map((clip) => (
              <article key={clip.title} className="glass-card rounded-2xl p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-foreground/55">{clip.tag}</p>
                <p className="font-bold text-lg mt-3">{clip.title}</p>
                <p className="text-sm text-foreground/60 mt-2">Clip length: {clip.length}</p>
                <button className="mt-5 text-accent font-semibold text-sm">Attach clip URL before launch</button>
              </article>
            ))}
          </div>
        </section>

        <section id="booking" className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
            <article className="glass-card rounded-3xl p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/55">Contact / Booking</p>
              <h2 className="text-4xl sm:text-5xl font-black mt-3">Build your event quote</h2>
              <p className="mt-4 text-foreground/72">
                You will get a draft range instantly, then a final quote after manual review.
              </p>

              <div className="mt-8 flex gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className={`step-pill ${step >= n ? 'step-pill--active' : ''}`}>Step {n}</div>
                ))}
              </div>

              {step === 1 && (
                <div className="mt-7 space-y-4">
                  <label className="field">
                    Event Date
                    <input type="date" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} />
                  </label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="field">
                      Event Type
                      <select value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })}>
                        <option>Wedding</option>
                        <option>Private Party</option>
                        <option>Corporate</option>
                        <option>Festival / Public</option>
                      </select>
                    </label>
                    <label className="field">
                      Guest Count
                      <input
                        type="number"
                        min={1}
                        max={10000}
                        value={form.guestCount}
                        onChange={(e) => setForm({ ...form, guestCount: Number(e.target.value || 0) })}
                      />
                    </label>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="field">
                      Venue Name
                      <input value={form.venueName} onChange={(e) => setForm({ ...form, venueName: e.target.value })} placeholder="Snow Valley Lodge" />
                    </label>
                    <label className="field">
                      City
                      <input value={form.venueCity} onChange={(e) => setForm({ ...form, venueCity: e.target.value })} placeholder="Fernie" />
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="mt-7 space-y-4">
                  <label className="field">
                    Service Package
                    <select
                      value={form.servicePackage}
                      onChange={(e) => setForm({ ...form, servicePackage: e.target.value as ServicePackage })}
                    >
                      <option value="essentials">Essentials</option>
                      <option value="signature">Signature</option>
                      <option value="premium">Premium</option>
                    </select>
                  </label>

                  <div>
                    <p className="text-sm font-semibold text-foreground/85">Add-ons</p>
                    <div className="mt-3 grid sm:grid-cols-2 gap-3">
                      {[
                        { key: 'ceremony', label: 'Ceremony Audio' },
                        { key: 'uplighting', label: 'Uplighting' },
                        { key: 'mc', label: 'MC Support' },
                        { key: 'wireless-mics', label: 'Wireless Mic Kit' },
                        { key: 'extra-hour', label: 'Extra Performance Hour' },
                      ].map((addon) => (
                        <button
                          key={addon.key}
                          type="button"
                          onClick={() => toggleAddon(addon.key as Addon)}
                          className={`addon-btn ${form.addons.includes(addon.key as Addon) ? 'addon-btn--active' : ''}`}
                        >
                          {addon.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="inline-flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={form.isReturningClient}
                      onChange={(e) => setForm({ ...form, isReturningClient: e.target.checked })}
                    />
                    Returning annual client
                  </label>

                  {form.isReturningClient && (
                    <label className="field">
                      Last Year's Rate (CAD)
                      <input
                        type="number"
                        min={0}
                        value={form.previousYearRate}
                        onChange={(e) => setForm({ ...form, previousYearRate: e.target.value })}
                        placeholder="Optional"
                      />
                    </label>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="mt-7 space-y-4">
                  <label className="field">
                    Full Name
                    <input value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} />
                  </label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="field">
                      Email
                      <input
                        type="email"
                        value={form.contactEmail}
                        onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                      />
                    </label>
                    <label className="field">
                      Phone
                      <input value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} />
                    </label>
                  </div>
                  <label className="field">
                    Event Notes
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      rows={4}
                      placeholder="Timeline, music direction, and key moments."
                    />
                  </label>
                </div>
              )}

              {step === 4 && (
                <div className="mt-7 space-y-4">
                  {loadingEstimate && <p className="text-foreground/65">Loading estimate preview...</p>}
                  {estimate && (
                    <div className="glass-sub rounded-2xl p-5 space-y-3">
                      <p className="text-sm uppercase tracking-[0.15em] text-foreground/55">Estimate Preview</p>
                      <p className="text-3xl font-black">
                        ${estimate.range.min} - ${estimate.range.max} {estimate.range.currency}
                      </p>
                      <p className="text-sm text-foreground/70">Season band: {estimate.seasonBand}</p>
                      <p className="text-sm text-foreground/72">{estimate.messaging}</p>
                    </div>
                  )}
                  {availability && (
                    <div className="glass-sub rounded-2xl p-5">
                      <p className="font-semibold">
                        Availability Draft: {availability.isAvailable ? 'Likely open' : 'Potential conflict'}
                      </p>
                      <p className="text-sm text-foreground/68 mt-2">{availability.note}</p>
                    </div>
                  )}
                  <button
                    onClick={submitInquiry}
                    disabled={submitting}
                    className="rounded-xl px-6 py-3 font-bold text-black bg-accent disabled:opacity-60 cursor-pointer"
                  >
                    {submitting ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                </div>
              )}

              {error && <p className="mt-4 text-sm text-[#ff8f8f]">{error}</p>}
              {submitSuccess && <p className="mt-4 text-sm text-[#78f2cb]">{submitSuccess}</p>}

              <div className="mt-6 flex items-center gap-3">
                <button type="button" disabled={step === 1} onClick={onPrevStep} className="ghost-btn cursor-pointer">
                  Back
                </button>
                {step < 4 && (
                  <button type="button" onClick={onNextStep} className="primary-btn cursor-pointer">
                    Continue
                  </button>
                )}
              </div>
            </article>

            <aside className="glass-card rounded-3xl p-8">
              <h3 className="text-2xl font-bold">What happens next</h3>
              <ul className="mt-5 space-y-3 text-foreground/75">
                <li className="flex gap-3"><CalendarDays className="w-5 h-5 text-accent" /> Draft availability + seasonal estimate generated instantly.</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Human review confirms logistics and final pricing.</li>
                <li className="flex gap-3"><MapPin className="w-5 h-5 text-accent" /> Event plan is finalized with your venue/timeline details.</li>
              </ul>

              <div className="mt-8 space-y-3 text-sm text-foreground/74">
                <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent" /> bookings@djcona.com</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent" /> +1 (250) 000-0000</p>
              </div>
            </aside>
          </div>
        </section>

        <footer className="py-12 border-t border-white/10 text-center px-6">
          <p className="text-2xl font-black text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-brand)' }}>
            DJ Cona
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-foreground/40 mt-3">Cinematic performance. Human-reviewed booking intelligence.</p>
        </footer>
      </div>
    </div>
  );
}
