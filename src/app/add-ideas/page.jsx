"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client"; // 🔥 FIX

export default function AddIdeaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const API = process.env.NEXT_PUBLIC_SERVER_URI;

      // get user
      const { data: session } = await authClient.getSession();
      const user = session?.user;

      const res = await fetch(`${API}/ideas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          userId: user?.id || user?._id,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      toast.success("Idea added successfully");

      reset();

      router.push("/ideas"); // better UX
    } catch (err) {
      toast.error("Failed to submit idea");
      console.log(err);
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

        {/* Title */}
        <div>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Idea Title"
            className={input}
          />
          <p className="text-red-500 text-sm">
            {errors.title?.message}
          </p>
        </div>

        {/* Short Desc */}
        <div>
          <input
            {...register("shortDesc", { required: "Short description required" })}
            placeholder="Short Description"
            className={input}
          />
          <p className="text-red-500 text-sm">
            {errors.shortDesc?.message}
          </p>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Detailed Description"
            className={input}
            rows="3"
          />
          <p className="text-red-500 text-sm">
            {errors.description?.message}
          </p>
        </div>

        {/* Category */}
        <select {...register("category")} className={input}>
          <option value="Tech">Tech</option>
          <option value="Health">Health</option>
          <option value="AI">AI</option>
          <option value="Education">Education</option>
        </select>

        <input
          {...register("tags")}
          placeholder="Tags (optional)"
          className={input}
        />

        <input
          {...register("image")}
          placeholder="Image URL"
          className={`${input} md:col-span-2`}
        />

        <input
          {...register("budget")}
          placeholder="Estimated Budget"
          className={input}
        />

        {/* Audience */}
        <div>
          <input
            {...register("audience", {
              required: "Target audience is required",
            })}
            placeholder="Target Audience"
            className={input}
          />
          <p className="text-red-500 text-sm">
            {errors.audience?.message}
          </p>
        </div>

        {/* Problem */}
        <textarea
          {...register("problem")}
          placeholder="Problem Statement"
          className={`${input} md:col-span-2`}
          rows="3"
        />

        {/* Solution */}
        <textarea
          {...register("solution")}
          placeholder="Proposed Solution"
          className={`${input} md:col-span-2`}
          rows="3"
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Submitting..." : "Submit Idea"}
        </button>

      </form>
    </div>
  );
}