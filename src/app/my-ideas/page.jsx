"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import UpdateIdeaModal from "../Components/UpdateIdeaModal/UpdateIdeaModal";
import Image from "next/image";
import DeleteIdea from './../Components/DeleteIdea/DeleteIdea';

const MyIdeasPage = () => {
  useEffect(() => {
    document.title = "My Ideas";
  }, []);
  const [ideas, setIdeas] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await authClient.getSession();
        const userData = data?.user;

        setUser(userData);

        if (!userData?.id) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/my-ideas/${userData.id}`
        );

        const result = await res.json();
        setIdeas(result?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // UPDATE UI
  const handleUpdate = (updatedIdea) => {
    setIdeas((prev) =>
      prev.map((i) =>
        i._id === updatedIdea._id ? updatedIdea : i
      )
    );
    setSelectedIdea(null);
  };

  // DELETE UI
  const handleDelete = (id) => {
    setIdeas((prev) => prev.filter((i) => i._id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-2xl font-bold mb-6">My Ideas</h1>

      {ideas.length === 0 ? (
        <p className="text-gray-500">No ideas found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >

              {/* IMAGE */}
              <div className="relative w-full h-40">
                <Image
                  src={
                    idea.image ||
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                  }
                  alt="idea"
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">

                <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full">
                  {idea.category}
                </span>

                <h2 className="font-bold mt-2">
                  {idea.title}
                </h2>

                <p className="text-sm text-gray-600">
                  {idea.shortDesc}
                </p>

                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() => setSelectedIdea(idea)}
                    className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>

                  <DeleteIdea
                    idea={idea}
                    onDelete={handleDelete}
                  />

                </div>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* MODAL */}
      {selectedIdea && (
        <UpdateIdeaModal
          idea={selectedIdea}
          onClose={() => setSelectedIdea(null)}
          onUpdate={handleUpdate}
        />
      )}

    </div>
  );
};

export default MyIdeasPage;