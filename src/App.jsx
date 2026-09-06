import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
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
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
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
    </AnimatePresence>
  );
}

export default function App() {
  // Only show loader once per browser session, never again on navigation
  const [loading, setLoading] = useState(() => !sessionStorage.getItem("loaded"));

  useEffect(() => {
    initTheme(); // dark by default
    if (loading) {
      const t = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("loaded", "1");
      }, 2600);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <SiteProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </SiteProvider>
  );
}