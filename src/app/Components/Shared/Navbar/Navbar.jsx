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

  //  avatar fallback state
  const [imgError, setImgError] = useState(false);

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">

        <Link href="/" className="text-2xl font-bold">
          IdeaVault
        </Link>

        <ul className="hidden md:flex gap-6">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/ideas">Ideas</Link></li>
          <li><Link href="/add-ideas">Add Idea</Link></li>
          <li><Link href="/my-ideas">My Ideas</Link></li>
          <li><Link href="/my-interactions">My Interactions</Link></li>
        </ul>

        <div className="flex items-center gap-4">

          {!user ? (
            <div className="flex gap-3">
              <Link href="/login" className="px-3 py-1 border rounded">
                Login
              </Link>
              <Link href="/register" className="px-3 py-1 bg-blue-600 text-white rounded">
                Register
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>

              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-1 border rounded"
              >
                {/*  SAFE AVATAR */}
                {user.image && !imgError ? (
                  <Image
                    src={user.image}
                    alt="user avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <CgProfile size={20} />
                  </div>
                )}

                <span>{user.name}</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-52 bg-white shadow-xl rounded-xl overflow-hidden">

                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    href="/my-ideas"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    My Ideas
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-500"
                  >
                    <IoMdLogOut /> Logout
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