"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Edit3, Mail } from "lucide-react";
import { Badge, Button } from "@heroui/react";
import ProfileModal from "../Components/ProfileModal/ProfileModal";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession();
        setUser(data?.user || null);
      } catch (error) {
        console.log("Session fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="text-center p-8 max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
          <p className="text-red-500 font-semibold text-lg">No user found</p>
          <p className="text-slate-500 text-sm mt-1">
            Please log in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  const userInitial = user.name
    ? user.name.trim().charAt(0).toUpperCase()
    : "?";

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 via-white to-violet-100 dark:from-slate-950 dark:via-slate-900 dark:to-black p-4 relative overflow-hidden">

      {/* Soft Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-400/10 dark:bg-violet-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/10 dark:bg-pink-500/10 rounded-full blur-[120px]"></div>

      {/* Card */}
      <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500">

        <div className="flex flex-col items-center">

          {/* Avatar */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-linear-to-tr from-violet-500 via-fuchsia-500 to-pink-500 rounded-full blur-md opacity-30"></div>

            <div className="relative w-28 h-28 flex items-center justify-center">
              {user.image && !imageError ? (
                <Image
                  src={user.image}
                  alt="profile"
                  width={110}
                  height={110}
                  className="rounded-full object-cover border-4 border-white dark:border-slate-900"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div className="w-full h-full rounded-full bg-linear-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                  <span className="text-3xl font-bold bg-linear-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                    {userInitial}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 capitalize">
            {user.name}
          </h1>

          {/* Email */}
          <div className="flex items-center gap-2 mt-2 text-slate-500 dark:text-slate-400 text-sm">
            <Mail className="w-4 h-4 text-violet-500" />
            <span>{user.email}</span>
          </div>

          {/* Button */}
          <ProfileModal user={user}></ProfileModal>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;