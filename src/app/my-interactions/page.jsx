"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const MyInteractionPage = () => {
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data: session } = await authClient.getSession();
        const user = session?.user;

        if (!user?.id) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/my-interactions/${user.id}`
        );

        const result = await res.json();
        const data = result?.data || [];

        // ⭐ GROUP BY IDEA ID
        const grouped = {};

        data.forEach((item) => {
          if (!grouped[item.ideaId]) {
            grouped[item.ideaId] = {
              ideaId: item.ideaId,
              ideaTitle: item.ideaTitle,
              ideaImage: item.ideaImage,
              comments: [],
            };
          }

          grouped[item.ideaId].comments.push({
            text: item.comment,
            createdAt: item.createdAt,
          });
        });

        setGroupedData(grouped);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const ideas = Object.values(groupedData);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-violet-50 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          My Interactions
        </h1>
        <p className="text-gray-500">
          All your comments grouped by idea
        </p>
      </div>

      {/* EMPTY STATE */}
      {ideas.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No interactions found
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {ideas.map((idea) => (
            <div
              key={idea.ideaId}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border"
            >

              {/* IMAGE */}
              <div className="relative w-full h-44">
                <Image
                  src={
                    idea.ideaImage ||
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                  }
                  alt="idea"
                  fill
                  className="object-cover hover:scale-105 transition"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">

                {/* TITLE */}
                <Link
                  href={`/ideas/${idea.ideaId}`}
                  className="text-lg font-bold text-violet-600 hover:underline"
                >
                  {idea.ideaTitle}
                </Link>

                {/* COMMENTS LIST */}
                <div className="mt-3 space-y-2 max-h-40 overflow-y-auto pr-2">

                  {idea.comments.map((c, i) => (
                    <div
                      key={i}
                      className="bg-slate-50 p-2 rounded-lg text-sm text-slate-700"
                    >
                      💬 {c.text}
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(c.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}

                </div>

                {/* FOOTER */}
                <div className="flex justify-between mt-3 items-center">

                  <span className="text-xs text-gray-400">
                    {idea.comments.length} comments
                  </span>

                  <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full">
                    Activity
                  </span>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MyInteractionPage;