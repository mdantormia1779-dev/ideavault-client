"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Mail } from "lucide-react";
import ProfileModal from "../Components/ProfileModal/ProfileModal";

const ProfilePage = () => {
  useEffect(() => {
    document.title = "My Profile | IdeaVault";
  }, []);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
      
        const { data } = await authClient.getSession();
        const sessionUser = data?.user;

        if (!sessionUser?.email) {
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/ideas` 
        );
        
       
        const profileRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/profile/${sessionUser.email}`
        );
        const profileData = await profileRes.json();

        if (profileData?.success && profileData?.data) {
          setUser(profileData.data); 
        } else {
        
          setUser(sessionUser);
        }
      } catch (error) {
        console.log("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const isInvalidImage = !user?.image || user?.image.includes("png.com");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No user profile found. Please login again.
      </div>
    );
  }

  const userInitial = user.name
    ? user.name.trim().charAt(0).toUpperCase()
    : "?";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">

      <div className="max-w-md w-full p-6 bg-white border rounded-2xl shadow-xl flex flex-col items-center">

        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4 w-full">
          {!isInvalidImage && !imageError ? (
            <div className="relative w-24 h-24">
              <Image
                src={user.image}
                alt="profile"
                fill
                className="rounded-full object-cover border"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-md">
              <span className="text-3xl font-bold">{userInitial}</span>
            </div>
          )}

          {/* Name & Email Info */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
            <div className="flex items-center justify-center gap-2 text-gray-500 mt-1 text-sm">
              <Mail size={15} />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        {/* Profile Modal Trigger/Inputs */}
        <div className="w-full mt-6">
          <ProfileModal
            user={user}
            setUser={setUser}
            userId={user._id || "6a0c2db7aee1a7b13ae38ccd"} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
