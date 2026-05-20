"use client";

import { useEffect, useState } from "react";
import IdeaCard from "../Card";

export default function Sixitem() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_SERVER_URI;
        const res = await fetch(`${API}/idea`);
        const data = await res.json();
        setIdeas(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Latest Ideas</h1>
        <p className="text-gray-500 mt-2">
          Discover creative ideas from the community
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {ideas.map((idea) => (
          <IdeaCard key={idea._id} idea={idea} />
        ))}
      </div>
    </div>
  );
}