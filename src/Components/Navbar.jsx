import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../index.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const rawUser = localStorage.getItem("user");
  let userName = "";
  let userExists = false;

  try {
    const parsed = JSON.parse(rawUser);
    userName = parsed?.name || parsed?.email || "";
    userExists = true;
  } catch {
    if (rawUser) {
      userName = rawUser;
      userExists = true;
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

          {/* Logo */}
          <Link to="/home" className="flex items-center">
            <img
              src="https://i.pinimg.com/736x/2b/81/a8/2b81a830e7be62b2437a493d2867c3d8.jpg"
              alt="Logo"
              className="mr-3 h-10 sm:h-12"
            />
          </Link>

          {/* Right side: user info + hamburger */}
          <div className="flex items-center gap-3 lg:order-2">
            {userExists ? (
              <div className="flex gap-3 items-center">
                <h4 className="font-semibold text-gray-800 text-sm sm:text-base hidden sm:block">
                  Welcome {userName || "!"}
                </h4>
                <button
                  className="bg-red-600 px-3 py-1 cursor-pointer font-bold rounded-md text-white hover:bg-red-500 text-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Link
                  to="/login"
                  className="text-gray-800 hover:bg-gray-50 font-medium rounded-lg text-sm px-3 py-2"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm px-3 py-2"
                >
                  Get started
                </Link>
              </div>
            )}

            {/* Hamburger button — only on mobile */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                // X icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Nav links */}
          <div
            className={`${
              menuOpen ? "flex" : "hidden"
            } lg:flex justify-between items-center w-full lg:w-auto lg:order-1 mt-2 lg:mt-0`}
          >
            <ul className="flex flex-col w-full lg:flex-row lg:space-x-8 font-medium border-t border-gray-100 lg:border-0">
              <li>
                <NavLink
                  to="/home"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/library"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Library
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/AboutUs"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/setting"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Setting
                </NavLink>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
}