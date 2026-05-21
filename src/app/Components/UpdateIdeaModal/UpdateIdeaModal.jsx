"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const UpdateIdeaModal = ({ idea, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    title: idea?.title || "",
    shortDesc: idea?.shortDesc || "",
    description: idea?.description || "",
    image: idea?.image || "",
    category: idea?.category || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    // যেকোনো একটি ফিল্ড খালি থাকলে সাবমিট হবে না
    if (!form.title.trim() || !form.category) {
      toast.error("Title and Category are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/ideas/${idea._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data?.success) {
        toast.success("Updated successfully 🎉");
        
        // ⭐ ফিক্স: ব্যাকএন্ডের আইডি সহ নতুন ফর্মের ডেটা প্যারেন্টে পাঠানো হলো
        // এর ফলে window.location.reload() ছাড়াই UI সাথে সাথে আপডেট হবে
        onUpdate({ _id: idea._id, ...form });
        onClose();
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-xs">

      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl border animate-in fade-in zoom-in-95 duration-200">

        <h2 className="text-xl font-bold mb-4 text-slate-800">
          Update Idea
        </h2>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Idea Title"
              className="w-full border rounded-lg p-2 text-sm focus:outline-violet-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">Short Description</label>
            <input
              name="shortDesc"
              value={form.shortDesc}
              onChange={handleChange}
              placeholder="Short Description"
              className="w-full border rounded-lg p-2 text-sm focus:outline-violet-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">Full Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Detailed Description"
              rows={3}
              className="w-full border rounded-lg p-2 text-sm focus:outline-violet-500 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full border rounded-lg p-2 text-sm focus:outline-violet-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 text-sm bg-white focus:outline-violet-500"
            >
              <option value="" disabled>Select Category</option>
              <option value="Tech">Tech</option>
              <option value="Health">Health</option>
              <option value="AI">AI</option>
              <option value="Education">Education</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            type="button"
            className="flex-1 bg-slate-100 text-slate-700 font-medium p-2.5 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            type="button"
            className="flex-1 bg-blue-600 text-white font-medium p-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Updating..." : "Update Idea"}
          </button>
        </div>

      </div>

    </div>
  );
};

export default UpdateIdeaModal;
