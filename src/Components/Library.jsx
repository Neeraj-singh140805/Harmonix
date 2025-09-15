
import React, { useState, useEffect, useContext } from "react";
import { SettingContext } from "../context/SettingContext";

export default function Library() {
  const { darkMode, fontSize } = useContext(SettingContext);

  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [liked, setLiked] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    fetchSongs("top");
    setLiked(JSON.parse(localStorage.getItem("likedSongs")) || []);
    setFavourites(JSON.parse(localStorage.getItem("favouriteSongs")) || []);
  }, []);

  const fetchSongs = async (searchTerm) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          searchTerm
        )}&entity=song&limit=15`
      );
      const data = await res.json();
      setSongs(data.results);
    } catch (error) {
      console.error("Fetch error:", error);
      setSongs([]);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSongs(query);
  };

  const saveToStorage = (key, song, setState) => {
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    const isAlreadyAdded = existing.some((s) => s.trackId === song.trackId);
    if (!isAlreadyAdded) {
      const updated = [...existing, song];
      localStorage.setItem(key, JSON.stringify(updated));
      setState(updated);
    }
  };

  const isLiked = (id) => liked.some((s) => s.trackId === id);
  const isFavourite = (id) => favourites.some((s) => s.trackId === id);

  const addToPlaylist = () => {
    if (!playlistName.trim()) return;
    const stored = JSON.parse(localStorage.getItem("harmonix_playlists")) || {};
    const playlist = stored[playlistName] || [];
    const isAlreadyInPlaylist = playlist.some(
      (s) => s.trackId === selectedSong.trackId
    );
    if (isAlreadyInPlaylist) {
      setShowPlaylistModal(false);
      return;
    }

    const updatedPlaylist = [
      ...playlist,
      {
        ...selectedSong,
        artworkUrl:
          selectedSong.artworkUrl100?.replace("100x100", "300x300") ||
          selectedSong.artworkUrl100,
      },
    ];
    const updatedPlaylists = { ...stored, [playlistName]: updatedPlaylist };
    localStorage.setItem("harmonix_playlists", JSON.stringify(updatedPlaylists));
    setShowPlaylistModal(false);
    setPlaylistName("");
  };

  const handlePlay = (song) => {
    setNowPlaying(null);
    setTimeout(() => setNowPlaying(song), 0);
  };

  return (
    <div
      className={`pb-40 px-6 pt-6 min-h-screen relative transition-colors duration-500`}
      style={{
        fontSize: `${fontSize}px`,
        backgroundColor: darkMode ? "#111827" : "#f3f4f6",
        color: darkMode ? "white" : "black",
        backgroundImage: darkMode
          ? "none"
          : "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-center">
          🔍 Search Songs on Harmonix
        </h2>

        <form
          onSubmit={handleSearch}
          className="mb-10 max-w-xl mx-auto flex items-center gap-3"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artist or song name..."
            className={`flex-grow px-4 py-2 border rounded-xl shadow focus:outline-none focus:ring-2 transition ${
              darkMode
                ? "border-gray-700 bg-gray-800 text-white focus:ring-indigo-400"
                : "border-gray-300 bg-white text-black focus:ring-indigo-500"
            }`}
          />
          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </form>

        {loading ? (
          <div className={`text-center text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Loading...
          </div>
        ) : songs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {songs.map((song) => (
              <div
                key={song.trackId}
                className={`shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              >
                <img
                  src={song.artworkUrl100.replace("100x100", "300x300")}
                  alt={song.trackName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">{song.trackName}</h3>
                  <p className={`text-sm mb-2 truncate ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {song.artistName}
                  </p>
                  <button
                    onClick={() => handlePlay(song)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg transition-all"
                  >
                    ▶ Play
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          query &&
          !loading && (
            <div className={`text-center text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              No results found for <span className="font-semibold">"{query}"</span>
            </div>
          )
        )}

        {nowPlaying && (
          <div
            className={`fixed bottom-0 left-0 w-full border-t shadow-lg z-50 transition-colors duration-500 ${
              darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-200"
            }`}
          >
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={nowPlaying.artworkUrl100}
                  alt={nowPlaying.trackName}
                  className="w-14 h-14 rounded-md object-cover"
                />
                <div>
                  <h4 className="text-base font-semibold truncate">{nowPlaying.trackName}</h4>
                  <p className={`text-sm truncate ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {nowPlaying.artistName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <audio controls autoPlay className="w-56 sm:w-72">
                  <source src={nowPlaying.previewUrl} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>

                <button
                  onClick={() => saveToStorage("likedSongs", nowPlaying, setLiked)}
                  className={`text-sm px-3 py-1 rounded-md border transition ${
                    isLiked(nowPlaying.trackId)
                      ? "bg-green-100 text-green-600 border-green-300"
                      : darkMode
                      ? "border-gray-600 hover:bg-gray-700 text-white"
                      : "border-gray-300 hover:bg-gray-100 text-black"
                  }`}
                  disabled={isLiked(nowPlaying.trackId)}
                >
                  👍 {isLiked(nowPlaying.trackId) ? "Liked" : "Like"}
                </button>

                <button
                  onClick={() => saveToStorage("favouriteSongs", nowPlaying, setFavourites)}
                  className={`text-sm px-3 py-1 rounded-md border transition ${
                    isFavourite(nowPlaying.trackId)
                      ? "bg-red-100 text-red-600 border-red-300"
                      : darkMode
                      ? "border-red-400 hover:bg-red-600 text-white"
                      : "border-red-300 text-red-500 hover:bg-red-100"
                  }`}
                  disabled={isFavourite(nowPlaying.trackId)}
                >
                  ❤️ {isFavourite(nowPlaying.trackId) ? "Favourited" : "Favourite"}
                </button>

                <button
                  onClick={() => {
                    setSelectedSong(nowPlaying);
                    setShowPlaylistModal(true);
                  }}
                  className="text-sm px-3 py-1 rounded-md border border-blue-400 text-blue-500 hover:bg-blue-100 transition"
                >
                  ➕ Add to Playlist
                </button>
              </div>
            </div>
          </div>
        )}

        {showPlaylistModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`p-6 rounded-lg w-80 transition-colors duration-500 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
              <h3 className="text-lg font-semibold mb-4">Add to Playlist</h3>
              <input
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Enter or select playlist name"
                className={`w-full border px-3 py-2 rounded mb-4 transition-colors duration-300 ${
                  darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-white text-black"
                }`}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowPlaylistModal(false)}
                  className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={addToPlaylist}
                  className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


