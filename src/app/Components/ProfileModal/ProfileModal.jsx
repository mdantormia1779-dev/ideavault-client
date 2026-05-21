"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const ProfileModal = ({ user, setUser, onClose }) => {
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/profile/${user.id || user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, image }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Profile updated successfully! 🎉");
        
        // ⭐ ফিক্স: প্যারেন্ট স্টেটের ইউজার ডেটা ইনস্ট্যান্ট আপডেট করা হচ্ছে
        setUser((prev) => ({
          ...prev,
          name: name,
          image: image,
        }));
        
        if (onClose) onClose(); // মডাল বন্ধ করার জন্য
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    // আপনার মডালের ডিজাইন UI এখানে থাকবে, বাটনে onClick={handleSave} কল করে দেবেন।
    <div className="mt-4 pt-4 border-t w-full flex flex-col gap-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded-lg text-sm w-full"
        placeholder="Update Name"
      />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="border p-2 rounded-lg text-sm w-full"
        placeholder="Update Image URL"
      />
      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-violet-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition cursor-pointer"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default ProfileModal;
