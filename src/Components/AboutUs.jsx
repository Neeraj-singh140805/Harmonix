import React, { useContext } from "react";
import { SettingContext } from "../context/SettingContext";

export default function AboutUs() {
  const { darkMode, fontSize } = useContext(SettingContext);

  return (
    <div
      className="min-h-screen px-6 py-12 bg-cover bg-center transition-colors duration-500"
      style={{
        fontSize: `${fontSize}px`,
        backgroundColor: darkMode ? "#111827" : undefined,
        backgroundImage: darkMode
          ? "none"
          : `url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4')`,
      }}
    >
      <div
        className={`max-w-4xl mx-auto p-8 rounded-2xl shadow-lg transition-colors duration-500 ${
          darkMode ? "bg-gray-800" : "bg-black/60"
        }`}
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-orange-500">
          About Harmonix
        </h1>

        <p className="text-lg mb-6 leading-relaxed text-gray-300">
          Harmonix is more than just a music player—it's your personalized audio
          journey. We believe music is the heartbeat of life, and our mission is
          to bring you a seamless, beautiful way to experience your favorite
          tracks.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-orange-400">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>🎵 High-quality streaming and audio playback</li>
          <li>📚 A smart and searchable music library</li>
          <li>❤️ Liked songs and custom playlists</li>
          <li>🌗 Sleek UI with dark/light mode toggle</li>
          <li>🚀 Fast and responsive design across devices</li>
        </ul>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-orange-400">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed">
            At Harmonix, we envision a world where every beat you love is at
            your fingertips. We’re building a platform where discovery,
            personalization, and creativity meet to enhance your music
            experience.
          </p>
        </div>

        <div className="mt-10 text-center">
          <h3 className="text-xl font-semibold mb-2 text-orange-300">
            Built with ❤️ by Music Lovers
          </h3>
          <p className="text-gray-400">Thank you for being part of the Harmonix journey!</p>
        </div>
      </div>
    </div>
  );
}

