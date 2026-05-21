"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [imgError, setImgError] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await authClient.getSession();
      setUser(data?.user || null);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setUser(null);
    router.push("/login");
  };

  const getInitial = (name) =>
    name?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-blue-600">
          IdeaVault
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 font-bold text-gray-700 dark:text-gray-200">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/ideas">Ideas</Link></li>
          <li><Link href="/add-ideas">Add Idea</Link></li>
          <li><Link href="/my-ideas">My Ideas</Link></li>
          <li><Link href="/my-interactions">My Interactions</Link></li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <HiX /> : <HiMenu />}
          </button>

          {!user ? (
            <div className="hidden md:flex gap-2">
              <Link href="/login" className="px-4 py-1.5 border rounded-lg">
                Login
              </Link>
              <Link href="/register" className="px-4 py-1.5 bg-blue-600 text-white rounded-lg">
                Register
              </Link>
            </div>
          ) : (
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {user.image && !imgError ? (
                  <Image
                    src={user.image}
                    alt="user avatar"
                    width={34}
                    height={34}
                    className="rounded-full"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {getInitial(user?.name)}
                  </div>
                )}
                <span className="hidden sm:block">{user.name}</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 border shadow-xl rounded-xl">
                  <div className="px-4 py-3 border-b">
                    <p>{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <Link href="/profile" className="block px-4 py-2">Profile</Link>
                  <Link href="/my-ideas" className="block px-4 py-2">My Ideas</Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 flex items-center gap-2"
                  >
                    <IoMdLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* 🔥 Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t px-4 py-4 space-y-3">

          <Link href="/" onClick={() => setMobileMenu(false)}>Home</Link>
          <Link href="/ideas" onClick={() => setMobileMenu(false)}>Ideas</Link>
          <Link href="/add-ideas" onClick={() => setMobileMenu(false)}>Add Idea</Link>
          <Link href="/my-ideas" onClick={() => setMobileMenu(false)}>My Ideas</Link>
          <Link href="/my-interactions" onClick={() => setMobileMenu(false)}>My Interactions</Link>

          {!user ? (
            <div className="flex gap-2 pt-3">
              <Link href="/login" className="px-4 py-1.5 border rounded-lg w-full text-center">
                Login
              </Link>
              <Link href="/register" className="px-4 py-1.5 bg-blue-600 text-white rounded-lg w-full text-center">
                Register
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full text-left text-red-500 pt-3 flex items-center gap-2"
            >
              <IoMdLogOut /> Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;