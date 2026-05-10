import { differenceInCalendarDays, parseISO } from 'date-fns';

export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

export function getNightCount(checkIn, checkOut) {
  if (!checkIn || !checkOut) {
    return 1;
  }

  return Math.max(differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn)), 1);
}

export function formatRating(rating) {
  return Number(rating).toFixed(2);
}

export function toReadableDate(value) {
  if (!value) {
    return 'Flexible';
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}
