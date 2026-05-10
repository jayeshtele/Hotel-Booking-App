export default function LogoMark({ className = 'h-11 w-11' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-label="StayNest"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="staynest-mark" x1="10" x2="54" y1="8" y2="58">
          <stop stopColor="#20b8aa" />
          <stop offset="0.48" stopColor="#ff385c" />
          <stop offset="1" stopColor="#f6b83f" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#030304" />
      <path
        d="M14 31.5L32 16l18 15.5V51a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3V31.5Z"
        fill="url(#staynest-mark)"
      />
      <path
        d="M21 34.5 32 25l11 9.5V50H21V34.5Z"
        fill="#030304"
        opacity="0.92"
      />
      <path d="M27 40h10v10H27V40Z" fill="#f8fafc" />
      <path
        d="M18 31.5 32 19l14 12.5"
        fill="none"
        stroke="#f8fafc"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <circle cx="47" cy="17" r="4" fill="#f6b83f" />
    </svg>
  );
}
