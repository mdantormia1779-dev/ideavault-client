"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  const [user, setUser] = useState(true);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();

  //  outside click close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          IdeaVault
        </Link>

        {/* Center Menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/ideas">Ideas</Link></li>
          <li><Link href="/add-ideas">Add Idea</Link></li>
          <li><Link href="/my-ideas">My Ideas</Link></li>
          <li><Link href="/my-interactions">My Interactions</Link></li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {!user ? (
            <div className="flex gap-3">
              <Link href="/login" className="px-3 py-1 border rounded">
                Login
              </Link>
              <Link
                href="/register"
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>

              {/* Profile Button */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-1 border rounded hover:bg-gray-100"
              >
                <CgProfile />
                <span>Antor</span>
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-52 bg-white shadow-xl rounded-xl overflow-hidden animate-in fade-in zoom-in-95">

                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">Antor Mia</p>
                    <p className="text-sm text-gray-500">user@email.com</p>
                  </div>

                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile Management
                  </Link>

                  <Link
                    href="/my-ideas"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Ideas
                  </Link>

                  <button
                    onClick={() => {
                      setUser(false);
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-500"
                  >
                    <IoMdLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Add Idea Button */}
          <Link
            href="/add-ideas"
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
          >
            <FaPlus />
            Add Idea
          </Link>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;