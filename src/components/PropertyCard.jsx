import { Bath, BedDouble, Heart, MapPin, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../features/wishlist/wishlistSlice.js';
import { formatCurrency, formatRating } from '../utils/formatters.js';

export default function PropertyCard({ property }) {
  const wishlistIds = useSelector((state) => state.wishlist.ids);
  const dispatch = useDispatch();
  const isWishlisted = wishlistIds.includes(property.id);

  return (
    <article className="surface group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-200">
        <Link to={`/stays/${property.slug}`} aria-label={`View ${property.name}`}>
          <img
            src={property.images[0]}
            alt={property.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
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
      </div>

      <div className="grid gap-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              to={`/stays/${property.slug}`}
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
              {formatCurrency(property.price)}
              <span className="text-sm font-semibold text-ink-500"> / night</span>
            </p>
            <p className="text-xs font-semibold text-ink-500">{property.reviews} guest reviews</p>
          </div>
          <Link to={`/stays/${property.slug}`} className="secondary-button px-4 py-2">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
