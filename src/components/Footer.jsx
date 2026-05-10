import {
  BadgeCheck,
  CalendarDays,
  CloudSun,
  Heart,
  Sparkles,
  WalletCards,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoMark from './LogoMark.jsx';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink-200 bg-black">
      <div className="section-shell py-10">
        <div className="rounded-[8px] border border-ink-200 bg-mesh-subtle p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <LogoMark className="h-12 w-12" />
            <div>
              <span className="font-display text-3xl font-bold text-ink-900">StayNest</span>
              <p className="text-xs font-extrabold uppercase text-coral-600">
                Black-label stays, live travel signals
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="max-w-2xl text-sm leading-7 text-ink-600">
                A polished booking dashboard for comparing dark-luxury stays, scrolling
                photo carousels, destination weather, INR-first pricing, saved homes,
                and trip reservations.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ['32', 'Curated stays'],
                  ['5x', 'Images per stay'],
                  ['INR', 'Default pricing'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-[8px] bg-black/55 p-4 ring-1 ring-ink-200">
                    <p className="text-2xl font-extrabold text-ink-900">{value}</p>
                    <p className="mt-1 text-xs font-bold uppercase text-ink-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                [CloudSun, 'Live weather'],
                [WalletCards, 'INR rates'],
                [Heart, 'Wishlist'],
                [CalendarDays, 'Trips'],
              ].map(([Icon, label]) => (
                <Link
                  key={label}
                  to={label === 'Trips' ? '/trips' : label === 'Wishlist' ? '/wishlist' : '/explore'}
                  className="flex items-center gap-3 rounded-[8px] border border-ink-200 bg-ink-100/80 p-4 text-sm font-extrabold text-ink-800 transition hover:border-ocean-300 hover:text-ocean-700"
                >
                  <Icon className="h-5 w-5 text-coral-500" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-ink-200 py-4">
        <div className="section-shell flex flex-col gap-2 text-xs font-semibold text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-ocean-700" />
            StayNest booking experience - React, Redux Toolkit, Tailwind
          </span>
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-marigold-400" />
            Designed for responsive travel discovery
          </span>
        </div>
      </div>
    </footer>
  );
}
