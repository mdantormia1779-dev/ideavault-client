"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
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
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-blue-600"
        >
          IdeaVault
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-6 font-bold text-gray-700 dark:text-gray-200">
          <li><Link href="/" className="hover:text-blue-600 transition">Home</Link></li>
          <li><Link href="/ideas" className="hover:text-blue-600 transition">Ideas</Link></li>
          <li><Link href="/add-ideas" className="hover:text-blue-600 transition">Add Idea</Link></li>
          <li><Link href="/my-ideas" className="hover:text-blue-600 transition">My Ideas</Link></li>
          <li><Link href="/my-interactions" className="hover:text-blue-600 transition">My Interactions</Link></li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {!user ? (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="px-4 py-1.5 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>

              {/* Profile Button */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {user.image && !imgError ? (
                  <Image
                    src={user.image}
                    alt="user avatar"
                    width={34}
                    height={34}
                    className="rounded-full object-cover border"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                    {getInitial(user?.name)}
                  </div>
                )}

                <span className="hidden sm:block font-medium">
                  {user.name}
                </span>
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 border shadow-xl rounded-xl overflow-hidden animate-fadeIn">

                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    href="/my-ideas"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    onClick={() => setOpen(false)}
                  >
                    My Ideas
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 text-red-500 transition"
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
    </header>
  );
};

export default Navbar;