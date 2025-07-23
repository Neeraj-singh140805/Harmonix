import React, { useEffect, useState } from "react";

export default function Playlist() {
  const [playlists, setPlaylists] = useState({});
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  // Load playlists on mount
  useEffect(() => {
    const saved = localStorage.getItem("harmonix_playlists");
    if (saved) {
      setPlaylists(JSON.parse(saved));
    }
  }, []);

  // Remove song from playlist
  const removeSong = (playlistName, trackId) => {
    const updatedPlaylist = playlists[playlistName].filter(song => song.trackId !== trackId);
    const updatedPlaylists = {
      ...playlists,
      [playlistName]: updatedPlaylist,
    };
    setPlaylists(updatedPlaylists);
    localStorage.setItem("harmonix_playlists", JSON.stringify(updatedPlaylists));
  };

  // Delete entire playlist
  const deletePlaylist = (name) => {
    const updated = { ...playlists };
    delete updated[name];
    setPlaylists(updated);
    localStorage.setItem("harmonix_playlists", JSON.stringify(updated));
    setSelectedPlaylist(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1f1f1f] text-white font-sans">
      {/* 🎵 Playlist Header Banner */}
      <div className="relative h-60 w-full mb-10">
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
          alt="Playlist Banner"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">
            🎶 My Playlists
          </h1>
        </div>
      </div>

      {/* Playlist List */}
      {Object.keys(playlists).length === 0 ? (
        <p className="text-center text-gray-400">No playlists found.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 mb-8 px-4">
          {Object.keys(playlists).map((name) => (
            <div
              key={name}
              className={`px-4 py-2 rounded-full cursor-pointer font-semibold ${
                selectedPlaylist === name
                  ? "bg-pink-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-pink-500 hover:text-white"
              }`}
              onClick={() => setSelectedPlaylist(name)}
            >
              {name}
            </div>
          ))}
        </div>
      )}

      {/* Playlist Songs */}
      {selectedPlaylist && playlists[selectedPlaylist]?.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 pb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-pink-400">{selectedPlaylist}</h2>
            <button
              onClick={() => deletePlaylist(selectedPlaylist)}
              className="text-sm text-red-400 hover:text-red-600"
            >
              Delete Playlist ❌
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {playlists[selectedPlaylist].map((song) => (
              <div
                key={song.trackId}
                className="bg-[#1e1e1e] p-4 rounded-xl shadow hover:shadow-pink-500/30 transition"
              >
                <img
                  src={song.artworkUrl}
                  alt={song.trackName}
                  className="rounded-lg mb-4 w-full h-40 object-cover"
                />
                <h3 className="text-lg font-semibold text-pink-300">{song.trackName}</h3>
                <p className="text-gray-300">{song.artistName}</p>
                <audio controls className="w-full mt-2">
                  <source src={song.previewUrl} type="audio/mpeg" />
                </audio>
                <button
                  onClick={() => removeSong(selectedPlaylist, song.trackId)}
                  className="mt-3 text-sm text-red-300 hover:text-red-500"
                >
                  Remove from Playlist
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}