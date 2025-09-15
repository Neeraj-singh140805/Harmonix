import React, { useEffect, useState } from "react";

export default function Feed() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeedSongs = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=top&entity=song&limit=12`
      );
      const data = await res.json();
      setSongs(data.results);
    } catch (err) {
      console.error("Failed to fetch feed:", err);
      setSongs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeedSongs();
  }, []);

  return (
    <div className="min-h-screen px-4 py-16 bg-gradient-to-br from-[#121212] to-[#1f1f1f] text-white">
      {/* 🖼️ Header Banner Image */}
      <div className="max-w-6xl mx-auto mb-12">
        <img
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
          alt="Music Feed"
          className="w-full h-64 object-cover rounded-xl shadow-lg"
        />
      </div>

      <h1 className="text-4xl font-bold text-pink-400 mb-4 text-center">
        🎵 Music Feed
      </h1>
      <p className="text-center text-gray-400 mb-12 text-lg">
        Discover the latest trending tracks, fresh from the charts.
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
          No songs available at the moment.
        </p>
      )}
    </div>
  );
}
