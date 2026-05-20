"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const IdeaDetailsPage = () => {
    const { id } = useParams();

    const [idea, setIdea] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIdea = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URI}/ideas/${id}`
                );

                const data = await res.json();
                setIdea(data?.data || null);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchIdea();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!idea) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Idea not found
            </div>
        );
    }

    return (
        <div className=" min-h-screen bg-linear-to-br from-slate-50 to-violet-50 dark:from-slate-950 dark:to-slate-900 p-6">

            {/* Main Card */}
            <div className="mx-auto container bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">

                {/* Image */}
                <div className="relative w-full h-96">
                    <Image
                        src={idea.image}
                        alt="idea"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-6 md:p-10">

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                        {idea.title}
                    </h1>

                    {/* Short Description */}
                    <p className="mt-2 text-slate-500 dark:text-slate-300">
                        {idea.shortDesc}
                    </p>

                    {/* Tags / Category */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-3 py-1 text-xs rounded-full bg-violet-100 text-violet-700">
                            {idea.category}
                        </span>

                        {idea.tags?.split(" ").map((tag, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                            Description
                        </h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">
                            {idea.description}
                        </p>
                    </div>

                    {/* Grid Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                            <h3 className="text-sm text-slate-500">Budget</h3>
                            <p className="font-semibold text-slate-800 dark:text-white">
                                {idea.budget}
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                            <h3 className="text-sm text-slate-500">Audience</h3>
                            <p className="font-semibold text-slate-800 dark:text-white">
                                {idea.audience}
                            </p>
                        </div>

                    </div>

                    {/* Problem & Solution */}
                    <div className="mt-8 space-y-4">

                        <div className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <h3 className="font-semibold text-red-600">Problem</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                {idea.problem}
                            </p>
                        </div>

                        <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <h3 className="font-semibold text-green-600">Solution</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                {idea.solution}
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default IdeaDetailsPage;