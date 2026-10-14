import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/public/Navbar';
import { Footer } from '../../components/public/Footer';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import {
  FiUser,
  FiImage,
  FiShare2,
  FiMusic,
  FiGrid,
  FiAward,
  FiBarChart2,
  FiZap,
  FiShield,
  FiSmartphone,
  FiCheck,
  FiArrowRight,
  FiMessageSquare,
  FiChevronDown,
} from 'react-icons/fi';

const HERO_IMAGE =
  'https://i.postimg.cc/Qty8Jb10/9e148ce5-7238-44a4-8d61-17afc86cea13.png';

const FEATURES = [
  { icon: <FiUser size={20} />, title: 'Custom Profiles', desc: 'Every profile is yours — avatar, bio, username and identity.', color: '#00AAFF' },
  { icon: <FiImage size={20} />, title: 'Backgrounds', desc: 'Images, gradients or short video backgrounds. Full control.', color: '#00AAFF' },
  { icon: <FiShare2 size={20} />, title: 'Social Links', desc: 'Add 14+ socials with beautiful, instantly-recognized icons.', color: '#f59e0b' },
  { icon: <FiMusic size={20} />, title: 'Music Player', desc: 'Set a track that plays on your profile with full player settings.', color: '#ec4899' },
  { icon: <FiGrid size={20} />, title: 'Widgets', desc: 'Discord, Spotify, GitHub and more blocks you can reorder.', color: '#22c55e' },
  { icon: <FiAward size={20} />, title: 'Badges', desc: 'Collect badges like Verified, Premium, Staff and Bug Hunter.', color: '#3b82f6' },
  { icon: <FiBarChart2 size={20} />, title: 'Analytics', desc: 'See views, link clicks and growth — all in one dashboard.', color: '#a78bfa' },
  { icon: <FiZap size={20} />, title: 'Premium', desc: 'Advanced customization, video backgrounds and priority access.', color: '#facc15' },
  { icon: <FiShield size={20} />, title: 'Fast & Secure', desc: 'Firebase-backed auth, isolated user data and hardened rules.', color: '#10b981' },
  { icon: <FiSmartphone size={20} />, title: 'Mobile Friendly', desc: 'Every profile looks polished on phone, tablet and desktop.', color: '#06b6d4' },
];

const FAQ = [
  { q: 'What is Nebula?', a: 'Nebula is a link-in-bio platform. You get one clean, fully customizable page that holds all your socials, links, music and widgets, so you only ever share a single URL.' },
  { q: 'Is Nebula free?', a: 'Yes. You can build and share a profile for free. Premium unlocks advanced customization, extended analytics and an exclusive badge.' },
  { q: 'What can I do with Nebula?', a: 'Add links and socials, set a background (image, gradient or video), play music, show Discord or Spotify widgets, collect badges and track views and clicks.' },
  { q: 'How long does setup take?', a: 'Under a minute. Claim your username, add your links, pick a style and share your page.' },
  { q: 'Is my data safe?', a: 'Accounts use Firebase Authentication and each user can only edit their own data. You can make your profile private any time from Settings.' },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-bg-card">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-white">{q}</span>
        <FiChevronDown
          size={16}
          className={`text-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <p className="px-5 pb-4 text-xs text-muted leading-relaxed">{a}</p>}
    </div>
  );
}

export default function Home() {
  const [claim, setClaim] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePrimaryCTA = () => {
    if (user) navigate('/dashboard');
    else navigate('/register');
  };

  const onClaim = (e: FormEvent) => {
    e.preventDefault();
    if (user) {
      navigate('/dashboard');
      return;
    }
    const name = claim.trim().toLowerCase().replace(/[^a-z0-9_.]/g, '');
    navigate(name ? `/register?claim=${encodeURIComponent(name)}` : '/register');
  };

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand-soft text-xs font-medium mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-soft animate-pulse" />
            New · Video backgrounds + 14 social platforms
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white font-display leading-[1.05] max-w-4xl mx-auto">
            Everything you need,{' '}
            <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
              right here.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto mt-6 leading-relaxed">
            Nebula lets you build a beautifully customizable profile page and
            share all your links in one place. Drag, drop, reorder — make it
            truly yours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Button size="lg" onClick={handlePrimaryCTA}>
              <FiZap size={16} /> {user ? 'Go to Dashboard' : 'Sign Up for Free'}
            </Button>
            <a href="#pricing">
              <Button variant="secondary" size="lg">
                View Pricing
              </Button>
            </a>
          </div>

          {!user && (
            <>
              <form
                onSubmit={onClaim}
                className="flex items-center gap-2 max-w-md mx-auto mt-8 rounded-2xl border border-border bg-bg-card p-1.5 focus-within:border-brand/60 transition"
              >
                <span className="pl-3 text-sm text-muted select-none">nebula/</span>
                <input
                  value={claim}
                  onChange={(e) => setClaim(e.target.value)}
                  placeholder="username"
                  maxLength={30}
                  aria-label="Claim your username"
                  className="flex-1 min-w-0 bg-transparent text-sm text-white placeholder:text-muted/60 outline-none py-2"
                />
                <Button type="submit">Claim Now</Button>
              </form>
              <p className="text-[11px] text-muted mt-3">
                Free forever · No credit card ·{' '}
                <a href="#pricing" className="text-brand-soft hover:underline">
                  View pricing
                </a>
              </p>
            </>
          )}
        </div>

        <div className="relative w-full pb-20 px-2 sm:px-4">
          <img
            src={HERO_IMAGE}
            alt="Nebula Preview"
            className="w-full mx-auto block rounded-3xl"
            style={{ boxShadow: '0 0 120px -20px rgba(0, 170, 255, 0.5)' }}
          />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
              Packed with everything
            </h2>
            <p className="text-sm text-muted mt-3 max-w-xl mx-auto">
              All the tools you need to build a profile that stands out.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-bg-card p-5 hover:border-brand/40 hover:-translate-y-0.5 transition"
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: f.color + '22', color: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-white">{f.title}</h3>
                <p className="text-xs text-muted mt-1.5 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
              How it works
            </h2>
            <p className="text-sm text-muted mt-3">Live in under a minute.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', title: 'Create your account', desc: 'Sign up with your email. No credit card required.' },
              { n: '02', title: 'Customize your profile', desc: 'Add links, socials, music and pick your style.' },
              { n: '03', title: 'Share your profile', desc: 'Send one link everywhere. Track every click.' },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-bg-card p-6">
                <p className="text-3xl font-bold font-display bg-gradient-to-br from-brand to-accent bg-clip-text text-transparent">
                  {s.n}
                </p>
                <h3 className="text-sm font-semibold text-white mt-3">{s.title}</h3>
                <p className="text-xs text-muted mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
              Make it yours — down to the last pixel.
            </h2>
            <p className="text-sm text-muted mt-4 leading-relaxed">
              Colors, blur, opacity, borders, shadows, cursor, animations,
              background video — you decide every detail.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {['Backgrounds', 'Colors', 'Blur', 'Transparency', 'Fonts', 'Animations', 'Links', 'Socials', 'Music', 'Widgets'].map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs text-white">
                  <FiCheck size={14} className="text-brand-soft" /> {f}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Primary color', color: '#00AAFF' },
              { label: 'Accent', color: '#38BDF8' },
              { label: 'Success', color: '#22c55e' },
              { label: 'Warning', color: '#f59e0b' },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl border border-border bg-bg-card p-4">
                <div className="h-16 rounded-xl mb-3" style={{ backgroundColor: c.color }} />
                <p className="text-xs font-medium text-white">{c.label}</p>
                <p className="text-[10px] text-muted font-mono mt-0.5">{c.color}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANALYTICS */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
              Know your audience
            </h2>
            <p className="text-sm text-muted mt-3">
              Track views, clicks and growth in real time.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { label: 'Profile views', value: '12.4K', growth: '+18%', color: '#00AAFF' },
              { label: 'Link clicks', value: '3.8K', growth: '+12%', color: '#38BDF8' },
              { label: 'Countries', value: '42', growth: '+5', color: '#f59e0b' },
              { label: 'Conversion', value: '31%', growth: '+2%', color: '#22c55e' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-bg-card p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted">{s.label}</p>
                  <span className="text-[10px] font-semibold" style={{ color: s.color }}>
                    {s.growth}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white font-display">{s.value}</p>
                <div className="h-1.5 rounded-full bg-bg-soft mt-3 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: '65%',
                      background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
              Simple pricing
            </h2>
            <p className="text-sm text-muted mt-3">Start free. Upgrade anytime.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { name: 'Free', price: '$0', period: 'forever', perks: ['Public profile', 'Unlimited links', 'Basic themes', 'Music player'], highlight: false },
              { name: 'Premium', price: '$4.99', period: '/month', perks: ['Everything in Free', 'Premium badge', 'Advanced appearance', 'Priority support'], highlight: true },
              { name: 'Creator', price: '$9.99', period: '/month', perks: ['Everything in Premium', 'Creator badge', 'Extended analytics', 'Custom domain'], highlight: false },
              { name: 'Lifetime', price: '$99.99', period: 'one-time', perks: ['Everything forever', 'Founder badge', 'Early access', 'Direct support line'], highlight: false },
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border p-5 flex flex-col ${
                  p.highlight
                    ? 'border-brand/60 bg-gradient-to-b from-brand/10 to-transparent shadow-glow'
                    : 'border-border bg-bg-card'
                }`}
              >
                <h3 className="text-sm font-semibold text-white">{p.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold text-white font-display">
                    {p.price}
                  </span>
                  <span className="text-xs text-muted">{p.period}</span>
                </div>
                <ul className="space-y-2 my-5 flex-1">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-xs text-muted">
                      <FiCheck size={14} className="text-brand-soft shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={p.highlight ? 'primary' : 'secondary'}
                  fullWidth
                  onClick={handlePrimaryCTA}
                >
                  {user ? 'Go to Dashboard' : 'Get started'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section id="compare" className="py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
            Compare with others
          </h2>
          <p className="text-sm text-muted mt-3">
            Nebula gives you more customization with less friction.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-3">
            {[
              { label: 'Setup time', us: '30 seconds', them: 'Minutes' },
              { label: 'Customization', us: 'Everything', them: 'Limited' },
              { label: 'Analytics', us: 'Built-in', them: 'Extra cost' },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl border border-border bg-bg-card p-5">
                <p className="text-xs text-muted mb-3">{c.label}</p>
                <p className="text-sm font-semibold text-brand-soft">Nebula · {c.us}</p>
                <p className="text-[11px] text-muted mt-1">Others · {c.them}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCORD */}
      <section id="discord" className="py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/10 to-transparent p-8 sm:p-12 text-center">
            <div className="inline-flex h-14 w-14 rounded-2xl bg-[#5865F2] items-center justify-center mb-4">
              <FiMessageSquare size={24} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
              Join the community
            </h2>
            <p className="text-sm text-muted mt-3 max-w-lg mx-auto">
              Get help, share your profile, and see what others are building.
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto my-8">
              <div className="rounded-xl border border-border bg-bg-card p-3">
                <p className="text-xl font-bold text-white font-display">2.4K</p>
                <p className="text-[10px] text-muted">Members</p>
              </div>
              <div className="rounded-xl border border-border bg-bg-card p-3">
                <p className="text-xl font-bold text-white font-display">180+</p>
                <p className="text-[10px] text-muted">Online</p>
              </div>
              <div className="rounded-xl border border-border bg-bg-card p-3">
                <p className="text-xl font-bold text-white font-display">12K+</p>
                <p className="text-[10px] text-muted">Messages</p>
              </div>
            </div>
            <a href="https://discord.com" target="_blank" rel="noreferrer">
              <Button size="lg">
                <FiMessageSquare size={16} /> Join Discord
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* HELP */}
      <section id="help" className="py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
            Need a hand?
          </h2>
          <p className="text-sm text-muted mt-3">
            Our Help Center has answers. Or reach the team directly.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link to="/help">
              <Button variant="secondary">Visit Help Center</Button>
            </Link>
            <a href="#discord">
              <Button variant="ghost">Ask in Discord</Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-6xl font-bold text-white font-display leading-[1.05]">
            Your profile. Your identity.{' '}
            <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
              Your space.
            </span>
          </h2>
          <p className="text-sm text-muted mt-6 max-w-xl mx-auto">
            {user
              ? 'Welcome back — jump into your dashboard.'
              : 'Claim your username before someone else does.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Button size="lg" onClick={handlePrimaryCTA}>
              {user ? 'Go to Dashboard' : 'Sign Up for Free'} <FiArrowRight size={16} />
            </Button>
            <a href="#pricing">
              <Button variant="secondary" size="lg">
                View Pricing
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}