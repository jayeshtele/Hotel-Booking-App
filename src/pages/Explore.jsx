import { useEffect } from 'react';
import { Map, RefreshCcw } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import FilterBar from '../components/FilterBar.jsx';
import LoadingState from '../components/LoadingState.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import WeatherSignal from '../components/WeatherSignal.jsx';
import { setSearchField } from '../features/search/searchSlice.js';
import { useGetPropertiesQuery } from '../services/stayApi.js';

export default function Explore() {
  const filters = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const destinationParam = searchParams.get('destination') ?? '';
  const {
    data: properties = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetPropertiesQuery(filters);
  const selectedWeatherStay = filters.destination ? properties[0] : null;

  useEffect(() => {
    if (destinationParam && destinationParam !== filters.destination) {
      dispatch(setSearchField({ field: 'destination', value: destinationParam }));
    }
  }, [destinationParam, dispatch, filters.destination]);

  return (
    <div className="section-shell py-10">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Explore stays</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-ink-900 sm:text-5xl">
            Find your next check-in
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-500">
            Search by city, compare hotels and homes, filter by amenities, then reserve
            from the detail page.
          </p>
        </div>
        <button type="button" className="secondary-button self-start" onClick={refetch}>
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="mt-8">
        <SearchBar compact />
      </div>

      <div className="mt-6 grid gap-4 rounded-[8px] bg-black p-4 text-white ring-1 ring-ink-200 md:grid-cols-[1fr_auto] md:items-center">
        <WeatherSignal
          coordinates={selectedWeatherStay?.coordinates}
          label={selectedWeatherStay?.city ?? filters.destination}
          useCurrentLocation={!filters.destination}
        />
        <p className="text-sm font-semibold leading-6 text-white/60 md:max-w-sm">
          Weather follows the searched destination. With no destination selected, StayNest
          asks the browser for current-location weather.
        </p>
      </div>

      <div className="mt-6">
        <FilterBar />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-ink-500">
            {isLoading ? 'Loading stays' : `${properties.length} stays available`}
          </p>
          {isFetching && !isLoading ? (
            <p className="text-xs font-semibold text-ocean-700">Updating results...</p>
          ) : null}
        </div>
        <span className="inline-flex items-center gap-2 rounded-[8px] bg-ink-100 px-3 py-2 text-sm font-bold text-ink-600 shadow-sm ring-1 ring-ink-200">
          <Map className="h-4 w-4 text-coral-500" />
          List view
        </span>
      </div>

      <div className="mt-6">
        {isLoading ? <LoadingState count={6} /> : null}
        {isError ? (
          <EmptyState
            title="Could not reach stays API"
            message="The app is configured for a frontend API source. Start the dev server and refresh the request."
          />
        ) : null}
        {!isLoading && !isError && properties.length === 0 ? <EmptyState /> : null}
        {!isLoading && !isError && properties.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
