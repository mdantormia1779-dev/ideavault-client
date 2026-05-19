"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "react-toastify";

const ForgetPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Forget Password Email:", data.email);

      // এখানে তোমার API call / better-auth reset logic বসবে
      toast.success("Reset link sent to your email!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-slate-100 to-slate-200 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-3">
          Forgot Password?
        </h2>

        <p className="text-center text-sm text-slate-500 mb-6">
          Enter your email and we will send you a reset link
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to login */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Remember your password?{" "}
          <Link href="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPage;