// src/Components/Welcome.jsx
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1740&q=80')", // 🎵 Music theme (concert + vibes)
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center p-10 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-lg max-w-lg">
        {/* Logo */}
        <h1 className="text-6xl font-extrabold mb-4 tracking-wide drop-shadow-lg">
          🎵 Harmonix
        </h1>
        <p className="text-lg text-gray-200 mb-8">
          Your Music. Your Vibe.
        </p>

        {/* Buttons */}
        <div className="flex space-x-6">
          <button
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transform transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="px-8 py-3 rounded-xl bg-white text-indigo-600 font-semibold shadow-lg hover:bg-gray-100 hover:scale-105 transform transition"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}


