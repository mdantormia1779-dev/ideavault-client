"use client"

import { useEffect, useState, useCallback } from "react";
import Card from "../Components/Card";

export default function IdeasPage() {
  useEffect(() => {
    document.title = "Explore Ideas | IdeaVault";
  }, []);

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  // serch filter
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // api 
  const fetchIdeas = useCallback(async () => {
    setLoading(true);
    try {
      const API = process.env.NEXT_PUBLIC_SERVER_URI;
      
      // query
      const params = new URLSearchParams();
      if (search.trim()) params.append("search", search);
      if (category) params.append("category", category);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const res = await fetch(`${API}/ideas?${params.toString()}`);
      const data = await res.json();
      setIdeas(data?.data || []);
    } catch (error) {
      console.error("Error fetching ideas:", error);
    } finally {
      setLoading(false);
    }
  }, [search, category, startDate, endDate]);

   useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchIdeas();
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [search, category, startDate, endDate, fetchIdeas]);

  const handleClearFilters = () => {
    setSearch("");
    setCategory("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">All Ideas</h1>
        <p className="text-gray-500 text-sm">Discover and filter great concepts through the community</p>
      </div>

      {/* 🔍 SEARCH & FILTER UI PANEL */}
      <div className="bg-white p-4 rounded-xl border shadow-xs mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        
        {/* INPUT: SEARCH */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">Search</label>
          <input
            type="text"
            placeholder="By idea title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border text-sm p-2 rounded-lg bg-slate-50 focus:bg-white focus:outline-violet-500 w-full"
          />
        </div>

        {/* INPUT: CATEGORY */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border text-sm p-2 rounded-lg bg-slate-50 focus:bg-white focus:outline-violet-500 w-full cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Health">Health</option>
            <option value="AI">AI</option>
            <option value="Education">Education</option>
          </select>
        </div>

        {/* INPUT: START DATE */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">From Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border text-sm p-2 rounded-lg bg-slate-50 focus:bg-white focus:outline-violet-500 w-full cursor-pointer"
          />
        </div>

        {/* INPUT: END DATE */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">To Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border text-sm p-2 rounded-lg bg-slate-50 focus:bg-white focus:outline-violet-500 w-full cursor-pointer"
          />
        </div>

        {/* BUTTON: CLEAR FILTERS */}
        <button
          onClick={handleClearFilters}
          disabled={!search && !category && !startDate && !endDate}
          className="bg-slate-100 text-slate-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-slate-200 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed w-full h-9.5 text-center"
        >
           Clear Filters
        </button>

      </div>

      {/*  LOADING STATE */}
      {loading ? (
        <div className="min-h-100 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/*  EMPTY STATE */}
          {ideas.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border shadow-xs max-w-md mx-auto">
              <p className="text-gray-500 font-medium">No ideas match your criteria.</p>
              <p className="text-gray-400 text-xs mt-1">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            /*  CARD GRID DISPLAY */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map((idea) => (
                <Card idea={idea} key={idea._id}></Card>
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
}
