
import React, { useEffect, useState } from "react";

export default function Trending() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTrendingSongs = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=top%20charts&entity=song&limit=15`
      );
      const data = await res.json();
      setSongs(data.results);
    } catch (err) {
      console.error("Trending fetch error:", err);
      setSongs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrendingSongs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1f1f1f] text-white">
      {/* Header Banner */}
      <div className="w-full h-60 md:h-72 lg:h-80 relative">
        <img
          src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
          alt="Trending Banner"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            🔥 Trending Now
          </h1>
        </div>
      </div>

      <div className="px-4 py-12">
        <p className="text-center text-gray-400 mb-12 text-lg">
          Explore what's buzzing in the music world right now.
        </p>

        {loading ? (
          <div className="text-center text-gray-300 text-lg">Loading...</div>
        ) : songs.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {songs.map((song) => (
              <div
                key={song.trackId}
                className="bg-[#1e1e1e] rounded-xl p-4 flex flex-col items-center shadow-md hover:shadow-pink-500/30 transition"
              >
                <img
                  src={song.artworkUrl100.replace("100x100", "300x300")}
                  alt={song.trackName}
                  className="w-40 h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold text-pink-300">
                  {song.trackName}
                </h2>
                <p className="text-gray-300">{song.artistName}</p>
                <audio controls className="mt-4 w-full rounded-md">
                  <source src={song.previewUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">
            No trending songs available right now.
          </p>
        )}
      </div>
    </div>
  );
}
