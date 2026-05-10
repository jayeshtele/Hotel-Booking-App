import { Building2, Code2, Hotel, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink-200 bg-black/95">
      <div className="section-shell grid gap-10 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-ocean-600 text-white">
              <Hotel className="h-5 w-5" />
            </span>
            <span className="font-display text-2xl font-bold">StayNest</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-ink-500">
            Curated hotels, villas, cabins, and city apartments with live weather and
            currency signals for confident booking decisions.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase text-ink-900">Explore</h2>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-ink-500">
            <Link className="hover:text-ocean-700" to="/explore">
              Browse stays
            </Link>
            <Link className="hover:text-ocean-700" to="/wishlist">
              Saved homes
            </Link>
            <Link className="hover:text-ocean-700" to="/trips">
              Upcoming trips
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase text-ink-900">Contact</h2>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-ink-500">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-coral-500" />
              Frontend demo
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-coral-500" />
              hello@staynest.example
            </span>
            <span className="inline-flex items-center gap-2">
              <Building2 className="h-4 w-4 text-coral-500" />
              Host partner app
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-ink-200 py-4">
        <div className="section-shell flex flex-col gap-2 text-xs font-semibold text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <span>2026 StayNest. Built with React, Vite, Redux Toolkit, and Tailwind CSS.</span>
          <span className="inline-flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            Frontend booking project
          </span>
        </div>
      </div>
    </footer>
  );
}
