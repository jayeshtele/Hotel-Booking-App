import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import staysPayload from '../data/stays.json';
import { buildStayInventory } from '../data/stayInventory.js';

const fallbackRates = {
  base: 'USD',
  date: 'offline',
  rates: {
    USD: 1,
    INR: 83.5,
    EUR: 0.92,
    GBP: 0.79,
  },
  isFallback: true,
};

const weatherLabels = {
  0: 'Clear sky',
  1: 'Mostly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Rime fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Dense drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  71: 'Light snow',
  73: 'Snow',
  80: 'Rain showers',
  95: 'Thunderstorm',
};

function apiUrl(path = '') {
  const baseUrl = import.meta.env.VITE_STAY_API_BASE_URL;

  return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return response.json();
}

function normalizeText(value) {
  return String(value ?? '').trim().toLowerCase();
}

function filterStays(stays, filters = {}) {
  const destination = normalizeText(filters.destination);
  const selectedAmenities = filters.amenities ?? [];
  const maxPrice = Number(filters.maxPrice) || Number.POSITIVE_INFINITY;
  const category = filters.category ?? 'All';

  const filtered = stays.filter((stay) => {
    const searchable = normalizeText(
      [stay.name, stay.city, stay.country, stay.region, stay.category, stay.tag].join(' '),
    );
    const hasDestination = !destination || searchable.includes(destination);
    const hasCategory = category === 'All' || stay.category === category;
    const hasGuests = Number(stay.guests) >= Number(filters.guests || 1);
    const inBudget = Number(stay.price) <= maxPrice;
    const hasInstantBook = !filters.instantBook || stay.instantBook;
    const hasAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((amenity) => stay.amenities.includes(amenity));

    return (
      hasDestination &&
      hasCategory &&
      hasGuests &&
      inBudget &&
      hasInstantBook &&
      hasAmenities
    );
  });

  return filtered.sort((first, second) => {
    switch (filters.sortBy) {
      case 'price-low':
        return first.price - second.price;
      case 'price-high':
        return second.price - first.price;
      case 'rating':
        return second.rating - first.rating;
      default:
        return second.rating * second.reviews - first.rating * first.reviews;
    }
  });
}

function getInventory(payload) {
  const stays = Array.isArray(payload) ? payload : payload.stays;
  return buildStayInventory(stays ?? []);
}

async function loadStayPayload(signal) {
  if (!import.meta.env.VITE_STAY_API_BASE_URL) {
    return staysPayload;
  }

  return fetchJson(apiUrl('stays'), signal);
}

export const stayApi = createApi({
  reducerPath: 'stayApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Stay'],
  endpoints: (builder) => ({
    getProperties: builder.query({
      async queryFn(filters = {}, queryApi) {
        try {
          const payload = await loadStayPayload(queryApi.signal);
          const stays = getInventory(payload);
          return { data: filterStays(stays ?? [], filters) };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error.message,
            },
          };
        }
      },
      providesTags: ['Stay'],
    }),
    getProperty: builder.query({
      async queryFn(slug, queryApi) {
        try {
          const payload = await loadStayPayload(queryApi.signal);
          const stays = getInventory(payload);
          const property = stays?.find((stay) => stay.slug === slug);

          if (!property) {
            return {
              error: {
                status: 404,
                error: 'Stay not found',
              },
            };
          }

          return { data: property };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error.message,
            },
          };
        }
      },
      providesTags: (result, error, slug) => [{ type: 'Stay', id: slug }],
    }),
    getLiveRates: builder.query({
      async queryFn(_, queryApi) {
        try {
          const data = await fetchJson(
            'https://api.frankfurter.app/latest?from=USD&to=INR,EUR,GBP',
            queryApi.signal,
          );

          return {
            data: {
              base: data.base,
              date: data.date,
              rates: { USD: 1, ...data.rates },
              isFallback: false,
            },
          };
        } catch {
          return { data: fallbackRates };
        }
      },
    }),
    getWeather: builder.query({
      async queryFn(coordinates, queryApi) {
        if (coordinates?.lat == null || coordinates?.lon == null) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: 'Coordinates are required',
            },
          };
        }

        try {
          const params = new URLSearchParams({
            latitude: coordinates.lat,
            longitude: coordinates.lon,
            current_weather: 'true',
            timezone: 'auto',
          });
          const data = await fetchJson(
            `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
            queryApi.signal,
          );
          const weather = data.current_weather;

          return {
            data: {
              temperature: Math.round(weather.temperature),
              windSpeed: Math.round(weather.windspeed),
              code: weather.weathercode,
              label: weatherLabels[weather.weathercode] ?? 'Live weather',
              time: weather.time,
            },
          };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error.message,
            },
          };
        }
      },
    }),
  }),
});

export const {
  useGetLiveRatesQuery,
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useGetWeatherQuery,
} = stayApi;
