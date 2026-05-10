import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollPageTop } from '../utils/scrollPageTop.js';

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    scrollPageTop();
  }, [location.pathname, location.search]);

  return null;
}
