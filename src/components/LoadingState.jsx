export default function LoadingState({ count = 6 }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="surface overflow-hidden">
          <div className="aspect-[4/3] animate-pulse bg-ink-100" />
          <div className="grid gap-3 p-4">
            <div className="h-5 w-3/4 animate-pulse rounded bg-ink-100" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-ink-100" />
            <div className="h-12 animate-pulse rounded bg-ink-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
