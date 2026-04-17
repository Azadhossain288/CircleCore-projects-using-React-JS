import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import FriendDetail from "./pages/FriendDetails";
import { TimelineProvider } from "./context/TimelineContext";


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
              
              {/* Onno page gulo */}
              <Route path="/timeline" element={<Timeline />} />
              
              
              
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TimelineProvider> 

  );
}