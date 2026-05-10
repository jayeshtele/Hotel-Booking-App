import { SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  title = 'No stays found',
  message = 'Try changing destination, budget, or amenity filters.',
  actionLabel = 'Explore all stays',
  actionTo = '/explore',
}) {
  return (
    <div className="surface mx-auto max-w-xl px-6 py-12 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-[8px] bg-coral-50 text-coral-600">
        <SearchX className="h-7 w-7" />
      </span>
      <h2 className="mt-5 text-2xl font-extrabold text-ink-900">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-500">{message}</p>
      <Link className="primary-button mt-6" to={actionTo}>
        {actionLabel}
      </Link>
    </div>
  );
}
