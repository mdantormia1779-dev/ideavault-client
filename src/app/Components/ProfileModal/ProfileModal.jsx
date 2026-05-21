"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const ProfileModal = ({ user, setUser, userId, onClose }) => {
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    
    const cleanId = 
      userId?.$oid || 
      user?._id?.$oid || 
      userId || 
      user?._id || 
      user?.id;

    if (!cleanId) {
      toast.error("User ID not found!");
      return;
    }

    setLoading(true);
    try {
  
      const identifier = user?.email ? encodeURIComponent(user.email) : cleanId;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/profile/${identifier}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            name, 
            image,
            email: user?.email 
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Profile updated successfully! 🎉");
      
        setUser((prev) => ({
          ...prev,
          name: name,
          image: image,
        }));
        
        if (onClose) onClose();
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
    <div className="mt-4 pt-4 border-t w-full flex flex-col gap-3">
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded-lg text-sm w-full focus:outline-violet-500"
          placeholder="Update Name"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 rounded-lg text-sm w-full focus:outline-violet-500"
          placeholder="Update Image URL"
        />
      </div>
      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-violet-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition cursor-pointer disabled:bg-violet-400"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default ProfileModal;
