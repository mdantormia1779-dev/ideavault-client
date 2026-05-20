"use client";

import { useEffect, useState } from "react";

const Comments = ({ ideaId, user }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // edit states
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/ideas/${ideaId}`
      );
      const data = await res.json();
      setComments(data?.data?.comments || []);
    };

    fetchComments();
  }, [ideaId]);

  // add comment
  const handleAdd = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/ideas/${ideaId}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          userName: user.name,
          text,
        }),
      }
    );

    const data = await res.json();

    setComments((prev) => [...prev, data.data]);
    setText("");
  };

  // delete comment
  const handleDelete = async (commentId) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/ideas/${ideaId}/comments/${commentId}`,
      { method: "DELETE" }
    );

    setComments((prev) =>
      prev.filter((c) => c._id !== commentId)
    );
  };

  // start edit
  const startEdit = (comment) => {
    setEditId(comment._id);
    setEditText(comment.text);
  };

  // save edit
  const saveEdit = async (commentId) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/ideas/${ideaId}/comments/${commentId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText }),
      }
    );

    if (res.ok) {
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, text: editText } : c
        )
      );

      setEditId(null);
      setEditText("");
    }
  };

  return (
    <div className="mt-10">

      {/* Add comment */}
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 w-full"
          placeholder="Write a comment..."
        />
        <button
          onClick={handleAdd}
          className="bg-violet-600 text-white px-4"
        >
          Send
        </button>
      </div>

      {/* List */}
      <div className="mt-6 space-y-4">
        {comments.map((c) => (
          <div
            key={c._id}
            className="p-3 border rounded flex justify-between"
          >
            <div className="w-full">

              <p className="font-semibold">{c.userName}</p>

              {/* EDIT MODE */}
              {editId === c._id ? (
                <div className="flex gap-2 mt-1">
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border p-1 w-full"
                  />
                  <button
                    onClick={() => saveEdit(c._id)}
                    className="bg-green-600 text-white px-2"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p>{c.text}</p>
              )}

              <small className="text-gray-500">
                {new Date(c.createdAt).toLocaleString()}
              </small>
            </div>

            {/* Actions */}
            {user.id === c.userId && (
              <div className="flex gap-2 ml-4">

                <button
                  onClick={() => startEdit(c)}
                  className="text-blue-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-red-500"
                >
                  Delete
                </button>

              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Comments;