// import React, { useState, useEffect } from "react";
// export default function Library() {
//   const [query, setQuery] = useState("");
//   const [songs, setSongs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [nowPlaying, setNowPlaying] = useState(null);
//   const [liked, setLiked] = useState([]);
//   const [favourites, setFavourites] = useState([]);

//   useEffect(() => {
//     fetchSongs("top");
//     setLiked(JSON.parse(localStorage.getItem("likedSongs")) || []);
//     setFavourites(JSON.parse(localStorage.getItem("favouriteSongs")) || []);
//   }, []);

//   const fetchSongs = async (searchTerm) => {
//     if (!searchTerm.trim()) return;
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `https://itunes.apple.com/search?term=${encodeURIComponent(
//           searchTerm
//         )}&entity=song&limit=15`
//       );
//       const data = await res.json();
//       setSongs(data.results);
//     } catch (error) {
//       console.error("Fetch error:", error);
//       setSongs([]);
//     }
//     setLoading(false);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchSongs(query);
//   };

//   const saveToStorage = (key, song, setState) => {
//     const existing = JSON.parse(localStorage.getItem(key)) || [];
//     const isAlreadyAdded = existing.some((s) => s.trackId === song.trackId);
//     if (!isAlreadyAdded) {
//       const updated = [...existing, song];
//       localStorage.setItem(key, JSON.stringify(updated));
//       setState(updated);
//     }
//   };

//   const isLiked = (id) => liked.some((s) => s.trackId === id);
//   const isFavourite = (id) => favourites.some((s) => s.trackId === id);

//   return (
//     <div className="pb-40 px-6 pt-6 min-h-screen bg-gradient-to-b from-white to-gray-100">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
//         🔍 Search Songs on Harmonix
//       </h2>

//       {/* Search Bar */}
//       <form
//         onSubmit={handleSearch}
//         className="mb-10 max-w-xl mx-auto flex items-center gap-3"
//       >
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search artist or song name..."
//           className="flex-grow px-4 py-2 border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//         <button
//           type="submit"
//           className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
//         >
//           Search
//         </button>
//       </form>

//       {/* Song Results */}
//       {loading ? (
//         <div className="text-center text-gray-500 text-lg">Loading...</div>
//       ) : songs.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {songs.map((song) => (
//             <div
//               key={song.trackId}
//               className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <img
//                 src={song.artworkUrl100.replace("100x100", "300x300")}
//                 alt={song.trackName}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-900 truncate">
//                   {song.trackName}
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-2 truncate">
//                   {song.artistName}
//                 </p>
//                 <button
//                   onClick={() => setNowPlaying(song)}
//                   className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg transition-all"
//                 >
//                   ▶ Play
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         query &&
//         !loading && (
//           <div className="text-center text-gray-500 text-lg">
//             No results found for <span className="font-semibold">"{query}"</span>
//           </div>
//         )
//       )}

//       {/* Now Playing Bar */}
//       {nowPlaying && (
//         <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50">
//           <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <img
//                 src={nowPlaying.artworkUrl100}
//                 alt={nowPlaying.trackName}
//                 className="w-14 h-14 rounded-md object-cover"
//               />
//               <div>
//                 <h4 className="text-base font-semibold text-gray-800 truncate">
//                   {nowPlaying.trackName}
//                 </h4>
//                 <p className="text-sm text-gray-600 truncate">
//                   {nowPlaying.artistName}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               {/* Audio */}
//               <audio controls autoPlay className="w-56 sm:w-72">
//                 <source src={nowPlaying.previewUrl} type="audio/mpeg" />
//                 Your browser does not support the audio tag.
//               </audio>

//               {/* Like & Favourite Buttons */}
//               <button
//                 onClick={() =>
//                   saveToStorage("likedSongs", nowPlaying, setLiked)
//                 }
//                 className={`text-sm px-3 py-1 rounded-md border ${
//                   isLiked(nowPlaying.trackId)
//                     ? "bg-green-100 text-green-600 border-green-300"
//                     : "border-gray-300 hover:bg-gray-100"
//                 } transition`}
//                 disabled={isLiked(nowPlaying.trackId)}
//               >
//                 👍 {isLiked(nowPlaying.trackId) ? "Liked" : "Like"}
//               </button>

//               <button
//                 onClick={() =>
//                   saveToStorage("favouriteSongs", nowPlaying, setFavourites)
//                 }
//                 className={`text-sm px-3 py-1 rounded-md border ${
//                   isFavourite(nowPlaying.trackId)
//                     ? "bg-red-100 text-red-600 border-red-300"
//                     : "border-red-300 text-red-500 hover:bg-red-100"
//                 } transition`}
//                 disabled={isFavourite(nowPlaying.trackId)}
//               >
//                 ❤️ {isFavourite(nowPlaying.trackId) ? "Favourited" : "Favourite"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";

export default function Library() {
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

  return (
    <div className="pb-40 px-6 pt-6 min-h-screen bg-gradient-to-b from-white to-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
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
          className="flex-grow px-4 py-2 border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">Loading...</div>
      ) : songs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {songs.map((song) => (
            <div
              key={song.trackId}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={song.artworkUrl100.replace("100x100", "300x300")}
                alt={song.trackName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {song.trackName}
                </h3>
                <p className="text-sm text-gray-600 mb-2 truncate">
                  {song.artistName}
                </p>
                <button
                  onClick={() => setNowPlaying(song)}
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
          <div className="text-center text-gray-500 text-lg">
            No results found for <span className="font-semibold">"{query}"</span>
          </div>
        )
      )}

      {nowPlaying && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={nowPlaying.artworkUrl100}
                alt={nowPlaying.trackName}
                className="w-14 h-14 rounded-md object-cover"
              />
              <div>
                <h4 className="text-base font-semibold text-gray-800 truncate">
                  {nowPlaying.trackName}
                </h4>
                <p className="text-sm text-gray-600 truncate">
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
                onClick={() =>
                  saveToStorage("likedSongs", nowPlaying, setLiked)
                }
                className={`text-sm px-3 py-1 rounded-md border ${
                  isLiked(nowPlaying.trackId)
                    ? "bg-green-100 text-green-600 border-green-300"
                    : "border-gray-300 hover:bg-gray-100"
                } transition`}
                disabled={isLiked(nowPlaying.trackId)}
              >
                👍 {isLiked(nowPlaying.trackId) ? "Liked" : "Like"}
              </button>

              <button
                onClick={() =>
                  saveToStorage("favouriteSongs", nowPlaying, setFavourites)
                }
                className={`text-sm px-3 py-1 rounded-md border ${
                  isFavourite(nowPlaying.trackId)
                    ? "bg-red-100 text-red-600 border-red-300"
                    : "border-red-300 text-red-500 hover:bg-red-100"
                } transition`}
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
          <div className="bg-white text-black p-6 rounded-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Add to Playlist</h3>
            <input
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Enter or select playlist name"
              className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
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
  );
}
