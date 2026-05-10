import EmptyState from '../components/EmptyState.jsx';

export default function NotFound() {
  return (
    <div className="section-shell py-10">
      <EmptyState
        title="Page not found"
        message="That route does not exist in StayNest yet."
        actionLabel="Go home"
        actionTo="/"
      />
    </div>
  );
}
