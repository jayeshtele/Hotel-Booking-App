import {
  ArrowRight,
  BadgeCheck,
  CloudSun,
  Globe2,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Star,
  WalletCards,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import {
  useGetLiveRatesQuery,
  useGetPropertiesQuery,
  useGetWeatherQuery,
} from '../services/stayApi.js';

const categoryTiles = [
  {
    label: 'Beachfront',
    destination: 'Goa',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Heritage',
    destination: 'Udaipur',
    image:
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Mountain',
    destination: 'Manali',
    image:
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'City',
    destination: 'New York',
    image:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=700&q=80',
  },
];

export default function Home() {
  const { data: properties = [], isLoading, isError } = useGetPropertiesQuery({
    sortBy: 'recommended',
    maxPrice: 900,
  });
  const { data: rates } = useGetLiveRatesQuery();
  const { data: weather } = useGetWeatherQuery({ lat: 15.518, lon: 73.762 });
  const featured = properties.slice(0, 6);

  return (
    <>
      <section
        className="relative overflow-hidden bg-ink-900"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(13,23,38,.88), rgba(13,23,38,.56), rgba(13,23,38,.16)), url(https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="section-shell grid min-h-[660px] content-center py-16">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-[8px] bg-white/10 px-3 py-2 text-sm font-extrabold text-white backdrop-blur">
              <Sparkles className="h-4 w-4 text-marigold-400" />
              Curated stays with live travel signals
            </p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Book hotels, villas, and homes that feel just right.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-white/80 sm:text-lg">
              Discover handpicked stays, compare pricing in live currencies, check
              destination weather, and save every booking in one polished frontend app.
            </p>
          </div>

          <div className="mt-8 max-w-6xl">
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="section-shell -mt-10 relative z-10">
        <div className="grid gap-4 rounded-[8px] border border-white/70 bg-white p-4 shadow-soft md:grid-cols-3">
          <div className="flex items-center gap-3 rounded-[8px] bg-ocean-50 p-4">
            <BadgeCheck className="h-8 w-8 text-ocean-700" />
            <div>
              <p className="text-2xl font-extrabold text-ink-900">4.91</p>
              <p className="text-sm font-bold text-ink-500">Average guest rating</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-[8px] bg-coral-50 p-4">
            <Globe2 className="h-8 w-8 text-coral-600" />
            <div>
              <p className="text-2xl font-extrabold text-ink-900">8</p>
              <p className="text-sm font-bold text-ink-500">Global destinations</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-[8px] bg-marigold-100 p-4">
            <ShieldCheck className="h-8 w-8 text-marigold-600" />
            <div>
              <p className="text-2xl font-extrabold text-ink-900">100%</p>
              <p className="text-sm font-bold text-ink-500">Frontend-safe API flow</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell mt-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Featured homes</p>
            <h2 className="mt-2 font-display text-4xl font-bold text-ink-900">
              Guest-loved stays
            </h2>
          </div>
          <Link to="/explore" className="secondary-button self-start sm:self-auto">
            Explore all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8">
          {isLoading ? <LoadingState /> : null}
          {isError ? (
            <EmptyState
              title="Inventory could not load"
              message="The booking API layer is ready, but this request failed. Please retry after starting the Vite server."
            />
          ) : null}
          {!isLoading && !isError ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-shell mt-16">
        <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-[8px] bg-ink-900 p-6 text-white">
            <p className="eyebrow text-ocean-100">Live travel desk</p>
            <h2 className="mt-2 font-display text-4xl font-bold">Plan with today&apos;s signals</h2>
            <p className="mt-4 text-sm leading-6 text-white/70">
              StayNest uses keyless public APIs for weather and currency conversion so
              the project stays secure as a frontend-only build.
            </p>
            <div className="mt-6 grid gap-3">
              <div className="rounded-[8px] bg-white/10 p-4 backdrop-blur">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-white">
                  <CloudSun className="h-5 w-5 text-marigold-400" />
                  Goa right now
                </p>
                <p className="mt-2 text-2xl font-extrabold">
                  {weather ? `${weather.temperature}C, ${weather.label}` : 'Loading weather'}
                </p>
              </div>
              <div className="rounded-[8px] bg-white/10 p-4 backdrop-blur">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-white">
                  <WalletCards className="h-5 w-5 text-coral-300" />
                  Currency feed
                </p>
                <p className="mt-2 text-2xl font-extrabold">
                  $1 = Rs {rates?.rates?.INR?.toFixed(2) ?? '...'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {categoryTiles.map((tile) => (
              <Link
                key={tile.label}
                to={`/explore?destination=${encodeURIComponent(tile.destination)}`}
                className="group relative min-h-[220px] overflow-hidden rounded-[8px] bg-ink-900"
              >
                <img
                  src={tile.image}
                  alt={tile.label}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="inline-flex items-center gap-2 text-sm font-bold">
                    <MapPinned className="h-4 w-4 text-coral-300" />
                    {tile.destination}
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold">{tile.label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell mt-16">
        <div className="grid gap-5 rounded-[8px] bg-mesh-subtle p-6 md:grid-cols-3">
          {[
            ['Curated quality', 'Every stay has strong ratings, clear fees, and scannable amenities.'],
            ['Save and return', 'Wishlist selections and trip confirmations persist in your browser.'],
            ['Responsive first', 'The interface adapts from mobile search to desktop comparison.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[8px] border border-white bg-white/80 p-5">
              <Star className="h-6 w-6 fill-marigold-400 text-marigold-400" />
              <h3 className="mt-4 text-lg font-extrabold text-ink-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-500">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
