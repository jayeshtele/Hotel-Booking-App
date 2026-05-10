import { BadgeDollarSign, Building2, Check, ClipboardList, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function Host() {
  const [nightlyRate, setNightlyRate] = useState(180);
  const [occupancy, setOccupancy] = useState(68);

  const estimate = useMemo(() => {
    return Math.round(nightlyRate * 30 * (occupancy / 100));
  }, [nightlyRate, occupancy]);

  return (
    <div className="section-shell py-10">
      <section className="grid gap-8 overflow-hidden rounded-[8px] bg-ink-900 p-6 text-white lg:grid-cols-[1fr_420px] lg:p-10">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-[8px] bg-white/10 px-3 py-2 text-sm font-extrabold backdrop-blur">
            <Building2 className="h-4 w-4 text-coral-300" />
            StayNest Host
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
            Turn a great place into a bookable stay.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
            A host-side concept page with revenue estimation, quality markers, and the
            same calm visual system used by the guest booking flow.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {['Smart pricing', 'Verified amenities', 'Responsive listing'].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-[8px] bg-white/10 px-4 py-3 text-sm font-bold"
              >
                <Check className="h-4 w-4 text-ocean-100" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[8px] bg-white p-5 text-ink-900">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-coral-50 text-coral-600">
              <BadgeDollarSign className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold">Monthly estimate</h2>
              <p className="text-sm font-semibold text-ink-500">Simple host calculator</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5">
            <label className="grid gap-2">
              <span className="text-xs font-extrabold uppercase text-ink-500">
                Nightly rate: ${nightlyRate}
              </span>
              <input
                type="range"
                min="80"
                max="650"
                step="10"
                value={nightlyRate}
                onChange={(event) => setNightlyRate(Number(event.target.value))}
                className="accent-coral-500"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-xs font-extrabold uppercase text-ink-500">
                Occupancy: {occupancy}%
              </span>
              <input
                type="range"
                min="20"
                max="95"
                step="1"
                value={occupancy}
                onChange={(event) => setOccupancy(Number(event.target.value))}
                className="accent-ocean-600"
              />
            </label>
          </div>

          <div className="mt-6 rounded-[8px] bg-ink-900 p-5 text-white">
            <p className="text-sm font-bold text-white/60">Potential monthly revenue</p>
            <p className="mt-2 text-4xl font-extrabold">${estimate.toLocaleString()}</p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          ['Create listing', 'Add photos, amenities, house rules, and capacity details.'],
          ['Go live', 'Set availability and publish once quality checks are complete.'],
          ['Manage trips', 'Track upcoming reservations and guest details.'],
        ].map(([title, text]) => (
          <div key={title} className="surface p-6">
            <ClipboardList className="h-7 w-7 text-ocean-700" />
            <h2 className="mt-4 text-xl font-extrabold text-ink-900">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink-500">{text}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-[8px] bg-mesh-subtle p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Quality bar</p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink-900">
              Better listings convert faster.
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-[8px] bg-white px-4 py-3 text-sm font-extrabold text-ink-900 shadow-sm">
            <Sparkles className="h-5 w-5 text-coral-500" />
            Photo-first listing design
          </span>
        </div>
      </section>
    </div>
  );
}
