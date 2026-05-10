import { Heart } from 'lucide-react';
import EmptyState from '../components/EmptyState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import { useSelector } from 'react-redux';
import { useGetPropertiesQuery } from '../services/stayApi.js';

export default function Wishlist() {
  const wishlistIds = useSelector((state) => state.wishlist.ids);
  const { data: properties = [], isLoading, isError } = useGetPropertiesQuery({ maxPrice: 900 });
  const saved = properties.filter((property) => wishlistIds.includes(property.id));

  return (
    <div className="section-shell py-10">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-coral-50 text-coral-600">
          <Heart className="h-6 w-6" />
        </span>
        <div>
          <p className="eyebrow">Wishlist</p>
          <h1 className="font-display text-4xl font-bold text-ink-900">Saved stays</h1>
        </div>
      </div>

      <div className="mt-8">
        {isLoading ? <LoadingState /> : null}
        {isError ? (
          <EmptyState
            title="Wishlist could not load"
            message="The saved IDs are in your browser, but the stay API request failed."
          />
        ) : null}
        {!isLoading && !isError && saved.length === 0 ? (
          <EmptyState
            title="No saved stays yet"
            message="Tap the heart on any listing to build your shortlist."
          />
        ) : null}
        {!isLoading && !isError && saved.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
