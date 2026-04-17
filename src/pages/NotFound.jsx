
import { useNavigate } from "react-router-dom";
import { Orbit, Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      {/* Decorative bg */}
      <div className="relative mb-8">
        <div className="text-[120px] md:text-[160px] font-black text-gray-100 leading-none select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-violet-300 rotate-12">
            <Orbit size={36} className="text-white -rotate-12" />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-black text-gray-700 mb-3">
        404 Error
        
      </h2>
      <p className="text-gray-400 text-base mb-8 max-w-sm">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-violet-300"
      >
        <Home size={16} />
        Back to Home
      </button>
    </div>
  );
}


