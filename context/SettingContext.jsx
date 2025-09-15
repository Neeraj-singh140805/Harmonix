import React, { createContext, useState, useEffect } from "react";

export const SettingContext = createContext();

export const SettingProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(true);
  const [volume, setVolume] = useState(50);
  const [isPrivate, setIsPrivate] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedNotif = localStorage.getItem("harmonix_notifications");
    const storedVolume = localStorage.getItem("harmonix_volume");
    const storedPrivacy = localStorage.getItem("harmonix_privacy");
    const storedFontSize = localStorage.getItem("harmonix_fontSize");
    const storedDarkMode = localStorage.getItem("harmonix_darkMode");

    if (storedNotif !== null) setNotifications(storedNotif === "true");
    if (storedVolume !== null) setVolume(Number(storedVolume));
    if (storedPrivacy !== null) setIsPrivate(storedPrivacy === "true");
    if (storedFontSize !== null) setFontSize(Number(storedFontSize));
    if (storedDarkMode !== null) setDarkMode(storedDarkMode === "true");
  }, []);

  const value = {
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
  };

  return (
    <SettingContext.Provider value={value}>
      {children}
    </SettingContext.Provider>
  );
};


