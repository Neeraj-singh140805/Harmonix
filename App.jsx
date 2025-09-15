

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Library from './Components/Library';
import Contact from './Components/AboutUs';
import Setting from './Components/Setting';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Feed from './Components/Feed';
import Favorites from './Components/Favorites';
import LikedSongs from './Components/LikedSongs';
import Trending from './Components/Trending';
import Playlists from './Components/Playlists';
import Welcome from './Components/Welcome';

import { SettingProvider, SettingContext } from './context/SettingContext'; 

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('user');
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppWrapper() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/';

  const { fontSize, darkMode } = useContext(SettingContext);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      style={{ fontSize: `${fontSize}px` }}
    >
      {!hideNavbar && <Navbar />}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
          <Route path="/AboutUs" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
          <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/liked-songs" element={<ProtectedRoute><LikedSongs /></ProtectedRoute>} />
          <Route path="/trending" element={<ProtectedRoute><Trending /></ProtectedRoute>} />
          <Route path="/playlists" element={<ProtectedRoute><Playlists /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SettingProvider>
      <Router>
        <AppWrapper />
      </Router>
    </SettingProvider>
  );
}



