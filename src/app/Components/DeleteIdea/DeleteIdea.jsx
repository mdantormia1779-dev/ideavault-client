"use client";

import { useState } from "react";

const DeleteIdea = ({ idea, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/ideas/${idea._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data?.success) {
        onDelete(idea._id);
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-100 p-6 rounded-xl">

            <h2 className="text-lg font-bold mb-2">
              Delete Idea?
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              This will permanently delete <b>{idea.title}</b>
            </p>

            <div className="flex gap-2">

              <button
                onClick={() => setOpen(false)}
                className="flex-1 bg-gray-300 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-red-600 text-white py-2 rounded"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default DeleteIdea;