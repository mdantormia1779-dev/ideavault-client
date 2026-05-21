"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Mail } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No user found</p>
      </div>
    );
  }

  const userInitial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="max-w-md w-full p-6 border rounded-xl shadow bg-white">

        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">

          {user?.image && !imageError ? (
            <Image
              src={user.image}
              alt="profile"
              width={100}
              height={100}
              className="rounded-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-2xl font-bold">
                {userInitial}
              </span>
            </div>
          )}

          {/* Name */}
          <h2 className="text-xl font-semibold">
            {user?.name}
          </h2>

          {/* Email */}
          <div className="flex items-center gap-2 text-gray-500">
            <Mail size={16} />
            <span>{user?.email}</span>
          </div>
        </div>

        {/* Modal */}
        <ProfileModal user={user} setUser={setUser} />

      </div>
    </div>
  );
};

export default ProfilePage;