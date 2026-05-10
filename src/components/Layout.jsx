import Footer from './Footer.jsx';
import Header from './Header.jsx';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-ink-50 text-ink-900">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
