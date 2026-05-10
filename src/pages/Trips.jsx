import { CalendarDays, MapPin, Trash2, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import { removeBooking } from '../features/booking/bookingSlice.js';
import { formatCurrency, toReadableDate } from '../utils/formatters.js';
import { scrollPageTop } from '../utils/scrollPageTop.js';

export default function Trips() {
  const bookings = useSelector((state) => state.bookings.items);
  const dispatch = useDispatch();

  return (
    <div className="section-shell py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Trips</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-ink-900 sm:text-5xl">
            Confirmed reservations
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-500">
            Reservations made in the demo are stored in Redux and persisted locally.
          </p>
        </div>
        <Link to="/explore" className="primary-button self-start" onClick={scrollPageTop}>
          Book another stay
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No trips booked"
            message="Choose a stay, pick dates, and reserve it to see your trip here."
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-5">
          {bookings.map((booking) => (
            <article key={booking.id} className="surface overflow-hidden md:grid md:grid-cols-[280px_1fr]">
              <img
                src={booking.image}
                alt={booking.propertyName}
                className="h-64 w-full object-cover md:h-full"
              />
              <div className="grid gap-5 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <Link
                      to={`/stays/${booking.slug}`}
                      onClick={scrollPageTop}
                      className="text-2xl font-extrabold text-ink-900 hover:text-ocean-700"
                    >
                      {booking.propertyName}
                    </Link>
                    <p className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-ink-500">
                      <MapPin className="h-4 w-4 text-coral-500" />
                      {booking.city}, {booking.country}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => dispatch(removeBooking(booking.id))}
                    aria-label="Remove booking"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-4">
                  <div className="rounded-[8px] bg-ink-50 p-3">
                    <p className="text-xs font-extrabold uppercase text-ink-500">Check in</p>
                    <p className="mt-1 text-sm font-extrabold text-ink-900">
                      {toReadableDate(booking.checkIn)}
                    </p>
                  </div>
                  <div className="rounded-[8px] bg-ink-50 p-3">
                    <p className="text-xs font-extrabold uppercase text-ink-500">Check out</p>
                    <p className="mt-1 text-sm font-extrabold text-ink-900">
                      {toReadableDate(booking.checkOut)}
                    </p>
                  </div>
                  <div className="rounded-[8px] bg-ink-50 p-3">
                    <p className="text-xs font-extrabold uppercase text-ink-500">Guests</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-sm font-extrabold text-ink-900">
                      <Users className="h-4 w-4 text-ocean-600" />
                      {booking.guests}
                    </p>
                  </div>
                  <div className="rounded-[8px] bg-black p-3 text-white ring-1 ring-ink-200">
                    <p className="text-xs font-extrabold uppercase text-white/60">Total</p>
                    <p className="mt-1 text-sm font-extrabold">
                      {formatCurrency(booking.total, booking.currency)}
                    </p>
                  </div>
                </div>

                <p className="inline-flex items-center gap-2 text-sm font-bold text-ocean-700">
                  <CalendarDays className="h-4 w-4" />
                  {booking.nights} nights confirmed
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
