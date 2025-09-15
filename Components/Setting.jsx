import React, { useContext } from "react";
import { Bell, Shield, Volume2, Type, Moon, Sun } from "lucide-react";
import { SettingContext } from "../context/SettingContext";

export default function Settings() {
  const {
    notifications,
    setNotifications,
    volume,
    setVolume,
    isPrivate,
    setIsPrivate,
    fontSize,
    setFontSize,
    darkMode,
    setDarkMode,
  } = useContext(SettingContext);

  const saveSettings = () => {
    localStorage.setItem("harmonix_notifications", notifications);
    localStorage.setItem("harmonix_volume", volume);
    localStorage.setItem("harmonix_privacy", isPrivate);
    localStorage.setItem("harmonix_fontSize", fontSize);
    localStorage.setItem("harmonix_darkMode", darkMode);
    alert("✅ Settings saved successfully!");
  };

  const resetSettings = () => {
    setNotifications(true);
    setVolume(50);
    setIsPrivate(false);
    setFontSize(16);
    setDarkMode(false);

    localStorage.removeItem("harmonix_notifications");
    localStorage.removeItem("harmonix_volume");
    localStorage.removeItem("harmonix_privacy");
    localStorage.removeItem("harmonix_fontSize");
    localStorage.removeItem("harmonix_darkMode");

    alert("⚠️ Settings reset to default.");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-10 transition-colors duration-500"
      style={{
        backgroundImage: !darkMode
          ? "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4')"
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`max-w-3xl w-full rounded-3xl shadow-2xl p-10 space-y-10 border border-white/20 transition-colors duration-500 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white/30 text-gray-900"
        }`}
      >
        <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-red-400 bg-clip-text text-transparent tracking-wide drop-shadow-lg">
          ⚙️ Settings
        </h1>

        {/* Notifications */}
        <SettingToggle
          icon={<Bell className="w-6 h-6 text-green-500" />}
          title="Push Notifications"
          description={notifications ? "Enabled" : "Disabled"}
          enabled={notifications}
          onToggle={() => setNotifications(!notifications)}
          toggleColor="bg-green-500"
        />

        {/* Privacy */}
        <SettingToggle
          icon={<Shield className="w-6 h-6 text-purple-500" />}
          title="Account Privacy"
          description={isPrivate ? "Private profile" : "Public profile"}
          enabled={isPrivate}
          onToggle={() => setIsPrivate(!isPrivate)}
          toggleColor="bg-purple-500"
        />

        {/* Dark Mode */}
        <SettingToggle
          icon={darkMode ? <Moon className="w-6 h-6 text-gray-800" /> : <Sun className="w-6 h-6 text-yellow-500" />}
          title="Dark Mode"
          description={darkMode ? "Enabled" : "Disabled"}
          enabled={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
          toggleColor="bg-gray-800"
        />

        {/* Volume */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-lg font-semibold">
            <Volume2 className="w-6 h-6 text-pink-500" />
            Default Volume: <span className="text-pink-600">{volume}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-pink-500 bg-gray-300"
          />
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-lg font-semibold">
            <Type className="w-6 h-6 text-blue-500" />
            Font Size: <span className="text-blue-600">{fontSize}px</span>
          </label>
          <input
            type="range"
            min="12"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-500 bg-gray-300"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 pt-6">
          <button
            onClick={saveSettings}
            className="px-8 py-3 bg-gradient-to-r from-pink-600 to-red-500 text-white rounded-full font-bold shadow-lg transform hover:scale-105 transition"
          >
            💾 Save
          </button>
          <button
            onClick={resetSettings}
            className="px-8 py-3 bg-gradient-to-r from-gray-200 to-gray-400 text-gray-900 rounded-full font-bold shadow-lg transform hover:scale-105 transition"
          >
            ♻️ Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingToggle({ icon, title, description, enabled, onToggle, toggleColor }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl transition-colors duration-300 shadow-md hover:shadow-xl">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex items-center h-8 w-16 rounded-full px-1 transition duration-300 ${
          enabled ? toggleColor : "bg-gray-400"
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform bg-white rounded-full shadow transition-transform duration-300 ${
            enabled ? "translate-x-8" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}



