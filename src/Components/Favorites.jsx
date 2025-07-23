

import React, { useEffect, useState } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favSongs = JSON.parse(localStorage.getItem("favouriteSongs")) || [];
    setFavorites(favSongs);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1f1f1f] text-white">
      
      {/* Banner */}
      <div className="w-full h-60 md:h-72 lg:h-80 overflow-hidden">
        <img
          src="https://www.festivalpro.com/articles/1863.png"
          alt="Favorites Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-4xl font-bold text-pink-400 mb-8 text-center mt-10">Your Favorites</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4 pb-16">
        {favorites.length === 0 ? (
          <p className="text-center col-span-full text-gray-400">No favorite songs yet!</p>
        ) : (
          favorites.map((song) => (
            <div
              key={song.trackId}
              className="bg-[#1e1e1e] rounded-xl p-4 flex flex-col items-center shadow-md hover:shadow-pink-500/30 transition"
            >
              <img
                src={song.artworkUrl100.replace("100x100", "300x300")}
                alt={song.trackName}
                className="w-40 h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-pink-300">{song.trackName}</h2>
              <p className="text-gray-300">{song.artistName}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

