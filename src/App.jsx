import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Explore from './pages/Explore.jsx';
import Home from './pages/Home.jsx';
import Host from './pages/Host.jsx';
import ListingDetails from './pages/ListingDetails.jsx';
import NotFound from './pages/NotFound.jsx';
import Trips from './pages/Trips.jsx';
import Wishlist from './pages/Wishlist.jsx';
import { getPageTitle } from './routes/pageMeta.js';

function DocumentTitle() {
  const location = useLocation();

  useEffect(() => {
    document.title = getPageTitle(location.pathname);
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <DocumentTitle />
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/stays/:slug" element={<ListingDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/host" element={<Host />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}
