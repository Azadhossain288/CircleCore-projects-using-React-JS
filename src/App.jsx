import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import Stats from "./pages/Stats";
import FriendDetail from "./pages/FriendDetails";
import NotFound from "./pages/NotFound";
import { TimelineProvider } from "./context/TimelineContext";
import Footer from "./components/Footer";


export default function App() {
  return (
   
     <TimelineProvider> {/* Context Provider */}
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#f8f7f4]">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              {/* Home page route */}
              <Route path="/" element={<Home />} />
              
              {/* Friend Details Page */}
              <Route path="/user/:id" element={<FriendDetail />} />
              
              {/* another page timeline and stats  */}
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/stats" element={<Stats />} />

              
               <Route path="*" element={<NotFound />} />
              
              
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </TimelineProvider> 

  );
}