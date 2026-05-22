"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function AddIdeaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Add Idea | IdeaVault";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);

    try {
      const API = process.env.NEXT_PUBLIC_SERVER_URI;

      if (!API) {
        throw new Error("API URL missing");
      }

      // ✅ FIXED SESSION HANDLING
      const sessionRes = await authClient.getSession();
      const session = sessionRes?.data?.user
        ? sessionRes.data
        : sessionRes?.data || sessionRes;

      const user = session?.user;

      if (!user) {
        toast.error("Please login first!");
        router.push("/login");
        return;
      }

      // ✅ IMPORTANT: NO userId SENT (backend handles it)
      const res = await fetch(`${API}/ideas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 IMPORTANT for auth cookies
        body: JSON.stringify({
          title: formData.title,
          shortDesc: formData.shortDesc,
          description: formData.description,
          category: formData.category,
          tags: formData.tags,
          image: formData.image,
          budget: formData.budget,
          audience: formData.audience,
          problem: formData.problem,
          solution: formData.solution,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Failed to submit idea");
      }

      toast.success("Idea added successfully 🎉");

      reset();
      router.push("/ideas");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const input =
    "p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-6">
        <h1 className="text-3xl font-bold">Add Idea</h1>
        <p className="text-gray-500">
          Share your startup idea with the world
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow grid md:grid-cols-2 gap-4"
      >

        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Idea Title"
          className={input}
        />
        <p className="text-red-500 text-sm">{errors.title?.message}</p>

        <input
          {...register("shortDesc", { required: "Short description required" })}
          placeholder="Short Description"
          className={input}
        />
        <p className="text-red-500 text-sm">{errors.shortDesc?.message}</p>

        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Detailed Description"
          className={`${input} md:col-span-2`}
          rows="3"
        />
        <p className="text-red-500 text-sm">{errors.description?.message}</p>

        <select {...register("category")} className={input}>
          <option value="Tech">Tech</option>
          <option value="Health">Health</option>
          <option value="AI">AI</option>
          <option value="Education">Education</option>
        </select>

        <input {...register("tags")} placeholder="Tags" className={input} />

        <input
          {...register("image")}
          placeholder="Image URL"
          className={`${input} md:col-span-2`}
        />

        <input
          {...register("budget")}
          placeholder="Budget"
          className={input}
        />

        <input
          {...register("audience", { required: "Required" })}
          placeholder="Target Audience"
          className={input}
        />
        <p className="text-red-500 text-sm">{errors.audience?.message}</p>

        <textarea
          {...register("problem")}
          placeholder="Problem"
          className={`${input} md:col-span-2`}
        />

        <textarea
          {...register("solution")}
          placeholder="Solution"
          className={`${input} md:col-span-2`}
        />

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Submitting..." : "Submit Idea"}
        </button>

      </form>
    </div>
  );
}