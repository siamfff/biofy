import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { logoutUser } from '../../services/authService';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiGrid,
  FiChevronDown,
} from 'react-icons/fi';

const SECTION_NAV = [
  { id: 'features', label: 'Features' },
  { id: 'compare', label: 'Compare' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
  { id: 'discord', label: 'Discord' },
  { id: 'help', label: 'Help Center' },
];

const LOGO_URL = 'https://i.postimg.cc/66RGqxBR/a4fe11fa-d54e-437f-9654-ded3cbbe6315.png';

export function Navbar() {
  const { user, profile } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setActiveSection('');
      return;
    }

    const sectionIds = SECTION_NAV.map((s) => s.id);

    const handleScroll = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      let current = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (mid >= top && mid < bottom) {
          current = id;
          break;
        }
      }

      const firstEl = document.getElementById(sectionIds[0]);
      if (firstEl && mid < firstEl.offsetTop) {
        current = '';
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isHome]);

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  };

  const homeActive = isHome && activeSection === '';

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={handleHomeClick}
          className="flex items-center gap-2 shrink-0 group"
        >
          <img
            src={LOGO_URL}
            alt="Nebula"
            className="h-8 w-8 rounded-lg object-cover shadow-glow group-hover:shadow-glow-accent group-hover:scale-110 transition-all"
          />
          <span className="text-sm font-bold text-white font-display hidden sm:block">
            Nebula
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={handleHomeClick}
            className={cn(
              'px-3 py-2 rounded-lg text-xs font-medium transition',
              homeActive
                ? 'text-white bg-bg-card'
                : 'text-muted hover:text-white hover:bg-bg-card',
            )}
          >
            Home
          </button>
          {SECTION_NAV.map((item) => {
            const active = isHome && activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'px-3 py-2 rounded-lg text-xs font-medium transition',
                  active
                    ? 'text-white bg-bg-card'
                    : 'text-muted hover:text-white hover:bg-bg-card',
                )}
              >
                {item.label}
              </button>
            );
          })}
          <Link
            to="/leaderboard"
            className={cn(
              'px-3 py-2 rounded-lg text-xs font-medium transition',
              location.pathname === '/leaderboard'
                ? 'text-white bg-bg-card'
                : 'text-muted hover:text-white hover:bg-bg-card',
            )}
          >
            Leaderboard
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-border bg-bg-card hover:border-brand/50 pl-1 pr-2 py-1 transition"
              >
                <img
                  src={
                    profile?.avatarUrl ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${profile?.displayName || 'U'}`
                  }
                  alt=""
                  className="h-7 w-7 rounded-full object-cover"
                />
                <span className="text-xs text-white font-medium hidden sm:block max-w-[100px] truncate">
                  {profile?.displayName || 'User'}
                </span>
                <FiChevronDown size={12} className="text-muted" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border shadow-card overflow-hidden animate-slide-up glass-strong">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold text-white truncate">
                      {profile?.displayName || 'User'}
                    </p>
                    <p className="text-[11px] text-muted truncate">
                      @{profile?.username || '—'}
                    </p>
                  </div>
                  <div className="p-1.5">
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white hover:bg-bg-elevated"
                    >
                      <FiGrid size={14} /> Dashboard
                    </Link>
                    <Link
                      to="/dashboard/customize"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted hover:text-white hover:bg-bg-elevated"
                    >
                      <FiUser size={14} /> My profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted hover:text-danger hover:bg-danger/10"
                    >
                      <FiLogOut size={14} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg hover:bg-bg-card text-muted hover:text-white"
            aria-label="Menu"
          >
            {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-bg-soft/95 backdrop-blur-xl animate-fade-in">
          <nav className="px-4 py-3 space-y-1">
            <button
              onClick={handleHomeClick}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-sm text-muted hover:text-white hover:bg-bg-card"
            >
              Home
            </button>
            {SECTION_NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-3 py-2.5 rounded-lg text-sm text-muted hover:text-white hover:bg-bg-card"
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/leaderboard"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm text-muted hover:text-white hover:bg-bg-card"
            >
              Leaderboard
            </Link>
            {!user && (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm text-muted hover:text-white hover:bg-bg-card"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}