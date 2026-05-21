"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { IoMdLogOut, IoMdMenu, IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);       // Profile Dropdown State
  const [menuOpen, setMenuOpen] = useState(false); // Mobile Hamburger Menu State
  const [imgError, setImgError] = useState(false);
  
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // 1. Fetch Session Data & Safely Reset Image Error State (ESLint Error Fixed Here)
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession();
        setUser(data?.user || null);
        setImgError(false); // Reset error state safely inside the async callback flow
      } catch (error) {
        console.error("Navbar session fetch error:", error);
      }
    };
    
    fetchSession();

    // Custom event listener to update user data in real-time when profile updates
    window.addEventListener("profileUpdated", fetchSession);
    return () => window.removeEventListener("profileUpdated", fetchSession);
  }, [pathname]);

  // 2. Handle Click Outside to close dropdown and mobile drawer
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target) && !e.target.closest(".hamburger-btn")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setUser(null);
      setOpen(false);
      setMenuOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getInitial = (name) => name?.trim()?.charAt(0)?.toUpperCase() || "U";

  // Filter conditions for invalid or broken user avatar paths
  const isInvalidImage = !user?.image || user?.image.includes("://png.com") || user?.image === "";

  // Dynamic style layout matching for the currently active link
  const linkClass = (path) => 
    pathname === path 
      ? "text-blue-600 dark:text-blue-400 font-extrabold" 
      : "hover:text-blue-600 dark:hover:text-blue-400 transition duration-200";

  return (
    <header className="w-full sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">

        {/* LOGO & MOBILE HAMBURGER */}
        <div className="flex items-center gap-3">
          {/* Hamburger Icon button for smaller displays */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn md:hidden text-2xl text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer"
          >
            {menuOpen ? <IoMdClose /> : <IoMdMenu />}
          </button>
          
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400"
          >
            IdeaVault
          </Link>
        </div>

        {/* DESKTOP MENU (Hidden on small mobile viewports) */}
        <ul className="hidden md:flex items-center gap-6 font-bold text-gray-700 dark:text-gray-200 text-sm lg:text-base">
          <li><Link href="/" className={linkClass("/")}>Home</Link></li>
          <li><Link href="/ideas" className={linkClass("/ideas")}>Ideas</Link></li>
          <li><Link href="/add-ideas" className={linkClass("/add-ideas")}>Add Idea</Link></li>
          <li><Link href="/my-ideas" className={linkClass("/my-ideas")}>My Ideas</Link></li>
          <li><Link href="/my-interactions" className={linkClass("/my-interactions")}>My Interactions</Link></li>
        </ul>

        {/* RIGHT SIDE ACTIONS (LOGIN / REGISTER / USER AVATAR DROPDOWN) */}
        <div className="flex items-center gap-3">
          {!user ? (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="px-3.5 py-1.5 text-sm font-medium border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-3.5 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-xs"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>

              {/* PROFILE TRIGGER BUTTON */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer border border-transparent hover:border-gray-200"
              >
                {!isInvalidImage && !imgError ? (
                  <div className="relative w-8 h-8">
                    <Image
                      src={user.image}
                      alt="user avatar"
                      fill
                      sizes="34px"
                      className="rounded-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                    {getInitial(user?.name)}
                  </div>
                )}

                <span className="hidden sm:block font-semibold text-sm max-w-25 truncate text-gray-800 dark:text-gray-200">
                  {user.name}
                </span>
              </button>

              {/* DESKTOP PROFILE DROPDOWN PANEL */}
              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 border dark:border-gray-800 shadow-2xl rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-3 bg-slate-50 dark:bg-gray-800/50 border-b dark:border-gray-800">
                    <p className="font-bold text-gray-800 dark:text-gray-200 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                  </div>

                  <div className="p-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                      onClick={() => setOpen(false)}
                    >
                      My Profile
                    </Link>

                    <Link
                      href="/my-ideas"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                      onClick={() => setOpen(false)}
                    >
                      My Ideas
                    </Link>
                  </div>

                  <div className="border-t dark:border-gray-800 p-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 text-rose-500 rounded-lg transition cursor-pointer font-medium"
                    >
                      <IoMdLogOut className="text-base" />
                      Logout
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </nav>

      {/* MOBILE DRAWER SIDEBAR MENU (Slides out smoothly when clicking hamburger button) */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-14.25 left-0 h-[calc(100vh-57px)] w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 shadow-2xl transition-transform duration-300 transform md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col p-4 gap-4 font-bold text-gray-700 dark:text-gray-200 text-base">
          <li>
            <Link href="/" className={linkClass("/")} onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link href="/ideas" className={linkClass("/ideas")} onClick={() => setMenuOpen(false)}>Ideas</Link>
          </li>
          <li>
            <Link href="/add-ideas" className={linkClass("/add-ideas")} onClick={() => setMenuOpen(false)}>Add Idea</Link>
          </li>
          <li>
            <Link href="/my-ideas" className={linkClass("/my-ideas")} onClick={() => setMenuOpen(false)}>My Ideas</Link>
          </li>
          <li>
            <Link href="/my-interactions" className={linkClass("/my-interactions")} onClick={() => setMenuOpen(false)}>My Interactions</Link>
          </li>
          {user && (
            <li className="border-t dark:border-gray-800 pt-4">
              <Link href="/profile" className={linkClass("/profile")} onClick={() => setMenuOpen(false)}>My Profile</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
