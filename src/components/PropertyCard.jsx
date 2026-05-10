import {
  Bath,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Heart,
  Images,
  MapPin,
  Star,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../features/wishlist/wishlistSlice.js';
import { useGetLiveRatesQuery } from '../services/stayApi.js';
import { formatCurrency, formatRating } from '../utils/formatters.js';
import { scrollPageTop } from '../utils/scrollPageTop.js';

export default function PropertyCard({ property }) {
  const wishlistIds = useSelector((state) => state.wishlist.ids);
  const dispatch = useDispatch();
  const { data: rates } = useGetLiveRatesQuery();
  const [imageIndex, setImageIndex] = useState(0);
  const isWishlisted = wishlistIds.includes(property.id);
  const images = property.images?.length ? property.images : [];
  const inrRate = rates?.rates?.INR ?? 83.5;
  const priceInInr = property.price * inrRate;

  const moveImage = (event, direction) => {
    event.preventDefault();
    event.stopPropagation();
    setImageIndex((current) => (current + direction + images.length) % images.length);
  };

  return (
    <article className="surface group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-200">
        <Link
          to={`/stays/${property.slug}`}
          aria-label={`View ${property.name}`}
          onClick={scrollPageTop}
        >
          <img
            src={images[imageIndex]}
            alt={property.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        {images.length > 1 ? (
          <>
            <button
              type="button"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[8px] bg-black/70 text-white opacity-0 shadow-lg backdrop-blur transition hover:bg-black group-hover:opacity-100"
              onClick={(event) => moveImage(event, -1)}
              aria-label={`Previous image for ${property.name}`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[8px] bg-black/70 text-white opacity-0 shadow-lg backdrop-blur transition hover:bg-black group-hover:opacity-100"
              onClick={(event) => moveImage(event, 1)}
              aria-label={`Next image for ${property.name}`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-[8px] bg-black/65 px-2 py-1 backdrop-blur">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={clsx(
                    'h-1.5 rounded-full transition',
                    imageIndex === index ? 'w-5 bg-white' : 'w-1.5 bg-white/45',
                  )}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setImageIndex(index);
                  }}
                  aria-label={`Show image ${index + 1} for ${property.name}`}
                />
              ))}
            </div>
          </>
        ) : null}
        <button
          type="button"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-[8px] bg-black/70 text-ink-800 shadow-lg backdrop-blur transition hover:text-coral-600"
          onClick={() => dispatch(toggleWishlist(property.id))}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isWishlisted}
        >
          <Heart
            className={clsx('h-5 w-5', isWishlisted && 'fill-coral-500 text-coral-500')}
          />
        </button>
        <span className="absolute left-3 top-3 rounded-[8px] bg-black/75 px-3 py-1 text-xs font-extrabold text-white backdrop-blur">
          {property.tag}
        </span>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-[8px] bg-black/70 px-2 py-1 text-xs font-extrabold text-white backdrop-blur">
          <Images className="h-3.5 w-3.5" />
          {imageIndex + 1}/{images.length}
        </span>
      </div>

      <div className="grid gap-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              to={`/stays/${property.slug}`}
              onClick={scrollPageTop}
              className="line-clamp-1 text-lg font-extrabold text-ink-900 hover:text-ocean-700"
            >
              {property.name}
            </Link>
            <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-ink-500">
              <MapPin className="h-4 w-4 text-coral-500" />
              {property.city}, {property.country}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-[8px] bg-marigold-100 px-2 py-1 text-sm font-extrabold text-ink-900">
            <Star className="h-4 w-4 fill-marigold-400 text-marigold-400" />
            {formatRating(property.rating)}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs font-bold text-ink-500">
          <span className="inline-flex items-center gap-1">
            <Users className="h-4 w-4 text-ocean-600" />
            {property.guests} guests
          </span>
          <span className="inline-flex items-center gap-1">
            <BedDouble className="h-4 w-4 text-ocean-600" />
            {property.beds} beds
          </span>
          <span className="inline-flex items-center gap-1">
            <Bath className="h-4 w-4 text-ocean-600" />
            {property.baths} baths
          </span>
        </div>

        <div className="flex items-end justify-between gap-3 border-t border-ink-200 pt-4">
          <div>
            <p className="text-xl font-extrabold text-ink-900">
              {formatCurrency(priceInInr, 'INR')}
              <span className="text-sm font-semibold text-ink-500"> / night</span>
            </p>
            <p className="text-xs font-semibold text-ink-500">{property.reviews} guest reviews</p>
          </div>
          <Link
            to={`/stays/${property.slug}`}
            className="secondary-button px-4 py-2"
            onClick={scrollPageTop}
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
