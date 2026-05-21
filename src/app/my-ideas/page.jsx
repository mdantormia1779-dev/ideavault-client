"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import UpdateIdeaModal from "../Components/UpdateIdeaModal/UpdateIdeaModal";
import Image from "next/image";
import DeleteIdea from './../Components/DeleteIdea/DeleteIdea';

const MyIdeasPage = () => {
  useEffect(() => {
    document.title = "My Ideas | IdeaVault";
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
        console.error("Error loading ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // ⭐ UPDATE UI (বাগ ফিক্সড: এটি নিশ্চিত করবে যে পুরো আইডিয়া অবজেক্টটিই আপডেট হচ্ছে)
  const handleUpdate = (updatedFields) => {
    setIdeas((prev) =>
      prev.map((i) =>
        i._id === updatedFields._id ? { ...i, ...updatedFields } : i
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
      
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">My Ideas</h1>
        <p className="text-sm text-gray-500">Manage and edit your created ideas</p>
      </div>

      {ideas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 bg-white inline-block px-6 py-4 rounded-xl shadow-xs border">
            No ideas found. Start creating one!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white rounded-xl shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden border flex flex-col justify-between"
            >
              <div>
                {/* IMAGE */}
                <div className="relative w-full h-40 bg-slate-100">
                  <Image
                    src={
                      idea.image ||
                      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                    }
                    alt={idea.title || "idea image"}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full font-medium">
                    {idea.category || "General"}
                  </span>

                  <h2 className="font-bold text-lg text-slate-800 mt-2 line-clamp-1">
                    {idea.title}
                  </h2>

                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {idea.shortDesc || idea.description}
                  </p>
                </div>
              </div>

              {/* ACTIONS FOOTER */}
              <div className="p-4 pt-0 mt-auto">
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedIdea(idea)}
                    className="flex-1 bg-blue-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
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
