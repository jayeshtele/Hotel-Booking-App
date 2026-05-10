import { MapPin, Search, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import DateInput from './DateInput.jsx';
import { setSearchField } from '../features/search/searchSlice.js';

export default function SearchBar({ compact = false }) {
  const filters = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateField = (field, value) => {
    dispatch(setSearchField({ field, value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (filters.destination) {
      params.set('destination', filters.destination);
    }
    navigate(`/explore${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        'grid gap-3 rounded-[8px] bg-ink-100/95 p-3 shadow-soft ring-1 ring-ink-200 backdrop-blur',
        compact
          ? 'border border-ink-200 lg:grid-cols-[1.4fr_1fr_1fr_.8fr_auto]'
          : 'lg:grid-cols-[1.5fr_1fr_1fr_.8fr_auto]',
      )}
      data-testid="search-bar"
    >
      <label className="group flex items-center gap-3 rounded-[8px] border border-ink-200 bg-ink-50 px-4 py-3 transition focus-within:border-ocean-500 focus-within:ring-4 focus-within:ring-ocean-100">
        <MapPin className="h-5 w-5 shrink-0 text-coral-500" />
        <span className="grid flex-1 gap-1">
          <span className="text-xs font-extrabold uppercase text-ink-500">Where</span>
          <input
            value={filters.destination}
            onChange={(event) => updateField('destination', event.target.value)}
            className="min-w-0 border-0 bg-transparent p-0 text-sm font-bold text-ink-900 outline-none placeholder:text-ink-500"
            placeholder="City, hotel, or vibe"
          />
        </span>
      </label>

      <DateInput
        label="Check in"
        value={filters.checkIn}
        onChange={(value) => updateField('checkIn', value)}
      />

      <DateInput
        label="Check out"
        value={filters.checkOut}
        min={filters.checkIn}
        onChange={(value) => updateField('checkOut', value)}
      />

      <label className="group flex items-center gap-3 rounded-[8px] border border-ink-200 bg-ink-50 px-4 py-3 transition focus-within:border-ocean-500 focus-within:ring-4 focus-within:ring-ocean-100">
        <Users className="h-5 w-5 shrink-0 text-marigold-600" />
        <span className="grid flex-1 gap-1">
          <span className="text-xs font-extrabold uppercase text-ink-500">Guests</span>
          <input
            type="number"
            min="1"
            max="12"
            value={filters.guests}
            onChange={(event) => updateField('guests', Number(event.target.value))}
            className="min-w-0 border-0 bg-transparent p-0 text-sm font-bold text-ink-900 outline-none"
          />
        </span>
      </label>

      <button type="submit" className="primary-button min-h-14 px-6">
        <Search className="h-5 w-5" />
        <span className="lg:hidden xl:inline">Search</span>
      </button>
    </form>
  );
}
