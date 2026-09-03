import { useEffect, useState } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SiteProvider } from "./context/SiteContext";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingSocial from "./components/FloatingSocial";
import { ClickSparkCanvas, ScrollProgress } from "./components/fx";
import ErrorBoundary from "./components/ErrorBoundary";
import { initTheme } from "./theme";
import Home from "./pages/Home";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Book from "./pages/Book";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    // enter-only page animation: the old page unmounts immediately, so a
    // interrupted transition can never leave a blank screen
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/book" element={<Book />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/panel" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initTheme(); // dark by default
    const t = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <SiteProvider>
      <HashRouter>
        <ScrollToTop />
        <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
        {!loading && (
          <>
            <ScrollProgress />
            <ClickSparkCanvas />
            <Navbar />
            <main className="min-h-screen pt-[72px]">
              <ErrorBoundary>
                <AnimatedRoutes />
              </ErrorBoundary>
            </main>
            <FloatingSocial />
            <Footer />
          </>
        )}
      </HashRouter>
    </SiteProvider>
  );
}
