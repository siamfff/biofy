import { Link } from 'react-router-dom';

const PRODUCT_LINKS = [
  { to: '/#features', label: 'Features' },
  { to: '/#pricing', label: 'Pricing' },
  { to: '/#compare', label: 'Compare' },
];

const RESOURCE_LINKS = [
  { to: '/#help', label: 'Help Center' },
  { to: '/#discord', label: 'Discord' },
  { to: '/#contact', label: 'Contact' },
];

const BNF_LINKS = [
  { to: 'https://thebnf.cyou/#about', label: 'About BNF' },
  { to: 'https://thebnf.cyou/#projects', label: 'Our Projects' },
  { to: 'https://thebnf.cyou', label: 'Official Website' },
];

const LEGAL_LINKS = [
  { to: '/terms', label: 'Terms' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/cookies', label: 'Cookies' },
];

const LOGO_URL =
  'https://i.postimg.cc/66RGqxBR/a4fe11fa-d54e-437f-9654-ded3cbbe6315.png';

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-soft mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 — Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3 group">
              <img
                src={LOGO_URL}
                alt="Nebula"
                className="h-8 w-8 rounded-lg object-cover shadow-glow group-hover:scale-110 transition"
              />
              <span className="text-sm font-bold text-white font-display">
                Nebula
              </span>
            </Link>
            <p className="text-xs text-muted max-w-xs">
              Your profile, elevated. Customize everything, share one link.
            </p>

            <p className="text-[10px] text-muted mt-3">
              A{' '}
              <a
                href="https://thebnf.cyou"
                target="_blank"
                rel="noreferrer"
                className="text-brand-soft hover:underline font-medium"
              >
                The BNF
              </a>{' '}
              project
            </p>
          </div>

          {/* Column 2 — Product */}
          <div>
            <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.to}>
                  <a
                    href={l.to}
                    className="text-xs text-muted hover:text-white transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Resources */}
          <div>
            <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2">
              {RESOURCE_LINKS.map((l) => (
                <li key={l.to}>
                  <a
                    href={l.to}
                    className="text-xs text-muted hover:text-white transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — The BNF */}
          <div>
            <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">
              The BNF
            </h4>
            <ul className="space-y-2">
              {BNF_LINKS.map((l) => (
                <li key={l.to}>
                  <a
                    href={l.to}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-muted hover:text-white transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted text-center sm:text-left">
            © {new Date().getFullYear()} Nebula · An{' '}
            <a
              href="https://thebnf.cyou"
              target="_blank"
              rel="noreferrer"
              className="text-brand-soft hover:underline"
            >
              The BNF
            </a>{' '}
            Product. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-[11px] text-muted hover:text-white transition"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}