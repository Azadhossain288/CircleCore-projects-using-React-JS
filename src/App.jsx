import { lazy, Suspense, useState, useEffect } from "react"; 
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { TimelineProvider } from "./context/TimelineContext";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';

// 1. Lazy Imports
const Home = lazy(() => import("./pages/Home"));
const Timeline = lazy(() => import("./pages/Timeline"));
const Stats = lazy(() => import("./pages/Stats"));
const FriendDetail = lazy(() => import("./pages/FriendDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

// 2. Loading Spinner Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-emerald-800 font-medium animate-pulse">Loading KeenKeeper...</p>
    </div>
  </div>
);

// 3. Navigation Loader 
function NavigationLoader({ children }) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // load start when url change
    setLoading(true);
    
    // delay 
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); 

    return () => clearTimeout(timer);
  }, [location]); 

  return loading ? <PageLoader /> : children;
}

export default function App() {
  return (
    <TimelineProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#f8f7f4]">
          {/* Notification Popups */}
          <Toaster position="top-center" reverseOrder={false} />
          
          <Navbar />
          
          <main className="flex-1">
            {/* Custom Loader for Click events */}
            <NavigationLoader>
              {/* Suspense for Initial Page Load */}
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/user/:id" element={<FriendDetail />} />
                  <Route path="/timeline" element={<Timeline />} />
                  <Route path="/stats" element={<Stats />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </NavigationLoader>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </TimelineProvider>
  );
}