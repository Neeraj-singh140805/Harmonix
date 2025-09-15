import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SettingContext } from "../context/SettingContext";

export default function Home() {
  const { darkMode, fontSize } = useContext(SettingContext);

  return (
    <div
      className="min-h-screen py-16 px-4 flex flex-col items-center text-white font-sans relative transition-colors duration-500"
      style={{
        fontSize: `${fontSize}px`,
        backgroundColor: darkMode ? "#111827" : undefined,
        backgroundImage: darkMode
          ? "none"
          : "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      {darkMode && <div className="absolute inset-0 bg-black"></div>}
      <div className="relative z-10 w-full flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-12 bg-gradient-to-r from-pink-500 to-red-400 bg-clip-text text-transparent">
          Welcome to Harmonix
        </h1>

        <div className="w-full max-w-5xl flex flex-col gap-8">
          {/* Feed */}
          <Link to="/feed" className="w-full no-underline">
            <div
              className={`flex items-center backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-pink-500/30 hover:-translate-y-1 transition duration-300 p-4 ${
                darkMode ? "bg-gray-800" : "bg-[#1e1e1e]/80"
              }`}
            >
              <img
                src="https://d1rs3px2gf3dlr.cloudfront.net/media/blog/featured/RockBand4-KeyArt-1080p.png"
                alt="Feed"
                className="w-44 h-44 object-cover rounded-xl mr-8"
              />
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl text-pink-400 mb-2">Feed</h2>
                <p className={darkMode ? "text-gray-300" : "text-gray-300"}>
                  Discover new tracks and playlists
                </p>
              </div>
            </div>
          </Link>

          {/* Trending */}
          <Link to="/trending" className="w-full no-underline">
            <div
              className={`flex items-center backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-pink-500/30 hover:-translate-y-1 transition duration-300 p-4 ${
                darkMode ? "bg-gray-800" : "bg-[#1e1e1e]/80"
              }`}
            >
              <img
                src="https://images.fastcompany.com/image/upload/f_webp,q_auto,c_fit/fc/3041984-poster-p-1-this-concert-app-feeds-starving-musicians-with-a-map-to-track-their-fans.jpg"
                alt="Trending"
                className="w-44 h-44 object-cover rounded-xl mr-8"
              />
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl text-pink-400 mb-2">Trending</h2>
                <p className={darkMode ? "text-gray-300" : "text-gray-300"}>
                  Check out the latest trending music
                </p>
              </div>
            </div>
          </Link>

          {/* Favorites */}
          <Link to="/favorites" className="w-full no-underline">
            <div
              className={`flex items-center backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-pink-500/30 hover:-translate-y-1 transition duration-300 p-4 ${
                darkMode ? "bg-gray-800" : "bg-[#1e1e1e]/80"
              }`}
            >
              <img
                src="https://i0.wp.com/www.thedomesticmusician.com/wp-content/uploads/2016/10/Musicuniverallanguage-.jpg?resize=750%2C410&ssl=1"
                alt="Favorites"
                className="w-44 h-44 object-cover rounded-xl mr-8"
              />
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl text-pink-400 mb-2">Favorites</h2>
                <p className={darkMode ? "text-gray-300" : "text-gray-300"}>
                  Your favorite tracks and playlists
                </p>
              </div>
            </div>
          </Link>

          {/* Liked Songs */}
          <Link to="/liked-songs" className="w-full no-underline">
            <div
              className={`flex items-center backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-pink-500/30 hover:-translate-y-1 transition duration-300 p-4 ${
                darkMode ? "bg-gray-800" : "bg-[#1e1e1e]/80"
              }`}
            >
              <img
                src="https://i.imgur.com/j6yj876.jpg"
                alt="Liked Songs"
                className="w-44 h-44 object-cover rounded-xl mr-8"
              />
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl text-pink-400 mb-2">Liked Songs</h2>
                <p className={darkMode ? "text-gray-300" : "text-gray-300"}>
                  The Songs you Liked!
                </p>
              </div>
            </div>
          </Link>

          {/* Playlists */}
          <Link to="/playlists" className="w-full no-underline">
            <div
              className={`flex items-center backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-pink-500/30 hover:-translate-y-1 transition duration-300 p-4 ${
                darkMode ? "bg-gray-800" : "bg-[#1e1e1e]/80"
              }`}
            >
              <img
                src="https://static.toiimg.com/thumb/msid-101701589,width-1280,height-720,resizemode-4/101701589.jpg"
                alt="Playlists"
                className="w-44 h-44 object-cover rounded-xl mr-8"
              />
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl text-pink-400 mb-2">Playlists</h2>
                <p className={darkMode ? "text-gray-300" : "text-gray-300"}>
                  Your personalized playlists and curated mixes.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
