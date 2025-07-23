// import React, { useEffect, useState } from "react";

// export default function Settings() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [notifications, setNotifications] = useState(true);
//   const [volume, setVolume] = useState(50);

//   // Load settings from localStorage on mount
//   useEffect(() => {
//     const storedDark = localStorage.getItem("harmonix_darkMode");
//     const storedNotif = localStorage.getItem("harmonix_notifications");
//     const storedVolume = localStorage.getItem("harmonix_volume");

//     if (storedDark !== null) setDarkMode(storedDark === "true");
//     if (storedNotif !== null) setNotifications(storedNotif === "true");
//     if (storedVolume !== null) setVolume(Number(storedVolume));
//   }, []);

//   // Save settings to localStorage
//   const saveSettings = () => {
//     localStorage.setItem("harmonix_darkMode", darkMode);
//     localStorage.setItem("harmonix_notifications", notifications);
//     localStorage.setItem("harmonix_volume", volume);

//     alert("Settings saved successfully!");
//   };

//   return (
//     <div className={`min-h-screen px-6 py-10 font-sans transition duration-500 ${darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"}`}>
//       <div className="max-w-2xl mx-auto bg-white dark:bg-[#1e1e1e] rounded-2xl p-8 shadow-xl">
//         <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 to-red-400 bg-clip-text text-transparent">
//           Settings
//         </h1>

//         {/* Dark Mode Toggle */}
//         <div className="flex items-center justify-between mb-6">
//           <span className="text-lg">Dark Mode</span>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className={`w-14 h-7 rounded-full transition duration-300 flex items-center px-1 ${darkMode ? "bg-pink-500" : "bg-gray-400"}`}
//           >
//             <div className={`h-5 w-5 rounded-full bg-white transform transition-transform duration-300 ${darkMode ? "translate-x-7" : "translate-x-0"}`} />
//           </button>
//         </div>

//         {/* Notification Toggle */}
//         <div className="flex items-center justify-between mb-6">
//           <span className="text-lg">Push Notifications</span>
//           <button
//             onClick={() => setNotifications(!notifications)}
//             className={`w-14 h-7 rounded-full transition duration-300 flex items-center px-1 ${notifications ? "bg-green-500" : "bg-gray-400"}`}
//           >
//             <div className={`h-5 w-5 rounded-full bg-white transform transition-transform duration-300 ${notifications ? "translate-x-7" : "translate-x-0"}`} />
//           </button>
//         </div>

//         {/* Volume Control */}
//         <div className="mb-6">
//           <label htmlFor="volume" className="block text-lg mb-2">
//             Default Volume: <span className="text-pink-500">{volume}%</span>
//           </label>
//           <input
//             type="range"
//             id="volume"
//             min="0"
//             max="100"
//             value={volume}
//             onChange={(e) => setVolume(Number(e.target.value))}
//             className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
//           />
//         </div>

//         {/* Save Button */}
//         <div className="text-center mt-8">
//           <button
//             onClick={saveSettings}
//             className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-semibold transition duration-300"
//           >
//             Save Settings
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [volume, setVolume] = useState(50);

  // Load from localStorage on mount
  useEffect(() => {
    const storedDark = localStorage.getItem("harmonix_darkMode");
    const storedNotif = localStorage.getItem("harmonix_notifications");
    const storedVolume = localStorage.getItem("harmonix_volume");

    if (storedDark !== null) setDarkMode(storedDark === "true");
    if (storedNotif !== null) setNotifications(storedNotif === "true");
    if (storedVolume !== null) setVolume(Number(storedVolume));
  }, []);

  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem("harmonix_darkMode", darkMode);
    localStorage.setItem("harmonix_notifications", notifications);
    localStorage.setItem("harmonix_volume", volume);
    alert("✅ Settings saved successfully!");
  };

  // Reset to defaults
  const resetSettings = () => {
    setDarkMode(false);
    setNotifications(true);
    setVolume(50);
    localStorage.removeItem("harmonix_darkMode");
    localStorage.removeItem("harmonix_notifications");
    localStorage.removeItem("harmonix_volume");
    alert("⚠️ Settings reset to default.");
  };

  return (
    <div className={`min-h-screen px-6 py-10 transition-all duration-500 ${darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-red-400 bg-clip-text text-transparent">
          ⚙️ Settings
        </h1>

        {/* DARK MODE TOGGLE */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-lg font-medium">Dark Mode</p>
            <p className="text-sm text-gray-400">{darkMode ? "Dark theme is enabled" : "Light theme is enabled"}</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex items-center h-8 w-16 transition rounded-full px-1 ${darkMode ? "bg-pink-500" : "bg-gray-400"}`}
          >
            <span className={`inline-block h-6 w-6 transform bg-white rounded-full shadow transition-transform duration-300 ${darkMode ? "translate-x-8" : "translate-x-0"}`} />
          </button>
        </div>

        {/* NOTIFICATION TOGGLE */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-lg font-medium">Push Notifications</p>
            <p className="text-sm text-gray-400">{notifications ? "Enabled" : "Disabled"}</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative inline-flex items-center h-8 w-16 transition rounded-full px-1 ${notifications ? "bg-green-500" : "bg-gray-400"}`}
          >
            <span className={`inline-block h-6 w-6 transform bg-white rounded-full shadow transition-transform duration-300 ${notifications ? "translate-x-8" : "translate-x-0"}`} />
          </button>
        </div>

        {/* VOLUME SLIDER */}
        <div className="mb-6">
          <label htmlFor="volume" className="block text-lg font-medium mb-2">
            Default Volume: <span className="text-pink-500">{volume}%</span>
          </label>
          <input
            type="range"
            id="volume"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={saveSettings}
            className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-semibold transition duration-300"
          >
            💾 Save
          </button>
          <button
            onClick={resetSettings}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full font-semibold transition duration-300"
          >
            ♻️ Reset
          </button>
        </div>
      </div>
    </div>
  );
}

