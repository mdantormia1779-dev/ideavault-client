"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { IoMdLogOut, IoMdMenu, IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // Session handling
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession();
        setUser(data?.user || null);
        setImgError(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSession();
    window.addEventListener("profileUpdated", fetchSession);

    return () =>
      window.removeEventListener("profileUpdated", fetchSession);
  }, [pathname]);

  // Outside click handler
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest(".hamburger-btn")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setUser(null);
    setOpen(false);
    setMenuOpen(false);
    router.push("/login");
  };

  const getInitial = (name) =>
    name?.trim()?.charAt(0)?.toUpperCase() || "U";

  // Check for invalid domain fallbacks
  const isInvalidImage =
    !user?.image || user?.image.includes("antor.png.com") || user?.image === "";

  const linkClass = (path) =>
    pathname === path
      ? "text-blue-600 font-bold"
      : "hover:text-blue-600 transition";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b h-14 flex items-center">
      <nav className="max-w-7xl w-full mx-auto flex items-center justify-between px-4">

        {/* LEFT BRAND SECTION */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn md:hidden text-2xl flex items-center justify-center p-1 hover:bg-gray-100 rounded-md"
          >
            {menuOpen ? <IoMdClose /> : <IoMdMenu />}
          </button>

          <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600">
            IdeaVault
          </Link>
        </div>

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex items-center gap-5 lg:gap-6 text-sm lg:text-base font-medium">
          <li><Link href="/" className={linkClass("/")}>Home</Link></li>
          <li><Link href="/ideas" className={linkClass("/ideas")}>Ideas</Link></li>
          <li><Link href="/add-ideas" className={linkClass("/add-ideas")}>Add Idea</Link></li>
          <li><Link href="/my-ideas" className={linkClass("/my-ideas")}>My Ideas</Link></li>
        </ul>

        {/* RIGHT ACTION CONTROLS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {!user ? (
            <>
              <Link href="/login" className="text-sm px-3 py-1.5 border rounded">
                Login
              </Link>
              <Link href="/register" className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded">
                Register
              </Link>
            </>
          ) : (
            <div ref={dropdownRef} className="relative">

              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100"
              >
                {/* Avatar Display */}
                {!isInvalidImage && !imgError ? (
                  <div className="relative w-8 h-8">
                    <Image
                      src={user.image}
                      alt="avatar"
                      fill
                      className="rounded-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {getInitial(user.name)}
                  </div>
                )}

                {/* Name string element */}
                <span className="hidden sm:block text-sm font-medium max-w-25 truncate">
                  {user.name}
                </span>
              </button>

              {/* Desktop Menu Dropdown element */}
              {open && (
                <div className="absolute right-0 mt-2 w-52 bg-white shadow-xl rounded-xl border z-50">
                  <div className="p-3 border-b">
                    <p className="font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>

                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 flex items-center gap-2"
                  >
                    <IoMdLogOut />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* MOBILE DRAWER (Fixed top alignment issue) */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-14 left-0 w-64 h-[calc(100vh-56px)] bg-white border-r shadow-lg transform transition-transform duration-300 md:hidden z-40 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col p-4 gap-4 font-medium text-gray-700">
          <li><Link href="/" className={linkClass("/")} onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link href="/ideas" className={linkClass("/ideas")} onClick={() => setMenuOpen(false)}>Ideas</Link></li>
          <li><Link href="/add-ideas" className={linkClass("/add-ideas")} onClick={() => setMenuOpen(false)}>Add Idea</Link></li>
          <li><Link href="/my-ideas" className={linkClass("/my-ideas")} onClick={() => setMenuOpen(false)}>My Ideas</Link></li>
          {user && (
            <li className="pt-2 border-t"><Link href="/profile" className={linkClass("/profile")} onClick={() => setMenuOpen(false)}>Profile</Link></li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
