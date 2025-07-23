import React, { useEffect, useState } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [volume, setVolume] = useState(50);
  const [isPrivate, setIsPrivate] = useState(false);
  useEffect(() => {
    const storedDark = localStorage.getItem("harmonix_darkMode");
    const storedNotif = localStorage.getItem("harmonix_notifications");
    const storedVolume = localStorage.getItem("harmonix_volume");
    const storedPrivacy = localStorage.getItem("harmonix_privacy");

    if (storedDark !== null) setDarkMode(storedDark === "true");
    if (storedNotif !== null) setNotifications(storedNotif === "true");
    if (storedVolume !== null) setVolume(Number(storedVolume));
    if (storedPrivacy !== null) setIsPrivate(storedPrivacy === "true");
  }, []);

  const saveSettings = () => {
    localStorage.setItem("harmonix_darkMode", darkMode);
    localStorage.setItem("harmonix_notifications", notifications);
    localStorage.setItem("harmonix_volume", volume);
    localStorage.setItem("harmonix_privacy", isPrivate);
    alert("✅ Settings saved successfully!");
  };

  const resetSettings = () => {
    setDarkMode(false);
    setNotifications(true);
    setVolume(50);
    setIsPrivate(false);
    localStorage.removeItem("harmonix_darkMode");
    localStorage.removeItem("harmonix_notifications");
    localStorage.removeItem("harmonix_volume");
    localStorage.removeItem("harmonix_privacy");
    alert("⚠️ Settings reset to default.");
  };

  return (
    <div className={`min-h-screen px-6 py-10 transition-all duration-500 ${darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl p-10 space-y-8">

        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-red-400 bg-clip-text text-transparent">
          ⚙️ Settings
        </h1>

        {/* Dark Mode */}
        <SettingToggle
          title="Dark Mode"
          description={darkMode ? "Dark theme is enabled" : "Light theme is enabled"}
          enabled={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
          toggleColor="bg-pink-500"
        />

        {/* Notifications */}
        <SettingToggle
          title="Push Notifications"
          description={notifications ? "Enabled" : "Disabled"}
          enabled={notifications}
          onToggle={() => setNotifications(!notifications)}
          toggleColor="bg-green-500"
        />

        {/* Privacy */}
        <SettingToggle
          title="Account Privacy"
          description={isPrivate ? "Private profile" : "Public profile"}
          enabled={isPrivate}
          onToggle={() => setIsPrivate(!isPrivate)}
          toggleColor="bg-purple-500"
        />

        {/* Volume Slider */}
        <div>
          <label className="block text-lg font-medium mb-2">
            Default Volume: <span className="text-pink-500">{volume}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 pt-6">
          <button
            onClick={saveSettings}
            className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-semibold transition"
          >
            💾 Save
          </button>
          <button
            onClick={resetSettings}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full font-semibold transition"
          >
            ♻️ Reset
          </button>
        </div>
      </div>
    </div>
  );
}
function SettingToggle({ title, description, enabled, onToggle, toggleColor }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-lg font-medium">{title}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex items-center h-8 w-16 rounded-full px-1 transition duration-300 ${enabled ? toggleColor : "bg-gray-400"}`}
      >
        <span className={`inline-block h-6 w-6 transform bg-white rounded-full shadow transition-transform duration-300 ${enabled ? "translate-x-8" : "translate-x-0"}`} />
      </button>
    </div>
  );
}
