import { useState } from 'react';
import { Building2, CalendarDays, Heart, Hotel, Menu, Search, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  { to: '/explore', label: 'Explore', icon: Search },
  { to: '/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/trips', label: 'Trips', icon: CalendarDays },
  { to: '/host', label: 'Host', icon: Building2 },
];

function NavItem({ item, onClick }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      className={({ isActive }) =>
        clsx(
          'inline-flex items-center gap-2 rounded-[8px] px-3 py-2 text-sm font-bold transition',
          isActive
            ? 'bg-ocean-50 text-ocean-700'
            : 'text-ink-500 hover:bg-ink-200 hover:text-ink-900',
        )
      }
    >
      <Icon className="h-4 w-4" />
      {item.label}
    </NavLink>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200 bg-black/90 backdrop-blur">
      <div className="section-shell">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-ocean-600 text-white shadow-glow">
              <Hotel className="h-6 w-6" />
            </span>
            <span>
              <span className="block font-display text-2xl font-bold leading-none text-ink-900">
                StayNest
              </span>
              <span className="text-xs font-bold text-coral-600">Hotels and homes</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </nav>

          <Link to="/explore" className="primary-button hidden lg:inline-flex">
            <Search className="h-4 w-4" />
            Start booking
          </Link>

          <button
            type="button"
            className="icon-button md:hidden"
            onClick={() => setIsOpen((current) => !current)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-ink-200 bg-black px-4 pb-4 md:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 pt-3">
            {navItems.map((item) => (
              <NavItem key={item.to} item={item} onClick={() => setIsOpen(false)} />
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
