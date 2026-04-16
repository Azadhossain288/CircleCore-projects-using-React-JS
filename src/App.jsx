import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <main className="p-10 text-center">
          <h1 className="text-3xl font-bold text-primary">
            Welcome to Keenkeeper
          </h1>
          
        </main>
      </div>
    </BrowserRouter>
  );
}