import {
  Bath,
  BedDouble,
  CalendarCheck,
  Car,
  ChefHat,
  Flame,
  Laptop,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Waves,
  Wifi,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import BookingPanel from '../components/BookingPanel.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import WeatherSignal from '../components/WeatherSignal.jsx';
import { useGetPropertiesQuery, useGetPropertyQuery } from '../services/stayApi.js';
import { formatRating } from '../utils/formatters.js';

function AmenityIcon({ amenity }) {
  const lower = amenity.toLowerCase();
  const Icon = lower.includes('wifi')
    ? Wifi
    : lower.includes('pool') || lower.includes('beach') || lower.includes('lake')
      ? Waves
      : lower.includes('kitchen') || lower.includes('breakfast') || lower.includes('dinner')
        ? ChefHat
        : lower.includes('workspace')
          ? Laptop
          : lower.includes('parking')
            ? Car
            : lower.includes('fireplace')
              ? Flame
              : Sparkles;

  return <Icon className="h-5 w-5 text-ocean-700" />;
}

export default function ListingDetails() {
  const { slug } = useParams();
  const { data: property, isLoading, isError } = useGetPropertyQuery(slug);
  const { data: nearby = [] } = useGetPropertiesQuery(
    { destination: property?.city ?? '', maxPrice: 900 },
    { skip: !property },
  );

  if (isLoading) {
    return (
      <div className="section-shell py-10">
        <LoadingState count={3} />
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="section-shell py-10">
        <EmptyState
          title="Stay not found"
          message="This listing may have moved or is no longer available."
          actionLabel="Back to explore"
        />
      </div>
    );
  }

  const similar = nearby.filter((stay) => stay.id !== property.id).slice(0, 3);

  return (
    <div className="section-shell py-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="eyebrow">{property.category}</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-ink-900 sm:text-5xl">
            {property.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-bold text-ink-500">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-marigold-400 text-marigold-400" />
              {formatRating(property.rating)} ({property.reviews} reviews)
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4 text-coral-500" />
              {property.region}, {property.city}
            </span>
            {property.instantBook ? (
              <span className="inline-flex items-center gap-1 rounded-[8px] bg-ocean-50 px-2 py-1 text-ocean-700">
                <CalendarCheck className="h-4 w-4" />
                Instant book
              </span>
            ) : null}
          </div>
        </div>
        <Link to="/explore" className="secondary-button justify-self-start lg:justify-self-end">
          Back to results
        </Link>
      </div>

      <section className="mt-8 grid gap-3 lg:grid-cols-[1.18fr_.82fr]">
        <div className="min-h-[320px] overflow-hidden rounded-[8px] bg-ink-200 lg:min-h-[520px]">
          <img
            src={property.images[0]}
            alt={property.name}
            className="h-full max-h-[620px] w-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {property.images.slice(1, 5).map((image, index) => (
            <div key={image} className="min-h-[154px] overflow-hidden rounded-[8px] bg-ink-200">
              <img
                src={image}
                alt={`${property.name} ${index + 2}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-8">
          <section className="surface p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-ink-900">
                  Hosted by {property.host.name}
                </h2>
                <p className="mt-1 text-sm font-semibold text-ink-500">
                  {property.guests} guests - {property.bedrooms} bedrooms - {property.beds} beds -{' '}
                  {property.baths} baths
                </p>
              </div>
              <img
                src={property.host.avatar}
                alt={property.host.name}
                className="h-16 w-16 rounded-[8px] object-cover"
              />
            </div>
            <p className="mt-6 text-base leading-8 text-ink-600">{property.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <span className="inline-flex items-center gap-2 rounded-[8px] bg-ocean-50 p-3 text-sm font-bold text-ocean-700">
                <Users className="h-5 w-5" />
                Sleeps {property.guests}
              </span>
              <span className="inline-flex items-center gap-2 rounded-[8px] bg-coral-50 p-3 text-sm font-bold text-coral-700">
                <BedDouble className="h-5 w-5" />
                {property.beds} beds
              </span>
              <span className="inline-flex items-center gap-2 rounded-[8px] bg-marigold-100 p-3 text-sm font-bold text-ink-700">
                <Bath className="h-5 w-5" />
                {property.baths} baths
              </span>
            </div>
          </section>

          <section className="surface p-6">
            <h2 className="text-2xl font-extrabold text-ink-900">Stay highlights</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {property.highlights.map((highlight) => (
                <div key={highlight} className="rounded-[8px] border border-ink-100 p-4">
                  <Sparkles className="h-5 w-5 text-coral-500" />
                  <p className="mt-3 text-sm font-extrabold text-ink-900">{highlight}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="surface p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-ink-900">Amenities</h2>
                <p className="mt-1 text-sm font-semibold text-ink-500">
                  Essentials and comforts for this stay
                </p>
              </div>
              <WeatherSignal coordinates={property.coordinates} label={property.city} />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {property.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-3 rounded-[8px] border border-ink-100 p-4 text-sm font-bold text-ink-700"
                >
                  <AmenityIcon amenity={amenity} />
                  {amenity}
                </div>
              ))}
            </div>
          </section>

          <section className="surface p-6">
            <h2 className="text-2xl font-extrabold text-ink-900">Guest confidence</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-[8px] bg-ocean-50 p-4">
                <ShieldCheck className="h-6 w-6 text-ocean-700" />
                <h3 className="mt-3 font-extrabold text-ink-900">Verified details</h3>
                <p className="mt-2 text-sm leading-6 text-ink-500">
                  Fees, capacity, rating, weather, and currency conversion are visible before reserve.
                </p>
              </div>
              <div className="rounded-[8px] bg-coral-50 p-4">
                <Star className="h-6 w-6 fill-coral-500 text-coral-500" />
                <h3 className="mt-3 font-extrabold text-ink-900">Loved by travelers</h3>
                <p className="mt-2 text-sm leading-6 text-ink-500">
                  {property.reviews} reviews with a {formatRating(property.rating)} average rating.
                </p>
              </div>
            </div>
          </section>
        </div>

        <BookingPanel property={property} />
      </div>

      {similar.length > 0 ? (
        <section className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Nearby</p>
              <h2 className="mt-2 font-display text-4xl font-bold text-ink-900">
                More in {property.city}
              </h2>
            </div>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((stay) => (
              <PropertyCard key={stay.id} property={stay} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
