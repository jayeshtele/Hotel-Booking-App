import {
  Building,
  Castle,
  Flame,
  Home,
  Landmark,
  Mountain,
  Palmtree,
  SlidersHorizontal,
  Sparkles,
  Waves,
} from 'lucide-react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetFilters,
  setSearchField,
  toggleAmenity,
} from '../features/search/searchSlice.js';

const categories = [
  { name: 'All', icon: Sparkles },
  { name: 'Beachfront', icon: Waves },
  { name: 'Heritage', icon: Castle },
  { name: 'Cabins', icon: Mountain },
  { name: 'City', icon: Building },
  { name: 'Iconic', icon: Landmark },
  { name: 'Desert', icon: Flame },
  { name: 'Tropical', icon: Palmtree },
];

const amenities = ['Pool', 'Wifi', 'Kitchen', 'Breakfast', 'Workspace', 'Parking'];

export default function FilterBar() {
  const filters = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const updateField = (field, value) => {
    dispatch(setSearchField({ field, value }));
  };

  return (
    <aside className="surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-ocean-50 text-ocean-700">
            <SlidersHorizontal className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-extrabold text-ink-900">Refine stays</h2>
            <p className="text-xs font-semibold text-ink-500">Match budget, style, and comfort</p>
          </div>
        </div>
        <button type="button" className="secondary-button py-2" onClick={() => dispatch(resetFilters())}>
          Reset
        </button>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = filters.category === category.name;

          return (
            <button
              type="button"
              key={category.name}
              onClick={() => updateField('category', category.name)}
              className={clsx(
                'inline-flex min-w-max items-center gap-2 rounded-[8px] border px-4 py-2 text-sm font-bold transition',
                isActive
                  ? 'border-ocean-600 bg-ocean-600 text-white'
                  : 'border-ink-100 bg-white text-ink-600 hover:border-ocean-200 hover:bg-ocean-50 hover:text-ocean-700',
              )}
            >
              <Icon className="h-4 w-4" />
              {category.name}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
        <label className="grid gap-2">
          <span className="text-xs font-extrabold uppercase text-ink-500">
            Max price: ${filters.maxPrice}
          </span>
          <input
            type="range"
            min="150"
            max="600"
            step="25"
            value={filters.maxPrice}
            onChange={(event) => updateField('maxPrice', Number(event.target.value))}
            className="h-2 accent-ocean-600"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-extrabold uppercase text-ink-500">Sort by</span>
          <select
            className="control py-2"
            value={filters.sortBy}
            onChange={(event) => updateField('sortBy', event.target.value)}
          >
            <option value="recommended">Recommended</option>
            <option value="rating">Highest rated</option>
            <option value="price-low">Price low to high</option>
            <option value="price-high">Price high to low</option>
          </select>
        </label>

        <label className="flex items-center justify-between gap-3 rounded-[8px] border border-ink-100 px-4 py-3">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-ink-700">
            <Home className="h-4 w-4 text-coral-500" />
            Instant book
          </span>
          <input
            type="checkbox"
            checked={filters.instantBook}
            onChange={(event) => updateField('instantBook', event.target.checked)}
            className="h-5 w-5 accent-coral-500"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {amenities.map((amenity) => {
          const isActive = filters.amenities.includes(amenity);

          return (
            <button
              type="button"
              key={amenity}
              onClick={() => dispatch(toggleAmenity(amenity))}
              className={clsx(
                'rounded-[8px] border px-3 py-2 text-xs font-extrabold transition',
                isActive
                  ? 'border-coral-500 bg-coral-50 text-coral-700'
                  : 'border-ink-100 bg-white text-ink-500 hover:border-coral-100 hover:text-coral-600',
              )}
            >
              {amenity}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
