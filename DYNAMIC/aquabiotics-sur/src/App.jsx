import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Technology from './pages/Technology';
import Market from './pages/Market';
import Sustainability from './pages/Sustainability';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname, state } = useLocation();

  import('react').then(React => {
    React.useEffect(() => {
      // If the location state specifies a specific section or tab to scroll to, let the page component handle it.
      // Otherwise, scroll to the top of the new page.
      if (!state?.section && !state?.tab) {
        window.scrollTo(0, 0);
      }
    }, [pathname, state]);
  });

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/market" element={<Market />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow flex flex-col bg-gray-50 min-h-screen">
        <AnimatedRoutes />
      </main>
      <Footer />
    </Router>
  );
}

