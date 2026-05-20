"use client";

import { useEffect, useState } from "react";
import Card from "../Components/Card";

export default function IdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_SERVER_URI;
        const res = await fetch(`${API}/ideas`);
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
    return <p className="text-center mt-10">Loading ideas...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Ideas</h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <Card idea={idea} key={idea._id}></Card>
        ))}
      </div>
    </div>
  );
}