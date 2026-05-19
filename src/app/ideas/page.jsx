"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddIdeaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = (form) => {
    let newErrors = {};

    if (!form.title.value.trim()) {
      newErrors.title = "Idea title is required";
    }

    if (!form.shortDesc.value.trim()) {
      newErrors.shortDesc = "Short description is required";
    }

    if (!form.description.value.trim()) {
      newErrors.description = "Detailed description is required";
    }

    if (!form.audience.value.trim()) {
      newErrors.audience = "Target audience is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formErrors = validate(form);

    setErrors(formErrors);

    // stop if errors exist
    if (Object.keys(formErrors).length > 0) return;

    setLoading(true);

    const ideaData = {
      title: form.title.value,
      shortDesc: form.shortDesc.value,
      description: form.description.value,
      category: form.category.value,
      tags: form.tags.value,
      image: form.image.value,
      budget: form.budget.value,
      audience: form.audience.value,
      problem: form.problem.value,
      solution: form.solution.value,
    };

    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ideaData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit idea");
      }

      router.push("/ideas");
    } catch (err) {
      setErrors({ api: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold">🚀 Add Your Startup Idea</h1>
        <p className="text-gray-500 mt-2">
          Share your idea and get feedback from the community
        </p>
      </div>

      {/* API error */}
      {errors.api && (
        <p className="max-w-4xl mx-auto mb-4 text-red-500 text-center">
          {errors.api}
        </p>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 grid md:grid-cols-2 gap-4"
      >

        {/* Title */}
        <div>
          <input name="title" placeholder="Idea Title" className={inputClass} />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Short Desc */}
        <div>
          <input name="shortDesc" placeholder="Short Description" className={inputClass} />
          {errors.shortDesc && <p className="text-red-500 text-sm mt-1">{errors.shortDesc}</p>}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <textarea
            name="description"
            placeholder="Detailed Description"
            rows="3"
            className={inputClass}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Category */}
        <select name="category" className={inputClass}>
          <option>Tech</option>
          <option>Health</option>
          <option>AI</option>
          <option>Education</option>
        </select>

        <input name="tags" placeholder="Tags (optional)" className={inputClass} />

        <input name="image" placeholder="Image URL" className={`${inputClass} md:col-span-2`} />

        <input name="budget" placeholder="Estimated Budget" className={inputClass} />

        {/* Audience */}
        <div>
          <input name="audience" placeholder="Target Audience" className={inputClass} />
          {errors.audience && <p className="text-red-500 text-sm mt-1">{errors.audience}</p>}
        </div>

        <textarea name="problem" placeholder="Problem Statement" rows="3" className={`${inputClass} md:col-span-2`} />

        <textarea name="solution" placeholder="Proposed Solution" rows="3" className={`${inputClass} md:col-span-2`} />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Submitting..." : "Submit Idea "}
        </button>

      </form>
    </div>
  );
}