import { CloudSun, LocateFixed, MapPin } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useGetWeatherQuery } from '../services/stayApi.js';

const fallbackCoordinates = { lat: 19.076, lon: 72.8777 };

export default function WeatherSignal({
  coordinates,
  label = 'Destination',
  useCurrentLocation = false,
}) {
  const [currentCoordinates, setCurrentCoordinates] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle');

  useEffect(() => {
    if (!useCurrentLocation || coordinates || typeof navigator === 'undefined') {
      return;
    }

    if (!navigator.geolocation) {
      setLocationStatus('fallback');
      setCurrentCoordinates(fallbackCoordinates);
      return;
    }

    setLocationStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentCoordinates({
          lat: Number(position.coords.latitude.toFixed(3)),
          lon: Number(position.coords.longitude.toFixed(3)),
        });
        setLocationStatus('current');
      },
      () => {
        setCurrentCoordinates(fallbackCoordinates);
        setLocationStatus('fallback');
      },
      { enableHighAccuracy: false, maximumAge: 600000, timeout: 8000 },
    );
  }, [coordinates, useCurrentLocation]);

  const queryCoordinates = useMemo(
    () => coordinates ?? currentCoordinates,
    [coordinates, currentCoordinates],
  );
  const { data: weather, isFetching } = useGetWeatherQuery(queryCoordinates, {
    skip: !queryCoordinates,
  });

  const heading = coordinates
    ? `${label} right now`
    : locationStatus === 'current'
      ? 'Your current location'
      : 'Current location weather';

  return (
    <div className="rounded-[8px] bg-white/10 p-4 backdrop-blur">
      <p className="inline-flex items-center gap-2 text-sm font-bold text-white">
        {coordinates ? (
          <MapPin className="h-5 w-5 text-coral-300" />
        ) : (
          <LocateFixed className="h-5 w-5 text-ocean-700" />
        )}
        {heading}
      </p>
      <p className="mt-2 text-2xl font-extrabold">
        {weather ? `${weather.temperature}C, ${weather.label}` : isFetching ? 'Loading weather' : 'Allow location'}
      </p>
      <p className="mt-1 text-xs font-semibold text-white/60">
        {weather
          ? `Wind ${weather.windSpeed} km/h`
          : locationStatus === 'fallback'
            ? 'Showing nearest fallback weather'
            : 'Using browser location when available'}
      </p>
      {!weather && !isFetching ? <CloudSun className="mt-3 h-6 w-6 text-marigold-400" /> : null}
    </div>
  );
}
