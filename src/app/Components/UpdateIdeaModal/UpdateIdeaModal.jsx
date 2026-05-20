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
        toast.success("Updated successfully");
        onUpdate(data.data);
        onClose();
        window.location.reload()
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-xl w-105">

        <h2 className="text-lg font-bold mb-4">
          Update Idea
        </h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
        />

        <input
          name="shortDesc"
          value={form.shortDesc}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        >
          <option value="Tech">Tech</option>
          <option value="Health">Health</option>
          <option value="AI">AI</option>
          <option value="Education">Education</option>
        </select>

        <div className="flex gap-2">

          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 p-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white p-2 rounded"
          >
            {loading ? "Updating..." : "Update"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default UpdateIdeaModal;