import {
  ArrowRight,
  BadgeCheck,
  Play,
  QrCode,
  Share2,
  Sparkles,
  Ticket,
  Wallet,
} from 'lucide-react';

const steps = [
  {
    title: 'What the crowd sees',
    copy: 'A branded request page guests can scan, use fast, and understand instantly.',
  },
  {
    title: 'What the DJ gets',
    copy: 'A cleaner live workflow for requests, boosts, and crowd signals in one place.',
  },
  {
    title: 'What gets shared',
    copy: 'Patron-facing payoff moments that can turn a live interaction into social proof.',
  },
];

const proofSurfaces = [
  {
    label: 'Crowd Surface',
    title: 'Request page that feels fast and obvious on mobile',
    copy: 'The homepage should show the product where it starts: a guest landing on a clean phone-first request flow.',
  },
  {
    label: 'DJ Surface',
    title: 'Operator-side signal for real room decisions',
    copy: 'Requests, boosts, and live feedback need to feel like useful DJ workflow, not novelty UI.',
  },
  {
    label: 'Share Surface',
    title: 'A payoff artifact worth talking about later',
    copy: 'The Patron Badge moment is where the experience becomes more than just a request form.',
  },
];

const growthPoints = [
  'Launch one branded DJ page instead of juggling loose QR tools.',
  'Capture requests, tips, and crowd moments in the same product loop.',
  'Turn the payoff into a reusable proof asset for referrals and social sharing.',
];

const questions = [
  {
    question: 'Is this only for big events?',
    answer: 'No. The homepage should position VibeQuest as useful anywhere DJs want a cleaner request and engagement loop.',
  },
  {
    question: 'Do we need motion to ship the page?',
    answer: 'No. The future Remotion proof block is planned, but the layout is designed to stand on strong screenshots first.',
  },
  {
    question: 'What makes this different from a generic request tool?',
    answer: 'The strongest story is the full loop: request page, live boost/tip signal, DJ-side value, and a shareable payoff moment.',
  },
];

function Header() {
  return (
    <header className="site-header">
      <div className="shell nav-row">
        <a href="#top" className="brand-mark" aria-label="VibeQuest home">
          <span className="brand-mark__dot" />
          <span>VibeQuest</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          <a href="#proof">Proof</a>
          <a href="#motion">Motion</a>
          <a href="#growth">Growth</a>
          <a href="#faq">FAQ</a>
        </nav>

        <a href="#cta" className="button button--ghost button--small">
          View live proof
        </a>
      </div>
    </header>
  );
}

function PhonePreview() {
  return (
    <div className="device-stack">
      <div className="phone-preview">
        <div className="phone-preview__topbar" />
        <div className="phone-preview__hero">
          <div>
            <p className="preview-eyebrow">Neon Theory</p>
            <h3>Request a song</h3>
          </div>
          <span className="preview-pill">Live queue</span>
        </div>
        <div className="phone-preview__card phone-preview__card--highlight">
          <p>Midnight City</p>
          <span>Boosted request</span>
        </div>
        <div className="phone-preview__card">
          <p>Heads Will Roll</p>
          <span>Added by guest</span>
        </div>
        <div className="phone-preview__card">
          <p>Feel So Close</p>
          <span>Queued for later</span>
        </div>
        <div className="phone-preview__footer">
          <button>Tip + boost</button>
          <button className="ghost">Share</button>
        </div>
      </div>

      <div className="desktop-preview">
        <div className="desktop-preview__bar" />
        <div className="desktop-preview__grid">
          <div className="desktop-preview__panel desktop-preview__panel--dark">
            <p className="preview-eyebrow">DJ signal</p>
            <strong>Requests + boosts</strong>
            <div className="desktop-preview__list">
              <span>Midnight City</span>
              <span>Tip: $10</span>
            </div>
            <div className="desktop-preview__list">
              <span>Heads Will Roll</span>
              <span>Votes: +4</span>
            </div>
          </div>
          <div className="desktop-preview__panel">
            <p className="preview-eyebrow">Shareable payoff</p>
            <strong>Patron Badge</strong>
            <div className="badge-card">
              <Sparkles size={18} />
              <span>Your request made the set</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MotionPlaceholder() {
  return (
    <div className="motion-frame">
      <div className="motion-frame__header">
        <span className="motion-frame__label">Planned premium proof asset</span>
        <span className="motion-frame__meta">Remotion mini-story</span>
      </div>
      <div className="motion-frame__body">
        <div className="motion-step">
          <QrCode size={18} />
          <span>Phone request page</span>
        </div>
        <div className="motion-step">
          <Wallet size={18} />
          <span>Boost / tip moment</span>
        </div>
        <div className="motion-step">
          <Ticket size={18} />
          <span>DJ-side payoff</span>
        </div>
        <div className="motion-step">
          <Share2 size={18} />
          <span>Shareable outcome</span>
        </div>
      </div>
      <div className="motion-frame__footer">
        <Play size={16} />
        <span>Future 8-15 second product walkthrough slot</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="page-shell" id="top">
      <Header />

      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <p className="eyebrow">Live song requests, tips, and crowd moments for DJs.</p>
            <h1>Launch your QR request page.</h1>
            <p className="hero-copy__body">
              VibeQuest helps DJs collect live song requests, tips, and crowd moments from one branded page.
            </p>
            <div className="hero-actions">
              <a href="#cta" className="button button--primary">
                Start your DJ page
                <ArrowRight size={16} />
              </a>
              <a href="#proof" className="button button--ghost">
                View live proof
              </a>
            </div>
            <div className="hero-notes">
              <span>Screenshot-first hero</span>
              <span>Simple structure</span>
              <span>Future motion slot</span>
            </div>
          </div>

          <div className="hero-proof">
            <div className="proof-window">
              <div className="proof-window__header">
                <span>Working proof surface</span>
                <span>Neon Theory demo flow</span>
              </div>
              <PhonePreview />
            </div>
          </div>
        </section>

        <section className="section shell section--steps">
          <div className="section-heading">
            <p className="eyebrow">Fast explanation</p>
            <h2>The product story should read in one pass.</h2>
          </div>
          <div className="step-grid">
            {steps.map((step) => (
              <article key={step.title} className="surface-card surface-card--soft">
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell section--dark-zone" id="proof">
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Core proof</p>
              <h2>Show the actual loop, not abstract feature energy.</h2>
            </div>
            <p className="section-copy">
              The homepage gets stronger when the proof moves from crowd-facing entry, to DJ-side value, to a payoff people remember later.
            </p>
          </div>
          <div className="proof-grid">
            {proofSurfaces.map((surface, index) => (
              <article key={surface.title} className="surface-card">
                <div className="surface-card__top">
                  <span className="surface-card__index">0{index + 1}</span>
                  <span className="surface-card__label">{surface.label}</span>
                </div>
                <h3>{surface.title}</h3>
                <p>{surface.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell shell--motion section--dark-zone" id="motion">
          <div className="surface-band">
            <div className="section-heading">
              <p className="eyebrow">Future motion block</p>
              <h2>One polished mini-story belongs here later, not a full-page cinematic treatment.</h2>
              <p className="section-copy section-copy--narrow">
                The layout stays strong without motion, but it is ready for a Remotion walkthrough that jumps from phone UI to DJ UI and lands on a shareable outcome.
              </p>
            </div>
            <MotionPlaceholder />
          </div>
        </section>

        <section className="section shell section--dark-zone" id="growth">
          <div className="growth-layout">
            <article className="surface-card surface-card--dark">
              <p className="eyebrow eyebrow--dark">Operator value</p>
              <h2>Make the product feel useful to working DJs, not just cool to look at.</h2>
              <ul className="feature-list">
                {growthPoints.map((point) => (
                  <li key={point}>
                    <BadgeCheck size={18} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="surface-card surface-card--soft surface-card--artifact">
              <p className="eyebrow">Viral payoff</p>
              <h3>Patron Badge is the memorable moment.</h3>
              <p>
                This is the section that can carry a little more drama later, because it is the most differentiated piece of the loop.
              </p>
              <div className="artifact-preview">
                <Sparkles size={20} />
                <div>
                  <strong>Your request made the night</strong>
                  <span>Shareable artifact placeholder for the next proof pass.</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section shell" id="faq">
          <div className="section-heading">
            <p className="eyebrow">Clarity</p>
            <h2>Answer the obvious questions without over-explaining.</h2>
          </div>
          <div className="faq-list">
            {questions.map((item) => (
              <article key={item.question} className="surface-card surface-card--soft">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell" id="cta">
          <div className="cta-panel">
            <div>
              <p className="eyebrow">Final CTA</p>
              <h2>Build the page around proof now. Upgrade the assets next.</h2>
              <p className="section-copy section-copy--narrow">
                The structure is designed to ship with strong screenshots first, then get better as motion assets and cleaner demo captures come online.
              </p>
            </div>
            <div className="cta-panel__actions">
              <a href="#top" className="button button--primary">
                Start your DJ page
                <ArrowRight size={16} />
              </a>
              <a href="#motion" className="button button--ghost">
                See proof plan
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
