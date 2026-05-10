const pageTitles = [
  { match: (path) => path === '/', title: 'StayNest | Curated Hotel Stays' },
  { match: (path) => path.startsWith('/explore'), title: 'StayNest | Explore Stays' },
  { match: (path) => path.startsWith('/stays/'), title: 'StayNest | Stay Details' },
  { match: (path) => path === '/wishlist', title: 'StayNest | Wishlist' },
  { match: (path) => path === '/trips', title: 'StayNest | Trips' },
  { match: (path) => path === '/host', title: 'StayNest | Host Your Stay' },
];

export function getPageTitle(pathname) {
  return pageTitles.find((page) => page.match(pathname))?.title ?? 'StayNest';
}
