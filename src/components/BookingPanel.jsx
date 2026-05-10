import { addDays, format, isAfter, parseISO } from 'date-fns';
import { BadgeCheck, CalendarDays, CreditCard, ShieldCheck, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBooking } from '../features/booking/bookingSlice.js';
import { useGetLiveRatesQuery } from '../services/stayApi.js';
import { formatCurrency, getNightCount } from '../utils/formatters.js';

const currencies = ['USD', 'INR', 'EUR', 'GBP'];

function todayIso() {
  return format(new Date(), 'yyyy-MM-dd');
}

function plusDaysIso(value, days) {
  return format(addDays(parseISO(value), days), 'yyyy-MM-dd');
}

export default function BookingPanel({ property }) {
  const filters = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: liveRates } = useGetLiveRatesQuery();
  const [currency, setCurrency] = useState('USD');
  const [error, setError] = useState('');

  const initialCheckIn = filters.checkIn || todayIso();
  const [form, setForm] = useState({
    checkIn: initialCheckIn,
    checkOut: filters.checkOut || plusDaysIso(initialCheckIn, 3),
    guests: Math.min(filters.guests || 2, property.guests),
  });

  const rate = liveRates?.rates?.[currency] ?? 1;
  const nights = getNightCount(form.checkIn, form.checkOut);

  const totals = useMemo(() => {
    const subtotal = property.price * nights;
    const total = subtotal + property.cleaningFee + property.serviceFee;

    return {
      subtotal,
      total,
      convertedTotal: total * rate,
      convertedNight: property.price * rate,
    };
  }, [nights, property.cleaningFee, property.price, property.serviceFee, rate]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError('');
  };

  const handleBooking = () => {
    if (!isAfter(parseISO(form.checkOut), parseISO(form.checkIn))) {
      setError('Check-out must be after check-in.');
      return;
    }

    dispatch(
      addBooking({
        id:
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `${property.id}-${Date.now()}`,
        propertyId: property.id,
        propertyName: property.name,
        slug: property.slug,
        image: property.images[0],
        city: property.city,
        country: property.country,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: form.guests,
        nights,
        currency,
        total: Math.round(totals.convertedTotal),
        bookedAt: new Date().toISOString(),
      }),
    );
    navigate('/trips');
  };

  return (
    <aside className="surface sticky top-28 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-2xl font-extrabold text-ink-900">
            {formatCurrency(totals.convertedNight, currency)}
            <span className="text-sm font-semibold text-ink-500"> / night</span>
          </p>
          <p className="mt-1 text-xs font-bold text-ink-500">
            Live FX {liveRates?.date ?? 'loading'} {liveRates?.isFallback ? '(fallback)' : ''}
          </p>
        </div>
        <select
          className="control w-24 py-2"
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
          aria-label="Currency"
        >
          {currencies.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 grid gap-3">
        <label className="grid gap-2">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-ink-500">
            <CalendarDays className="h-4 w-4 text-ocean-600" />
            Check in
          </span>
          <input
            className="control"
            type="date"
            min={todayIso()}
            value={form.checkIn}
            onChange={(event) => updateField('checkIn', event.target.value)}
          />
        </label>
        <label className="grid gap-2">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-ink-500">
            <CalendarDays className="h-4 w-4 text-ocean-600" />
            Check out
          </span>
          <input
            className="control"
            type="date"
            min={plusDaysIso(form.checkIn, 1)}
            value={form.checkOut}
            onChange={(event) => updateField('checkOut', event.target.value)}
          />
        </label>
        <label className="grid gap-2">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-ink-500">
            <Users className="h-4 w-4 text-ocean-600" />
            Guests
          </span>
          <input
            className="control"
            type="number"
            min="1"
            max={property.guests}
            value={form.guests}
            onChange={(event) => updateField('guests', Number(event.target.value))}
          />
        </label>
      </div>

      <div className="mt-5 grid gap-3 rounded-[8px] bg-ink-50 p-4 text-sm font-semibold text-ink-600">
        <div className="flex justify-between gap-4">
          <span>
            {formatCurrency(totals.convertedNight, currency)} x {nights} nights
          </span>
          <span>{formatCurrency(totals.subtotal * rate, currency)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Cleaning fee</span>
          <span>{formatCurrency(property.cleaningFee * rate, currency)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Service fee</span>
          <span>{formatCurrency(property.serviceFee * rate, currency)}</span>
        </div>
        <div className="flex justify-between gap-4 border-t border-ink-100 pt-3 text-base font-extrabold text-ink-900">
          <span>Total</span>
          <span>{formatCurrency(totals.convertedTotal, currency)}</span>
        </div>
      </div>

      {error ? <p className="mt-3 text-sm font-bold text-coral-600">{error}</p> : null}

      <button type="button" className="primary-button mt-5 w-full" onClick={handleBooking}>
        <CreditCard className="h-5 w-5" />
        Reserve
      </button>

      <div className="mt-4 grid gap-2 text-xs font-bold text-ink-500">
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-ocean-600" />
          No payment is collected in this frontend demo.
        </span>
        <span className="inline-flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 text-ocean-600" />
          Instant confirmation is saved to Trips.
        </span>
      </div>
    </aside>
  );
}
