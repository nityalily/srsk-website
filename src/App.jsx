import { useEffect, useRef, useState } from 'react'

function App() {
  return (
    <div className="site">
      <Header />
      <main>
        <HeroQuote />
        <ProductTiles />
        <HowItWorks />
        <StatsStrip />
        <TestimonialsCarousel />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef(null)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const setHeaderVar = () => {
      const el = headerRef.current
      if (el) {
        const h = el.getBoundingClientRect().height
        document.documentElement.style.setProperty('--header-h', `${Math.round(h)}px`)
      }
    }
    setHeaderVar()
    window.addEventListener('resize', setHeaderVar)
    return () => window.removeEventListener('resize', setHeaderVar)
  }, [])
  return (
    <header ref={headerRef} className={`header ${scrolled ? 'header--light' : 'header--dark'}`}>
      <div className="container header__inner">
        <a href="#" className="brand" aria-label="SRSK Insurance home">
          <span className="brand__logo" aria-hidden="true">🛡️</span>
          <span className="brand__name">SRSK Insurance Agency</span>
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="#" className="nav__link">Insurance</a>
          <a href="#" className="nav__link">Claims</a>
          <a href="#" className="nav__link">Customer Support</a>
          <a href="#" className="nav__link">Resources</a>
        </nav>
        <div className="header__actions">
          <button className="btn btn--primary">Get a quote</button>
        </div>
      </div>
    </header>
  )
}

function HeroQuote() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">Protect your legacy</h1>
          <p className="hero__sub">Personalized coverage for every chapter of life.</p>
          <button className="btn btn--accent hero__cta">Let's get started</button>
        </div>
        <div className="hero__art" aria-hidden="true">
          <div className="card-stack">
            <div className="card-stack__back" aria-hidden="true" />
            <div className="hero__placeholder">
              <img className="hero__img" src="/img/hero_ppl.jpeg" alt="" aria-hidden="true" loading="eager" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Trust strip removed per request

function ProductTiles() {
  const tiles = [
    { label: 'Auto', body: 'Smart coverage for your daily drive.', icon: CarIcon },
    { label: 'Home', body: 'Protect the place you call home.', icon: HomeIcon },
    { label: 'Renters', body: 'Cover what you own inside your space.', icon: KeyIcon },
    { label: 'Condo', body: 'Tailored protection for condo living.', icon: BuildingIcon },
    { label: 'Motorcycle', body: 'Ride with confidence and support.', icon: BikeIcon },
    { label: 'Pet', body: 'Care for your best friend’s health.', icon: PawIcon },
  ]
  return (
    <section className="tiles">
      <div className="container">
        <h2 className="section-title">Find coverage for your life</h2>
        <div className="tiles__grid">
          {tiles.map(({ label, body, icon: Icon }) => (
            <a key={label} href="#" className="tile" aria-label={`${label} insurance`}>
              <span className="tile__circle" aria-hidden="true"><Icon /></span>
              <h3 className="tile__title">{label}</h3>
              <p className="tile__body">{body}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ValueProps() {
  const items = [
    {
      title: 'Bundle for better value',
      body: 'Combine policies to unlock multi‑policy discounts and simpler billing.'
    },
    {
      title: 'Support when you need it',
      body: '24/7 claims support and guidance from licensed experts.'
    },
    {
      title: 'Coverage that fits',
      body: 'Customize deductibles and add‑ons to match your budget.'
    }
  ]
  return (
    <section className="values">
      <div className="container values__inner">
        <h2 className="section-title">Why choose SRSK</h2>
        <div className="values__grid">
          {items.map((it) => (
            <div key={it.title} className="card">
              <h3 className="card__title">{it.title}</h3>
              <p className="card__body">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { n: 1, title: 'Get a quote', body: 'Tell us a bit about yourself and what you need.' },
    { n: 2, title: 'Customize coverage', body: 'Adjust limits and options to fit your life and budget.' },
    { n: 3, title: 'Activate policy', body: 'Finalize in minutes and manage everything online.' },
  ]
  return (
    <section className="how">
      <div className="container how__inner">
        <h2 className="section-title">How it works</h2>
        <div className="how__grid">
          {steps.map(s => (
            <div key={s.n} className="how__step card">
              <div className="how__badge">{s.n}</div>
              <h3 className="how__title">{s.title}</h3>
              <p className="how__body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatsStrip() {
  const stats = [
    { value: '98%', label: 'Claims satisfaction' },
    { value: '24/7', label: 'Support availability' },
    { value: '50+', label: 'Coverage options' },
  ]
  return (
    <section className="stats">
      <div className="container stats__grid">
        {stats.map(s => (
          <div key={s.label} className="stat">
            <div className="stat__value">{s.value}</div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function TestimonialsCarousel() {
  const items = [
    { text: '“Our advisor made everything simple, and the policy gives us peace of mind.”', meta: 'Jordan M. • Policyholder' },
    { text: '“Fast quote, fair price, and excellent support when I needed it.”', meta: 'Priya R. • Driver' },
    { text: '“Bundling saved us money and simplified our billing.”', meta: 'Sam & Lee • Homeowners' },
  ]
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI(prev => (prev + 1) % items.length), 5000)
    return () => clearInterval(id)
  }, [items.length])
  const prev = () => setI((i - 1 + items.length) % items.length)
  const next = () => setI((i + 1) % items.length)
  return (
    <section className="carousel">
      <div className="container carousel__inner">
        <div className="carousel__track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {items.map((t, idx) => (
            <figure key={idx} className="carousel__card">
              <blockquote className="carousel__quote">{t.text}</blockquote>
              <figcaption className="carousel__meta">{t.meta}</figcaption>
            </figure>
          ))}
        </div>
        <div className="carousel__controls">
          <button className="btn btn--ghost" onClick={prev} aria-label="Previous testimonial">‹</button>
          <div className="carousel__dots">
            {items.map((_, idx) => (
              <button key={idx} className={"dot" + (idx === i ? ' is-active' : '')} onClick={() => setI(idx)} aria-label={`Go to slide ${idx + 1}`} />
            ))}
          </div>
          <button className="btn btn--ghost" onClick={next} aria-label="Next testimonial">›</button>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    { q: 'How do I get a quote?', a: 'Start with your ZIP and product. You can customize coverage and see pricing in minutes.' },
    { q: 'Can I bundle policies?', a: 'Yes. Bundling home and auto (and more) can unlock additional discounts.' },
    { q: 'How do claims work?', a: 'You can file and track claims online 24/7, with support from licensed experts.' },
    { q: 'Can I change coverage later?', a: 'Absolutely. Manage your policy, adjust limits, and update billing any time.' },
    { q: 'Do quotes affect my credit?', a: 'No. Getting a quote here does not impact your credit score.' },
  ]
  return (
    <section className="faq">
      <div className="container faq__inner">
        <h2 className="section-title">FAQs</h2>
        <div className="faq__list">
          {faqs.map((f, idx) => (
            <details key={idx} className="faq__item">
              <summary className="faq__q">{f.q}</summary>
              <div className="faq__a">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTABand() {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <h2 className="cta-band__title">Protect your legacy</h2>
        <div className="cta-band__actions">
          <button className="btn btn--accent">Get a quote</button>
          <button className="btn btn--light">Talk to an advisor</button>
        </div>
      </div>
    </section>
  )
}
function HelpStrip() {
  return (
    <section className="help">
      <div className="container help__inner">
        <div className="help__block">
          <h3 className="help__title">Manage your policy online</h3>
          <p className="help__body">Pay bills, access ID cards, and update coverage in minutes.</p>
          <button className="btn btn--ghost">Go to account</button>
        </div>
        <div className="help__block">
          <h3 className="help__title">File and track claims</h3>
          <p className="help__body">Start a claim and follow progress with real‑time updates.</p>
          <button className="btn btn--ghost">Start a claim</button>
        </div>
        <div className="help__block">
          <h3 className="help__title">We’re here to help</h3>
          <p className="help__body">Questions about coverage? Our support team is ready.</p>
          <button className="btn btn--ghost">Contact us</button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="brand brand--inverse">
            <span className="brand__logo" aria-hidden="true">🛡️</span>
            <span className="brand__name">SRSK Insurance</span>
          </div>
          <p className="footer__tag">Protect your legacy.</p>
        </div>
        <div className="footer__cols">
          <div className="footer__col">
            <h4 className="footer__heading">Products</h4>
            <ul className="footer__list">
              <li><a href="#">Auto</a></li>
              <li><a href="#">Home</a></li>
              <li><a href="#">Renters</a></li>
              <li><a href="#">Condo</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Support</h4>
            <ul className="footer__list">
              <li><a href="#">Claims</a></li>
              <li><a href="#">Customer support</a></li>
              <li><a href="#">Billing</a></li>
              <li><a href="#">Account</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Company</h4>
            <ul className="footer__list">
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Newsroom</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__legal">
        <div className="container">
          <small>© {new Date().getFullYear()} SRSK Insurance. All rights reserved.</small>
        </div>
      </div>
    </footer>
  )
}

// Simple inline SVG icons
function CarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 13l2-5a2 2 0 0 1 1.9-1.3h10.2a2 2 0 0 1 1.9 1.3l2 5"/>
      <rect x="2" y="12" width="20" height="6" rx="2"/>
      <circle cx="7" cy="18" r="1.5"/>
      <circle cx="17" cy="18" r="1.5"/>
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5l9-7 9 7"/>
      <path d="M5 10v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9"/>
    </svg>
  )
}

function KeyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="3.5"/>
      <path d="M11 8h10M16 8v4m0 0h-3m3 0v3"/>
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="18" rx="1"/>
      <rect x="14" y="7" width="7" height="14" rx="1"/>
      <path d="M6.5 7.5h0M6.5 11.5h0M6.5 15.5h0M17.5 10.5h0M17.5 14.5h0M17.5 18.5h0"/>
    </svg>
  )
}

function BikeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6.5" cy="17.5" r="3.5"/>
      <circle cx="17.5" cy="17.5" r="3.5"/>
      <path d="M6.5 17.5 11 9h4l-2 4h4"/>
    </svg>
  )
}

function PawIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="7" cy="8" r="2"/>
      <circle cx="12" cy="6" r="2"/>
      <circle cx="17" cy="8" r="2"/>
      <path d="M7 16c1.2-2 8.8-2 10 0 1.2 2-1 4-5 4s-6.2-2-5-4z"/>
    </svg>
  )
}

export default App
